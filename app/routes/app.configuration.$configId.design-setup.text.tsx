import { json } from '@remix-run/node';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Box, Card, Text } from '@shopify/polaris';
import { useLoaderData, useNavigation, useOutletContext, useSubmit } from '@remix-run/react';
import { useEffect, useState } from 'react';
import {
  mergeTextSettings,
  TextSetupSection,
  type TextSettingsState,
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
    return json({ ...jFlashMessage('Missing text settings payload', 'error') }, { status: 400 });
  }

  let parsed: any;
  try {
    parsed = JSON.parse(rawPayload);
  } catch {
    return json({ ...jFlashMessage('Invalid text settings payload', 'error') }, { status: 400 });
  }

  const result = await ConfigSettingsService.updateSettingsSection(
    configId,
    session.id,
    'customizerSign',
    'text',
    parsed,
  );

  if (!result) {
    return json({ ...jFlashMessage('Unable to update text settings', 'error') }, { status: 500 });
  }

  return json({ ok: true, ...jFlashMessage('Text settings updated successfully') });
};

export default function ConfigurationDesignSetupText() {
  const { configuration } = useOutletContext<any>();
  const { plan } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const [textSettings, setTextSettings] = useState<TextSettingsState>(mergeTextSettings(configuration?.data?.settings?.customizerSign?.text));

  useEffect(() => {
    const section = configuration?.data?.settings?.customizerSign || {};
    setTextSettings(mergeTextSettings(section?.text));
  }, [configuration]);

  const submitSection = () => {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(textSettings));
    submit(formData, { method: 'POST' });
  };

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card>
        <Box padding='400'>
          <Text as='h1' variant='headingLg'>Text Setup</Text>
          <Box paddingBlockStart='100'>
            <Text as='p' tone='subdued'>
              Bring text configuration closer to the core setup, while keeping the same classic save location.
            </Text>
          </Box>
        </Box>
      </Card>
      <TextSetupSection
        textSettings={textSettings}
        setTextSettings={setTextSettings}
        plan={plan}
        loading={navigation.state === 'submitting'}
        onSave={submitSection}
      />
    </div>
  );
}
