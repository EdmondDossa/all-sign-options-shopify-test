import {
  ActionList,
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Icon,
  IndexTable,
  InlineGrid,
  InlineStack,
  Page,
  Popover,
  Select,
  Text,
  Pagination, // <--- Nouvel import
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { ViewIconBtn } from "~/components/buttons/ViewIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Link,
  json,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { authenticate } from "~/shopify.server";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { BorderCircleText } from "~/components/feactures/BorderCircleText";
import { ManageBtn } from "~/components/buttons/ManageBtn";
import { truncateText } from "~/utils/truncate-text";
import { fileUrl } from "~/utils/fileUrl";
import { DuplicateIconBtn } from "~/components/buttons/DuplicateIconBtn";
import { ConfigurationType } from "~/types/ConfigurationType";
import { PRICING_PLANS } from "~/utils/pricing";
import {
  DeleteIcon,
  DuplicateIcon,
  EditIcon,
  MenuHorizontalIcon,
  ViewIcon,
} from "@shopify/polaris-icons";
import ManageFontIcon from "~/components/icons/ManageFontIcon";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const { session } = await authenticate.admin(request);
//   const url = new URL(request.url);

//   // --- LOGIQUE PAGINATION ---
//   const page = parseInt(url.searchParams.get("page") || "1", 10);
//   const limit = 6; // Nombre d'éléments par page

//   // Récupération de TOUTES les configs (Attention : pour de très gros volumes, il faudrait paginer en SQL)
//   const allConfigurations: any = await ConfigurationService.getConfigurations(session.id);

//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + limit;

//   // Découpage pour la page actuelle
//   const paginatedConfigurations = allConfigurations?.slice(startIndex, endIndex);

//   const hasNextPage = endIndex < allConfigurations?.length;
//   const hasPreviousPage = page > 1;

//   return json({
//     configurations: paginatedConfigurations,
//     page,
//     hasNextPage,
//     hasPreviousPage,
//     totalCount: allConfigurations.length // Utile si vous voulez afficher "X sur Y"
//   });
// };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);

  // --- LOGIQUE PAGINATION ---
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 8;

  const result: any = await ConfigurationService.getConfigurations(session.id);

  const allConfigurations = Array.isArray(result) ? result : [];

  allConfigurations.sort((a: any, b: any) => b.id - a.id);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedConfigurations = allConfigurations.slice(startIndex, endIndex);

  const hasNextPage = endIndex < allConfigurations.length;
  const hasPreviousPage = page > 1;

  return json({
    configurations: paginatedConfigurations,
    page,
    hasNextPage,
    hasPreviousPage,
    totalCount: allConfigurations.length,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const method = request.method;

  switch (method) {
    case "DELETE": {
      await ConfigurationService.deleteConfiguration(parseInt(id), session.id);
      return redirect(`${flashMessage("Configuration deleted successfully")}`);
    }

    case "POST": {
      const configuration: ConfigurationType | any =
        await ConfigurationService.getConfigurationWithoutTemplates(
          parseInt(id),
          session.id,
        );
      delete configuration.id;
      // Ne pas copier le champ product (legacy), utiliser products à la place
      if (configuration.product) {
        (configuration as any).products = Array.isArray(configuration.product)
          ? configuration.product
          : [];
        delete (configuration as any).product;
      }
      configuration.name = formData.get("configTitle") as string;
      await ConfigurationService.duplicateConfiguration(
        configuration,
        session.id,
      );

      return redirect(
        `${flashMessage("Configuration duplicated successfully")}`,
      );
    }

    default:
      break;
  }

  return null;
};

export default function Configuration() {
  const submit = useSubmit();

  // Récupération des données étendues du loader
  let { configurations, page, hasNextPage, hasPreviousPage } =
    useLoaderData<typeof loader>();

  let { plan } = useOutletContext<{ plan: string }>();

  // Gestion du plan Starter (Limitation visuelle)
  if (plan == PRICING_PLANS.STARTER) {
    // Note: Si on est en starter, on limite l'affichage même si la pagination en renvoie plus
    configurations =
      configurations?.slice(0, PRICING_PLANS.STARTER_RULES.configurations) ||
      [];
  }

  useHandleFlashMessage();

  const [configTitle, setConfigTitle] = useState<string>("");

  const navigate = useNavigate();

  const [active, setActive] = useState(false);
  const [activePopoverId, setActivePopoverId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const togglePopover = useCallback(() => setActive((active) => !active), []);

  // --- GESTION NAVIGATION PAGINATION ---
  const handleNextPage = () => {
    navigate(`?page=${page + 1}`);
  };

  const handlePreviousPage = () => {
    navigate(`?page=${page - 1}`);
  };
  // -------------------------------------

  const handleAction = (action: string, id: string) => {
    console.log(`Action "${action}" sur l'élément ID: ${id}`);
    setActivePopoverId(null);
  };

  const onHandleConfigurationCreate = () => {
    navigate("/app/configuration/create");
  };

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handeleDuplicate = (id: number, name: string) => {
    submit({ id: id, configTitle: `${name}-copy` }, { method: "POST" });
  };

  const normalizeConfigId = (value: number | string) => {
    const normalized = String(value ?? "").trim();
    return /^\d+$/.test(normalized) ? normalized : "";
  };

  const handleUpdate = (id: number, productType?: string | null) => {
    const safeConfigId = normalizeConfigId(id);
    if (!safeConfigId) return;

    if (isNcpcProductType(productType)) {
      navigate(`/app/ncpc/${safeConfigId}/required-options`);
      return;
    }
    submit({ id: safeConfigId }, { method: "GET", action: "create" });
  };

  const normalizeProductType = (productType?: string | null) =>
    String(productType || "")
      .trim()
      .toLowerCase();

  const isNcpcProductType = (productType?: string | null) => {
    const normalized = normalizeProductType(productType);
    return normalized === "neon" || normalized === "channel";
  };

  const parseConfigData = (rawData: any) => {
    if (!rawData) return null;
    if (typeof rawData === "string") {
      try {
        const parsed = JSON.parse(rawData);
        return parsed && typeof parsed === "object" ? parsed : null;
      } catch {
        return null;
      }
    }
    return typeof rawData === "object" ? rawData : null;
  };

  const getNcpcProductTypeFromConfig = (
    config: any,
  ): "neon" | "channel" | null => {
    const normalized = normalizeProductType(config?.productType);
    if (normalized === "neon" || normalized === "channel") {
      return normalized;
    }

    const data = parseConfigData(config?.data);
    const normalizedDataProductType = normalizeProductType(data?.productType);
    if (
      normalizedDataProductType === "neon" ||
      normalizedDataProductType === "channel"
    ) {
      return normalizedDataProductType;
    }

    const wrappedNcpcData = parseConfigData(data?.ncpc);
    const normalizedWrappedProductType = normalizeProductType(
      wrappedNcpcData?.productType,
    );
    if (
      normalizedWrappedProductType === "neon" ||
      normalizedWrappedProductType === "channel"
    ) {
      return normalizedWrappedProductType;
    }

    const hasNcpcShape = Boolean(data?.requiredOptions) && Boolean(data?.additionalOptions);
    const hasClassicMaterials = Array.isArray(data?.materials);
    const hasWrappedNcpcShape =
      Boolean(wrappedNcpcData?.requiredOptions) && Boolean(wrappedNcpcData?.additionalOptions);

    // Fallback legacy-safe:
    // treat as NCPC only if NCPC blocks exist and classic materials are absent.
    if (hasNcpcShape && !hasClassicMaterials) {
      if (data?.requiredOptions?.letterTypesOptions || data?.requiredOptions?.letterTypeOptions) {
        return "channel";
      }
      return "neon";
    }

    if (hasWrappedNcpcShape && !hasClassicMaterials) {
      if (
        wrappedNcpcData?.requiredOptions?.letterTypesOptions ||
        wrappedNcpcData?.requiredOptions?.letterTypeOptions
      ) {
        return "channel";
      }
      return "neon";
    }

    return null;
  };

  const handleConfigurationRoute = (
    id: number,
    productType?: string | null,
  ) => {
    const safeConfigId = normalizeConfigId(id);
    if (!safeConfigId) return;

    if (isNcpcProductType(productType)) {
      navigate(`/app/ncpc/${safeConfigId}/required-options`);
      return;
    }
    navigate(`${safeConfigId}/materials`);
  };

  const handlePreviews = (id: number) => {
    const safeConfigId = normalizeConfigId(id);
    if (!safeConfigId) return;
    navigate(`${safeConfigId}/preview`);
  };

  const handleNcpcInterface = (id: number) => {
    const safeConfigId = normalizeConfigId(id);
    if (!safeConfigId) return;
    navigate(`/app/ncpc/${safeConfigId}/required-options`);
  };

  configurations = configurations || [];

  const resourceName = {
    singular: "Configuration",
    plural: "Configurations",
  };

  const rowMarkup = configurations.map((config: any, index: number) => {
    const { id, name, description, icon, materialType, productType } = config;
    const isActive = activePopoverId === id;
    const ncpcProductType = getNcpcProductTypeFromConfig(config);
    const materialBadgeLabel = ncpcProductType
      ? ncpcProductType === "neon"
        ? "Neon"
        : "Channel"
      : (materialType ?? "none");
    const materialBadgeTone = ncpcProductType
      ? "attention"
      : materialType === "simple"
        ? "info"
        : materialType === "advance"
          ? "success"
          : "attention";

    return (
      <IndexTable.Row
        id={`${id}`}
        key={id}
        position={index}
        onClick={() =>
          handleConfigurationRoute(id, ncpcProductType || productType)
        }
      >
        <IndexTable.Cell>
          <InlineStack blockAlign="center" gap="300" wrap={false}>
            <BorderCircleText
              onClick={() =>
                handleConfigurationRoute(id, ncpcProductType || productType)
              }
              text={name}
            />
            <span
              className="btn-span"
              onClick={() =>
                handleConfigurationRoute(id, ncpcProductType || productType)
              }
            >
              {truncateText(name)}
            </span>
          </InlineStack>
        </IndexTable.Cell>

        <IndexTable.Cell>
          <span
            className="btn-span"
            onClick={() =>
              handleConfigurationRoute(id, ncpcProductType || productType)
            }
          >
            {truncateText(description)}
          </span>
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          {icon && (
            <img
              style={{ height: "30px" }}
              src={fileUrl(icon)}
              alt={`product thumbnail ${name}`}
            />
          )}
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <Badge tone={materialBadgeTone}>{materialBadgeLabel}</Badge>
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Popover
              active={isActive}
              activator={
                <Button
                  onClick={() => setActivePopoverId(isActive ? null : id)}
                  icon={<Icon source={MenuHorizontalIcon} />}
                />
              }
              onClose={() => setActivePopoverId(null)}
              preferredAlignment="right"
            >
              <ActionList
                items={[
                  {
                    content: "Preview",
                    icon: ViewIcon,
                    onAction: () => handlePreviews(id),
                  },
                  {
                    content: "Edit",
                    icon: EditIcon,
                    onAction: () =>
                      handleUpdate(id, ncpcProductType || productType),
                  },
                  {
                    content: "Duplicate",
                    icon: DuplicateIcon,
                    onAction: () => handeleDuplicate(id, name),
                  },
                  {
                    content: "Delete",
                    icon: DeleteIcon,
                    onAction: () => handeleDelete(id),
                    destructive: true,
                  },
                ]}
              />
            </Popover>
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    );
  });

  return (
    <Page fullWidth>
      <Card>
        <InlineStack gap="100" align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            Configurations list
          </Text>

          {!(
            plan == PRICING_PLANS.STARTER &&
            configurations?.length >= PRICING_PLANS.STARTER_RULES.configurations
          ) && (
            <InlineStack align="end">
              <button
                className="primary-btn"
                type="button"
                onClick={onHandleConfigurationCreate}
              >
                <Box paddingInline="200">
                  <InlineStack gap="200">
                    <PlusIcon />
                    <span className="primary-btn-text">
                      {" "}
                      Add new configuration
                    </span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          )}
        </InlineStack>
      </Card>

      <div style={{ margin: "10px 0px " }}>
        <Card>
          {isClient ? (
            <IndexTable
              resourceName={resourceName}
              itemCount={configurations.length}
              selectable={false}
              headings={[
                { title: "Name configuration" },
                { title: "Desciption" },
                { title: "Icon", alignment: "center" },
                { title: "Material Type", alignment: "center" },
                { title: "Action", alignment: "center" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          ) : (
            <Box padding="300">
              <Text as="p" tone="subdued">
                Loading configurations...
              </Text>
            </Box>
          )}

          {/* --- COMPOSANT PAGINATION --- */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "16px",
              borderTop: "1px solid var(--p-color-border-secondary)",
            }}
          >
            <Pagination
              hasPrevious={hasPreviousPage}
              onPrevious={handlePreviousPage}
              hasNext={hasNextPage}
              onNext={handleNextPage}
            />
          </div>
          {/* ----------------------------- */}
        </Card>
      </div>
    </Page>
  );
}
