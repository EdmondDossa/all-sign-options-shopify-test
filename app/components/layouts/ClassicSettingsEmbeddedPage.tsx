import { useCallback, useMemo, useRef, useState } from "react";
import { Box, Card, Text } from "@shopify/polaris";

type SettingsEmbedSection = {
  id: string;
  title: string;
  description?: string;
  src: string;
  minHeight?: number;
};

function EmbeddedSectionFrame({ section }: { section: SettingsEmbedSection }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState(section.minHeight || 520);

  const syncHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentWindow?.document;
      if (!doc) return;
      const nextHeight = Math.max(
        doc.body?.scrollHeight || 0,
        doc.documentElement?.scrollHeight || 0,
        section.minHeight || 520,
      );
      if (nextHeight > 0) {
        setHeight(nextHeight + 12);
      }
    } catch {
      setHeight(section.minHeight || 520);
    }
  }, [section.minHeight]);

  const handleLoad = useCallback(() => {
    syncHeight();
    window.setTimeout(syncHeight, 150);
    window.setTimeout(syncHeight, 600);
  }, [syncHeight]);

  return (
    <div
      style={{
        border: "1px solid #d1d5db",
        borderRadius: 12,
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <div style={{ padding: "20px 24px 12px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <Text as="h3" variant="headingMd">
          {section.title}
        </Text>
        {section.description ? (
          <div style={{ marginTop: 6 }}>
            <Text as="p" tone="subdued">
              {section.description}
            </Text>
          </div>
        ) : null}
      </div>
      <iframe
        ref={iframeRef}
        title={section.title}
        src={section.src}
        onLoad={handleLoad}
        style={{
          display: "block",
          width: "100%",
          height,
          border: "0",
          background: "#ffffff",
        }}
      />
    </div>
  );
}

export default function ClassicSettingsEmbeddedPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: SettingsEmbedSection[];
}) {
  const sidebarItems = useMemo(
    () => sections.map((section) => ({ id: section.id, title: section.title })),
    [sections],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 260px",
        gap: 24,
        alignItems: "start",
      }}
    >
      <div style={{ display: "grid", gap: 16 }}>
        <Card>
          <Box padding="400">
            <Text as="h1" variant="headingLg">
              {title}
            </Text>
            <Box paddingBlockStart="100">
              <Text as="p" tone="subdued">
                {description}
              </Text>
            </Box>
          </Box>
        </Card>

        {sections.map((section) => (
          <section id={section.id} key={section.id} style={{ scrollMarginTop: 24 }}>
            <EmbeddedSectionFrame section={section} />
          </section>
        ))}
      </div>

      <div style={{ position: "sticky", top: 12 }}>
        <Card>
          <Box padding="300">
            <Text as="h2" variant="headingMd">
              Section Menu
            </Text>
            <Box paddingBlockStart="200">
              <div style={{ display: "grid", gap: 8 }}>
                {sidebarItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#111827",
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      padding: "10px 12px",
                      background: "#ffffff",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </Box>
          </Box>
        </Card>
      </div>
    </div>
  );
}
