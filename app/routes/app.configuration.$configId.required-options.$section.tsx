import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import SectionScreen from "./app.configuration.$configId.builder.$section";
import { ClassicRequiredColorsScreen } from "~/features/classic-required-colors";
import { ClassicRequiredFontsScreen } from "~/features/classic-required-fonts";
import { ClassicRequiredComponentsScreen } from "~/features/classic-required-components";
import { ClassicRequiredStructuralScreen } from "~/features/classic-required-structural";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import FontService from "~/models/Font.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import SettingShapesService from "~/models/SettingShapes.service";
import SettingBorderService from "~/models/SettingBorder.service";
import { loadGoogleFontsCatalog } from "~/utils/google-fonts.server";
import {
  getColorsState,
  getMaterialOptions,
  parseConfigData,
  parseIndex,
  parseJsonValue,
  createColorId,
  ensureOneDefault,
  normalizeLegacyColor,
  syncColorsIntoData,
  validateColor,
} from "~/features/classic-required-colors.shared";
import {
  getFontsState,
  parseJsonValue as parseFontsJsonValue,
  syncFontsIntoData,
} from "~/features/classic-required-fonts.shared";
import {
  ensureOneDefault as ensureOneDefaultStructural,
  getBordersState,
  getFixingMethodsState,
  getShapesState,
  getSizeOptions,
  normalizeBorder,
  normalizeFixingMethod,
  normalizeShape,
  syncStructuralIntoData,
} from "~/features/classic-required-structural.shared";
import {
  ensureOneDefault as ensureOneDefaultComponents,
  emptyComponent,
  getComponentsState,
  syncComponentsIntoData,
} from "~/features/classic-required-components.shared";
import { jFlashMessage } from "~/utils/message-flash";

const allowedSections = ["sizes", "pricing", "fonts", "colors", "components", "fixing-methods", "shapes", "borders"];

const parseConfigDataSafe = (rawData: any) => {
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

const hasAdvancedMaterials = (configuration: any) => {
  const data = parseConfigDataSafe(configuration?.data) || {};
  const metaType = String(data?.simplifiedBuilder?.meta?.materialType || "")
    .trim()
    .toLowerCase();
  if (metaType === "advance" || metaType === "advanced") {
    return true;
  }

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  return legacyMaterials.some(
    (material: any) =>
      String(material?.type || "")
        .trim()
        .toLowerCase() === "advance",
  );
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const section = String(params.section || "").trim();
  const configId = parseInt(params.configId ?? "", 10);
  const search = new URL(request.url).search;

  if (section === "components") {
    const { session } = await authenticate.admin(request);
    const configuration = Number.isFinite(configId)
      ? await ConfigurationService.getConfiguration(configId, session.id)
      : null;

    if (!configuration || !hasAdvancedMaterials(configuration)) {
      throw redirect(`/app/configuration/${String(params.configId || "").trim()}/required-options/sizes${search}`);
    }
  }

  if (section === "fonts") {
    const { session } = await authenticate.admin(request);
    const [managedFonts, googleFonts] = await Promise.all([
      FontService.getFonts(session.id),
      loadGoogleFontsCatalog(),
    ]);
    return json({ managedFonts, googleFonts });
  }

  if (
    section === "components" ||
    section === "fixing-methods" ||
    section === "shapes" ||
    section === "borders"
  ) {
    const { session } = await authenticate.admin(request);
    const [managedFixingMethods, managedShapes, managedBorders] = await Promise.all([
      SettingFixingMethodService.get(session.id),
      SettingShapesService.get(session.id),
      SettingBorderService.get(session.id),
    ]);

    return json({
      managedFixingMethods: Array.isArray(managedFixingMethods) ? managedFixingMethods : [],
      managedShapes: Array.isArray(managedShapes) ? managedShapes : [],
      managedBorders: Array.isArray(managedBorders) ? managedBorders : [],
    });
  }

  if (allowedSections.includes(section)) {
    return json(null);
  }

  throw redirect(`/app/configuration/${String(params.configId || "").trim()}/required-options/sizes${search}`);
};

export const action = async (args: ActionFunctionArgs) => {
  const section = String(args.params.section || "").trim();
  if (section === "fonts") {
    const { session } = await authenticate.admin(args.request);
    const configId = parseInt(args.params.configId || "", 10);
    const formData = await args.request.formData();
    const operation = String(formData.get("operation") || "");

    if (Number.isNaN(configId)) {
      return json(jFlashMessage("Invalid configuration", "error"), { status: 400 });
    }

    const configuration = await ConfigurationService.getConfiguration(configId, session.id);
    if (!configuration) {
      return json(jFlashMessage("Configuration not found", "error"), { status: 404 });
    }

    const managedFonts = (await FontService.getFonts(session.id)) || [];
    const data = parseConfigData(configuration.data) || {};
    const currentState = getFontsState(data, managedFonts);

    if (operation === "save-fonts") {
      const nextState = parseFontsJsonValue(formData.get("state"));

      if (!nextState || typeof nextState !== "object") {
        return json(jFlashMessage("Invalid fonts payload", "error"), { status: 400 });
      }

      const mergedState = {
        ...currentState,
        label: String(nextState?.label || currentState.label || "Fonts"),
        description: String(nextState?.description || ""),
        items: Array.isArray(nextState?.items) ? nextState.items : currentState.items,
      };

      const nextData = syncFontsIntoData(data, mergedState);
      await ConfigurationService.updateConfiguration(
        {
          ...(configuration as any),
          products: Array.isArray((configuration as any)?.product)
            ? (configuration as any).product
            : Array.isArray((configuration as any)?.products)
              ? (configuration as any).products
              : [],
          data: nextData,
        },
        session.id,
      );

      return json(jFlashMessage("Fonts updated successfully"));
    }

    if (operation === "add-existing-fonts") {
      const fontIds = parseFontsJsonValue(formData.get("fontIds"));
      const ids = Array.isArray(fontIds)
        ? fontIds
            .map((value: any) => Number(value))
            .filter((value: number) => Number.isFinite(value) && value > 0)
        : [];

      if (ids.length === 0) {
        return json(jFlashMessage("Select at least one font", "error"), { status: 400 });
      }

      const existingIds = new Set(currentState.items.map((item: any) => Number(item.managedFontId)));
      const nextItems = [...currentState.items];

      ids.forEach((fontId) => {
        if (existingIds.has(fontId)) return;
        const managedFont = managedFonts.find((font: any) => Number(font?.id) === fontId);
        if (!managedFont) return;
        nextItems.push({
          id: `font-${managedFont.id}`,
          managedFontId: Number(managedFont.id),
          label: String(managedFont.label || ""),
          isDefault: nextItems.length === 0,
        });
      });

      const nextData = syncFontsIntoData(data, {
        ...currentState,
        items: nextItems,
      });

      await ConfigurationService.updateConfiguration(
        {
          ...(configuration as any),
          products: Array.isArray((configuration as any)?.product)
            ? (configuration as any).product
            : Array.isArray((configuration as any)?.products)
              ? (configuration as any).products
              : [],
          data: nextData,
        },
        session.id,
      );

      return json(jFlashMessage("Fonts added successfully"));
    }

    if (operation === "create-font-and-add") {
      const payload = parseFontsJsonValue(formData.get("font"));
      const label = String(payload?.label || "").trim();
      const url = String(payload?.url || "").trim();
      const isGoogleFont = Boolean(payload?.isGoogleFont);

      if (!label || !url) {
        return json(jFlashMessage("Label and font file are required", "error"), {
          status: 400,
        });
      }

      let managedFont = managedFonts.find(
        (font: any) =>
          String(font?.label || "").trim().toLowerCase() === label.toLowerCase() &&
          String(font?.url || "").trim() === url,
      );

      if (!managedFont) {
        managedFont = await FontService.addFont(
          {
            label,
            url,
            isGoogleFont,
          } as any,
          session.id,
        );
      }

      if (!managedFont) {
        return json(jFlashMessage("Unable to create font", "error"), { status: 400 });
      }

      const alreadyExists = currentState.items.some(
        (item: any) => Number(item.managedFontId) === Number(managedFont?.id),
      );

      const nextItems = alreadyExists
        ? currentState.items
        : [
            ...currentState.items,
            {
              id: `font-${managedFont.id}`,
              managedFontId: Number(managedFont.id),
              label: String(managedFont.label || ""),
              isDefault: currentState.items.length === 0,
            },
          ];

      const nextData = syncFontsIntoData(data, {
        ...currentState,
        items: nextItems,
      });

      await ConfigurationService.updateConfiguration(
        {
          ...(configuration as any),
          products: Array.isArray((configuration as any)?.product)
            ? (configuration as any).product
            : Array.isArray((configuration as any)?.products)
              ? (configuration as any).products
              : [],
          data: nextData,
        },
        session.id,
      );

      return json(jFlashMessage("Font created and added successfully"));
    }

    return json(jFlashMessage("Unsupported operation", "error"), { status: 400 });
  }

  if (section === "colors") {
    const { session } = await authenticate.admin(args.request);
    const configId = parseInt(args.params.configId || "", 10);
    const formData = await args.request.formData();
    const operation = String(formData.get("operation") || "");
    const index = parseIndex(formData.get("index"));

    if (Number.isNaN(configId)) {
      return json(jFlashMessage("Invalid configuration", "error"), { status: 400 });
    }

    const configuration = await ConfigurationService.getConfiguration(configId, session.id);
    if (!configuration) {
      return json(jFlashMessage("Configuration not found", "error"), { status: 404 });
    }

    const data = parseConfigData(configuration.data) || {};
    const materialOptions = getMaterialOptions(data);
    const currentState = getColorsState(data);

    if (operation === "add-color" || operation === "update-color") {
      const nextItem = parseJsonValue(formData.get("color"));
      if (!nextItem || typeof nextItem !== "object") {
        return json(jFlashMessage("Invalid color payload", "error"), { status: 400 });
      }

      const normalizedItem = normalizeLegacyColor(nextItem);
      const validationError = validateColor(
        normalizedItem,
        currentState.items,
        operation === "update-color" ? index : -1,
      );

      if (validationError) {
        return json(jFlashMessage(validationError, "error"), { status: 400 });
      }

      if (operation === "add-color") {
        currentState.items.push({
          ...normalizedItem,
          id:
            normalizedItem.id ||
            createColorId(normalizedItem.name, normalizedItem.textColor.codeHex),
        });
        currentState.items = ensureOneDefault(
          currentState.items,
          normalizedItem.isDefault ? currentState.items.length - 1 : undefined,
        );
      } else if (index >= 0 && currentState.items[index]) {
        currentState.items[index] = {
          ...currentState.items[index],
          ...normalizedItem,
        };
        currentState.items = ensureOneDefault(
          currentState.items,
          normalizedItem.isDefault ? index : undefined,
        );
      } else {
        return json(jFlashMessage("Invalid color index", "error"), { status: 400 });
      }
    } else if (operation === "delete-color") {
      if (index < 0 || !currentState.items[index]) {
        return json(jFlashMessage("Invalid color index", "error"), { status: 400 });
      }

      currentState.items = ensureOneDefault(
        currentState.items.filter((_item, currentIndex) => currentIndex !== index),
      );
    } else if (operation === "set-default-color") {
      if (index < 0 || !currentState.items[index]) {
        return json(jFlashMessage("Invalid color index", "error"), { status: 400 });
      }

      currentState.items = ensureOneDefault(currentState.items, index);
    } else if (operation === "save-settings") {
      const settings = parseJsonValue(formData.get("settings"));
      currentState.customColors = {
        active: Boolean(settings?.active),
        label: String(settings?.label || "Custom Colors"),
        prevImg: String(settings?.prevImg || ""),
      };
    } else {
      return json(jFlashMessage("Unsupported operation", "error"), { status: 400 });
    }

    const nextData = syncColorsIntoData(data, currentState, materialOptions);
    await ConfigurationService.updateConfiguration(
      {
        ...(configuration as any),
        products: Array.isArray((configuration as any)?.product)
          ? (configuration as any).product
          : Array.isArray((configuration as any)?.products)
            ? (configuration as any).products
            : [],
        data: nextData,
      },
      session.id,
    );

    return json(jFlashMessage("Colors updated successfully"));
  }

  if (section === "components") {
    const { session } = await authenticate.admin(args.request);
    const configId = parseInt(args.params.configId || "", 10);
    const formData = await args.request.formData();
    const operation = String(formData.get("operation") || "");
    const index = parseIndex(formData.get("index"));

    if (Number.isNaN(configId)) {
      return json(jFlashMessage("Invalid configuration", "error"), { status: 400 });
    }

    const configuration = await ConfigurationService.getConfiguration(configId, session.id);
    if (!configuration) {
      return json(jFlashMessage("Configuration not found", "error"), { status: 404 });
    }

    const [managedFixingMethods, managedShapes] = await Promise.all([
      SettingFixingMethodService.get(session.id),
      SettingShapesService.get(session.id),
    ]);

    const data = parseConfigData(configuration.data) || {};
    const currentState = getComponentsState({
      data,
      managedFixingMethods: Array.isArray(managedFixingMethods) ? managedFixingMethods : [],
      managedShapes: Array.isArray(managedShapes) ? managedShapes : [],
    });

    if (operation === "save-components") {
      const payload = parseJsonValue(formData.get("items"));
      if (!Array.isArray(payload)) {
        return json(jFlashMessage("Invalid components payload", "error"), { status: 400 });
      }

      currentState.items = ensureOneDefaultComponents(payload);
    } else if (operation === "add-components" || operation === "update-components") {
      const payload = parseJsonValue(formData.get("item"));
      if (!payload || typeof payload !== "object") {
        return json(jFlashMessage("Invalid component payload", "error"), { status: 400 });
      }

      const normalized = {
        ...emptyComponent(),
        ...payload,
        label: String((payload as any)?.label || "").trim(),
        description: String((payload as any)?.description || ""),
        icon: String((payload as any)?.icon || ""),
        options: Array.isArray((payload as any)?.options) ? (payload as any).options : [],
      };

      if (!normalized.label) {
        return json(jFlashMessage("Component label is required", "error"), { status: 400 });
      }

      const hasDuplicateLabel = currentState.items.some((item, itemIndex) => {
        if (operation === "update-components" && itemIndex === index) return false;
        return String(item.label || "").trim().toLowerCase() === normalized.label.toLowerCase();
      });
      if (hasDuplicateLabel) {
        return json(jFlashMessage("Component labels must be unique", "error"), { status: 400 });
      }

      if (operation === "add-components") {
        currentState.items.push({
          ...normalized,
          id: String((payload as any)?.id || ""),
          isDefault: currentState.items.length === 0,
        });
      } else if (index >= 0 && currentState.items[index]) {
        currentState.items[index] = {
          ...currentState.items[index],
          ...normalized,
        };
      } else {
        return json(jFlashMessage("Invalid component index", "error"), { status: 400 });
      }
    } else if (operation === "delete-components") {
      if (index < 0 || !currentState.items[index]) {
        return json(jFlashMessage("Invalid component index", "error"), { status: 400 });
      }
      currentState.items = ensureOneDefaultComponents(
        currentState.items.filter((_item, currentIndex) => currentIndex !== index),
      );
    } else if (operation === "set-default-components") {
      if (index < 0 || !currentState.items[index]) {
        return json(jFlashMessage("Invalid component selection", "error"), { status: 400 });
      }
      currentState.items = ensureOneDefaultComponents(currentState.items, index);
    } else {
      return json(jFlashMessage("Unsupported operation", "error"), { status: 400 });
    }

    const nextData = syncComponentsIntoData(data, currentState);
    await ConfigurationService.updateConfiguration(
      {
        ...(configuration as any),
        products: Array.isArray((configuration as any)?.product)
          ? (configuration as any).product
          : Array.isArray((configuration as any)?.products)
            ? (configuration as any).products
            : [],
        data: nextData,
      },
      session.id,
    );

    return json(jFlashMessage("Components updated successfully"));
  }

  if (section === "fixing-methods" || section === "shapes" || section === "borders") {
    const { session } = await authenticate.admin(args.request);
    const configId = parseInt(args.params.configId || "", 10);
    const formData = await args.request.formData();
    const operation = String(formData.get("operation") || "");
    const index = parseInt(String(formData.get("index") || ""), 10);

    if (Number.isNaN(configId)) {
      return json(jFlashMessage("Invalid configuration", "error"), { status: 400 });
    }

    const configuration = await ConfigurationService.getConfiguration(configId, session.id);
    if (!configuration) {
      return json(jFlashMessage("Configuration not found", "error"), { status: 404 });
    }

    const [managedFixingMethods, managedShapes, managedBorders] = await Promise.all([
      SettingFixingMethodService.get(session.id),
      SettingShapesService.get(session.id),
      SettingBorderService.get(session.id),
    ]);

    const data = parseConfigData(configuration.data) || {};
    const sizeOptions = getSizeOptions(data);
    const shapeItems = getShapesState(data, Array.isArray(managedShapes) ? managedShapes : []);

    if (section === "fixing-methods") {
      const currentItems = getFixingMethodsState(
        data,
        Array.isArray(managedFixingMethods) ? managedFixingMethods : [],
        sizeOptions,
        shapeItems,
      );

      if (operation === "save-fixing-methods") {
        const payload = parseJsonValue(formData.get("items"));
        if (!Array.isArray(payload)) {
          return json(jFlashMessage("Invalid fixing methods payload", "error"), { status: 400 });
        }
        const nextData = syncStructuralIntoData(
          data,
          "fixing-methods",
          ensureOneDefaultStructural(payload),
        );
        await ConfigurationService.updateConfiguration(
          {
            ...(configuration as any),
            products: Array.isArray((configuration as any)?.product)
              ? (configuration as any).product
              : Array.isArray((configuration as any)?.products)
                ? (configuration as any).products
                : [],
            data: nextData,
          },
          session.id,
        );
        return json(jFlashMessage("Fixing methods order updated successfully"));
      }

      if (operation === "add-fixing-methods" || operation === "update-fixing-methods") {
        const payload = parseJsonValue(formData.get("item"));
        if (!payload || typeof payload !== "object") {
          return json(jFlashMessage("Invalid fixing method payload", "error"), { status: 400 });
        }
        const normalized = normalizeFixingMethod(
          payload,
          Array.isArray(managedFixingMethods) ? managedFixingMethods.map((item: any, idx: number) => ({ value: idx, label: String(item?.name || "") })) : [],
          sizeOptions,
          shapeItems,
        );
        const nextItems = [...currentItems];
        if (operation === "add-fixing-methods") {
          nextItems.push(normalized);
        } else if (index >= 0 && nextItems[index]) {
          nextItems[index] = { ...nextItems[index], ...normalized };
        }
        const nextData = syncStructuralIntoData(
          data,
          "fixing-methods",
          ensureOneDefaultStructural(nextItems, normalized.isDefault ? (operation === "add-fixing-methods" ? nextItems.length - 1 : index) : undefined),
        );
        await ConfigurationService.updateConfiguration({ ...(configuration as any), products: Array.isArray((configuration as any)?.product) ? (configuration as any).product : Array.isArray((configuration as any)?.products) ? (configuration as any).products : [], data: nextData }, session.id);
        return json(jFlashMessage("Fixing methods updated successfully"));
      }

      if (operation === "delete-fixing-methods") {
        const nextItems = ensureOneDefaultStructural(currentItems.filter((_item, currentIndex) => currentIndex !== index));
        const nextData = syncStructuralIntoData(data, "fixing-methods", nextItems);
        await ConfigurationService.updateConfiguration({ ...(configuration as any), products: Array.isArray((configuration as any)?.product) ? (configuration as any).product : Array.isArray((configuration as any)?.products) ? (configuration as any).products : [], data: nextData }, session.id);
        return json(jFlashMessage("Fixing method deleted successfully"));
      }

      if (operation === "set-default-fixing-methods") {
        if (index < 0 || !currentItems[index]) {
          return json(jFlashMessage("Invalid fixing method selection", "error"), { status: 400 });
        }
        const nextItems = ensureOneDefaultStructural(currentItems, index);
        const nextData = syncStructuralIntoData(data, "fixing-methods", nextItems);
        await ConfigurationService.updateConfiguration({ ...(configuration as any), products: Array.isArray((configuration as any)?.product) ? (configuration as any).product : Array.isArray((configuration as any)?.products) ? (configuration as any).products : [], data: nextData }, session.id);
        return json(jFlashMessage("Default fixing method updated successfully"));
      }
    }

    if (section === "shapes") {
      const currentItems = getShapesState(data, Array.isArray(managedShapes) ? managedShapes : []);
      if (operation === "save-shapes") {
        const payload = parseJsonValue(formData.get("items"));
        if (!Array.isArray(payload)) {
          return json(jFlashMessage("Invalid shapes payload", "error"), { status: 400 });
        }
        const nextData = syncStructuralIntoData(data, "shapes", ensureOneDefaultStructural(payload));
        await ConfigurationService.updateConfiguration(
          {
            ...(configuration as any),
            products: Array.isArray((configuration as any)?.product)
              ? (configuration as any).product
              : Array.isArray((configuration as any)?.products)
                ? (configuration as any).products
                : [],
            data: nextData,
          },
          session.id,
        );
        return json(jFlashMessage("Shapes order updated successfully"));
      }
      if (operation === "add-shapes" || operation === "update-shapes") {
        const payload = parseJsonValue(formData.get("item"));
        if (!payload || typeof payload !== "object") {
          return json(jFlashMessage("Invalid shape payload", "error"), { status: 400 });
        }
        const normalized = normalizeShape(
          payload,
          Array.isArray(managedShapes) ? managedShapes.map((item: any, idx: number) => ({ value: idx, label: String(item?.name || "") })) : [],
        );
        const nextItems = [...currentItems];
        if (operation === "add-shapes") {
          nextItems.push(normalized);
        } else if (index >= 0 && nextItems[index]) {
          nextItems[index] = { ...nextItems[index], ...normalized };
        }
        const nextData = syncStructuralIntoData(
          data,
          "shapes",
          ensureOneDefaultStructural(nextItems, normalized.isDefault ? (operation === "add-shapes" ? nextItems.length - 1 : index) : undefined),
        );
        await ConfigurationService.updateConfiguration({ ...(configuration as any), products: Array.isArray((configuration as any)?.product) ? (configuration as any).product : Array.isArray((configuration as any)?.products) ? (configuration as any).products : [], data: nextData }, session.id);
        return json(jFlashMessage("Shapes updated successfully"));
      }
      if (operation === "delete-shapes") {
        const nextItems = ensureOneDefaultStructural(currentItems.filter((_item, currentIndex) => currentIndex !== index));
        const nextData = syncStructuralIntoData(data, "shapes", nextItems);
        await ConfigurationService.updateConfiguration({ ...(configuration as any), products: Array.isArray((configuration as any)?.product) ? (configuration as any).product : Array.isArray((configuration as any)?.products) ? (configuration as any).products : [], data: nextData }, session.id);
        return json(jFlashMessage("Shape deleted successfully"));
      }

      if (operation === "set-default-shapes") {
        if (index < 0 || !currentItems[index]) {
          return json(jFlashMessage("Invalid shape selection", "error"), { status: 400 });
        }
        const nextItems = ensureOneDefaultStructural(currentItems, index);
        const nextData = syncStructuralIntoData(data, "shapes", nextItems);
        await ConfigurationService.updateConfiguration({ ...(configuration as any), products: Array.isArray((configuration as any)?.product) ? (configuration as any).product : Array.isArray((configuration as any)?.products) ? (configuration as any).products : [], data: nextData }, session.id);
        return json(jFlashMessage("Default shape updated successfully"));
      }
    }

    if (section === "borders") {
      const currentItems = getBordersState(
        data,
        Array.isArray(managedBorders) ? managedBorders : [],
        sizeOptions,
        shapeItems,
      );
      if (operation === "add-borders" || operation === "update-borders") {
        const payload = parseJsonValue(formData.get("item"));
        if (!payload || typeof payload !== "object") {
          return json(jFlashMessage("Invalid border payload", "error"), { status: 400 });
        }
        const normalized = normalizeBorder(
          payload,
          Array.isArray(managedBorders) ? managedBorders.map((item: any, idx: number) => ({ value: idx, label: String(item?.name || "") })) : [],
          sizeOptions,
          shapeItems,
        );
        const nextItems = [...currentItems];
        if (operation === "add-borders") {
          nextItems.push(normalized);
        } else if (index >= 0 && nextItems[index]) {
          nextItems[index] = { ...nextItems[index], ...normalized };
        }
        const nextData = syncStructuralIntoData(
          data,
          "borders",
          ensureOneDefaultStructural(nextItems, normalized.isDefault ? (operation === "add-borders" ? nextItems.length - 1 : index) : undefined),
        );
        await ConfigurationService.updateConfiguration({ ...(configuration as any), products: Array.isArray((configuration as any)?.product) ? (configuration as any).product : Array.isArray((configuration as any)?.products) ? (configuration as any).products : [], data: nextData }, session.id);
        return json(jFlashMessage("Borders updated successfully"));
      }
      if (operation === "delete-borders") {
        const nextItems = ensureOneDefaultStructural(currentItems.filter((_item, currentIndex) => currentIndex !== index));
        const nextData = syncStructuralIntoData(data, "borders", nextItems);
        await ConfigurationService.updateConfiguration({ ...(configuration as any), products: Array.isArray((configuration as any)?.product) ? (configuration as any).product : Array.isArray((configuration as any)?.products) ? (configuration as any).products : [], data: nextData }, session.id);
        return json(jFlashMessage("Border deleted successfully"));
      }

      if (operation === "set-default-borders") {
        if (index < 0 || !currentItems[index]) {
          return json(jFlashMessage("Invalid border selection", "error"), { status: 400 });
        }
        const nextItems = ensureOneDefaultStructural(currentItems, index);
        const nextData = syncStructuralIntoData(data, "borders", nextItems);
        await ConfigurationService.updateConfiguration({ ...(configuration as any), products: Array.isArray((configuration as any)?.product) ? (configuration as any).product : Array.isArray((configuration as any)?.products) ? (configuration as any).products : [], data: nextData }, session.id);
        return json(jFlashMessage("Default border updated successfully"));
      }
    }

    return json(jFlashMessage("Unsupported operation", "error"), { status: 400 });
  }

  return json(jFlashMessage("Unsupported operation", "error"), { status: 400 });
};

export default function RequiredOptionsSectionRoute() {
  const params = useParams();
  if (params.section === "fonts") {
    return <ClassicRequiredFontsScreen />;
  }

  if (params.section === "colors") {
    return <ClassicRequiredColorsScreen />;
  }

  if (params.section === "components") {
    return <ClassicRequiredComponentsScreen />;
  }

  if (
    params.section === "fixing-methods" ||
    params.section === "shapes" ||
    params.section === "borders"
  ) {
    return <ClassicRequiredStructuralScreen section={params.section} />;
  }

  return <SectionScreen />;
}
