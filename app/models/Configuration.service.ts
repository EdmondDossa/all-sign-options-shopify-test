import prisma from "~/db.server";
import type { ConfigurationType } from "~/types/ConfigurationType";
import { ensureClassicSimplifiedBuilderData } from "~/utils/simplified-builder-data";

const cloneObject = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const initialData = {
  settings: {
    generals: {
      upload: {
        allowFormat: "jpg,jpeg,png,gif,bmp,tiff,webp,psd,ai,svg,eps,pdf",
        maxUploadSize: 5000,
        maxUploadNumber: 5,
        zipFiles: {
          active: false,
          zipOutFolderPrefix: "aso_",
        },
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
        hidePricing: false,
        showRecapAfterFinish: true,
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
        textType: "normal",
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
          uploadMaxWidth: 200,
          uploadMinWidth: 10,
          customWithGraphical: false,
          enableSizeRestriction: false,
          allowedUploadsExtentions: ["png"],
        },
        enableCustomColor: true,
        enableUploadImage: true,
        enableDownloadImage: true,
        scenes: [],
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
        desktopColumnOrder: "right",
        showHideMeasurements: "both",
        decimalFormatMeasurements: "with-decimal",
        showThicknessPricing: false,
        expandThicknessByDefault: false,
        expandPredefinedSizesByDefault: false,
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
        textAdditonnalOptionsHeader: "Additionnals Options",
        textButtonAdditonnalOptions: "Add Option",
        phraseImageSizeRestrictionError: "The image size must be between",
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

const simpleMaterials: any = [
  {
    data: {
      sizes: {
        allSizes: [
          {
            label: "100x50",
            width: 100,
            height: 50,
            basePrice: 0,
            charPrice: 0,
            isDefault: true,
            textNumber: 0,
            maxTextChar: -1,
            startPriceAtChar: 0,
          },
          {
            label: "100x100",
            width: 100,
            height: 100,
            basePrice: 0,
            charPrice: 0,
            isDefault: false,
            textNumber: 0,
            maxTextChar: -1,
            startPriceAtChar: 0,
          },
          {
            label: "150x100",
            width: 150,
            height: 100,
            basePrice: 0,
            charPrice: 0,
            isDefault: false,
            textNumber: 0,
            maxTextChar: -1,
            startPriceAtChar: 0,
          },
          {
            label: "200x100",
            width: 200,
            height: 100,
            basePrice: 0,
            charPrice: 0,
            isDefault: false,
            textNumber: 0,
            maxTextChar: -1,
            startPriceAtChar: 0,
          },
          {
            label: "250x100",
            width: 250,
            height: 100,
            basePrice: 0,
            charPrice: 0,
            isDefault: false,
            textNumber: 0,
            maxTextChar: -1,
            startPriceAtChar: 0,
          },
          {
            label: "250x150",
            width: 250,
            height: 150,
            basePrice: 0,
            charPrice: 0,
            isDefault: false,
            textNumber: 0,
            maxTextChar: -1,
            startPriceAtChar: 0,
          },
          {
            label: "300x100",
            width: 300,
            height: 100,
            basePrice: 0,
            charPrice: 0,
            isDefault: false,
            textNumber: 0,
            maxTextChar: -1,
            startPriceAtChar: 0,
          },
          {
            label: "300x150",
            width: 300,
            height: 150,
            basePrice: 0,
            charPrice: 0,
            isDefault: false,
            textNumber: 0,
            maxTextChar: -1,
            startPriceAtChar: 0,
          },
          {
            label: "300x200",
            width: 300,
            height: 200,
            basePrice: 0,
            charPrice: 0,
            isDefault: false,
            textNumber: 0,
            maxTextChar: -1,
            startPriceAtChar: 0,
          },
          {
            label: "400x100",
            width: 400,
            height: 100,
            basePrice: 0,
            charPrice: 0,
            isDefault: false,
            textNumber: 0,
            maxTextChar: -1,
            startPriceAtChar: 0,
          },
        ],
        thickness: {
          active: false,
          values: [],
        },
        customSize: {
          width: {
            max: 400,
            min: 100,
            label: "Width",
          },
          active: true,
          height: {
            max: 400,
            min: 50,
            label: "Height",
          },
          pricings: {
            type: "unit",
            unit: {
              basePrice: 0,
              surface: 0,
              charPrice: 0,
            },
            range: [],
            rangePricingPerUnit: false,
          },
        },
      },
      colors: {
        allColors: [
          {
            name: "White",
            pattern: {
              url: "",
              active: false,
              codeHex: "#FFFFFF",
            },
            prevImg: "",
            isDefault: false,
            textColor: {
              name: "",
              active: false,
              codeHex: "#000000",
              sameForBorder: false,
            },
            additionalPrice: 0,
          },
          {
            name: "Black",
            pattern: {
              url: "",
              active: false,
              codeHex: "#000000",
            },
            prevImg: "",
            isDefault: true,
            textColor: {
              name: "",
              active: false,
              codeHex: "#000000",
              sameForBorder: false,
            },
            additionalPrice: 0,
          },
          {
            name: "Blue",
            pattern: {
              url: "",
              active: false,
              codeHex: "#004f86",
            },
            prevImg: "",
            isDefault: false,
            textColor: {
              name: "",
              active: false,
              codeHex: "#000000",
              sameForBorder: false,
            },
            additionalPrice: 0,
          },
          {
            name: "Red",
            pattern: {
              url: "",
              active: false,
              codeHex: "#c4271d",
            },
            prevImg: "",
            isDefault: false,
            textColor: {
              name: "",
              active: false,
              codeHex: "#000000",
              sameForBorder: false,
            },
            additionalPrice: 0,
          },
          {
            name: "Green",
            pattern: {
              url: "",
              active: false,
              codeHex: "#009251",
            },
            prevImg: "",
            isDefault: false,
            textColor: {
              name: "",
              active: false,
              codeHex: "#000000",
              sameForBorder: false,
            },
            additionalPrice: 0,
          },
          {
            name: "Yellow",
            pattern: {
              url: "",
              active: false,
              codeHex: "#fee900",
            },
            prevImg: "",
            isDefault: false,
            textColor: {
              name: "",
              active: false,
              codeHex: "#000000",
              sameForBorder: false,
            },
            additionalPrice: 0,
          },
          {
            name: "Gray",
            pattern: {
              url: "",
              active: false,
              codeHex: "#4f5756",
            },
            prevImg: "",
            isDefault: false,
            textColor: {
              name: "",
              active: false,
              codeHex: "#000000",
              sameForBorder: false,
            },
            additionalPrice: 0,
          },
          {
            name: "Purple",
            pattern: {
              url: "",
              active: false,
              codeHex: "#554585",
            },
            prevImg: "",
            isDefault: false,
            textColor: {
              name: "",
              active: false,
              codeHex: "#000000",
              sameForBorder: false,
            },
            additionalPrice: 0,
          },
          {
            name: "Orange",
            pattern: {
              url: "",
              active: false,
              codeHex: "#e15616",
            },
            prevImg: "",
            isDefault: false,
            textColor: {
              name: "",
              active: false,
              codeHex: "#000000",
              sameForBorder: false,
            },
            additionalPrice: 0,
          },
          {
            name: "Brown",
            pattern: {
              url: "",
              active: false,
              codeHex: "#523d2a",
            },
            prevImg: "",
            isDefault: false,
            textColor: {
              name: "",
              active: false,
              codeHex: "#000000",
              sameForBorder: false,
            },
            additionalPrice: 0,
          },
        ],
        customColors: {
          label: "custom  colors",
          active: false,
          prevImg: "",
        },
      },
      shapes: [
        {
          shapeId: 0,
          isDefault: false,
          additionalPrice: 0,
        },
        {
          shapeId: 1,
          isDefault: true,
          additionalPrice: 0,
        },
        {
          shapeId: 4,
          isDefault: false,
          additionalPrice: 0,
        },
      ],
      borders: {
        settings: {
          colors: [
            {
              name: "White",
              codeHex: "#FFFFFF",
              additionalPrice: 0,
            },
            {
              name: "Black",
              codeHex: "#000000",
              additionalPrice: 0,
            },
            {
              name: "Blue",
              codeHex: "#004f86",
              additionalPrice: 0,
            },
            {
              name: "Red",
              codeHex: "#c4271d",
              additionalPrice: 0,
            },
            {
              name: "Green",
              codeHex: "#009251",
              additionalPrice: 0,
            },
            {
              name: "Yellow",
              codeHex: "#fee900",
              additionalPrice: 0,
            },
            {
              name: "Gray",
              codeHex: "#4f5756",
              additionalPrice: 0,
            },
            {
              name: "Pink",
              codeHex: "#bc4077",
              additionalPrice: 0,
            },
            {
              name: "Purple",
              codeHex: "#554585",
              additionalPrice: 0,
            },
            {
              name: "Orange",
              codeHex: "#e15616",
              additionalPrice: 0,
            },
            {
              name: "Brown",
              codeHex: "#523d2a",
              additionalPrice: 0,
            },
          ],
          enableBorderColor: true,
          enableBorderWidth: false,
          borderColorsLabel: "Borders Colors",
          customColorsPrevImg: "",
        },
        allBorders: [
          {
            isDefault: false,
            excludeSizes: [],
            excludeShapes: [],
            manageBorderId: 0,
            additionalPrice: 0,
          },
          {
            isDefault: false,
            excludeSizes: [],
            excludeShapes: [],
            manageBorderId: 1,
            additionalPrice: 0,
          },
          {
            isDefault: false,
            excludeSizes: [],
            excludeShapes: [],
            manageBorderId: 2,
            additionalPrice: 0,
          },
        ],
      },
      textImages: {
        enableText: true,
        enableImage: false,
      },
      fixingMethods: [
        {
          isDefault: true,
          excludeSizes: [],
          excludeShapes: [],
          fixingMethodId: 0,
          additionalPrice: 0,
        },
        {
          isDefault: false,
          excludeSizes: [],
          excludeShapes: [],
          fixingMethodId: 2,
          additionalPrice: 0.2,
        },
        {
          isDefault: false,
          excludeSizes: [],
          excludeShapes: [],
          fixingMethodId: 3,
          additionalPrice: 4.7,
        },
        {
          isDefault: false,
          excludeSizes: [],
          excludeShapes: [],
          fixingMethodId: 4,
          additionalPrice: 12.8,
        },
        {
          isDefault: false,
          excludeSizes: [],
          excludeShapes: [],
          fixingMethodId: 6,
          additionalPrice: 4.8,
        },
        {
          isDefault: false,
          excludeSizes: [],
          excludeShapes: [],
          fixingMethodId: 5,
          additionalPrice: 1.2,
        },
        {
          isDefault: false,
          excludeSizes: [],
          excludeShapes: [],
          fixingMethodId: 9,
          additionalPrice: 1.2,
        },
      ],
      additionalOptions: [
        {
          icon: "/aso_default_files/frosted-1716291683175.svg",
          title: "Frosted",
          description: "",
          options: [],
        },
      ],
    },
    icon: "",
    name: "Default material",
    discounts: [],
    type: "simple",
    popImg: "",
    description: "Default material data for simple configuration",
  },
];

const advanceMaterials: any = [
  {
    data: [
      {
        icon: "/aso_default_files/im_stainlessSteel_sign.webp",
        name: "Label tags",
        options: [
          {
            icon: "/aso_default_files/stainless_steel1.png",
            name: "Stainless steel",
            size: {
              width: 28,
              height: 49,
              basePrice: 0,
              charPrice: 0,
              maxTextChar: -1,
              startPriceAtChar: 1,
            },
            color: {
              name: "Stainless steel",
              codeHex: "",
              prevImg: "",
            },
            image: "/aso_default_files/stainless_steel1-prev.png",
            shapeId: 10,
            isDefault: true,
            description: "Stainless steel",
            fixingMethods: [5, 2, 15, 18],
            additionalPrice: 6.49,
          },
          {
            icon: "/aso_default_files/stainless_steel2.png",
            name: "Stainless steel",
            size: {
              width: 30,
              height: 30,
              basePrice: 0,
              charPrice: 0,
              maxTextChar: -1,
              startPriceAtChar: 1,
            },
            color: {
              name: "Stainless steel",
              codeHex: "",
              prevImg: "",
            },
            image: "/aso_default_files/stainless_steel2-prev.png",
            shapeId: 0,
            isDefault: false,
            description: "Stainless steel",
            fixingMethods: [5, 2, 15, 18],
            additionalPrice: 5.99,
          },
          {
            icon: "/aso_default_files/stainless_steel3.png",
            name: "Stainless steel",
            size: {
              width: 60,
              height: 18,
              basePrice: 0,
              charPrice: 0,
              maxTextChar: -1,
              startPriceAtChar: 1,
            },
            color: {
              name: "Stainless steel",
              codeHex: "",
              prevImg: "",
            },
            image: "/aso_default_files/stainless_steel3-prev.png",
            shapeId: 3,
            isDefault: false,
            description: "Stainless steel",
            fixingMethods: [0, 2, 1],
            additionalPrice: 8.29,
          },
          {
            icon: "/aso_default_files/stainless_steel4.png",
            name: "Stainless steel",
            size: {
              width: 60,
              height: 30,
              basePrice: 0,
              charPrice: 0,
              maxTextChar: -1,
              startPriceAtChar: 1,
            },
            color: {
              name: "Stainless steel",
              codeHex: "",
              prevImg: "",
            },
            image: "/aso_default_files/stainless_steel4-prev.png",
            shapeId: 3,
            isDefault: false,
            description: "Stainless steel",
            fixingMethods: [0, 2, 1],
            additionalPrice: 8.29,
          },
          {
            icon: "/aso_default_files/stainless_steel5.png",
            name: "Stainless steel",
            size: {
              width: 50,
              height: 50,
              basePrice: 0,
              charPrice: 0,
              maxTextChar: -1,
              startPriceAtChar: 1,
            },
            color: {
              name: "Stainless steel",
              codeHex: "",
              prevImg: "",
            },
            image: "/aso_default_files/stainless_steel5-prev.png",
            shapeId: 0,
            isDefault: false,
            description: "Stainless steel",
            fixingMethods: [0, 1, 2],
            additionalPrice: 9.49,
          },
          {
            icon: "/aso_default_files/stainless_steel6.png",
            name: "Stainless steel",
            size: {
              width: 80,
              height: 25,
              basePrice: 0,
              charPrice: 0,
              maxTextChar: -1,
              startPriceAtChar: 1,
            },
            color: {
              name: "Stainless steel",
              codeHex: "",
              prevImg: "",
            },
            image: "/aso_default_files/stainless_steel6-prev.png",
            shapeId: 3,
            description: "Stainless steel",
            fixingMethods: [0, 1, 2],
            additionalPrice: 10.69,
          },
          {
            icon: "/aso_default_files/stainless_steel7.png",
            name: "Stainless steel",
            size: {
              width: 100,
              height: 40,
              basePrice: 0,
              charPrice: 0,
              maxTextChar: -1,
              startPriceAtChar: 1,
            },
            color: {
              name: "Stainless steel",
              codeHex: "",
              prevImg: "",
            },
            image: "/aso_default_files/stainless_steel7-prev.png",
            shapeId: 0,
            isDefault: false,
            description: "Stainless steel",
            fixingMethods: [0, 1, 2],
            additionalPrice: 14.29,
          },
          {
            icon: "/aso_default_files/stainless_steel8.png",
            name: "Stainless steel",
            size: {
              width: 150,
              height: 50,
              basePrice: 0,
              charPrice: 0,
              maxTextChar: -1,
              startPriceAtChar: 1,
            },
            color: {
              name: "Stainless steel",
              codeHex: "",
              prevImg: "",
            },
            image: "/aso_default_files/stainless_steel8-prev.png",
            shapeId: 3,
            isDefault: false,
            description: "Stainless steel",
            fixingMethods: [0, 1, 2],
            additionalPrice: 17.89,
          },
          {
            icon: "/aso_default_files/stainless_steel9.png",
            name: "Stainless steel",
            size: {
              width: 170,
              height: 70,
              basePrice: 0,
              charPrice: 0,
              maxTextChar: -1,
              startPriceAtChar: 1,
            },
            color: {
              name: "Stainless steel",
              codeHex: "",
              prevImg: "",
            },
            image: "/aso_default_files/stainless_steel9-prev.png",
            shapeId: 3,
            isDefault: false,
            description: "Stainless steel",
            fixingMethods: [0, 2, 1],
            additionalPrice: 23.39,
          },
        ],
        isDefault: true,
        description: "",
      },
    ],
    icon: "",
    name: "Default material",
    discounts: [],
    type: "advance",
    popImg: "",
    description: "Default material data for advance configuration",
  },
];

const normalizeNcpcProductType = (
  value?: string | null,
): "neon" | "channel" | null => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (normalized === "neon" || normalized === "channel") {
    return normalized;
  }

  return null;
};

const normalizeNcpcPricingMode = (value?: string | null) => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (normalized === "fixing-height") return "fixed-height";
  if (normalized === "fixing-width") return "fixed-width";
  return normalized;
};

const getObjectData = (value: any) => {
  if (!value) return null;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }

  return typeof value === "object" ? value : null;
};

const sortObjectDeep = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map(sortObjectDeep);
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = sortObjectDeep(value[key]);
          return acc;
        },
        {} as Record<string, any>,
      );
  }

  return value;
};

const hasSameDataShape = (left: any, right: any) =>
  JSON.stringify(sortObjectDeep(left)) ===
  JSON.stringify(sortObjectDeep(right));

const withReadNcpcMeta = (configuration: any) => {
  if (!configuration) return configuration;
  const data = getObjectData(configuration.data);
  const resolvedProductType =
    normalizeNcpcProductType(configuration.productType) ||
    normalizeNcpcProductType(data?.productType);

  if (!resolvedProductType) {
    return {
      ...configuration,
      data: ensureClassicSimplifiedBuilderData({
        data,
        materialType: configuration?.materialType,
        productType: configuration?.productType,
        pricingMode: configuration?.pricingMode || "frame-fit",
      }),
      pricingMode: "frame-fit",
    };
  }

  const resolvedPricingMode =
    normalizeNcpcPricingMode((configuration as any)?.pricingMode) ||
    normalizeNcpcPricingMode(data?.pricingMode) ||
    "fixed-height";

  return {
    ...configuration,
    productType: resolvedProductType,
    pricingMode: resolvedPricingMode,
  };
};

const withReadAndPersistConfiguration = async (
  configuration: any,
  sessionId: string,
) => {
  if (!configuration) return configuration;

  const rawData = getObjectData(configuration.data);
  const hasClassicModularShape =
    String(rawData?.configuratorMeta?.structure || "")
      .trim()
      .toLowerCase() === "modular-classic" ||
    Boolean(String(rawData?.materialType || "").trim()) ||
    (Boolean(String(rawData?.productType || "").trim()) &&
      !["neon", "channel"].includes(
        String(rawData?.productType || "")
          .trim()
          .toLowerCase(),
      ));

  if (hasClassicModularShape) {
    const normalizedData = ensureClassicSimplifiedBuilderData({
      data: rawData || {},
      materialType: rawData?.materialType || configuration?.materialType,
      productType: rawData?.productType || configuration?.productType,
      pricingMode: "frame-fit",
    });
    const normalizedProductType =
      String(rawData?.productType || configuration?.productType || "").trim() ||
      null;

    const needsPersistence =
      !hasSameDataShape(rawData || {}, normalizedData) ||
      configuration?.productType !== normalizedProductType ||
      configuration?.pricingMode !== "frame-fit";

    if (needsPersistence) {
      try {
        await prisma.configuration.update({
          where: {
            id: configuration.id,
            sessionId,
          },
          data: {
            data: normalizedData,
            productType: normalizedProductType,
            pricingMode: "frame-fit",
          },
        });
      } catch (error) {
        console.error(
          "Error persisting normalized classic configuration:",
          error,
        );
      }
    }

    return {
      ...configuration,
      data: normalizedData,
      productType: normalizedProductType,
      pricingMode: "frame-fit",
    };
  }

  const resolvedProductType =
    normalizeNcpcProductType(configuration.productType) ||
    normalizeNcpcProductType(rawData?.productType);

  if (resolvedProductType) {
    return withReadNcpcMeta(configuration);
  }

  const normalizedData = ensureClassicSimplifiedBuilderData({
    data: rawData || {},
    materialType: configuration?.materialType,
    productType: configuration?.productType,
    pricingMode: configuration?.pricingMode || "frame-fit",
  });

  if (!hasSameDataShape(rawData || {}, normalizedData)) {
    try {
      await prisma.configuration.update({
        where: {
          id: configuration.id,
          sessionId,
        },
        data: {
          data: normalizedData,
        },
      });
    } catch (error) {
      console.error("Error persisting migrated classic configuration:", error);
    }
  }

  return {
    ...configuration,
    data: normalizedData,
    pricingMode: "frame-fit",
  };
};

export default class ConfigurationService {
  static async getConfigurations(
    sessionId: string,
    includeTempletes = false,
  ): Promise<any[] | null> {
    try {
      const configurations = await prisma.configuration.findMany({
        where: {
          sessionId: sessionId,
        },
        include: includeTempletes
          ? {
              templates: true,
            }
          : undefined,
        orderBy: {
          id: "asc",
        },
      });

      return await Promise.all(
        configurations.map((configuration) =>
          withReadAndPersistConfiguration(configuration, sessionId),
        ),
      );
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
      const configuration = await prisma.configuration.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        },
        include: { templates: true },
      });

      return await withReadAndPersistConfiguration(configuration, sessionId);
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
      const configuration = await prisma.configuration.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        },
      });

      return await withReadAndPersistConfiguration(configuration, sessionId);
    } catch (error) {
      console.error("Error retrieving configuration:", error);
      return Promise.reject(null);
    }
  }

  /**
   * Normalize product ID for comparison (handles gid://shopify/Product/123 or numeric 123)
   */
  static normalizeProductId(productId: string | number): string {
    if (typeof productId === "number") return String(productId);
    const match = String(productId).match(
      /^(?:gid:\/\/shopify\/Product\/)?(\d+)$/,
    );
    return match ? match[1] : String(productId);
  }

  /**
   * Find another configuration (same session) that already has this product linked.
   * Returns { configId, configName } if found, null otherwise.
   * Used to enforce: one product = one configuration.
   */
  static async findConfigurationContainingProduct(
    sessionId: string,
    productId: string | number,
    excludeConfigurationId?: number,
  ): Promise<{ configId: number; configName: string } | null> {
    const normalizedId = this.normalizeProductId(productId);
    const configs = await prisma.configuration.findMany({
      where: {
        sessionId,
        ...(excludeConfigurationId
          ? { id: { not: excludeConfigurationId } }
          : {}),
      },
      select: { id: true, name: true, product: true },
    });
    for (const config of configs) {
      const productList = Array.isArray(config.product) ? config.product : [];
      const hasProduct = productList.some((p: any) => {
        const id = p?.id ?? p;
        return this.normalizeProductId(id) === normalizedId;
      });
      if (hasProduct) return { configId: config.id, configName: config.name };
    }
    return null;
  }

  static async updateConfiguration(
    configuration: ConfigurationType,
    sessionId: string,
  ): Promise<any | null> {
    const {
      id,
      products,
      templates,
      materialType,
      productFamily,
      productType,
      pricingMode,
      ...configData
    } = configuration;
    const normalizedNcpcProductType = normalizeNcpcProductType(
      productType as any,
    );
    const isNcpcConfiguration = Boolean(normalizedNcpcProductType);
    const productList = Array.isArray(products) ? products : [];
    for (const p of productList) {
      const productId = (p as any)?.id ?? (p as any);
      if (productId == null) continue;
      const other = await this.findConfigurationContainingProduct(
        sessionId,
        productId,
        id,
      );
      if (other) {
        const msg = `This product is already linked to the configuration "${other.configName}". Remove it from this configuration before adding it to another one.`;
        return Promise.reject(new Error(msg));
      }
    }
    try {
      const normalizedData = isNcpcConfiguration
        ? {
            ...(getObjectData((configData as any).data) || {}),
          }
        : ensureClassicSimplifiedBuilderData({
            data: getObjectData((configData as any).data) || {},
            materialType: materialType as any,
            productFamily: productFamily as any,
            productType: productType as any,
            pricingMode: "frame-fit",
          });

      const normalizedPricingMode = isNcpcConfiguration
        ? normalizeNcpcPricingMode(
            pricingMode || (normalizedData as any)?.pricingMode,
          ) || "fixed-height"
        : "frame-fit";

      console.log("updateConfiguration - Saving materialType:", materialType);
      console.log("updateConfiguration - Saving productType:", productType);
      console.log(
        "updateConfiguration - Saving pricingMode:",
        normalizedPricingMode,
      );
      return await prisma.configuration.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: {
          ...configData,
          icon: String((configData as any)?.icon ?? ""),
          popupImg: String((configData as any)?.popupImg ?? ""),
          data: normalizedData,
          product: products, // Save products array in DB field 'product' (legacy column name)
          materialType: materialType, // Explicitly preserve materialType
          productType: normalizedNcpcProductType || productType, // Explicitly preserve productType
          pricingMode: normalizedPricingMode,
        },
      });
    } catch (error) {
      console.error("Error updating configuration:", error);
      return Promise.reject(error);
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
    const {
      products,
      templates,
      materialType,
      productFamily,
      productType,
      pricingMode,
      ...configData
    } = configuration;
    const normalizedNcpcProductType = normalizeNcpcProductType(
      productType as any,
    );
    const isNcpcConfiguration = Boolean(normalizedNcpcProductType);
    const productList = Array.isArray(products) ? products : [];
    for (const p of productList) {
      const productId = (p as any)?.id ?? (p as any);
      if (productId == null) continue;
      const other = await this.findConfigurationContainingProduct(
        sessionId,
        productId,
      );
      if (other) {
        const msg = `This product is already linked to the configuration "${other.configName}". Remove it from this configuration before adding it to another one.`;
        return Promise.reject(new Error(msg));
      }
    }
    try {
      let dataForCreate: any = initialData;
      const normalizedPricingMode = isNcpcConfiguration
        ? normalizeNcpcPricingMode(
            pricingMode ||
              (getObjectData((configData as any).data) as any)?.pricingMode,
          ) || "fixed-height"
        : "frame-fit";

      if (isNcpcConfiguration) {
        const incomingData = getObjectData((configData as any).data);
        dataForCreate = {
          ...(incomingData || {}),
        };
      } else {
        dataForCreate = ensureClassicSimplifiedBuilderData({
          data: getObjectData((configData as any).data) || {
            settings: cloneObject(initialData.settings),
          },
          materialType: materialType as any,
          productFamily: productFamily as any,
          productType: productType as any,
          pricingMode: "frame-fit",
        });
      }

      return await prisma.configuration.create({
        data: {
          ...configData,
          icon: String((configData as any)?.icon ?? ""),
          popupImg: String((configData as any)?.popupImg ?? ""),
          product: products, // Save products array in DB field 'product' (legacy column name)
          materialType: materialType, // Save materialType
          productType: normalizedNcpcProductType || productType, // Save productType
          pricingMode: normalizedPricingMode,
          sessionId: sessionId,
          data: dataForCreate,
        },
      });
    } catch (error) {
      console.error("Error adding configuration:", error);
      return Promise.reject(error);
    }
  }

  static async duplicateConfiguration(
    configuration: ConfigurationType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      const { id, products, templates, ...configData } = configuration;

      return await prisma.configuration.create({
        data: {
          ...configData,
          product: products,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error duplicating configuration:", error);
      return Promise.reject(null);
    }
  }
}
