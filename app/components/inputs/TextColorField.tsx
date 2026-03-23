import { Box, ColorPicker, InlineStack, Popover, TextField } from "@shopify/polaris";
import * as ColorConvertor from "color-convert";
import { useCallback, useEffect, useMemo, useState } from "react";

type HsvColor = {
  hue: number;
  brightness: number;
  saturation: number;
};

const FALLBACK_HEX = "#FFFFFF";
const FALLBACK_HSV: HsvColor = {
  hue: 0,
  brightness: 1,
  saturation: 0,
};

const normalizeHex = (value?: string) => {
  const raw = String(value || "").trim();
  if (!raw) return FALLBACK_HEX;
  const withHash = raw.startsWith("#") ? raw : `#${raw}`;
  return /^#[0-9a-fA-F]{6}$/.test(withHash) ? withHash.toUpperCase() : FALLBACK_HEX;
};

const hexToHsv = (hex: string): HsvColor => {
  try {
    const hsv = ColorConvertor.hex.hsv(hex.replace("#", ""));
    if (!Array.isArray(hsv) || hsv.length < 3) {
      return FALLBACK_HSV;
    }

    return {
      hue: Number(hsv[0]) || 0,
      saturation: (Number(hsv[1]) || 0) / 100,
      brightness: (Number(hsv[2]) || 0) / 100,
    };
  } catch {
    return FALLBACK_HSV;
  }
};

export function TextColorField({
  label,
  color,
  setColor,
  helpText,
  error,
}: {
  error?: string;
  helpText?: string;
  label?: string;
  color?: string | undefined;
  setColor?: Function;
}) {
  const normalizedColor = useMemo(() => normalizeHex(color), [color]);
  const [popoverActive, setPopoverActive] = useState(false);
  const [colorHex, setColorHex] = useState<string>(normalizedColor);
  const [colorHsv, setColorHsv] = useState<HsvColor>(() => hexToHsv(normalizedColor));

  useEffect(() => {
    setColorHex(normalizedColor);
    setColorHsv(hexToHsv(normalizedColor));
  }, [normalizedColor]);

  const togglePopoverActive = useCallback(() => {
    setPopoverActive((current) => !current);
  }, []);

  const handleColorHsv = useCallback(
    (value: HsvColor) => {
      const hex = ColorConvertor.hsv.hex.raw([
        value.hue,
        value.saturation * 100,
        value.brightness * 100,
      ]);
      const nextHex = `#${hex}`.toUpperCase();
      setColorHex(nextHex);
      setColorHsv(value);

      if (typeof setColor === "function") {
        setColor(nextHex);
      }
    },
    [setColor],
  );

  const handleColor = useCallback(
    (value: string) => {
      const nextHex = normalizeHex(value);
      setColorHex(nextHex);
      setColorHsv(hexToHsv(nextHex));

      if (typeof setColor === "function") {
        setColor(nextHex);
      }
    },
    [setColor],
  );

  const activator = (
    <TextField
      prefix={
        <div
          style={{ backgroundColor: "#EFEFEF", marginLeft: "-0.609rem" }}
          onClick={togglePopoverActive}
        >
          <Box paddingInline="200" paddingBlock="200">
            <InlineStack gap="100" align="center" blockAlign="center">
              <div style={{ backgroundColor: colorHex }} className="color-span" />
            </InlineStack>
          </Box>
        </div>
      }
      label={label}
      helpText={helpText}
      error={error}
      value={colorHex}
      onChange={handleColor}
      onFocus={togglePopoverActive}
      autoComplete="off"
    />
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <ColorPicker onChange={handleColorHsv} color={colorHsv} />
    </Popover>
  );
}
