import { json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Badge,
  Box,
  Button,
  Card,
  EmptyState,
  InlineGrid,
  InlineStack,
  Icon,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIcon, EditIcon, PlusIcon, ProductIcon, ViewIcon } from "@shopify/polaris-icons";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import ClassicTemplateForm, {
  type ClassicTemplateFormValue,
} from "~/components/layouts/ClassicTemplateForm";
import TemplateCategoryModal from "~/components/layouts/TemplateCategoryModal";
import CategoryService from "~/models/Category.service";
import TemplateService from "~/models/Template.service";
import { authenticate } from "~/shopify.server";
import { fileUrl } from "~/utils/fileUrl";
import { jFlashMessage } from "~/utils/message-flash";

type ActionData =
  | {
      ok: true;
      intent: "create-template" | "update-template" | "delete-template";
    }
  | {
      ok: false;
      intent: string;
      errors?: Record<string, string>;
      messageFlash?: {
        status: string;
        msg: string;
      };
    };

const createEmptyTemplate = (categoryId = 0): ClassicTemplateFormValue => ({
  name: "",
  prevImg: "",
  realImg: "",
  basePrice: 0,
  enabledAutoImgUpdate: false,
  enabledAddToCart: true,
  categoryId,
  id: undefined,
});

const resolveTemplateImage = (template: any) => {
  const raw =
    template?.prevImg ||
    template?.realImg ||
    template?.configuration?.icon ||
    template?.configuration?.popupImg ||
    "";

  return raw ? fileUrl(raw) : "";
};

const normalizeTemplateDraft = (template: any): ClassicTemplateFormValue => ({
  id: template?.id,
  name: String(template?.name || ""),
  prevImg: String(template?.prevImg || ""),
  realImg: String(template?.realImg || ""),
  basePrice: template?.basePrice ?? 0,
  enabledAutoImgUpdate: Boolean(template?.enabledAutoImgUpdate),
  enabledAddToCart: Boolean(template?.enabledAddToCart),
  categoryId: Number(template?.categoryId || 0),
});

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "", 10);

  if (!Number.isFinite(configId)) {
    return json({ templates: [], categories: [] });
  }

  const [templates, categories] = await Promise.all([
    TemplateService.getTemplatesByConfiguration(session.id, configId),
    CategoryService.getCategorys(session.id),
  ]);

  return json({
    templates: templates || [],
    categories: categories || [],
  });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "", 10);
  const formData = await request.formData();
  const intent = String(formData.get("intent") || "");

  if (!Number.isFinite(configId)) {
    return json(
      { ok: false, intent, ...jFlashMessage("Invalid configuration", "error") },
      { status: 400 },
    );
  }

  if (intent === "delete-template") {
    const templateId = parseInt(String(formData.get("templateId") || ""), 10);

    if (!Number.isFinite(templateId)) {
      return json(
        { ok: false, intent, ...jFlashMessage("Invalid template action", "error") },
        { status: 400 },
      );
    }

    const result = await TemplateService.deleteTemplate(templateId, session.id);

    if (!result) {
      return json(
        { ok: false, intent, ...jFlashMessage("Unable to delete template", "error") },
        { status: 500 },
      );
    }

    return json({ ok: true, intent });
  }

  if (intent !== "create-template" && intent !== "update-template") {
    return json(
      { ok: false, intent, ...jFlashMessage("Invalid template action", "error") },
      { status: 400 },
    );
  }

  const name = String(formData.get("name") || "").trim();
  const prevImg = String(formData.get("prevImg") || "").trim();
  const realImg = String(formData.get("realImg") || "").trim();
  const categoryId = parseInt(String(formData.get("categoryId") || ""), 10);
  const basePriceRaw = String(formData.get("basePrice") || "0");
  const basePrice = Number.parseFloat(basePriceRaw || "0");
  const enabledAutoImgUpdate = String(formData.get("enabledAutoImgUpdate") || "false") === "true";
  const enabledAddToCart = String(formData.get("enabledAddToCart") || "false") === "true";

  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name is too short.";
  }

  if (!Number.isFinite(categoryId) || categoryId <= 0) {
    errors.categoryId = "Category is required.";
  }

  if (!Number.isFinite(basePrice)) {
    errors.basePrice = "Base price is invalid.";
  }

  if (Object.keys(errors).length > 0) {
    return json(
      {
        ok: false,
        intent,
        errors,
      },
      { status: 400 },
    );
  }

  const payload = {
    name,
    prevImg,
    realImg,
    basePrice,
    enabledAutoImgUpdate,
    enabledAddToCart,
    configurationId: configId,
    categoryId,
  };

  if (intent === "create-template") {
    const result = await TemplateService.addTemplate(payload as any, session.id);

    if (!result) {
      return json(
        { ok: false, intent, ...jFlashMessage("Error on template adding", "error") },
        { status: 500 },
      );
    }

    return json({ ok: true, intent });
  }

  const templateId = parseInt(String(formData.get("templateId") || ""), 10);

  if (!Number.isFinite(templateId)) {
    return json(
      { ok: false, intent, ...jFlashMessage("Invalid template action", "error") },
      { status: 400 },
    );
  }

  const result = await TemplateService.updateTemplate(
    { ...payload, id: templateId } as any,
    session.id,
  );

  if (!result) {
    return json(
      { ok: false, intent, ...jFlashMessage("Error on template updating", "error") },
      { status: 500 },
    );
  }

  return json({ ok: true, intent });
};

export default function ConfigurationTemplatesPage() {
  const { configuration } = useOutletContext<any>();
  const { templates, categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const [query, setQuery] = useState("");
  const [categoriesData, setCategoriesData] = useState<any[]>(categories || []);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [draft, setDraft] = useState<ClassicTemplateFormValue>(() =>
    createEmptyTemplate(categories?.[0]?.id || 0),
  );

  const isSubmitting = navigation.state === "submitting";
  const configId = String(configuration?.id || "");

  useEffect(() => {
    setCategoriesData(categories || []);
  }, [categories]);

  useEffect(() => {
    if (!actionData?.ok) return;
    if (actionData.intent === "create-template" || actionData.intent === "update-template") {
      setFormMode(null);
      setDraft(createEmptyTemplate((categoriesData[0]?.id as number) || 0));
    }
  }, [actionData, categoriesData]);

  const filteredTemplates = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return templates;

    return templates.filter((template: any) => {
      const name = String(template?.name || "").toLowerCase();
      const category = String(template?.category?.name || "").toLowerCase();
      return name.includes(term) || category.includes(term);
    });
  }, [templates, query]);

  const openCreate = () => {
    setDraft(createEmptyTemplate((categoriesData[0]?.id as number) || 0));
    setFormMode("create");
  };

  const openEdit = (template: any) => {
    setDraft(normalizeTemplateDraft(template));
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode(null);
    setDraft(createEmptyTemplate((categoriesData[0]?.id as number) || 0));
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("intent", formMode === "edit" ? "update-template" : "create-template");
    if (draft.id) {
      formData.append("templateId", String(draft.id));
    }
    formData.append("name", draft.name);
    formData.append("prevImg", draft.prevImg || "");
    formData.append("realImg", draft.realImg || "");
    formData.append("basePrice", String(draft.basePrice ?? 0));
    formData.append("enabledAutoImgUpdate", String(Boolean(draft.enabledAutoImgUpdate)));
    formData.append("enabledAddToCart", String(Boolean(draft.enabledAddToCart)));
    formData.append("categoryId", String(draft.categoryId || ""));
    submit(formData, { method: "POST" });
  };

  const handleDelete = (templateId: number) => {
    const formData = new FormData();
    formData.append("intent", "delete-template");
    formData.append("templateId", String(templateId));
    submit(formData, { method: "POST" });
  };

  const handleDesign = (templateId: number) => {
    navigate(`/app/templates/main/preview/${templateId}?returnTo=${encodeURIComponent(`/app/configuration/${configId}/templates`)}`);
  };

  if (formMode) {
    return (
      <>
        <ClassicTemplateForm
          value={draft}
          categories={categoriesData}
          isEditing={formMode === "edit"}
          isSubmitting={isSubmitting}
          errors={actionData && !actionData.ok ? actionData.errors : undefined}
          onChange={setDraft}
          onSave={handleSave}
          onCancel={closeForm}
          categoryButton={
            <Button tone="success" variant="primary" onClick={() => setIsCategoryModalOpen(true)}>
              Add new
            </Button>
          }
        />

        <TemplateCategoryModal
          open={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onSubmit={(category: any) => {
            setCategoriesData((current) =>
              current.some((entry) => Number(entry.id) === Number(category.id))
                ? current
                : [...current, category],
            );
            setDraft((current) => ({ ...current, categoryId: category.id }));
          }}
        />
      </>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <style>
        {`
          .templates-masonry {
            column-count: 1;
            column-gap: 14px;
          }

          @media (min-width: 860px) {
            .templates-masonry {
              column-count: 2;
            }
          }

          @media (min-width: 1320px) {
            .templates-masonry {
              column-count: 3;
            }
          }
        `}
      </style>

      <Card>
        <Box padding="400">
          <div style={{ display: "grid", gap: 16 }}>
            <InlineStack align="space-between" blockAlign="start">
              <div style={{ display: "grid", gap: 6 }}>
                <Text as="h1" variant="headingLg">
                  Templates
                </Text>
                <Text as="p" tone="subdued">
                  Manage only the templates linked to this configuration.
                </Text>
              </div>
              <InlineStack gap="200" blockAlign="center">
                <Button
                  onClick={() =>
                    navigate(
                      `/app/templates/main?returnTo=${encodeURIComponent(
                        `/app/configuration/${configId}/templates`,
                      )}`,
                    )
                  }
                >
                  Open default templates route
                </Button>
                <Button variant="primary" tone="success" icon={PlusIcon} onClick={openCreate}>
                  Add new template
                </Button>
              </InlineStack>
            </InlineStack>

            <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="300">
              <TextField
                label="Search templates"
                labelHidden
                autoComplete="off"
                value={query}
                onChange={setQuery}
                placeholder="Search templates..."
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 8,
                }}
              >
                <Badge tone="info">
                  {templates.length} {templates.length > 1 ? "templates" : "template"}
                </Badge>
                {query.trim() ? (
                  <Badge>{filteredTemplates.length} result{filteredTemplates.length > 1 ? "s" : ""}</Badge>
                ) : null}
              </div>
            </InlineGrid>
          </div>
        </Box>
      </Card>

      {filteredTemplates.length === 0 ? (
        <Card>
          <Box padding="400">
            <EmptyState
              heading={
                templates.length === 0
                  ? "No templates for this configuration"
                  : "No matching templates"
              }
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              action={
                templates.length === 0
                  ? { content: "Add new template", onAction: openCreate }
                  : undefined
              }
            >
              <p>
                {templates.length === 0
                  ? "Create the first template attached to this configuration."
                  : "Try another search term."}
              </p>
            </EmptyState>
          </Box>
        </Card>
      ) : (
        <div
          style={{
            columnGap: 16,
          }}
          className="templates-masonry"
        >
          {filteredTemplates.map((template: any) => {
            const image = resolveTemplateImage(template);

            return (
              <div
                key={template.id}
                style={{
                  breakInside: "avoid",
                  WebkitColumnBreakInside: "avoid",
                  marginBottom: 14,
                }}
              >
                <Card>
                  <Box padding="250">
                    <div
                      style={{
                        display: "grid",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: 118,
                          maxHeight: 118,
                          borderRadius: 10,
                          overflow: "hidden",
                          border: "1px solid #e5e7eb",
                          background: image
                            ? "#f8fafc"
                            : "linear-gradient(135deg, #f8fafc 0%, #eef7f7 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: image ? "inset 0 1px 0 rgba(255,255,255,0.5)" : "none",
                        }}
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={template?.name || "Template"}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ display: "grid", gap: 8, justifyItems: "center" }}>
                            <div
                              style={{
                                width: 42,
                                height: 42,
                                borderRadius: 12,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#ffffff",
                                border: "1px solid #dbe4ea",
                              }}
                            >
                              <Icon source={ProductIcon} tone="subdued" />
                            </div>
                            <Text as="span" tone="subdued" variant="bodySm">
                              No preview image
                            </Text>
                          </div>
                        )}
                      </div>

                      <div style={{ display: "grid", gap: 8 }}>
                        <Text as="h3" variant="headingMd">
                          {template?.name || "Template"}
                        </Text>

                        <InlineStack gap="200" wrap>
                          <Badge>{template?.category?.name || "No category"}</Badge>
                          <Badge tone="success">Base price: {template?.basePrice ?? 0}</Badge>
                          {template?.enabledAddToCart ? <Badge tone="info">Add to cart</Badge> : null}
                        </InlineStack>

                        <Text as="p" tone="subdued" variant="bodySm">
                          Open the template for design, adjust its details, or remove it from this configuration.
                        </Text>

                        <InlineStack gap="200" wrap>
                          <Button icon={ViewIcon} onClick={() => handleDesign(template.id)}>
                            Design
                          </Button>
                          <Button icon={EditIcon} onClick={() => openEdit(template)}>
                            Edit
                          </Button>
                          <Button
                            tone="critical"
                            icon={DeleteIcon}
                            onClick={() => handleDelete(template.id)}
                          >
                            Delete
                          </Button>
                        </InlineStack>
                      </div>
                    </div>
                  </Box>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
