import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useSearchParams, useSubmit, useActionData } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import TemplatePackService from "~/models/TemplatePack.service";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { getImageUrl } from "~/utils/fileUrl";
import { getPlanProxy } from "~/utils/pricing-server.server";
import { flashMessage } from "~/utils/message-flash";
import { Box, Card, Text, BlockStack, InlineStack } from "@shopify/polaris";

const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  basic: "Basic",
  pro: "Pro",
};
const PLAN_FILTER_OPTIONS = ["all", "free", "basic", "pro"] as const;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const merchantPlan = await getPlanProxy(admin, session.shop);
  const packs = await TemplatePackService.getAllPacks(session.id, merchantPlan);

  const url = new URL(request.url);
  const packIdParam = url.searchParams.get("packId");
  let selectedPack = null;
  let packTemplates: any[] = [];
  let allTemplates: Array<{ packId: number; packName: string; planLevel: string; template: any; templateName: string; hasAccess: boolean }> = [];

  if (packIdParam) {
    const packId = parseInt(packIdParam, 10);
    const pack = packs.find((p: any) => p.id === packId);
    if (pack) {
      selectedPack = pack;
      const packData = TemplatePackService.getPackJsonContent(pack.jsonFile);
      packTemplates = TemplatePackService.getTemplatesFromPackJson(packData);
    }
  }
  // Vue "All" : on ne charge pas les JSON ici (chargement différé via API pour garder le premier rendu rapide)

  const parentCategories = Array.from(
    new Set((packs as any[]).map((p) => (p.category || "Other").trim()).filter(Boolean))
  ).sort();

  return json({
    packs,
    parentCategories,
    selectedPack,
    packTemplates,
    allTemplates,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  if (request.method !== "POST") return null;
  const formData = await request.formData();
  const actionType = formData.get("action");
  if (actionType !== "importTemplates") return null;

  const importsRaw = formData.get("imports");
  const imports: Array<{ packId: number; templateNames: string[] }> = importsRaw
    ? (typeof importsRaw === "string" ? JSON.parse(importsRaw) : [])
    : [];
  const singlePackId = formData.get("packId");
  const singleNamesRaw = formData.get("templateNames");
  if (singlePackId && !importsRaw) {
    const templateNames: string[] = singleNamesRaw
      ? (typeof singleNamesRaw === "string" ? JSON.parse(singleNamesRaw) : [])
      : [];
    imports.push({ packId: Number(singlePackId), templateNames });
  }

  if (imports.length === 0) {
    return json({ success: false, error: "Aucun template à importer" }, { status: 400 });
  }

  let totalImported = 0;
  let lastError = "";
  for (const { packId, templateNames } of imports) {
    if (!packId) continue;
    const result = await TemplatePackService.importPackToShop(
      session.id,
      packId,
      session.shop,
      admin,
      templateNames.length > 0 ? templateNames : undefined
    );
    if (result.success) {
      totalImported += result.templatesCount || 0;
    } else {
      lastError = result.message || "";
    }
  }

  if (totalImported > 0) {
    throw redirect(`/app/templates/main${flashMessage(`${totalImported} template(s) ajouté(s) à la liste.`)}`);
  }
  return json({ success: false, error: lastError || "Erreur lors de l'import" }, { status: 400 });
};

type AllTemplateItem = { packId: number; packName: string; planLevel: string; template: any; templateName: string; hasAccess: boolean };

export default function TemplatePacksGallery() {
  const { packs, parentCategories, selectedPack, packTemplates, allTemplates } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [planFilter, setPlanFilter] = useState<"all" | "free" | "basic" | "pro">(
    (searchParams.get("plan") as "all" | "free" | "basic" | "pro") || "all"
  );
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<Set<number>>(new Set());
  const [selectedAllIds, setSelectedAllIds] = useState<Set<number>>(new Set());
  const [allTemplatesFromApi, setAllTemplatesFromApi] = useState<AllTemplateItem[] | null>(null);

  const currentPackId = searchParams.get("packId") ? parseInt(searchParams.get("packId")!, 10) : null;

  useEffect(() => {
    if (currentPackId != null || packs.length === 0) return;
    if (allTemplatesFromApi !== null) return;
    let cancelled = false;
    fetch("/app/templates/packs/api/all-templates")
      .then((res) => res.json())
      .then((data: { allTemplates?: AllTemplateItem[] }) => {
        if (!cancelled && Array.isArray(data.allTemplates)) {
          setAllTemplatesFromApi(data.allTemplates);
        }
      })
      .catch(() => {
        if (!cancelled) setAllTemplatesFromApi([]);
      });
    return () => {
      cancelled = true;
    };
  }, [currentPackId, packs.length, allTemplatesFromApi]);

  const handlePackClick = (packId: number) => {
    setSearchParams({ packId: String(packId) });
    setSelectedTemplateIds(new Set());
  };

  const handleAllClick = () => {
    setSearchParams({});
    setSelectedAllIds(new Set());
  };

  const filteredPacks =
    planFilter === "all"
      ? packs
      : (packs as any[]).filter((p) => (p.planLevel || p.plans?.trim() || "free") === planFilter);

  const effectiveAllTemplates = allTemplatesFromApi !== null ? allTemplatesFromApi : (allTemplates || []);
  const filteredAllTemplates =
    planFilter === "all"
      ? effectiveAllTemplates
      : effectiveAllTemplates.filter((t: any) => t.planLevel === planFilter);

  const getPacksByCategory = (category: string) =>
    (packs as any[]).filter((p) => (p.category || "Other").trim() === category);

  const toggleTemplateSelection = (index: number) => {
    setSelectedTemplateIds((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleAllTemplateSelection = (index: number) => {
    setSelectedAllIds((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const selectAllTemplates = () => {
    if (selectedPack) {
      if (selectedTemplateIds.size === packTemplates.length) {
        setSelectedTemplateIds(new Set());
      } else {
        setSelectedTemplateIds(new Set(packTemplates.map((_: any, i: number) => i)));
      }
    } else {
      if (selectedAllIds.size === filteredAllTemplates.length) {
        setSelectedAllIds(new Set());
      } else {
        setSelectedAllIds(new Set(filteredAllTemplates.map((_: any, i: number) => i)));
      }
    }
  };

  const handleGetTemplate = (packId: number, templateNames: string[]) => {
    const formData = new FormData();
    formData.set("action", "importTemplates");
    formData.set("packId", String(packId));
    formData.set("templateNames", JSON.stringify(templateNames));
    submit(formData, { method: "POST" });
  };

  const handleGetTemplateBatch = () => {
    if (selectedPack) {
      if (!selectedPack.hasAccess) return; // pas d'accès au pack
      const names =
        selectedTemplateIds.size > 0 && selectedTemplateIds.size < packTemplates.length
          ? Array.from(selectedTemplateIds).map((i) => (packTemplates[i]?.name || "").trim()).filter(Boolean)
          : [];
      handleGetTemplate(selectedPack.id, names);
      return;
    }
    if (selectedAllIds.size === 0) return;
    const byPack = new Map<number, string[]>();
    selectedAllIds.forEach((idx) => {
      const item = filteredAllTemplates[idx] as { packId: number; templateName: string; hasAccess: boolean } | undefined;
      if (!item || !item.hasAccess) return; // n'importer que les templates accessibles
      if (!byPack.has(item.packId)) byPack.set(item.packId, []);
      byPack.get(item.packId)!.push(item.templateName);
    });
    const importsArray = Array.from(byPack.entries()).map(([packId, templateNames]) => ({ packId, templateNames }));
    if (importsArray.length === 0) return; // aucune sélection avec accès
    const formData = new FormData();
    formData.set("action", "importTemplates");
    formData.set("imports", JSON.stringify(importsArray));
    submit(formData, { method: "POST" });
  };

  const hasAnyAccessibleInAllSelection = Array.from(selectedAllIds).some(
    (idx) => (filteredAllTemplates[idx] as { hasAccess?: boolean } | undefined)?.hasAccess
  );

  return (
    <div style={{ width: "100%", height: "auto", padding: "16px 0px", display: "flex", gap: "24px" }}>
      {/* Sidebar */}
      <Card>
        <Box padding="400">
          <BlockStack gap="300">
            <Text as="h2" variant="headingSm" fontWeight="semibold">
              Categories
            </Text>
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <button
                type="button"
                onClick={handleAllClick}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "none",
                  background: !currentPackId ? "#EFF6FF" : "transparent",
                  color: !currentPackId ? "#1E40AF" : "#374151",
                  fontWeight: !currentPackId ? "600" : "400",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                All
              </button>
              {parentCategories.map((category) => {
                const categoryPacks = getPacksByCategory(category);
                const isExpanded = expandedCategory === category;
                return (
                  <div key={category} style={{ marginTop: "4px" }}>
                    <button
                      type="button"
                      onClick={() => setExpandedCategory(isExpanded ? null : category)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "none",
                        background: "transparent",
                        color: "#374151",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ textTransform: "capitalize" }}>{category}</span>
                      <span style={{ fontSize: "12px", color: "#6B7280" }}>▼</span>
                    </button>
                    {isExpanded && (
                      <div style={{ paddingLeft: "12px", marginTop: "4px", borderLeft: "2px solid #E5E7EB" }}>
                        {categoryPacks.map((pack: any) => {
                          const planLevel = pack.planLevel || pack.plans?.trim() || "free";
                          const isSelected = currentPackId === pack.id;
                          return (
                            <button
                              key={pack.id}
                              type="button"
                              onClick={() => handlePackClick(pack.id)}
                              style={{
                                width: "100%",
                                textAlign: "left",
                                padding: "6px 8px",
                                borderRadius: "6px",
                                border: "none",
                                background: isSelected ? "#EFF6FF" : "transparent",
                                color: isSelected ? "#1E40AF" : "#374151",
                                cursor: "pointer",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "8px",
                                minHeight: "44px",
                              }}
                            >
                              <img
                                src={getImageUrl(pack.previewImg)}
                                alt=""
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  borderRadius: "4px",
                                  objectFit: "cover",
                                  flexShrink: 0,
                                }}
                              />
                              <span
                                style={{
                                  fontWeight: isSelected ? "600" : "400",
                                  flex: 1,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {pack.name}
                              </span>
                              <span
                                style={{
                                  fontSize: "10px",
                                  padding: "2px 4px",
                                  borderRadius: "4px",
                                  backgroundColor: planLevel === "pro" ? "#F3E8FF" : planLevel === "basic" ? "#DBEAFE" : "#D1FAE5",
                                  color: planLevel === "pro" ? "#6B21A8" : planLevel === "basic" ? "#1E40AF" : "#065F46",
                                  fontWeight: "500",
                                  flexShrink: 0,
                                }}
                              >
                                {PLAN_LABELS[planLevel] || planLevel}
                              </span>
                              <span style={{ fontSize: "11px", color: "#6B7280", flexShrink: 0 }}>
                                {pack.templateCount ?? 0}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </BlockStack>
        </Box>
      </Card>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>Template Library</h2>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {!selectedPack && (
                <div style={{ display: "flex", gap: "4px" }}>
                  {PLAN_FILTER_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setPlanFilter(t);
                        setSearchParams((prev) => {
                          const next = new URLSearchParams(prev);
                          if (t === "all") next.delete("plan");
                          else next.set("plan", t);
                          return next;
                        });
                      }}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        background: planFilter === t ? "#EFF6FF" : "#fff",
                        color: planFilter === t ? "#1E40AF" : "#374151",
                        fontWeight: planFilter === t ? "600" : "500",
                        cursor: "pointer",
                        fontSize: "13px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {t === "all" ? "All" : PLAN_LABELS[t]}
                    </button>
                  ))}
                </div>
              )}
              <button
                className="primary-btn"
                type="button"
                onClick={() => navigate("/app/templates/main")}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(1, 100, 100, 0.9)",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <span className="primary-btn-text">Back to Templates</span>
              </button>
            </div>
          </div>
        </div>

        <SpacingBackground width="100%" height="auto" margin="16px 0px">
          {packs.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                backgroundColor: "#F8F9FB",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
                No template packs available
              </h3>
              <p style={{ marginBottom: "20px", color: "#6B7280" }}>
                There are no template packs available at the moment.
              </p>
              <button
                className="primary-btn"
                type="button"
                onClick={() => navigate("/app/templates/main")}
              >
                <span className="primary-btn-text">Back to Templates</span>
              </button>
            </div>
          ) : selectedPack ? (
            /* View: templates of selected pack */
            <BoxBackground>
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                    {selectedPack.name} – {packTemplates.length} template{packTemplates.length !== 1 ? "s" : ""}
                  </h3>
                  {packTemplates.length > 0 && (
                    <>
                      <button
                        type="button"
                        className="back-large-btn"
                        onClick={selectAllTemplates}
                        style={{ padding: "8px 14px", fontSize: "13px" }}
                      >
                        {selectedTemplateIds.size === packTemplates.length ? "Désélectionner tout" : "Tout sélectionner"}
                      </button>
                      <button
                        type="button"
                        className={selectedPack.hasAccess ? "primary-btn" : "back-large-btn"}
                        disabled={!selectedPack.hasAccess}
                        onClick={handleGetTemplateBatch}
                        style={{ padding: "8px 16px", opacity: selectedPack.hasAccess ? 1 : 0.8, cursor: selectedPack.hasAccess ? "pointer" : "not-allowed" }}
                      >
                        <span className={selectedPack.hasAccess ? "primary-btn-text" : ""} style={!selectedPack.hasAccess ? { color: "#6B7280" } : undefined}>
                          {selectedPack.hasAccess
                            ? (selectedTemplateIds.size > 0
                              ? `Get template${selectedTemplateIds.size > 1 ? "s" : ""} (${selectedTemplateIds.size})`
                              : "Get template / Insert")
                            : "Passez à un plan supérieur"}
                        </span>
                      </button>
                    </>
                  )}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {packTemplates.map((template: any, index: number) => {
                    const isSelected = selectedTemplateIds.has(index);
                    return (
                      <div
                        key={index}
                        style={{
                          border: isSelected ? "2px solid rgb(1, 100, 100)" : "1px solid #E5E7EB",
                          borderRadius: "12px",
                          overflow: "hidden",
                          backgroundColor: isSelected ? "#F0FDFA" : "#fff",
                          transition: "all 0.15s ease",
                          boxShadow: isSelected ? "0 2px 8px rgba(1, 100, 100, 0.15)" : "0 1px 3px rgba(0,0,0,0.06)",
                        }}
                      >
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleTemplateSelection(index)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleTemplateSelection(index);
                            }
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={getImageUrl(template.prevImg || template.realImg)}
                            alt={template.name || `Template ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "140px",
                              objectFit: "cover",
                            }}
                          />
                          <div style={{ padding: "12px" }}>
                            <p style={{ margin: 0, fontSize: "14px", fontWeight: "500" }}>
                              {template.name || `Template ${index + 1}`}
                            </p>
                          </div>
                        </div>
                        <div style={{ padding: "8px 12px", borderTop: "1px solid #E5E7EB" }}>
                          <button
                            type="button"
                            className={selectedPack.hasAccess ? "primary-btn" : "back-large-btn"}
                            disabled={!selectedPack.hasAccess}
                            style={{ width: "100%", padding: "6px 12px", fontSize: "12px", opacity: selectedPack.hasAccess ? 1 : 0.8, cursor: selectedPack.hasAccess ? "pointer" : "not-allowed" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!selectedPack.hasAccess) return;
                              const name = (template.name || "").trim() || "Template";
                              handleGetTemplate(selectedPack.id, [name]);
                            }}
                          >
                            <span className={selectedPack.hasAccess ? "primary-btn-text" : ""} style={!selectedPack.hasAccess ? { color: "#6B7280" } : undefined}>
                              {selectedPack.hasAccess ? "Get template / Insert" : "Passez à un plan supérieur"}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </BoxBackground>
          ) : (
            /* View: All templates (no pack cards), with plan filter */
            <Card>
              <Box padding="500">
                {allTemplatesFromApi === null && packs.length > 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 24px", color: "#6B7280" }}>
                    <p style={{ margin: 0, fontSize: "15px" }}>Chargement des templates…</p>
                  </div>
                ) : (
                <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                    Tous les templates – {filteredAllTemplates.length} template{filteredAllTemplates.length !== 1 ? "s" : ""}
                  </h3>
                  {filteredAllTemplates.length > 0 && (
                    <>
                      <button
                        type="button"
                        className="back-large-btn"
                        onClick={selectAllTemplates}
                        style={{ padding: "8px 14px", fontSize: "13px" }}
                      >
                        {selectedAllIds.size === filteredAllTemplates.length ? "Désélectionner tout" : "Tout sélectionner"}
                      </button>
                      <button
                        type="button"
                        className="primary-btn"
                        disabled={selectedAllIds.size === 0 || !hasAnyAccessibleInAllSelection}
                        onClick={handleGetTemplateBatch}
                        style={{ padding: "8px 16px", opacity: selectedAllIds.size === 0 || !hasAnyAccessibleInAllSelection ? 0.7 : 1, cursor: selectedAllIds.size === 0 || !hasAnyAccessibleInAllSelection ? "not-allowed" : "pointer" }}
                      >
                        <span className="primary-btn-text">
                          {selectedAllIds.size > 0 && hasAnyAccessibleInAllSelection
                            ? `Get template${selectedAllIds.size > 1 ? "s" : ""} (${Array.from(selectedAllIds).filter((idx) => (filteredAllTemplates[idx] as { hasAccess?: boolean } | undefined)?.hasAccess).length})`
                            : "Get template / Insert"}
                        </span>
                      </button>
                    </>
                  )}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {filteredAllTemplates.map((item: any, index: number) => {
                    const isSelected = selectedAllIds.has(index);
                    const template = item.template;
                    return (
                      <div
                        key={`${item.packId}-${item.templateName}-${index}`}
                        style={{
                          border: isSelected ? "2px solid rgb(1, 100, 100)" : "1px solid #E5E7EB",
                          borderRadius: "12px",
                          overflow: "hidden",
                          backgroundColor: isSelected ? "#F0FDFA" : "#fff",
                          transition: "all 0.15s ease",
                          boxShadow: isSelected ? "0 2px 8px rgba(1, 100, 100, 0.15)" : "0 1px 3px rgba(0,0,0,0.06)",
                        }}
                      >
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleAllTemplateSelection(index)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleAllTemplateSelection(index);
                            }
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={getImageUrl(template.prevImg || template.realImg)}
                            alt={item.templateName}
                            style={{
                              width: "100%",
                              height: "140px",
                              objectFit: "cover",
                            }}
                          />
                          <div style={{ padding: "12px" }}>
                            <p style={{ margin: 0, fontSize: "14px", fontWeight: "500" }}>{item.templateName}</p>
                            <span
                              style={{
                                fontSize: "11px",
                                color: "#6B7280",
                                marginTop: "4px",
                                display: "inline-block",
                              }}
                            >
                              {item.packName} · {PLAN_LABELS[item.planLevel] || item.planLevel}
                            </span>
                          </div>
                        </div>
                        <div style={{ padding: "8px 12px", borderTop: "1px solid #E5E7EB" }}>
                          <button
                            type="button"
                            className={item.hasAccess ? "primary-btn" : "back-large-btn"}
                            disabled={!item.hasAccess}
                            style={{ width: "100%", padding: "6px 12px", fontSize: "12px", opacity: item.hasAccess ? 1 : 0.8, cursor: item.hasAccess ? "pointer" : "not-allowed" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!item.hasAccess) return;
                              handleGetTemplate(item.packId, [item.templateName]);
                            }}
                          >
                            <span className={item.hasAccess ? "primary-btn-text" : ""} style={!item.hasAccess ? { color: "#6B7280" } : undefined}>
                              {item.hasAccess ? "Get template / Insert" : "Passez à un plan supérieur"}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </>
                )}
              </Box>
            </Card>
          )}
        </SpacingBackground>
      </div>
    </div>
  );
}
