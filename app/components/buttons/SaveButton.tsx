import { Button } from "@shopify/polaris";
import type { ComponentProps } from "react";

type SaveButtonProps = Omit<ComponentProps<typeof Button>, "variant" | "tone">;

export default function SaveButton(props: SaveButtonProps) {
  return <Button variant="primary" tone="success" {...props} />;
}
