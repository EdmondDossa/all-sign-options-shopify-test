import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import SectionScreen from "./app.configuration.$configId.builder.$section";
import { ClassicAdditionalMaterialsScreen } from "~/features/classic-additional-materials";
import { ClassicAdditionalClipartsScreen } from "~/features/classic-additional-cliparts";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import SettingShapesService from "~/models/SettingShapes.service";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import ClipartService from "~/models/Clipart.service";
import { jFlashMessage } from "~/utils/message-flash";
import { readJsonField } from "~/utils/readJsonField";
import {
  emptyMaterial,
  ensureOneDefault,
  getMaterialsState,
  parseConfigData,
  syncMaterialsIntoData,
} from "~/features/classic-additional-materials.shared";
import {
  defaultClipartDraft,
  getClipartsState,
  syncClipartsIntoData,
} from "~/features/classic-additional-cliparts.shared";

const allowedSections = ["materials", "cliparts", "additional-inputs"];

const parseJsonValue = (value: FormDataEntryValue | null) => {
  try {
    return JSON.parse(String(value || "null"));
  } catch {
    return null;
  }
};

const parseIndex = (value: FormDataEntryValue | null) => {
  const parsed = parseInt(String(value || ""), 10);
  return Number.isNaN(parsed) ? -1 : parsed;
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const section = String(params.section || "").trim();

  if (section === "materials") {
    const { session } = await authenticate.admin(request);
    const [managedFixingMethods, managedShapes] = await Promise.all([
      SettingFixingMethodService.get(session.id),
      SettingShapesService.get(session.id),
    ]);

    return json({
      managedFixingMethods: Array.isArray(managedFixingMethods) ? managedFixingMethods : [],
      managedShapes: Array.isArray(managedShapes) ? managedShapes : [],
    });
  }

  if (section === "cliparts") {
    const { session } = await authenticate.admin(request);
    const managedClipartGroups = await ClipartsGroupService.getClipartsGroupsCliparts(session.id);
    const clipartsResources = readJsonField("public/aso-cliparts/cliparts.json");
    return json({
      managedClipartGroups: Array.isArray(managedClipartGroups) ? managedClipartGroups : [],
      clipartsResources,
      shop: session.shop,
    });
  }

  if (allowedSections.includes(section)) {
    return json(null);
  }

  const configId = String(params.configId || "").trim();
  const search = new URL(request.url).search;
  throw redirect(`/app/configuration/${configId}/additional-options/materials${search}`);
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const section = String(params.section || "").trim();
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId || "", 10);
  const formData = await request.formData();
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

  if (section === "materials") {
    const [managedFixingMethods, managedShapes] = await Promise.all([
      SettingFixingMethodService.get(session.id),
      SettingShapesService.get(session.id),
    ]);

    const currentState = getMaterialsState({
      data,
      managedFixingMethods: Array.isArray(managedFixingMethods) ? managedFixingMethods : [],
      managedShapes: Array.isArray(managedShapes) ? managedShapes : [],
    });

    if (operation === "save-materials") {
      const payload = parseJsonValue(formData.get("items"));
      if (!Array.isArray(payload)) {
        return json(jFlashMessage("Invalid materials payload", "error"), { status: 400 });
      }
      currentState.items = ensureOneDefault(payload);
    } else if (operation === "add-material" || operation === "update-material") {
      const payload = parseJsonValue(formData.get("material"));
      if (!payload || typeof payload !== "object") {
        return json(jFlashMessage("Invalid material payload", "error"), { status: 400 });
      }

      const normalized = {
        ...emptyMaterial(),
        ...payload,
        label: String((payload as any)?.label || "").trim(),
        description: String((payload as any)?.description || ""),
      };

      if (!normalized.label) {
        return json(jFlashMessage("Material label is required", "error"), { status: 400 });
      }

      const hasDuplicateLabel = currentState.items.some((item, itemIndex) => {
        if (operation === "update-material" && itemIndex === index) return false;
        return String(item.label || "").trim().toLowerCase() === normalized.label.toLowerCase();
      });
      if (hasDuplicateLabel) {
        return json(jFlashMessage("Material labels must be unique", "error"), { status: 400 });
      }

      if (operation === "add-material") {
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
        return json(jFlashMessage("Invalid material index", "error"), { status: 400 });
      }
    } else if (operation === "delete-material") {
      if (index < 0 || !currentState.items[index]) {
        return json(jFlashMessage("Invalid material index", "error"), { status: 400 });
      }
      currentState.items = ensureOneDefault(
        currentState.items.filter((_item, currentIndex) => currentIndex !== index),
      );
    } else if (operation === "set-default-material") {
      if (index < 0 || !currentState.items[index]) {
        return json(jFlashMessage("Invalid material index", "error"), { status: 400 });
      }
      currentState.items = ensureOneDefault(currentState.items, index);
    } else {
      return json(jFlashMessage("Unsupported operation", "error"), { status: 400 });
    }

    const nextData = syncMaterialsIntoData({
      data,
      state: currentState,
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

    return json(jFlashMessage("Materials updated successfully"));
  }

  if (section === "cliparts") {
    const managedClipartGroups = (await ClipartsGroupService.getClipartsGroupsCliparts(session.id)) || [];
    const currentState = getClipartsState(data, Array.isArray(managedClipartGroups) ? managedClipartGroups : []);

    if (operation === "save-cliparts-settings") {
      const payload = parseJsonValue(formData.get("state"));
      currentState.active = Boolean(payload?.active);
    } else if (operation === "add-existing-clipart-group") {
      const clipartsGroupId = parseInt(String(formData.get("clipartsGroupId") || ""), 10);
      const group = Array.isArray(managedClipartGroups)
        ? managedClipartGroups.find((entry: any) => Number(entry?.id) === clipartsGroupId)
        : null;

      if (!group || clipartsGroupId <= 0) {
        return json(jFlashMessage("Invalid clipart group", "error"), { status: 400 });
      }

      if (!currentState.items.some((item) => Number(item.clipartsGroupId) === clipartsGroupId)) {
        currentState.items.push({
          id: `clipart-group-${clipartsGroupId}`,
          clipartsGroupId,
          title: String(group?.title || ""),
          description: String(group?.description || ""),
          clipartsCount: Array.isArray(group?.cliparts) ? group.cliparts.length : 0,
          previewImg: String(group?.cliparts?.[0]?.url || ""),
        });
      }
    } else if (operation === "remove-clipart-group") {
      if (index < 0 || !currentState.items[index]) {
        return json(jFlashMessage("Invalid clipart group index", "error"), { status: 400 });
      }
      currentState.items = currentState.items.filter((_item, currentIndex) => currentIndex !== index);
    } else if (operation === "create-clipart-group-and-add") {
      const groupPayload = parseJsonValue(formData.get("group"));
      const clipartsPayload = parseJsonValue(formData.get("cliparts"));
      const title = String(groupPayload?.title || "").trim();
      const description = String(groupPayload?.description || "");
      const cliparts = Array.isArray(clipartsPayload)
        ? clipartsPayload
            .map((item: any) => ({
              ...defaultClipartDraft(),
              ...item,
              title: String(item?.title || "").trim(),
              url: String(item?.url || "").trim(),
              additionalPrice: Number(item?.additionalPrice || 0),
            }))
            .filter((item: any) => item.url)
        : [];

      if (!title) {
        return json(jFlashMessage("Clipart group title is required", "error"), { status: 400 });
      }
      if (cliparts.length === 0) {
        return json(jFlashMessage("Add at least one clipart image", "error"), { status: 400 });
      }

      const createdGroup = await ClipartsGroupService.addClipartsGroup(
        {
          title,
          description,
        } as any,
        session.id,
      );

      if (!createdGroup?.id) {
        return json(jFlashMessage("Unable to create clipart group", "error"), { status: 400 });
      }

      for (const clipart of cliparts) {
        await ClipartService.addClipart(
          {
            title: clipart.title || title,
            url: clipart.url,
            additionalPrice: Number(clipart.additionalPrice || 0),
          } as any,
          Number(createdGroup.id),
        );
      }

      currentState.items.push({
        id: `clipart-group-${createdGroup.id}`,
        clipartsGroupId: Number(createdGroup.id),
        title,
        description,
        clipartsCount: cliparts.length,
        previewImg: String(cliparts[0]?.url || ""),
      });
    } else {
      return json(jFlashMessage("Unsupported operation", "error"), { status: 400 });
    }

    const nextData = syncClipartsIntoData(data, currentState);
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

    return json(jFlashMessage("Cliparts updated successfully"));
  }

  return json(jFlashMessage("Unsupported operation", "error"), { status: 400 });
};

export default function ClassicAdditionalOptionsSectionRoute() {
  const { section } = useParams();

  if (section === "materials") {
    return <ClassicAdditionalMaterialsScreen />;
  }

  if (section === "cliparts") {
    return <ClassicAdditionalClipartsScreen />;
  }

  return <SectionScreen />;
}
