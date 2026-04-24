const previewParams = (() => {
  try {
    return JSON.parse(window.name || "{}");
  } catch {
    return {};
  }
})();

const previewHeaders = {
  "Content-Type": "application/json",
  "Aso-Access-Token": `${previewParams?.token || ""}`,
};

const previewStage = document.getElementById("aso-preview-stage");
const previewLoader = document.getElementById("aso-configurator-loader");
const shopifyProxyURL = "/api/";

function previewLogConfiguratorDebug(label, payload) {
  try {
    console.groupCollapsed(`[ASO Preview] ${label}`);
    console.log(payload);
    console.groupEnd();
  } catch {
    console.log(`[ASO Preview] ${label}`, payload);
  }
}

function getPreviewConfiguratorDebugSnapshot(asoData, configuration) {
  const currentConfig = asoData?.currentConfig || {};
  const currentData = currentConfig?.data || {};
  const settings = currentData?.settings || {};
  const themes = settings?.themes || {};
  const requiredOptions = currentData?.requiredOptions || {};
  const additionalOptions = currentData?.additionalOptions || {};

  return {
    mountNodeFound: !!document.getElementById("aso-frontend-app"),
    configurationId: configuration?.id || null,
    configurationName: configuration?.name || configuration?.title || "",
    productType: currentConfig?.productType || null,
    pricingMode: currentConfig?.pricingMode || null,
    skin: asoData?.skin || null,
    themeSkin: themes?.skin || null,
    hasCurrentConfig: !!asoData?.currentConfig,
    hasCurrentConfigData: !!currentData && Object.keys(currentData).length > 0,
    hasSettings: Object.keys(settings).length > 0,
    hasThemes: Object.keys(themes).length > 0,
    hasLanguageImages: !!settings?.languageImages,
    iconCount: Array.isArray(settings?.languageImages?.icons?.listIcons)
      ? settings.languageImages.icons.listIcons.length
      : 0,
    fontCount: Array.isArray(requiredOptions?.fontOptions?.fonts)
      ? requiredOptions.fontOptions.fonts.length
      : 0,
    sizeCount: Array.isArray(requiredOptions?.sizeOptions?.sizes)
      ? requiredOptions.sizeOptions.sizes.length
      : 0,
    colorCount: Array.isArray(requiredOptions?.colorOptions?.colors)
      ? requiredOptions.colorOptions.colors.length
      : 0,
    priceOptionCount: Array.isArray(requiredOptions?.priceOptions)
      ? requiredOptions.priceOptions.length
      : 0,
    materialCount: Array.isArray(additionalOptions?.materialOptions?.materials)
      ? additionalOptions.materialOptions.materials.length
      : 0,
  };
}

function getPreviewApiUrl(path = "") {
  const normalizedPath = String(path || "").replace(/^\/+/, "");
  return `${shopifyProxyURL}${normalizedPath}`;
}

function setLoaderLabel(message) {
  console.info("[ASO Preview] loader:", message);
}

function hideLoader() {
  if (previewLoader) {
    const loaderWrapper = previewLoader.closest(".bg-loader");
    if (loaderWrapper) {
      loaderWrapper.remove();
      return;
    }
    previewLoader.remove();
  }
}

function parseJson(value) {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
  return typeof value === "object" ? value : null;
}

function normalizeText(value, fallback = "") {
  const normalized = String(value || "").trim();
  return normalized || fallback;
}

function normalizeProductType(value) {
  return normalizeText(value).toLowerCase();
}

function normalizeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getPreviewProxyBase() {
  return `${window.location.origin}/`;
}

function normalizePreviewProxyAssetUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return raw;

  const proxyBase = getPreviewProxyBase();
  const normalizePath = (path = "", search = "", hash = "") => {
    const cleanedPath = String(path || "").replace(/^\/+/, "");
    if (!cleanedPath) return raw;

    if (cleanedPath.startsWith("apps/aso-proxy/")) {
      return `${proxyBase}${cleanedPath.replace(/^apps\/aso-proxy\//, "")}${search}${hash}`;
    }

    if (cleanedPath.startsWith("uploads/")) {
      return `${proxyBase}${cleanedPath}${search}${hash}`;
    }

    if (cleanedPath.startsWith("aso_default_files/")) {
      return `${proxyBase}${cleanedPath}${search}${hash}`;
    }

    return raw;
  };

  if (/^https?:\/\//i.test(raw)) {
    try {
      const parsed = new URL(raw);
      return normalizePath(parsed.pathname, parsed.search, parsed.hash);
    } catch {
      return raw;
    }
  }

  return normalizePath(raw);
}

function normalizePreviewProxyAssetTree(input) {
  if (typeof input === "string") {
    return normalizePreviewProxyAssetUrl(input);
  }

  if (Array.isArray(input)) {
    return input.map((entry) => normalizePreviewProxyAssetTree(entry));
  }

  if (input && typeof input === "object") {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, normalizePreviewProxyAssetTree(value)]),
    );
  }

  return input;
}

function detectNcpcConfiguration(configuration) {
  const productType = normalizeProductType(configuration?.productType);
  if (productType === "neon" || productType === "channel") {
    return true;
  }

  const data = parseJson(configuration?.data);
  const dataProductType = normalizeProductType(data?.productType);
  if (dataProductType === "neon" || dataProductType === "channel") {
    return true;
  }

  const wrappedNcpcData = parseJson(data?.ncpc);
  const wrappedProductType = normalizeProductType(wrappedNcpcData?.productType);
  if (wrappedProductType === "neon" || wrappedProductType === "channel") {
    return true;
  }
  return false;
}

function normalizeClassicLikeAssets(data) {
  if (!data || typeof data !== "object") {
    return {};
  }

  data = normalizePreviewProxyAssetTree(data);

  if (data.settings?.themeColors && typeof data.settings.themeColors === "object") {
    data.settings.themeColors.customCss = normalizeText(
      data.settings.themeColors.customCss || data.settings.themeColors.customCSS,
      "",
    );
    delete data.settings.themeColors.customCSS;
  }

  const icons = data.settings?.languageImages?.icons?.listIcons;
  if (Array.isArray(icons)) {
    data.settings.languageImages.icons.listIcons = icons
      .filter((icon) => icon && typeof icon === "object")
      .map((icon) => {
        const fontUrl = normalizeText(
          icon.iconFontUrl || icon.fontFile || icon.fontUrl || icon.fileTtf,
        );
        const fontFamily = normalizeText(
          icon.iconFontFamily || icon.fontFamily || icon.familyName,
        );
        const glyph = normalizeText(icon.iconGlyph || icon.glyph);
        const codepoint = normalizeText(icon.iconCodepoint || icon.codepoint);

        return {
          ...icon,
          ...(fontUrl
            ? {
                iconFontUrl: fontUrl,
                fontFile: fontUrl,
                fontUrl,
                fileTtf: fontUrl,
              }
            : {}),
          ...(fontFamily
            ? {
                iconFontFamily: fontFamily,
                fontFamily,
              }
            : {}),
          ...(glyph
            ? {
                iconGlyph: glyph,
                glyph,
              }
            : {}),
          ...(codepoint
            ? {
                iconCodepoint: codepoint,
                codepoint,
              }
            : {}),
        };
      });
  }

  return data;
}

function resolveNcpcConfigurationData(configuration) {
  const rootData = parseJson(configuration?.data) || {};
  const wrappedNcpcData = parseJson(rootData?.ncpc);
  const resolvedData = wrappedNcpcData && typeof wrappedNcpcData === "object" ? wrappedNcpcData : rootData;
  return normalizeClassicLikeAssets(structuredClone(resolvedData));
}

function resolveNcpcSkin(data) {
  return normalizeText(
    data?.settings?.themes?.skin ||
      data?.settings?.themes?.colors?.skin ||
      data?.settings?.themeColors?.skin,
    "default",
  ).toLowerCase();
}

function buildNcpcPreviewData(configuration) {
  const currentConfigData = resolveNcpcConfigurationData(configuration);
  const skin = resolveNcpcSkin(currentConfigData);

  return {
    skin,
    productID: 0,
    product: {
      id: 0,
      title: normalizeText(configuration?.name || configuration?.title, "Preview product"),
    },
    author: "ASO",
    site_url: encodeURIComponent(window.location.origin),
    caches: {
      timestamp: "0",
      time: "0",
      seconds_until: 0,
    },
    ncpc_product: null,
    currentConfig: {
      id: normalizeNumber(configuration?.id),
      title: normalizeText(configuration?.name || configuration?.title, "Preview configuration"),
      productType:
        normalizeProductType(configuration?.productType) ||
        normalizeProductType(currentConfigData?.productType),
      pricingMode:
        normalizeProductType(configuration?.pricingMode) ||
        normalizeProductType(currentConfigData?.pricingMode),
      data: currentConfigData,
    },
    regularPrice: 0,
    wc_rate: 1,
    thousandSep: " ",
    decimalSep: ".",
    decimals: 2,
    nbDecimals: 2,
    currencySymbol: "",
    currency_pos: "right",
    variations: [],
    wpApiSettings: {
      root: "",
      nonce: "",
      user: 0,
    },
  };
}

async function getConfiguration(configurationId) {
  const response = await fetch(getPreviewApiUrl(`configurations/${configurationId}`), {
    method: "GET",
    headers: previewHeaders,
  });

  if (!response.ok) {
    throw new Error(`Preview configuration fetch failed with status ${response.status}`);
  }

  return response.json();
}

async function previewFetchJson(path, options = {}) {
  const response = await fetch(getPreviewApiUrl(path), {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...previewHeaders,
    },
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Preview request failed with status ${response.status}`,
    );
  }

  return data;
}

function appendStylesheet(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = resolve;
    link.onerror = () => reject(new Error(`Unable to load stylesheet: ${href}`));
    document.head.appendChild(link);
  });
}

function appendScript(src, { module = false } = {}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    if (module) script.type = "module";
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Unable to load script: ${src}`));
    document.body.appendChild(script);
  });
}

function setPreviewRoot(id) {
  if (!previewStage) {
    return null;
  }

  previewStage.innerHTML = "";
  const mountNode = document.createElement("div");
  mountNode.id = id;
  mountNode.className = "aso-preview-app-root";
  previewStage.appendChild(mountNode);
  return mountNode;
}

async function loadClassicPreview() {
  setLoaderLabel("Loading classic configurator...");
  setPreviewRoot("app");
  await appendStylesheet(`/assets-preview/index.css?v=${Date.now()}`);
  await appendScript(`/assets-preview/shopify.js?v=${Date.now()}`);
  await appendScript(`/assets-preview/fabric.min.js?v=${Date.now()}`);
  await appendScript(`/assets-preview/index.js?v=${Date.now()}`, { module: true });
  hideLoader();
}

async function loadNcpcPreview(configuration) {
  setLoaderLabel("Loading neon/channel configurator...");
  const asoData = buildNcpcPreviewData(configuration);
  window.asoData = asoData;
  window.asoNcpcData = asoData;
  window.asoShopifyNcpcApi = {
    mode: "preview",
    getProxyBaseUrl() {
      return getPreviewApiUrl("");
    },
    async addToCart() {
      return {
        success: false,
        message: "Add to cart is disabled in preview mode.",
      };
    },
    async shareConfiguration(configData) {
      return previewFetchJson("aso-config-share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          configId: String(configuration?.id || ""),
          productId: "0",
          configuration: configData,
        }),
      });
    },
    async getSharedConfiguration(shareId) {
      return previewFetchJson(`aso-config-share/${encodeURIComponent(shareId)}`, {
        method: "GET",
      });
    },
    async addRequestQuote(formData) {
      return previewFetchJson("aso-request-quotes", {
        method: "POST",
        body: formData,
      });
    },
  };
  window.asoNcpcBridge = window.asoShopifyNcpcApi;
  setPreviewRoot("aso-frontend-app");
  previewLogConfiguratorDebug("Prepared preview data", {
    snapshot: getPreviewConfiguratorDebugSnapshot(asoData, configuration),
    asoData,
    configuration,
  });
  await appendStylesheet(`/assets-preview/aso-configurator.css?v=${Date.now()}`);
  await appendScript(`/assets-preview/aso-configurator.js?v=${Date.now()}`, { module: true });
  hideLoader();
}

if (!window.__asoPreviewDebugListenersAttached) {
  window.__asoPreviewDebugListenersAttached = true;
  window.addEventListener("error", (event) => {
    console.error("[ASO Preview] window error", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    });
  });
  window.addEventListener("unhandledrejection", (event) => {
    console.error("[ASO Preview] unhandled rejection", event.reason);
  });
}

async function bootstrapPreview() {
  const configId = parseInt(previewParams?.configId || "", 10);
  if (!configId) {
    setLoaderLabel("Configuration not found.");
    return;
  }

  try {
    setLoaderLabel("Loading configuration...");
    const configuration = await getConfiguration(configId);

    if (detectNcpcConfiguration(configuration)) {
      await loadNcpcPreview(configuration);
      return;
    }

    await loadClassicPreview();
  } catch (error) {
    console.error("Unable to bootstrap preview:", error);
    setLoaderLabel("Unable to load preview.");
    if (previewStage) {
      previewStage.innerHTML = `
        <div class="aso-preview-error">
          <h1>Preview indisponible</h1>
          <p>${error instanceof Error ? error.message : "Une erreur inattendue est survenue."}</p>
        </div>
      `;
    }
  }
}

bootstrapPreview();
