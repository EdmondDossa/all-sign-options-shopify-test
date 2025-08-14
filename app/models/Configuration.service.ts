import prisma from "~/db.server";
import { ConfigurationType } from "~/types/ConfigurationType";

const initialData = {
  settings: {
    generals: {
      upload:{
        allowFormat: "jpg,jpeg,png,gif,bmp,tiff,webp,psd,ai,svg,eps,pdf",
        maxUploadSize: 5000,
        maxUploadNumber: 5,
        zipFiles: {
          active: false,
          zipOutFolderPrefix: "aso_",
        }
      },
      mobile: {
        showNavigatorMenu: "off",
        showNavigationMenuFirst: "yes",
        mobileSelectionOptionsDisplay: "horizontally",
      },
      output: {
        waterMark: "",
        filesFormat: "png",
        zipOutputFiles: {
          active: true,
          zipOutFolderPrefix: "aso_",
        },
        designComposition: true,
      },
      product: {
        designFromScratch: true,
        redirectToCheckOutPage: false,
        displayRecapsOnCheckout: false,
        hidePricing:false,
        showRecapAfterFinish:true,
        redirectAfterAddingToCart: true,
        hideDesignButtonsOnShopPage: false,
        hideAddToCartButtonOnShopPage: true,
        hideAddToCartButtonOnDetailPage: true,
      },
    },
    themeColors: {
      skin: "default",
      colors: {
        bars: {
          help: {
            textColor: "#ffffff",
            borderColor: "#016464",
            hoverTextColor: "#ffffff",
            backgroundColor: "#016464",
            hoverBorderColor: "#016464",
            hoverBackgroundColor: "#016464",
          },
          price: {
            textColor: "#000000",
            textAfterColor: "#000000",
            backgroundColor: "#ffffff",
            textBeforeColor: "#000000",
          },
          reset: {
            textColor: "#000000",
            borderColor: "#ffffff",
            hoverTextColor: "#dd3232",
            modalTextColor: "#000000",
            backgroundColor: "#ffffff",
            hoverBorderColor: "#f4f8fa",
            hoverBackgroundColor: "#f4f8fa",
            modalBackgroundColor: "#000000",
            modalNoButtonTextColor: "#ffffff",
            modalYesButtonTextColor: "#000000",
            modalContainerBackground: "#ffffff",
            modalNoButtonBackgroundColor: "#dc2626",
            modalYesButtonBackgroundColor: "#f4f8fa",
          },
          preview: {
            textColor: "#000000",
            borderColor: "#ffffff",
            hoverTextColor: "#016464",
            backgroundColor: "#ffffff",
            hoverBorderColor: "#f4f8fa",
            hoverBackgroundColor: "#f4f8fa",
          },
          undoRedo: {
            textColor: "#000000",
            borderColor: "#ffffff",
            hoverTextColor: "#016464",
            backgroundColor: "#ffffff",
            hoverBorderColor: "#f4f8fa",
            disabledTextColor: "#c3cfd6",
            hoverBackgroundColor: "#f4f8fa",
            disabledBackgroundColor: "#ffffff",
          },
          titleColor: "#000000",
          backgroundColor: "#ffffff",
        },
        canvas: {
          borderColor: "#c3cfd6",
          backgroundColor: "#f4f8fa",
        },
        recaps: {
          backgroundColor: "#ffffff",
          headerTextColor: "#ffffff",
          optionTextColor: "#000000",
          optionBorderColor: "#eef3f6",
          buttonEditTextColor: "#ffffff",
          optionHoverTextColor: "#000000",
          buttonFinishTextColor: "#14213d",
          headerBackgroundColor: "#058585",
          optionHoverBorderColor: "#eef3f6",
          buttonAddToCartTextColor: "#14213d",
          buttonEditHoverTextColor: "#f4f8fa",
          buttonEditBackgroundColor: "#016464",
          buttonFinishHoverTextColor: "#313e52",
          optionHoverBackgroundColor: "#eef3f6",
          buttonFinishBackgroundColor: "#febd52",
          buttonAddToCartHoverTextColor: "#313e52",
          buttonAddToCartBackgroundColor: "#febd52",
          buttonEditHoverBackgroundColor: "#058585",
          buttonFinishHoverBackgroundColor: "#fcac29",
          buttonAddToCartHoverBackgroundColor: "#fcac29",
        },
        objectsOptions: {
          edit: {
            textColor: "#000000",
            buttonColor: "#ffffff",
            hoverTextColor: "#ffffff",
            hoverButtonColor: "#787878",
          },
          clone: {
            textColor: "#000000",
            buttonColor: "#ffffff",
            hoverTextColor: "#ffffff",
            hoverButtonColor: "#787878",
          },
          center: {
            textColor: "#000000",
            buttonColor: "#ffffff",
            hoverTextColor: "#ffffff",
            hoverButtonColor: "#787878",
          },
          delete: {
            textColor: "#dd3232",
            buttonColor: "#ffffff",
            hoverTextColor: "#dd3232",
            hoverButtonColor: "#787878",
          },
          backgroundColor: "#ffffff",
        },
        optionsSideBar: {
          options: {
            modals: {
              option: {
                textColor: "#000000",
                hoverTextColor: "#000000",
                activeTextColor: "#016464",
                hoverBackgroundColor: "#eef3f6",
              },
              buttons: {
                textColor: "#ffffff",
                hoverTextColor: "#ffffff",
                backgroundColor: "#016464",
                hoverBackgroundColor: "#028383",
              },
              textColor: "#000000",
              backgroundColor: "#ffffff",
              headerTextColor: "#ffffff",
              headerBackgroundColor: "#016464",
            },
            buttons: {
              textColor: "#000000",
              hoverTextColor: "#016464",
              hovertextColor: "#016464",
              backgroundColor: "#ffffff",
              hoverBackgroundColor: "#ffffff",
            },
          },
          backgroundColor: "#eef3f6",
          scrollButtonsTextColor: "#ffffff",
          scrollButtonsHoverTextColor: "#ffffff",
          scrollButtonsBackgroundColor: "#4a4a4a",
          scrollButtonsHoverBackgroundColor: "#74848d",
        },
      },
      customCss: "",
    },
    customizerSign: {
      text: {
        colors: [
          {
            name: "black",
            codeHex: "#000000",
          },
          {
            name: "White",
            codeHex: "#FFFFFF",
          },
          {
            name: "Blue",
            codeHex: "#004f86",
          },
          {
            name: "Red",
            codeHex: "#c4271d",
          },
          {
            name: "Pink",
            codeHex: "#eb3f77",
          },
          {
            name: "Green",
            codeHex: "#009251",
          },
          {
            name: "Yellow",
            codeHex: "#fee900",
          },
          {
            name: "Gray",
            codeHex: "#4f575b",
          },
          {
            name: "Orange",
            codeHex: "#e15616",
          },
          {
            name: "Purple",
            codeHex: "#554585",
          },
          {
            name: "Brown",
            codeHex: "#523d2a",
          },
        ],
        enableBold: true,
        colorsLabel: "Text  Colors",
        enableBorder: true,
        enableItalic: true,
        enableStrike: true,
        colorsPrevImg: "",
        enableOpacity: true,
        selectedFonts: [],
        enableCurvedUp: false,
        enableFontSize: {
          active: true,
          defaultFontSize: 16,
          maximumFontSize: 100,
          minimumFontSize: 4,
        },
        enableOverline: true,
        enableUnderline: true,
        enableCurvedDown: false,
        enableCustomColor: true,
        enableTextAlignment: true,
        textType: "normal"
      },
      images: {
        colors: [],
        filter: {
          active: true,
          enableBlur: true,
          enableSepia: true,
          enableEmbross: true,
          enableOpacity: true,
          enableSharpen: true,
          enableGreyscale: false,
        },
        colorsLabel: "Image Colors",
        colorsPrevImg: "",
        enableClipart: {
          active: true,
          selectClipartGroups: [1],
        },
        fileUploadScript: {
          uploadMaxWidth: 100,
          uploadMinWidth: 100,
          customWithGraphical: false,
          allowedUploadsExtentions: ["png"],
        },
        enableCustomColor: true,
        enableUploadImage: true,
        enableDownloadImage: true,
        scenes:[]
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
        measurementUnit: "mm",
        desktopColumnOrder: "left",
        showHideMeasurements: "both",
        decimalFormatMeasurements: "with-decimal",
        finishButtonPosition:'bottom',
        allowNextButton:false
      },
    },
    languageImages: {
      images: {
        redoIcon: "",
        undoIcon: "",
        resetAllIcon: "",
        cancelAnAction: "",
        changeIconHelp: "",
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
        changeIconDownload: "",
        changeIconMaterial: "",
        changeIconSaveProject: "",
        changeIconFixingMethod: "",
        changeIconShareSideBar: "",
      },
      visualizer: {
        textTop: "Top",
        textHelp: "Help",
        textLeft: "Left",
        textSave: "Save",
        textSize: "Size",
        textAngle: "Angle",
        textColor: "Color",
        textImage: "Image",
        textRight: "Right",
        textShape: "Shape",
        textShare: "Share",
        textWidth: "Width",
        thickness: "Thickness",
        customSize: "Custom Size",
        textBorder: "Border",
        textBottom: "Bottom",
        textHeight: "Height",
        textImport: "Import",
        textPreview: "Preview",
        textProduct: "Product",
        titleHeader: "Design your own sign",
        textDownload: "Download",
        textMaterial: "Material",
        textPosition: "Position",
        textAddToCart: "Add To Cart",
        textAfterPrice: "TVA Include",
        textButtonBack: "Undo",
        textButtonNext: "Redo",
        textCanvasEdit: "Edit",
        textOptionText: "Text",
        textAdditonnalOptionsHeader: 'Additionnals Options',
        textButtonAdditonnalOptions: 'Add Option',
        textBeforePrice: "",
        textCanvasClone: "Clone",
        textButtonFinish: "Finish",
        textCanvasDelete: "delete",
        textButtonRefresh: "Restart all",
        textCanvasCenterH: "centerH",
        textCanvasCenterV: "centerV",
        textFixingMethods: "Fixing Methods",
        customSizeButtonDone: "Done",
      },
      uploadDesign: {
        link: "",
        activate: false,
        helpContent: "",
        phraseSubmitCustom: "Take a customization",
      },
    },
  },
  materials: [],
  additionalOptions: [],
};

export default class ConfigurationService {
  static async getConfigurations(sessionId: string,includeTempletes = false): Promise<any[] | null> {
    try {
      return await prisma.configuration.findMany({
        where: {
          sessionId: sessionId,
        },
        orderBy: {
          id: "asc",
        }
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
        include: {templates: true}
      });
    } catch (error) {
      console.error("Error retrieving configuration:", error);
      return Promise.reject(null);
    }
  }



  static async getConfigurationWithoutTemplates(
    id: number,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.configuration.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        }
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
    const { id, products, templates, ...configData } = configuration;
    try {
      return await prisma.configuration.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: {
          ...configData,
          product: products, // Save products array as product field
        },
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
      const { products, templates, ...configData } = configuration;
      return await prisma.configuration.create({
        data: {
          ...configData,
          product: products, // Save products array as product field
          sessionId: sessionId,
          data: initialData,
        },
      });
    } catch (error) {
      console.error("Error adding configuration:", error);
      return Promise.reject(null);
    }
  }

  static async duplicateConfiguration(
    configuration: ConfigurationType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.configuration.create({
        data: {
          ...configuration,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error duplicating configuration:", error);
      return Promise.reject(null);
    }
  }
}
