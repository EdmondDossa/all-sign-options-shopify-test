import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { ConfigurationType } from "~/types/ConfigurationType";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { useMemo } from "react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return json({
    token: session.accessToken,
    configId: parseInt(params.configId ?? "") || 0,
  });
};

export default function Preview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useLoaderData<typeof loader>();
  const { configuration } = useOutletContext<{
    configuration: ConfigurationType;
  }>();
  const returnTo = searchParams.get("returnTo") || "";
  const cacheBuster = useMemo(() => Date.now(), []);

  return (
    <Modal
      id="my-modal"
      open={true}
      variant="max"
      onHide={() =>
        navigate(
          returnTo || `/app/configuration/${configuration.id}/materials`,
        )
      }
    >
      <iframe
        title={
          configuration?.name
            ? `${configuration.name} preview`
            : "Configuration preview"
        }
        name={JSON.stringify({
          configId: configuration.id,
          templateId: "",
          token,
        })}
        src={`/preview.html?v=${cacheBuster}`}
        className="aso-preview"
      ></iframe>
      <TitleBar title={configuration.name}></TitleBar>
    </Modal>
  );
}
