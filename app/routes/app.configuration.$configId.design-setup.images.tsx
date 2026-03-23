import { json } from '@remix-run/node';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Box, Card, Text } from '@shopify/polaris';
import { useLoaderData, useNavigation, useOutletContext, useSubmit } from '@remix-run/react';
import { useEffect, useState } from 'react';
import {
  ImageSetupSection,
  mergeImageSettings,
  type ImageSettingsState,
} from '~/features/classic-design-setup.shared';
import ConfigSettingsService from '~/models/ConfigSetttings.service';
import { authenticate } from '~/shopify.server';
import { jFlashMessage } from '~/utils/message-flash';
import { getPlan } from '~/utils/pricing-server.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin, billing } = await authenticate.admin(request);
  const plan = await getPlan(billing, session?.shop, admin);
  return json({ plan });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? '', 10);

  if (!Number.isFinite(configId)) {
    return json({ ...jFlashMessage('Invalid configuration', 'error') }, { status: 400 });
  }

  const formData = await request.formData();
  const rawPayload = String(formData.get('payload') || '');

  if (!rawPayload) {
    return json({ ...jFlashMessage('Missing image settings payload', 'error') }, { status: 400 });
  }

  let parsed: any;
  try {
    parsed = JSON.parse(rawPayload);
  } catch {
    return json({ ...jFlashMessage('Invalid image settings payload', 'error') }, { status: 400 });
  }

  const result = await ConfigSettingsService.updateSettingsSection(
    configId,
    session.id,
    'customizerSign',
    'images',
    parsed,
  );

  if (!result) {
    return json({ ...jFlashMessage('Unable to update image settings', 'error') }, { status: 500 });
  }

  return json({ ok: true, ...jFlashMessage('Image settings updated successfully') });
};

export default function ConfigurationDesignSetupImages() {
  const { configuration } = useOutletContext<any>();
  const { plan } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const [imageSettings, setImageSettings] = useState<ImageSettingsState>(mergeImageSettings(configuration?.data?.settings?.customizerSign?.images));

  useEffect(() => {
    const section = configuration?.data?.settings?.customizerSign || {};
    setImageSettings(mergeImageSettings(section?.images));
  }, [configuration]);

  const submitSection = () => {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(imageSettings));
    submit(formData, { method: 'POST' });
  };

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card>
        <Box padding='400'>
          <Text as='h1' variant='headingLg'>Image Setup</Text>
          <Box paddingBlockStart='100'>
            <Text as='p' tone='subdued'>
              Bring image configuration closer to the core flow, while keeping the same classic save location.
            </Text>
          </Box>
        </Box>
      </Card>
      <ImageSetupSection
        imageSettings={imageSettings}
        setImageSettings={setImageSettings}
        plan={plan}
        loading={navigation.state === 'submitting'}
        onSave={submitSection}
      />
    </div>
  );
}
