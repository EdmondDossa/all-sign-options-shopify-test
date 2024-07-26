
import { Box, ColorPicker, InlineStack, Popover, Tag, TextField } from "@shopify/polaris";
import *  as  ColorConvertor from "color-convert";
import { useCallback, useEffect, useState } from "react";



export function TextColorField({ label, color, setColor, helpText, error }: { error?:string; helpText?: string; label?: string; color?: string | undefined;  setColor?:Function}) {
    const [popoverActive, setPopoverActive] = useState(false);
    const [colorHex, setColorHex] = useState<string>(color||"#FFFFFF");
    let hsv = ColorConvertor.hex.hsv(color||"#FFFFFF")
    const [colorHsv, setColorHsv] = useState({
      hue: hsv[0],
      brightness: hsv[2]/100,
      saturation: hsv[1]/100,
    });
  
    const togglePopoverActive = useCallback(
      () => setPopoverActive((popoverActive) => !popoverActive),
      []
    );
  
  console.log("coolor :",color);


  const handleColorHsv = useCallback((value:{
    hue: number;
    brightness: number;
    saturation: number;
}) => {
      
    // let colorConvertor = Color({hue:color.hue, saturationv: color.saturation, value:color.brightness}, "hsv")
    const hex = ColorConvertor.hsv.hex.raw([value.hue, value.saturation * 100, value.brightness * 100]);
    setColorHex('#'+hex);
    if (typeof setColor === 'function') {
      setColor('#'+hex)
    }

    setColorHsv(value)
    
},[])
  
  const handleColor = useCallback((value:string) => {
  
    if (typeof setColor === 'function') {
      setColor(value);
      setColorHex(value)
    }

  },[]); 
  
    const activator = (
      <TextField
        prefix={
           (
            <div style={{ backgroundColor: "#EFEFEF", marginLeft: "-0.609rem"}} onClick={()=>togglePopoverActive()} >
              <Box paddingInline="200" paddingBlock="200"  >
                <InlineStack gap="100" align="center" blockAlign="center" >
                  <div style={{ backgroundColor: `${colorHex}` }} className="color-span"> </div>
                </InlineStack>
              </Box>
            </div>
          )
        }
        label={label}
        helpText={helpText}
        error={error}
        value={color}
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
  