import prisma from "~/db.server";
import { ConfigurationType } from "~/types/ConfigurationType";

const initialData = {
  settings: {
    generals: {
      mobile: {
        showNavigatorMenu: "off",
        showNavigationMenuFirst: "yes",
        mobileSelectionOptionsDisplay: "horizontally",
      },
      output: {
        waterMark: "",
        filesFormat: "png",
        zipOutputFiles: {
          active: false,
          zipOutFolderPrefix: "aso_",
        },
        designComposition: false,
      },
      product: {
        designFromScratch: true,
        redirectAfterAddingToCart: true,
        hideDesignButtonsOnShopPage: true,
        hideAddToCartButtonOnShopPage: false,
        hideAddToCartButtonOnDetailPage: false,
      },
    },
    themeColors: {
      skin: "default",
      colors: {
        textColorButton: "#000000",
        backgroundButton: "#000000",
        textColorButtonHelp: "#000000",
        textColorButtonSave: "#000000",
        textColorHoverButton: "#000000",
        textColorOptionsMenu: "#000000",
        backgroundColorHeader: "#000000",
        textColorContentHeader: "#000000",
        textColorContentSideMenu: "#000000",
        textColorHoverButtonHelp: "#000000",
        textColorHoverButtonSave: "#000000",
        backgroundColorButtonHelp: "#000000",
        textColorButtonRestartAll: "#000000",
        backgroundColorHoverButton: "#000000",
        backgroundColorOptionsMenu: "#000000",
        backgroundColorTextButtonSave: "#000000",
        backgroundColorHoverButtonHelp: "#000000",
        backgroundColorHoverButtonSave: "#000000",
        textColorHoverButtonRestartAll: "#000000",
        backgroundColorButtonRestartAll: "#000000",
        backgroundColorHeaderContentSide: "#000000",
        backgroundColorHoverButtonRestartAll: "#000000",
      },
    },
    customizerSign: {
      text: {
        colors: [],
        enableBold: true,
        enableBorder: true,
        enableItalic: true,
        enableStrike: true,
        enableOpacity: true,
        selectedFonts: [],
        enableCurvedUp: false,
        enableFontSize: {
          active: true,
          defaultFontSize: 16,
          maximumFontSize: 30,
          minimumFontSize: 12,
        },
        enableOverline: true,
        enableUnderline: true,
        enableCurvedDown: false,
        enableCustomColor: true,
        enableTextAlignment: true,
      },
      images: {
        filter: {
          active: true,
          enableBlur: true,
          enableSepia: true,
          enableEmbross: true,
          enableOpacity: true,
          enableSharpen: true,
          enableGreyscale: false,
        },
        enableClipart: {
          active: true,
          selectClipartGroups: [2],
        },
        fileUploadScript: {
          uploadMaxWidth: 100,
          uploadMinWidth: 100,
          customWithGraphical: false,
          allowedUploadsExtentions: ["png"],
        },
        enableUploadImage: true,
      },
      signPart: {
        doublePart: {
          label: "Switch Face",
          part1: "Face A",
          part2: "Face B",
          active: false,
          enableCopyDesignFromSide: true,
        },
      },
      customizerOptions: {
        measurementUnit: "cm",
        desktopColumnOrder: "right",
        showDayNightButton: "display",
        showHideMeasurements: "both",
        decimalFormatMeasurements: "with-decimal",
      },
    },
    languageImages: {
      images: {
        icon: "",
        resetAllIcon: "",
        cancelAnAction: "",
        changeIconSize: "",
        changeIconText: "",
        changeIconColor: "",
        changeIconImage: "",
        changeIconShape: "",
        changeIconShare: "",
        changeIconBorder: "",
        changeIconImport: "",
        changeIconPreview: "",
        changeIconProduct: "",
        changeIconMaterial: "",
        changeIconSizeMenu: "",
        changeIconSaveProject: "",
        changeIconFixingMethod: "",
        changeIconShareSideBar: "",
      },
      visualizer: {
        textHelp: "Help",
        textSave: "Save",
        textSize: "Size",
        textColor: "Color",
        textImage: "Image",
        textShape: "Shape",
        textShare: "Share",
        thickness: "Thickness",
        customSize: "Custom Size",
        textBorder: "Border",
        textImport: "Import",
        textPreview: "Preview",
        textProduct: "Product",
        titleHeader: "Plastic Signs",
        textDownload: "Download",
        textMaterial: "Material",
        textButtonBack: "Undo",
        textButtonNext: "Redo",
        textOptionText: "Text",
        textButtonFinish: "Finish",
        textButtonRefresh: "Restart all",
        textFixingMethods: "Fixing Methods",
        customSizeButtonDone: "Done",
      },
      uploadDesign: {
        link: "",
        activate: false,
        phraseSubmitCustom: "Take a customization",
      },
    },
  },
  materials: [],
};

export default class ConfigurationService {
  static async getConfigurations(sessionId: string): Promise<any[] | null> {
    try {
      return await prisma.configuration.findMany({
        where: {
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving configurations:", error);
      return Promise.reject(null);
    }
  }

  static async getConfiguration(
    id: number,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.configuration.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving configuration:", error);
      return Promise.reject(null);
    }
  }

  static async updateConfiguration(
    configuration: ConfigurationType,
    sessionId: string,
  ): Promise<any | null> {
    const { id, ...data } = configuration;
    try {
      return await prisma.configuration.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: data,
      });
    } catch (error) {
      console.error("Error updating configuration:", error);
      return Promise.reject(null);
    }
  }

  static async deleteConfiguration(
    id: number,
    sessionId: string,
  ): Promise<void> {
    try {
      await prisma.configuration.delete({
        where: {
          id: id,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error deleting configuration:", error);
      return Promise.reject(null);
    }
  }

  static async addConfiguration(
    configuration: ConfigurationType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.configuration.create({
        data: {
          ...configuration,
          sessionId: sessionId,
          data: initialData
        },
      });
    } catch (error) {
      console.error("Error adding configuration:", error);
      return Promise.reject(null);
    }
  }
}
