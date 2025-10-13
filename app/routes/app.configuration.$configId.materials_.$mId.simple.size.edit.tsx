import {
  Box,
  Card,
  Divider,
  Grid,
  InlineStack,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { ConfigSize } from "~/types/ConfigDataType";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";

interface MaterialSizeProps {
  allSizes: ConfigSize[];
  id: number;
  onClick: (id: boolean) => void;
  edit: boolean;
  materialId: number | undefined;
  onUpdateSizes?: (updatedSizes: ConfigSize[]) => void;
}

export default function MaterialSizeEdit({
  allSizes,
  id,
  onClick,
  edit,
  materialId,
  onUpdateSizes,
}: MaterialSizeProps) {
  const params = useParams();
  const fetcher = useFetcher();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let configSize = allSizes?.find((curr, index) => index === id);
  const [formData, setFormData] = useState<ConfigSize>(
    edit && configSize
      ? (configSize as ConfigSize)
      : {
          width: 0,
          label: "",
          height: 0,
          textNumber: 0,
          maxTextChar: -1,
          charPrice: 0,
          basePrice: 0,
          startPriceAtChar: 0,
        },
  );

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleTextNumber = (value: string, onBlur = false) =>
    setFormData({
      ...formData,
      textNumber: onBlur ? parseInt(`${formData.textNumber || "0"}`) : value,
    });

  const handleMaxTextChar = (value: string, onBlur = false) =>
    setFormData({
      ...formData,
      maxTextChar: onBlur ? parseInt(`${formData.maxTextChar || "0"}`) : value,
    });

  const handleStartPriceAtChar = (value: string, onBlur = false) =>
    setFormData({
      ...formData,
      startPriceAtChar: onBlur
        ? parseInt(`${formData.startPriceAtChar || "0"}`)
        : value,
    });

  const handleCharPrice = (value: string, onBlur = false) =>
    setFormData({
      ...formData,
      charPrice: onBlur ? parseFloat(`${formData.charPrice || "0"}`) : value,
    });

  const handleBasePrice = (value: string, onBlur = false) =>
    setFormData({
      ...formData,
      basePrice: onBlur ? parseFloat(`${formData.basePrice || "0"}`) : value,
    });

  // ✅ SOLUTION 1: Utiliser fetch() directement pour envoyer du JSON pur
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const configId = parseInt(params.configId ?? "");
      const finalMaterialId = materialId ?? 0;

      const requestBody = edit
        ? {
            operation: "update",
            configId,
            materialId: finalMaterialId,
            sizeId: id,
            sizeData: formData,
          }
        : {
            operation: "add",
            configId,
            materialId: finalMaterialId,
            sizeData: formData,
          };

      console.log("=== Sending JSON request ===");
      console.log("Request body:", requestBody);

      const response = await fetch("/api/size-manager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response data:", responseData);

        // Mettre à jour la liste des sizes dans le composant parent
        if (responseData.data && onUpdateSizes) {
          onUpdateSizes(responseData.data);
        }

        onClick(false); // Fermer l'édition
      } else {
        console.error("Failed to submit, status:", response.status);
        const errorData = await response.json().catch(() => null);
        console.error("Error data:", errorData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ SOLUTION 2 (Alternative): Utiliser fetcher avec encType
  const handleSubmitWithFetcher = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const configId = parseInt(params.configId ?? "");
    const finalMaterialId = materialId ?? 0;

    const requestBody = edit
      ? {
          operation: "update",
          configId,
          materialId: finalMaterialId,
          sizeId: id,
          sizeData: formData,
        }
      : {
          operation: "add",
          configId,
          materialId: finalMaterialId,
          sizeData: formData,
        };

    // Utiliser fetcher.submit avec encType application/json
    fetcher.submit(JSON.stringify(requestBody), {
      action: "/api/size-manager",
      method: "POST",
      encType: "application/json",
    });

    onClick(false); // Fermer l'édition
    setIsSubmitting(false);
  };

  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <div>
      <div style={{ width: "100%", height: "auto", margin: "0px 0px " }}>
        <Card>
          <div onSubmit={handleSubmit}>
            <Box paddingInline="300" paddingBlock="200">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <TextField
                    size="medium"
                    label="Label"
                    value={`${formData.label}`}
                    onChange={(value) => handleInputChange("label", value)}
                    error={formData.label === "" ? "size name is required" : ""}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Width"
                    type="number"
                    value={`${formData.width}`}
                    onChange={(value) => handleInputChange("width", value)}
                    onBlur={(value) =>
                      handleInputChange(
                        "width",
                        parseFloat(`${formData.width}`),
                      )
                    }
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Height"
                    type="number"
                    value={`${formData.height}`}
                    onChange={(value) => handleInputChange("height", value)}
                    onBlur={(value) =>
                      handleInputChange(
                        "height",
                        parseFloat(`${formData.height}`),
                      )
                    }
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Text number"
                    type="number"
                    value={`${formData.textNumber}`}
                    onChange={(value) => handleTextNumber(value)}
                    onBlur={(value) => handleTextNumber("", true)}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Max text char"
                    type="number"
                    value={`${formData.maxTextChar}`}
                    onChange={(value) => handleMaxTextChar(value)}
                    onBlur={(value) => handleMaxTextChar("", true)}
                    helpText="Max number of characters in text, for without limit set to -1"
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Base Price"
                    type="number"
                    value={`${formData.basePrice}`}
                    onChange={(value) => handleBasePrice(value)}
                    onBlur={(value) => handleBasePrice("", true)}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Number at start pricing char"
                    type="number"
                    value={`${formData.startPriceAtChar}`}
                    onChange={(value) => handleStartPriceAtChar(value)}
                    onBlur={(value) => handleStartPriceAtChar("", true)}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Char Price"
                    type="number"
                    value={`${formData.charPrice}`}
                    onChange={(value) => handleCharPrice(value)}
                    onBlur={(value) => handleCharPrice("", true)}
                    autoComplete="on"
                  />
                </Grid.Cell>
              </Grid>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button
                  className="back-large-btn"
                  type="button"
                  onClick={() => onClick(false)}
                >
                  <Box paddingInline="1000">
                    <InlineStack gap="300">
                      <RayStartArrowIcon />{" "}
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        {" "}
                        Back
                      </span>
                    </InlineStack>
                  </Box>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit} // Utilise la solution avec fetch()
                  disabled={formData.label == "" || isSubmitting}
                >
                  <BiSaveBtn isLoading={isSubmitting} title="Save" />
                </button>
              </InlineStack>
            </Box>
          </div>
        </Card>
      </div>
    </div>
  );
}
