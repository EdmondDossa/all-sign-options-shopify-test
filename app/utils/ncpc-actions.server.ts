import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";

const parseIndex = (value: FormDataEntryValue | null) => {
  const parsed = parseInt(String(value || ""), 10);
  return Number.isNaN(parsed) ? -1 : parsed;
};

const parseJsonValue = (value: FormDataEntryValue | null) => {
  try {
    return JSON.parse(String(value || "{}"));
  } catch (_error) {
    return null;
  }
};

export const handleNcpcOptionItemsAction = async (
  args: ActionFunctionArgs,
  sectionPath: string,
) => {
  const { request, params } = args;
  const { session } = await authenticate.admin(request);

  if (request.method !== "POST") {
    return null;
  }

  const configId = parseInt(params.configId || "", 10);
  if (Number.isNaN(configId)) {
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
  }

  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const pathFromForm = String(formData.get("sectionPath") || sectionPath);
  const index = parseIndex(formData.get("index"));

  if (!pathFromForm) {
    return json({ ...jFlashMessage("Invalid section path", "error") }, { status: 400 });
  }

  if (operation === "add-item") {
    const item = parseJsonValue(formData.get("item"));
    if (item == null) {
      return json({ ...jFlashMessage("Invalid item payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const current = NcpcConfigurationService.getByPath(draft, pathFromForm);
      const next = Array.isArray(current) ? [...current, item] : [item];
      NcpcConfigurationService.setByPath(draft, pathFromForm, next);
    });

    return json({ ...jFlashMessage("Option added successfully") });
  }

  if (operation === "update-item") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid option index", "error") }, { status: 400 });
    }

    const item = parseJsonValue(formData.get("item"));
    if (item == null) {
      return json({ ...jFlashMessage("Invalid item payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const current = NcpcConfigurationService.getByPath(draft, pathFromForm);
      const next = Array.isArray(current) ? [...current] : [];
      if (next[index] == null) return;
      next[index] = item;
      NcpcConfigurationService.setByPath(draft, pathFromForm, next);
    });

    return json({ ...jFlashMessage("Option updated successfully") });
  }

  if (operation === "delete-item") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid option index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const current = NcpcConfigurationService.getByPath(draft, pathFromForm);
      const next = Array.isArray(current)
        ? current.filter((_: unknown, itemIndex: number) => itemIndex !== index)
        : [];
      NcpcConfigurationService.setByPath(draft, pathFromForm, next);
    });

    return json({ ...jFlashMessage("Option deleted successfully") });
  }

  if (operation === "set-default-item") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid option index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const current = NcpcConfigurationService.getByPath(draft, pathFromForm);
      const next = Array.isArray(current)
        ? current.map((item: any, itemIndex: number) => ({
            ...item,
            isDefault: itemIndex === index,
            default: itemIndex === index,
          }))
        : [];
      NcpcConfigurationService.setByPath(draft, pathFromForm, next);
    });

    return json({ ...jFlashMessage("Default option updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
