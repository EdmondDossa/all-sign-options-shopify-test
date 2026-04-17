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
const previewLoaderLabel = document.getElementById("aso-preview-loader-label");
const previewLoader = document.querySelector(".aso-preview-loader");
const shopifyProxyURL = "/api/";

function getPreviewApiUrl(path = "") {
  const normalizedPath = String(path || "").replace(/^\/+/, "");
  return `${shopifyProxyURL}${normalizedPath}`;
}

function setLoaderLabel(message) {
  if (previewLoaderLabel) {
    previewLoaderLabel.textContent = message;
  }
}

function hideLoader() {
  if (previewLoader) {
    previewLoader.setAttribute("hidden", "hidden");
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
  setLoaderLabel("Chargement du configurateur classique...");
  setPreviewRoot("app");
  await appendStylesheet(`/assets-preview/index.css?v=${Date.now()}`);
  await appendScript(`/assets-preview/shopify.js?v=${Date.now()}`);
  await appendScript(`/assets-preview/fabric.min.js?v=${Date.now()}`);
  await appendScript(`/assets-preview/index.js?v=${Date.now()}`, { module: true });
  hideLoader();
}

async function loadNcpcPreview(configuration) {
  setLoaderLabel("Chargement du configurateur neon/channel...");
  window.ncpcData = buildNcpcPreviewData(configuration);
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
  setPreviewRoot("ncpc-frontend-app");
  await appendStylesheet(`/assets-preview/nc-configurator.css?v=${Date.now()}`);
  await appendScript(`/assets-preview/nc-configurator.js?v=${Date.now()}`, { module: true });
  hideLoader();
}

async function bootstrapPreview() {
  const configId = parseInt(previewParams?.configId || "", 10);
  if (!configId) {
    setLoaderLabel("Configuration introuvable.");
    return;
  }

  try {
    setLoaderLabel("Récupération de la configuration...");
    const configuration = await getConfiguration(configId);

    if (detectNcpcConfiguration(configuration)) {
      await loadNcpcPreview(configuration);
      return;
    }

    await loadClassicPreview();
  } catch (error) {
    console.error("Unable to bootstrap preview:", error);
    setLoaderLabel("Impossible de charger le preview.");
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
