import { useId, useState } from "react";
import { Box, Button, Card, Collapsible, InlineStack, Text } from "@shopify/polaris";

type CollapsibleSectionCardProps = {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function CollapsibleSectionCard({
  id,
  title,
  description,
  children,
  defaultOpen = true,
}: CollapsibleSectionCardProps) {
  const collapsibleId = useId();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section id={id} style={{ scrollMarginTop: 16 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="start">
            <div>
              <Text as="h3" variant="headingMd">
                {title}
              </Text>
              <Box paddingBlockStart="100">
                <Text as="p" tone="subdued">
                  {description}
                </Text>
              </Box>
            </div>
            <Button
              disclosure={open ? "up" : "down"}
              onClick={() => setOpen((current) => !current)}
              ariaExpanded={open}
              ariaControls={collapsibleId}
            >
              {open ? "Show less" : "Show more"}
            </Button>
          </InlineStack>
          <Collapsible
            open={open}
            id={collapsibleId}
            transition={{ duration: "250ms", timingFunction: "ease-in-out" }}
            expandOnPrint
          >
            <Box paddingBlockStart="300">{children}</Box>
          </Collapsible>
        </Box>
      </Card>
    </section>
  );
}
