const configs = [
  {
    type: "neon",
    name: "Neon Letter Signs",
    description: "Neon and Flex LED Neon Letter Signs.",
    demoLink: "https://demos.signsdesigner.us/design-page/design/57/#/",
    pricings: ["fixing-height", "fixing-width", "advanced", "frame-fit"],
    previewImage:
      ncpcData.ncpc_assets_url + "/images/configs-previews/neon.webp",
    data: {
      "fixing-width": {
        title: "Fixed Width Neon",
        productType: "neon",
        pricingMode: "fixed-width",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              autoSwitching: false,
              sizes: [
                {
                  label: "Small",
                  description: "Maximum 60cm (2ft) in length",
                  width: 60,
                  numberLines: 2,
                  isDefault: true,
                  minTextChar: 1,
                  maxLineChar: 10,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Standard",
                  description: "Maximum 90cm (3ft) in length",
                  width: 90,
                  numberLines: 2,
                  isDefault: false,
                  minTextChar: 3,
                  maxLineChar: 14,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  description: "Maximum 120cm (4ft) in length",
                  width: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  description: "Maximum 120cm (4ft) in length",
                  width: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "SIMPLE",
                prices: [
                  [
                    {
                      basicPrice: 250,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 70,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 350,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 500,
                      letterPrice: 12,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 600,
                      letterPrice: 17,
                    },
                    {
                      basicPrice: 250,
                      letterPrice: 15,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 15,
                      nbCharStartPrice: 0,
                    },
                  ],
                ],
              },
            ],
            colorOptions: {
              label: "",
              description: "",
              glowEffect: "light-color",
              colors: [
                {
                  label: "Orange",
                  type: "simple",
                  codeHex: ["#FFA500"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: true,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Green",
                  type: "simple",
                  codeHex: ["#41F63F"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Yellow",
                  type: "simple",
                  codeHex: ["#F7CC19"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Red",
                  type: "simple",
                  codeHex: ["#EB3F34"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Blue",
                  type: "simple",
                  codeHex: ["#54B5F6"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Outline",
                  url: ncpcData.ncpc_assets_url + "/fonts/outline.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: true,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Allura",
                  url: ncpcData.ncpc_assets_url + "/fonts/Allura-Regular.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Avante",
                  url: ncpcData.ncpc_assets_url + "/fonts/avante.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Corinthia",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/Corinthia-Regular.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Melbourne",
                  url: ncpcData.ncpc_assets_url + "/fonts/Melbourne_reg.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Monaco",
                  url: ncpcData.ncpc_assets_url + "/fonts/Monaco-Regular.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Signature",
                  url: ncpcData.ncpc_assets_url + "/fonts/signature.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Neon",
                  url: ncpcData.ncpc_assets_url + "/fonts/neon.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Cut To Shape",
                  description:
                    "Backboard is cut closely around the outside of your wording",
                  type: "cut-to-shape",
                  isDefault: true,
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/cut-to-shape.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4, 5],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4, 5],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4, 5],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  previewImg: "",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  previewImg: "",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  popupImg: "",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>{{/additonal_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              colors: "",
              backboards: "",
              materials: "",
              jackets: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "colors",
              "materials",
              "jackets",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
      "fixed-height": {
        title: "Fixed Height Neon",
        productType: "neon",
        pricingMode: "fixed-height",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              autoSwitching: false,
              sizes: [
                {
                  label: "Small",
                  description: "Maximum 60cm (2ft) in length",
                  height: 60,
                  numberLines: 2,
                  isDefault: true,
                  minTextChar: 1,
                  maxLineChar: 10,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Standard",
                  description: "Maximum 90cm (3ft) in length",
                  height: 90,
                  numberLines: 2,
                  isDefault: false,
                  minTextChar: 3,
                  maxLineChar: 14,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  description: "Maximum 120cm (4ft) in length",
                  height: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  description: "Maximum 120cm (4ft) in length",
                  height: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "SIMPLE",
                prices: [
                  [
                    {
                      basicPrice: 250,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 70,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 350,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 500,
                      letterPrice: 12,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 600,
                      letterPrice: 17,
                    },
                    {
                      basicPrice: 250,
                      letterPrice: 15,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 15,
                      nbCharStartPrice: 0,
                    },
                  ],
                ],
              },
            ],
            colorOptions: {
              label: "",
              description: "",
              glowEffect: "light-color",
              colors: [
                {
                  label: "Orange",
                  type: "simple",
                  codeHex: ["#FFA500"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: true,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Green",
                  type: "simple",
                  codeHex: ["#41F63F"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Yellow",
                  type: "simple",
                  codeHex: ["#F7CC19"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Red",
                  type: "simple",
                  codeHex: ["#EB3F34"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Blue",
                  type: "simple",
                  codeHex: ["#54B5F6"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Outline",
                  url: ncpcData.ncpc_assets_url + "/fonts/outline.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: true,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Allura",
                  url: ncpcData.ncpc_assets_url + "/fonts/Allura-Regular.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Avante",
                  url: ncpcData.ncpc_assets_url + "/fonts/avante.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Corinthia",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/Corinthia-Regular.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Melbourne",
                  url: ncpcData.ncpc_assets_url + "/fonts/Melbourne_reg.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Monaco",
                  url: ncpcData.ncpc_assets_url + "/fonts/Monaco-Regular.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Signature",
                  url: ncpcData.ncpc_assets_url + "/fonts/signature.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Neon",
                  url: ncpcData.ncpc_assets_url + "/fonts/neon.ttf",
                  pricing: 0,
                  previewImg: "",
                  isDefault: false,
                  limitFont: [],
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Cut To Shape",
                  description:
                    "Backboard is cut closely around the outside of your wording",
                  type: "cut-to-shape",
                  isDefault: true,
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/cut-to-shape.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4, 5],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4, 5],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4, 5],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  previewImg: "",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  previewImg: "",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  popupImg: "",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>{{/additonal_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              colors: "",
              backboards: "",
              materials: "",
              jackets: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "colors",
              "materials",
              "jackets",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
      advanced: {
        title: "Advanced Neon",
        productType: "neon",
        pricingMode: "advanced",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              minTextChar: 1,
              maxSignWidth: {
                unlimited: true,
                value: 300,
              },
              maxSignHeight: {
                unlimited: false,
                value: 300,
              },
              customSize: {
                activate: true,
                customs: {
                label: "Custom",
                maxRange: 300,
                step: 2,
                showCustomSizeInput: "selected",
                hideOtherSizes: false,
                initialDimensions: {
                  width: 50,
                  height: 50,
                },
                minDimensions: {
                  width: 50,
                  height: 50,
                },
              },
              },
              maxTextCharacters:{
                unlimited:true,
                value:0
            },
            maxNumberOfLines:{
                unlimited:true,
                value:0
            },
            sizes: [
                {
                  label: "Small",
                  scaleMultiplier: 1,
                  isDefault: true,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  scaleMultiplier: 1.5,
                  isDefault: false,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  scaleMultiplier: 2,
                  isDefault: false,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "Basic",
                letterPricingMethod: "per-letter",
                priceMeter: {
                  measurementSide: "width",
                  price: 0,
                  signPart: "all-text",
                  meter: 1,
                },
                signPartForMaterialCost: "Surface(W*H)",
                shippingMethod: "per-surface",
                divisorVolumetric: 5000,
                prices: [
                  {
                    maxSizeRange: 60,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.022,
                    pricePerLetter: 5,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 90,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.021,
                    pricePerLetter: 10,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 120,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.02,
                    pricePerLetter: 15,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 150,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.019,
                    pricePerLetter: 20,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                ],
              },
            ],
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Outline",
                  url: ncpcData.ncpc_assets_url + "/fonts/outline.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: true,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Allura",
                  url: ncpcData.ncpc_assets_url + "/fonts/Allura-Regular.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Avante",
                  url: ncpcData.ncpc_assets_url + "/fonts/avante.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Corinthia",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/Corinthia-Regular.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Melbourne",
                  url: ncpcData.ncpc_assets_url + "/fonts/Melbourne_reg.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Monaco",
                  url: ncpcData.ncpc_assets_url + "/fonts/Monaco-Regular.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Signature",
                  url: ncpcData.ncpc_assets_url + "/fonts/signature.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Neon",
                  url: ncpcData.ncpc_assets_url + "/fonts/neon.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
            colorOptions: {
              label: "",
              glowEffect: "light-color",
              description: "",
              colors: [
                {
                  label: "Green",
                  type: "simple",
                  codeHex: ["#41F63F"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: true,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Yellow",
                  type: "simple",
                  codeHex: ["#F7CC19"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Orange",
                  type: "simple",
                  codeHex: ["#FD8E21"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Red",
                  type: "simple",
                  codeHex: ["#EB3F34"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "blue",
                  type: "simple",
                  codeHex: ["#54B5F6"],
                  minWidth: 0,
                  minHeight: 0,
                  isDefault: false,
                  visibilityRule: "one-of-two",
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Cut To Shape",
                  description:
                    "Backboard is cut closely around the outside of your wording",
                  type: "cut-to-shape",
                  isDefault: true,
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/cut-to-shape.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  isDefault: false,
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4, 5],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4, 5],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4, 5],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  previewImg: "",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  previewImg: "",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  popupImg: "",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>{{/additonal_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              colors: "",
              backboards: "",
              materials: "",
              jackets: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "colors",
              "materials",
              "jackets",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
    },
  },
  {
    type: "channel",
    name: "Acrylic Letter Signs",
    description: "2D / 3D acrylic letter signs",
    demoLink: "https://demos.signsdesigner.us/acrylic-letter-signs/#/",
    pricings: ["fixing-height", "fixing-width", "advanced", "frame-fit"],
    previewImage:
      ncpcData.ncpc_assets_url + "/images/configs-previews/acrylic.webp",

    data: {
      "fixed-width": {
        title: "Fixed Width Neon",
        pricingMode: "fixed-width",
        productType: "channel",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              autoSwitching: false,
              sizes: [
                {
                  label: "Small",
                  description: "Maximum 60cm (2ft) in length",
                  width: 60,
                  numberLines: 2,
                  isDefault: true,
                  minTextChar: 1,
                  maxLineChar: 10,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Standard",
                  description: "Maximum 90cm (3ft) in length",
                  width: 90,
                  numberLines: 2,
                  isDefault: false,
                  minTextChar: 3,
                  maxLineChar: 14,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  description: "Maximum 120cm (4ft) in length",
                  width: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  description: "Maximum 120cm (4ft) in length",
                  width: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "Simple",
                prices: [
                  [
                    {
                      basicPrice: 250,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 70,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 350,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 500,
                      letterPrice: 12,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 600,
                      letterPrice: 17,
                    },
                    {
                      basicPrice: 250,
                      letterPrice: 15,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 15,
                      nbCharStartPrice: 0,
                    },
                  ],
                ],
              },
            ],
            letterTypesOptions: {
              label: "Letter Types",
              description: "",
              letterTypes: [
                {
                  label: "2D non-lit",
                  description: "",
                  isDefault: false,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      label: "Trim",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Gold",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "White",
                          codeHex: "#FFFFFF",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      label: "Side",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                    {
                      type: "back-lit",
                      label: "Back Lit",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                  ],
                },
                {
                  label: "3D Illuminated face, side & back-lit",
                  description: "",
                  isDefault: true,
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      typePreviewImg: "",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      typePreviewImg: "",
                      label: "Trim",
                      description: "",
                      activate: false,
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      typePreviewImg: "",
                      label: "Side",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Yellow",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "both",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Maroon",
                          codeHex: "#940808",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "back-lit",
                      typePreviewImg: "",
                      label: "Back Lit",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Green",
                          codeHex: "#B8E986",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Orange",
                          codeHex: "#F5A623",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Urfa",
                  url: ncpcData.ncpc_assets_url + "/fonts/Urfa-Heavy.ttf",
                  pricing: 0,
                  isDefault: true,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "TypeWriter",
                  url: ncpcData.ncpc_assets_url + "/fonts/Type-Machine.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Standard",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Regular.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Italic",
                  url: ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Italic.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  previewImg: "",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  previewImg: "",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  popupImg: "",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Letter Type:</b> {{ncpc_letter_type}}<br>\n<b>Face Color:</b> {{ncpc_face}}<br>\n<br>\n<b>Trim Color:</b> {{ncpc_trim}}<br>\n<br>\n<b>Side Color:</b> {{ncpc_side}}<br>\n<br>\n<b>Back Lit Color:</b> {{ncpc_back_lit}}<br>\n<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>\n{{/additonal_options}} <img src="{{ncpc_preview_img}}"><br>\n<br>\n{{#svgPreviewLink}}<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>{{/products}}<br>\n<b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>\n{{/product}}',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              letterTypes: "",
              backboards: "",
              materials: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "letter-types",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
      "fixed-height": {
        title: "Fixed Height Neon",
        pricingMode: "fixed-height",
        productType: "channel",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              autoSwitching: false,
              sizes: [
                {
                  label: "Small",
                  description: "Maximum 60cm (2ft) in length",
                  height: 60,
                  numberLines: 2,
                  isDefault: true,
                  minTextChar: 1,
                  maxLineChar: 10,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Standard",
                  description: "Maximum 90cm (3ft) in length",
                  height: 90,
                  numberLines: 2,
                  isDefault: false,
                  minTextChar: 3,
                  maxLineChar: 14,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  description: "Maximum 120cm (4ft) in length",
                  height: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  description: "Maximum 120cm (4ft) in length",
                  height: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "Simple",
                prices: [
                  [
                    {
                      basicPrice: 250,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 70,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 350,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 500,
                      letterPrice: 12,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 600,
                      letterPrice: 17,
                    },
                    {
                      basicPrice: 250,
                      letterPrice: 15,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 15,
                      nbCharStartPrice: 0,
                    },
                  ],
                ],
              },
            ],
            letterTypesOptions: {
              label: "Letter Types",
              description: "",
              letterTypes: [
                {
                  label: "2D non-lit",
                  description: "",
                  isDefault: false,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      label: "Trim",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Gold",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "White",
                          codeHex: "#FFFFFF",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      label: "Side",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                    {
                      type: "back-lit",
                      label: "Back Lit",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                  ],
                },
                {
                  label: "3D Illuminated face, side & back-lit",
                  description: "",
                  isDefault: true,
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      typePreviewImg: "",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      typePreviewImg: "",
                      label: "Trim",
                      description: "",
                      activate: false,
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      typePreviewImg: "",
                      label: "Side",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Yellow",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "both",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Maroon",
                          codeHex: "#940808",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "back-lit",
                      typePreviewImg: "",
                      label: "Back Lit",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Green",
                          codeHex: "#B8E986",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Orange",
                          codeHex: "#F5A623",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Urfa",
                  url: ncpcData.ncpc_assets_url + "/fonts/Urfa-Heavy.ttf",
                  pricing: 0,
                  isDefault: true,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "TypeWriter",
                  url: ncpcData.ncpc_assets_url + "/fonts/Type-Machine.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Standard",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Regular.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Italic",
                  url: ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Italic.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  previewImg: "",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  previewImg: "",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  popupImg: "",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>{{/additonal_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              colors: "",
              backboards: "",
              materials: "",
              jackets: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "colors",
              "materials",
              "jackets",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
      advanced: {
        title: "Advanced Neon",
        pricingMode: "advanced",
        productType: "channel",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              minTextChar: 1,
              maxSignWidth: {
                unlimited: true,
                value: 300,
              },
              maxSignHeight: {
                unlimited: false,
                value: 300,
              },
              customSize: {
                activate: true,
                customs: {
                label: "Custom",
                maxRange: 300,
                step: 2,
                showCustomSizeInput: "selected",
                hideOtherSizes: false,
                initialDimensions: {
                  width: 50,
                  height: 50,
                },
                minDimensions: {
                  width: 50,
                  height: 50,
                },
              },
              },
              maxTextCharacters:{
                unlimited:true,
                value:0
            },
            maxNumberOfLines:{
                unlimited:true,
                value:0
            },
            sizes: [
                {
                  label: "Small",
                  scaleMultiplier: 1,
                  isDefault: true,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  scaleMultiplier: 1.5,
                  isDefault: false,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  scaleMultiplier: 2,
                  isDefault: false,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "Basic",
                letterPricingMethod: "per-letter",
                priceMeter: {
                  measurementSide: "width",
                  price: 0,
                  signPart: "all-text",
                  meter: 1,
                },
                signPartForMaterialCost: "Surface(W*H)",
                shippingMethod: "per-surface",
                divisorVolumetric: 5000,
                prices: [
                  {
                    maxSizeRange: 60,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.022,
                    pricePerLetter: 5,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 90,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.021,
                    pricePerLetter: 10,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 120,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.02,
                    pricePerLetter: 15,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 150,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.019,
                    pricePerLetter: 20,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                ],
              },
            ],
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Urfa",
                  url: ncpcData.ncpc_assets_url + "/fonts/Urfa-Heavy.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: true,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "TypeWriter",
                  url: ncpcData.ncpc_assets_url + "/fonts/Type-Machine.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Standard",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Regular.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Italic",
                  url: ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Italic.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
            letterTypesOptions: {
              label: "Letter Types",
              description: "",
              letterTypes: [
                {
                  label: "2D non-lit",
                  description: "",
                  isDefault: true,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      label: "Trim",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Gold",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "White",
                          codeHex: "#FFFFFF",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      label: "Side",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                    {
                      type: "back-lit",
                      label: "Back Lit",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                  ],
                },
                {
                  label: "3D Illuminated face, side & back-lit",
                  description: "",
                  isDefault: false,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      typePreviewImg: "",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      typePreviewImg: "",
                      label: "Trim",
                      description: "",
                      activate: false,
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      typePreviewImg: "",
                      label: "Side",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Yellow",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "both",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Maroon",
                          codeHex: "#940808",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "back-lit",
                      typePreviewImg: "",
                      label: "Back Lit",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Green",
                          codeHex: "#B8E986",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Orange",
                          codeHex: "#F5A623",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  previewImg: "",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  previewImg: "",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  previewImg: "",
                  popupImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  previewImg: "",
                  popupImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>{{/additonal_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              colors: "",
              backboards: "",
              materials: "",
              jackets: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "colors",
              "materials",
              "jackets",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
    },
  },
  {
    type: "channel",
    name: "Metal Letter Signs",
    description: "2D / 3D metal letter signs",
    demoLink: "https://demos.signsdesigner.us/metal-letter-signs/#/",
    pricings: ["fixing-height", "fixing-width", "advanced", "frame-fit"],
    previewImage:
      ncpcData.ncpc_assets_url + "/images/configs-previews/metal.webp",

    data: {
      "fixed-width": {
        title: "Fixed Width Metal",
        productType: "channel",
        pricingMode: "fixed-width",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              autoSwitching: false,
              sizes: [
                {
                  label: "Small",
                  description: "Maximum 60cm (2ft) in length",
                  width: 60,
                  numberLines: 2,
                  isDefault: true,
                  minTextChar: 1,
                  maxLineChar: 10,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Standard",
                  description: "Maximum 90cm (3ft) in length",
                  width: 90,
                  numberLines: 2,
                  isDefault: false,
                  minTextChar: 3,
                  maxLineChar: 14,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  description: "Maximum 120cm (4ft) in length",
                  width: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  description: "Maximum 120cm (4ft) in length",
                  width: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "Simple",
                prices: [
                  [
                    {
                      basicPrice: 250,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 70,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 350,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 500,
                      letterPrice: 12,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 600,
                      letterPrice: 17,
                    },
                    {
                      basicPrice: 250,
                      letterPrice: 15,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 15,
                      nbCharStartPrice: 0,
                    },
                  ],
                ],
              },
            ],
            letterTypesOptions: {
              label: "Letter Types",
              description: "",
              letterTypes: [
                {
                  label: "2D non-lit",
                  description: "",
                  isDefault: false,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      label: "Trim",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Gold",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "White",
                          codeHex: "#FFFFFF",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      label: "Side",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                    {
                      type: "back-lit",
                      label: "Back Lit",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                  ],
                },
                {
                  label: "3D Illuminated face, side & back-lit",
                  description: "",
                  isDefault: true,
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      typePreviewImg: "",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      typePreviewImg: "",
                      label: "Trim",
                      description: "",
                      activate: false,
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      typePreviewImg: "",
                      label: "Side",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Yellow",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "both",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Maroon",
                          codeHex: "#940808",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "back-lit",
                      typePreviewImg: "",
                      label: "Back Lit",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Green",
                          codeHex: "#B8E986",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Orange",
                          codeHex: "#F5A623",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Urfa",
                  url: ncpcData.ncpc_assets_url + "/fonts/Urfa-Heavy.ttf",
                  pricing: 0,
                  isDefault: true,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "TypeWriter",
                  url: ncpcData.ncpc_assets_url + "/fonts/Type-Machine.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Standard",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Regular.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Italic",
                  url: ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Italic.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  previewImg: "",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  previewImg: "",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  popupImg: "",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Letter Type:</b> {{ncpc_letter_type}}<br>\n<b>Face Color:</b> {{ncpc_face}}<br>\n<br>\n<b>Trim Color:</b> {{ncpc_trim}}<br>\n<br>\n<b>Side Color:</b> {{ncpc_side}}<br>\n<br>\n<b>Back Lit Color:</b> {{ncpc_back_lit}}<br>\n<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>\n{{/additonal_options}} <img src="{{ncpc_preview_img}}"><br>\n<br>\n{{#svgPreviewLink}}<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>{{/products}}<br>\n<b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>\n{{/product}}',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              letterTypes: "",
              backboards: "",
              materials: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "letter-types",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
      "fixed-height": {
        title: "Fixed Height Metal",
        pricingMode: "fixed-height",
        productType: "channel",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              autoSwitching: false,
              sizes: [
                {
                  label: "Small",
                  description: "Maximum 60cm (2ft) in length",
                  height: 60,
                  numberLines: 2,
                  isDefault: true,
                  minTextChar: 1,
                  maxLineChar: 10,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Standard",
                  description: "Maximum 90cm (3ft) in length",
                  height: 90,
                  numberLines: 2,
                  isDefault: false,
                  minTextChar: 3,
                  maxLineChar: 14,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  description: "Maximum 120cm (4ft) in length",
                  height: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  description: "Maximum 120cm (4ft) in length",
                  height: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "Simple",
                prices: [
                  [
                    {
                      basicPrice: 250,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 70,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 350,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 500,
                      letterPrice: 12,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 600,
                      letterPrice: 17,
                    },
                    {
                      basicPrice: 250,
                      letterPrice: 15,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 15,
                      nbCharStartPrice: 0,
                    },
                  ],
                ],
              },
            ],
            letterTypesOptions: {
              label: "Letter Types",
              description: "",
              letterTypes: [
                {
                  label: "2D non-lit",
                  description: "",
                  isDefault: false,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      label: "Trim",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Gold",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "White",
                          codeHex: "#FFFFFF",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      label: "Side",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                    {
                      type: "back-lit",
                      label: "Back Lit",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                  ],
                },
                {
                  label: "3D Illuminated face, side & back-lit",
                  description: "",
                  isDefault: true,
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      typePreviewImg: "",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      typePreviewImg: "",
                      label: "Trim",
                      description: "",
                      activate: false,
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      typePreviewImg: "",
                      label: "Side",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Yellow",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "both",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Maroon",
                          codeHex: "#940808",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "back-lit",
                      typePreviewImg: "",
                      label: "Back Lit",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Green",
                          codeHex: "#B8E986",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Orange",
                          codeHex: "#F5A623",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Urfa",
                  url: ncpcData.ncpc_assets_url + "/fonts/Urfa-Heavy.ttf",
                  pricing: 0,
                  isDefault: true,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "TypeWriter",
                  url: ncpcData.ncpc_assets_url + "/fonts/Type-Machine.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Standard",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Regular.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Italic",
                  url: ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Italic.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  previewImg: "",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  previewImg: "",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  popupImg: "",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>{{/additonal_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              colors: "",
              backboards: "",
              materials: "",
              jackets: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "colors",
              "materials",
              "jackets",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
      advanced: {
        name: "Advanced Metal",
        pricingMode: "advanced",
        productType: "channel",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              minTextChar: 1,
              maxSignWidth: {
                unlimited: true,
                value: 300,
              },
              maxSignHeight: {
                unlimited: false,
                value: 300,
              },
              customSize: {
                activate: true,
                customs: {
                label: "Custom",
                maxRange: 300,
                step: 2,
                showCustomSizeInput: "selected",
                hideOtherSizes: false,
                initialDimensions: {
                  width: 50,
                  height: 50,
                },
                minDimensions: {
                  width: 50,
                  height: 50,
                },
              },
              },
              maxTextCharacters:{
                unlimited:true,
                value:0
            },
            maxNumberOfLines:{
                unlimited:true,
                value:0
            },
            sizes: [
                {
                  label: "Small",
                  scaleMultiplier: 1,
                  isDefault: true,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  scaleMultiplier: 1.5,
                  isDefault: false,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  scaleMultiplier: 2,
                  isDefault: false,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "Basic",
                letterPricingMethod: "per-letter",
                priceMeter: {
                  measurementSide: "width",
                  price: 0,
                  signPart: "all-text",
                  meter: 1,
                },
                signPartForMaterialCost: "Surface(W*H)",
                shippingMethod: "per-surface",
                divisorVolumetric: 5000,
                prices: [
                  {
                    maxSizeRange: 60,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.022,
                    pricePerLetter: 5,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 90,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.021,
                    pricePerLetter: 10,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 120,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.02,
                    pricePerLetter: 15,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 150,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.019,
                    pricePerLetter: 20,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                ],
              },
            ],
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Urfa",
                  url: ncpcData.ncpc_assets_url + "/fonts/Urfa-Heavy.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: true,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "TypeWriter",
                  url: ncpcData.ncpc_assets_url + "/fonts/Type-Machine.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Standard",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Regular.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Italic",
                  url: ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Italic.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
            letterTypesOptions: {
              label: "Letter Types",
              description: "",
              letterTypes: [
                {
                  label: "2D non-lit",
                  description: "",
                  isDefault: true,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      label: "Trim",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Gold",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "White",
                          codeHex: "#FFFFFF",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      label: "Side",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                    {
                      type: "back-lit",
                      label: "Back Lit",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                  ],
                },
                {
                  label: "3D Illuminated face, side & back-lit",
                  description: "",
                  isDefault: false,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      typePreviewImg: "",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      typePreviewImg: "",
                      label: "Trim",
                      description: "",
                      activate: false,
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      typePreviewImg: "",
                      label: "Side",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Yellow",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "both",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Maroon",
                          codeHex: "#940808",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "back-lit",
                      typePreviewImg: "",
                      label: "Back Lit",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Green",
                          codeHex: "#B8E986",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Orange",
                          codeHex: "#F5A623",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  previewImg: "",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  previewImg: "",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  previewImg: "",
                  popupImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  previewImg: "",
                  popupImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>{{/additonal_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              colors: "",
              backboards: "",
              materials: "",
              jackets: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "colors",
              "materials",
              "jackets",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
    },
  },
  {
    type: "channel",
    name: "Wood Letter Signs",
    description: "Flat or 3D wood letters signs",
    demoLink: "https://demos.signsdesigner.us/wood-sign/#/",
    pricings: ["fixing-height", "fixing-width", "advanced", "frame-fit"],
    previewImage:
      ncpcData.ncpc_assets_url + "/images/configs-previews/wood.webp",

    data: {
      "fixed-width": {
        title: "Fixed Width Metal",
        pricingMode: "fixed-width",
        productType: "channel",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              autoSwitching: false,
              sizes: [
                {
                  label: "Small",
                  description: "Maximum 60cm (2ft) in length",
                  width: 60,
                  numberLines: 2,
                  isDefault: true,
                  minTextChar: 1,
                  maxLineChar: 10,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Standard",
                  description: "Maximum 90cm (3ft) in length",
                  width: 90,
                  numberLines: 2,
                  isDefault: false,
                  minTextChar: 3,
                  maxLineChar: 14,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  description: "Maximum 120cm (4ft) in length",
                  width: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  description: "Maximum 120cm (4ft) in length",
                  width: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "Simple",
                prices: [
                  [
                    {
                      basicPrice: 250,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 70,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 350,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 500,
                      letterPrice: 12,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 600,
                      letterPrice: 17,
                    },
                    {
                      basicPrice: 250,
                      letterPrice: 15,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 15,
                      nbCharStartPrice: 0,
                    },
                  ],
                ],
              },
            ],
            letterTypesOptions: {
              label: "Letter Types",
              description: "",
              letterTypes: [
                {
                  label: "2D non-lit",
                  description: "",
                  isDefault: false,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      label: "Trim",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Gold",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "White",
                          codeHex: "#FFFFFF",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      label: "Side",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                    {
                      type: "back-lit",
                      label: "Back Lit",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                  ],
                },
                {
                  label: "3D Illuminated face, side & back-lit",
                  description: "",
                  isDefault: true,
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      typePreviewImg: "",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      typePreviewImg: "",
                      label: "Trim",
                      description: "",
                      activate: false,
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      typePreviewImg: "",
                      label: "Side",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Yellow",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "both",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Maroon",
                          codeHex: "#940808",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "back-lit",
                      typePreviewImg: "",
                      label: "Back Lit",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Green",
                          codeHex: "#B8E986",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Orange",
                          codeHex: "#F5A623",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Urfa",
                  url: ncpcData.ncpc_assets_url + "/fonts/Urfa-Heavy.ttf",
                  pricing: 0,
                  isDefault: true,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "TypeWriter",
                  url: ncpcData.ncpc_assets_url + "/fonts/Type-Machine.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Standard",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Regular.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Italic",
                  url: ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Italic.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  previewImg: "",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  previewImg: "",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  popupImg: "",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Letter Type:</b> {{ncpc_letter_type}}<br>\n<b>Face Color:</b> {{ncpc_face}}<br>\n<br>\n<b>Trim Color:</b> {{ncpc_trim}}<br>\n<br>\n<b>Side Color:</b> {{ncpc_side}}<br>\n<br>\n<b>Back Lit Color:</b> {{ncpc_back_lit}}<br>\n<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>\n{{/additonal_options}} <img src="{{ncpc_preview_img}}"><br>\n<br>\n{{#svgPreviewLink}}<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>{{/products}}<br>\n<b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>\n{{/product}}',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              letterTypes: "",
              backboards: "",
              materials: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "letter-types",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
      "fixed-height": {
        title: "Fixed Height Metal",
        pricingMode: "fixed-height",
        productType: "channel",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              autoSwitching: false,
              sizes: [
                {
                  label: "Small",
                  description: "Maximum 60cm (2ft) in length",
                  height: 60,
                  numberLines: 2,
                  isDefault: true,
                  minTextChar: 1,
                  maxLineChar: 10,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Standard",
                  description: "Maximum 90cm (3ft) in length",
                  height: 90,
                  numberLines: 2,
                  isDefault: false,
                  minTextChar: 3,
                  maxLineChar: 14,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  description: "Maximum 120cm (4ft) in length",
                  height: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  description: "Maximum 120cm (4ft) in length",
                  height: 120,
                  numberLines: 3,
                  isDefault: false,
                  minTextChar: "",
                  maxLineChar: 18,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "Simple",
                prices: [
                  [
                    {
                      basicPrice: 250,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 70,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 350,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 8,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 500,
                      letterPrice: 12,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                    {
                      basicPrice: 150,
                      letterPrice: 7,
                      nbCharStartPrice: 0,
                    },
                  ],
                  [
                    {
                      basicPrice: 600,
                      letterPrice: 17,
                    },
                    {
                      basicPrice: 250,
                      letterPrice: 15,
                    },
                    {
                      basicPrice: 170,
                      letterPrice: 15,
                      nbCharStartPrice: 0,
                    },
                  ],
                ],
              },
            ],
            letterTypesOptions: {
              label: "Letter Types",
              description: "",
              letterTypes: [
                {
                  label: "2D non-lit",
                  description: "",
                  isDefault: false,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      label: "Trim",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Gold",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "White",
                          codeHex: "#FFFFFF",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      label: "Side",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                    {
                      type: "back-lit",
                      label: "Back Lit",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                  ],
                },
                {
                  label: "3D Illuminated face, side & back-lit",
                  description: "",
                  isDefault: true,
                  previewImg: "",
                  popupImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      typePreviewImg: "",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      typePreviewImg: "",
                      label: "Trim",
                      description: "",
                      activate: false,
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      typePreviewImg: "",
                      label: "Side",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Yellow",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "both",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Maroon",
                          codeHex: "#940808",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "back-lit",
                      typePreviewImg: "",
                      label: "Back Lit",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Green",
                          codeHex: "#B8E986",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Orange",
                          codeHex: "#F5A623",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Urfa",
                  url: ncpcData.ncpc_assets_url + "/fonts/Urfa-Heavy.ttf",
                  pricing: 0,
                  isDefault: true,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "TypeWriter",
                  url: ncpcData.ncpc_assets_url + "/fonts/Type-Machine.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Standard",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Regular.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Italic",
                  url: ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Italic.ttf",
                  pricing: 0,
                  isDefault: false,
                  limitFont: [],
                  previewImg: "",
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  previewImg: "",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  previewImg: "",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  popupImg: "",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>{{/additonal_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              colors: "",
              backboards: "",
              materials: "",
              jackets: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "colors",
              "materials",
              "jackets",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
      advanced: {
        title: "Advanced Metal",
        pricingMode: "advanced",
        productType: "channel",
        data: {
          requiredOptions: {
            sizeOptions: {
              label: "Sizes",
              description: "",
              minTextChar: 1,
              maxSignWidth: {
                unlimited: true,
                value: 300,
              },
              maxSignHeight: {
                unlimited: false,
                value: 300,
              },
              customSize: {
                activate: true,
                customs: {
                label: "Custom",
                maxRange: 300,
                step: 2,
                showCustomSizeInput: "selected",
                hideOtherSizes: false,
                initialDimensions: {
                  width: 50,
                  height: 50,
                },
                minDimensions: {
                  width: 50,
                  height: 50,
                },
              },
              },
              maxTextCharacters:{
                unlimited:true,
                value:0
            },
            maxNumberOfLines:{
                unlimited:true,
                value:0
            },
            sizes: [
                {
                  label: "Small",
                  scaleMultiplier: 1,
                  isDefault: true,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Medium",
                  scaleMultiplier: 1.5,
                  isDefault: false,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
                {
                  label: "Large",
                  scaleMultiplier: 2,
                  isDefault: false,
                  resizeSettings: {
                    autoResize: true,
                    desktop: {
                      defaultFontSize: 110,
                      maxFontSize: 110,
                      minFontSize: 30,
                    },
                    mobile: {
                      defaultFontSize: 60,
                      maxFontSize: 60,
                      minFontSize: 30,
                    },
                  },
                },
              ],
            },
            priceOptions: [
              {
                label: "Basic",
                letterPricingMethod: "per-letter",
                priceMeter: {
                  measurementSide: "width",
                  price: 0,
                  signPart: "all-text",
                  meter: 1,
                },
                signPartForMaterialCost: "Surface(W*H)",
                shippingMethod: "per-surface",
                divisorVolumetric: 5000,
                prices: [
                  {
                    maxSizeRange: 60,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.022,
                    pricePerLetter: 5,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 90,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.021,
                    pricePerLetter: 10,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 120,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.02,
                    pricePerLetter: 15,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                  {
                    maxSizeRange: 150,
                    widthModifier: 0,
                    heightModifier: 0,
                    length: 0,
                    pricePerSqCm: 0.019,
                    pricePerLetter: 20,
                    pricePerMaterialCost: 0,
                    startPrice: 0,
                  },
                ],
              },
            ],
            fontOptions: {
              label: "",
              description: "",
              fonts: [
                {
                  label: "Urfa",
                  url: ncpcData.ncpc_assets_url + "/fonts/Urfa-Heavy.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: true,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "TypeWriter",
                  url: ncpcData.ncpc_assets_url + "/fonts/Type-Machine.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Standard",
                  url:
                    ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Regular.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
                {
                  label: "Italic",
                  url: ncpcData.ncpc_assets_url + "/fonts/ChangaOne-Italic.ttf",
                  previewImg: "",
                  pricing: 0,
                  isDefault: false,
                  minHeightFontChar: {
                    smallLetter: 6,
                    uppercaseLetter: 10,
                  },
                  lineHeight: {
                    type: "custom",
                    value: 1,
                    calculHeight: 0,
                  },
                  isGoogleFont: false,
                },
              ],
            },
            letterTypesOptions: {
              label: "Letter Types",
              description: "",
              letterTypes: [
                {
                  label: "2D non-lit",
                  description: "",
                  isDefault: true,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      label: "Trim",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Gold",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "White",
                          codeHex: "#FFFFFF",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      label: "Side",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                    {
                      type: "back-lit",
                      label: "Back Lit",
                      description: "",
                      activate: false,
                      colors: [],
                    },
                  ],
                },
                {
                  label: "3D Illuminated face, side & back-lit",
                  description: "",
                  isDefault: false,
                  popupImg: "",
                  previewImg: "",
                  price: {
                    type: "multiplier",
                    value: 1,
                  },
                  letterParts: [
                    {
                      type: "face",
                      typePreviewImg: "",
                      activate: true,
                      label: "Face",
                      description: "",
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Pink",
                          visualEffect: "acrylic",
                          codeHex: "#FF9CE8",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "trim",
                      typePreviewImg: "",
                      label: "Trim",
                      description: "",
                      activate: false,
                      colors: [
                        {
                          label: "white",
                          codeHex: "#FFFFFF",
                          visualEffect: "acrylic",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Green",
                          visualEffect: "acrylic",
                          codeHex: "#417505",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "side",
                      typePreviewImg: "",
                      label: "Side",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Yellow",
                          codeHex: "#F8E71C",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "both",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Maroon",
                          codeHex: "#940808",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                    {
                      type: "back-lit",
                      typePreviewImg: "",
                      label: "Back Lit",
                      description: "",
                      activate: true,
                      colors: [
                        {
                          label: "Green",
                          codeHex: "#B8E986",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: true,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                        {
                          label: "Orange",
                          codeHex: "#F5A623",
                          minWidth: 0,
                          minHeight: 0,
                          isDefault: false,
                          visibilityRule: "one-of-two",
                          previewImg: "",
                          popupImg: "",
                          price: {
                            type: "multiplier",
                            value: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
          additionalOptions: {
            backboardOptions: {
              label: "Backboard",
              description:
                "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
              backboards: [
                {
                  label: "None",
                  description: "No visible backboard",
                  type: "none",
                  popupImg: "",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Board",
                  description:
                    "Backboard cut in a Rectangle around the outside of your wording",
                  type: "board",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Box",
                  description: "Your sign will be inside a 6 sided perspex box",
                  type: "box",
                  popupImg:
                    ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Raceway",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "raceway-double",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/raceway-double.jpg",
                  previewImg: "",
                  isDefault: false,
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Stand",
                  description:
                    "Self supporting stand, great for office desks or table tops etc",
                  type: "stand",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/stand.webp",
                  previewImg: "",
                  backboardLength: {
                    shapeLength: 8,
                    layers: {
                      activate: false,
                      options: [
                        {
                          label: "",
                          description: "",
                          length: 8,
                        },
                      ],
                    },
                  },
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            backboardColorsOptions: {
              label: "Backboards Colors Options",
              description: "",
              backboardColors: [
                {
                  label: "Clear Acrylic",
                  color: "#D7D7D769",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Clear-Acrylic.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Black",
                  color: "#000000",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/black-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
                {
                  label: "Gold",
                  color: "#FFD700",
                  backboardColorVisualization: true,
                  backboards: [1, 2, 3, 4],
                  minWidth: 0,
                  minHeight: 0,
                  visibilityRule: "one-of-two",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/gold-backboard.webp",
                  price: {
                    type: "base",
                    value: 10,
                  },
                },
              ],
            },
            materialOptions: {
              label: "Material",
              description: "",
              materials: [
                {
                  label: "Indoor (Free)",
                  description: "For indoor use only",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/indoor.webp",
                  previewImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Waterproof",
                  description: "Outdoor waterproof sign",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Waterproof.webp",
                  previewImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            mountingOptions: {
              label: "Mounting",
              description: "",
              mountings: [
                {
                  label: "Wall Mounting Kit",
                  description:
                    "Your sign will come with screws and spacers to safely mount on the wall",
                  previewImg: "",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Wall-Mounting-Kit.webp",
                  isDefault: true,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Hanging Kit",
                  description:
                    "Your sign will come with a wire hanging kit and screws",
                  previewImg: "",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Hanging-Kit.webp",
                  isDefault: false,
                  excludedBackboards: [],
                  excludedColors: [],
                  excludedLetterTypeTextures: [],
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            jacketOptions: {
              label: "Jacket",
              description: "Choose the tube color when sign is turned off",
              jackets: [
                {
                  label: "White",
                  description: "Your sign will be white when turned off",
                  previewImg: "",
                  popupImg: "",
                  isDefault: true,
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "Colored",
                  description:
                    "The tube will be colored when turned off. Not available with the RGB color option",
                  previewImg: "",
                  popupImg: "",
                  isDefault: false,
                  price: {
                    type: "none",
                    value: 19,
                  },
                },
              ],
            },
            customAdditionalsOptions: [
              {
                type: "yes/no",
                label: "Remote control (Dimmer)",
                description:
                  "A remote control is included free with every sign",
                inputs: {
                  yes: "yes",
                  no: "no",
                },
                default: "yes",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Remote-control.jpg",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                type: "dropdown",
                label: "Plug Type",
                description: "Choose the right plug for your country",
                options: [
                  {
                    label: "USA/CAN",
                    value: "usa/can",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "AZ/NZ",
                    value: "az/nz",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "EU",
                    value: "eu",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "UK",
                    value: "uk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "JAP",
                    value: "jap",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "HK",
                    value: "hk",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/Plug-Type.jpg",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "image-input",
                label: "Cable colour",
                description: "",
                options: [
                  {
                    label: "Black",
                    value: "black",
                    color: "#000000",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-black.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                  {
                    label: "White",
                    value: "white",
                    color: "#FFFFFF",
                    previewImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    popupImg:
                      ncpcData.ncpc_assets_url +
                      "/images/include-imgs/cable-white.webp",
                    price: {
                      type: "none",
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: "note",
                label: "Any other special requests",
                description:
                  "Place in special requests and we will contact you before production",
                noteLimitChar: 255,
              },
            ],
          },
          settings: {
            generals: {
              customizer: {
                measurementUnit: "cm",
                showHideMeasurements: "both",
                decimalFormatMeasurements: "no-decimal",
                fontFamilyName: "",
                useExampleIcon: true,
                exampleText: "Example",
                showExampleOnHover: false,
                priceStartOptions: "at-zero",
                priceMeasurementAnimation: "on",
                destokColumnOrder: "right",
                glowSwitch: "glow-only",
                shadowSwitch: true,
                discount: "none",
                displayOptions: "name",
                discountValue: 0,
                showDayNightButton: true,
                displayPriceBeforeFinishBotton: "hide",
                showNumberedSelections: false,
                showTextAlign: true,
                defaultTextAlign: "center",
                showColorNameOnHover: false,
              },
              mobile: {
                showNavigatorMenu: "off",
                showNavigationMenuFirst: "yes",
                mobileSelectionOptionsDisplay: "horizontally-stack",
              },
              output: {
                fileFormat: "svg",
                manufacturerEmail: {
                  sendDesignByEmail: true,
                  receiverEmail: [],
                  subject: "New order for Manufacturer",
                  emailTemplate:
                    '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>{{/additonal_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>',
                },
              },
              product: {
                enableAddToCart: true,
                redirectAfterAddToCart: true,
                redirectToCheckOutPage: false,
                displayRecapsOnCheckout: false,
                hideAddToCartButtonCustomProducts: true,
                hideDesignButtonsOnShopPage: false,
                hideAddToCartButtonOnShopPage: true,
              },
              requestQuote: {
                enableRequestQuote: false,
                receiversEmail: "",
                sendToCustomer: false,
                allowUploadFiles: false,
                acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
                maxFileSize: 10,
                maxFilesNumber: 5,
                emailSubject: "Request A Quote",
              },
              mode: {
                type: "simple",
                allowMultiFonts: true,
                allowMultiColors: true,
              },
            },
            languageImages: {
              customDesign: {
                link: {
                  activate: false,
                  link: "",
                  phraseSubmitCustom: "Take a customization",
                },
                aiDesigner: {
                  activate: false,
                },
                editorModes: {
                  enableTextEditor: true,
                },
                screen: {
                  activate: false,
                  customDesignText:
                    "To submit the personalized design, please click on this button before",
                  buttonLabel: "Send Custom Design",
                  phraseToLinkBackTextCustomiser: "Custom now",
                  steps: {
                    headers: "",
                    data: [],
                  },
                },
              },
              images: {
                previewImage: {
                  activate: true,
                  allowUpload: false,
                  uploadText: "",
                  displayDefaultBackgroundImage: true,
                },
                enableReviewImage: true,
                reviewScreenImages: {
                  activate: false,
                  displayDefaultBackgroundImage: false,
                },
                manageImages: [
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                  ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
                ],
              },
              main: {
                header: "CREATE YOUR SIGN",
                textTabLabel: "Text",
                customTabLabel: "Custom",
                textBoxLabel: "Write your text",
                customDesign: {
                  dropText: "Drop an image here or tap to browse",
                  processingText: "Processing your image",
                },
                lineCount: "Lines",
                maxCharacters: "max characters per line for current size",
                addingToCartButton: "Add to the cart",
                requestAQuoteButton: "Get A Quote",
                buttonSendAQuoteFormLabel: "Submit",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                phone: "Phone",
                quoteAdditionalNotes: "Additional Notes",
                quoteUploadFileTitle: "Upload your files",
                quoteFilesFormats: "Formats",
                maxFileSize: "Max File Size",
                emailError: "Please enter a valid email address",
                quoteThanksMessage: "Your quote has been sent successfully",
                quoteModalTitle: "Quote Request Submission",
                finishButton: "Finish",
                textBeforePriceValue: "",
                textAfterPriceValue: "Tax included",
                maxSignLabel: "the size exceeds the limit",
                textAlignment: "Text Align",
                textAlignmentValue: {
                  left: "Left",
                  center: "Center",
                  right: "Right",
                },
                maxSignModals: {
                  width: "Your sign has exceeded the maximum width",
                  height: "Your sign has exceeded the maximum height",
                  lines: "Your sign has exceeded the maximum number of lines",
                  characters:
                    "Your sign has exceeded the maximum number of characters",
                },
                measurementLabel: {
                  width: "Width",
                  height: "Height",
                },
                customSizeSection: {
                  sliderButton: "Switch back to slider",
                  manualButton: "Enter dimensions manually",
                  inchButton: "Use inches",
                  cmButton: "Use cm",
                  aspectRatioWarning:
                    "Values may be modified to maintain the required aspect ratio",
                },
                summaryLabel: "Summary",
                editLabel: "Edit",
                sectionText: "Text",
                sectionAdditionalOptions: "Additional Options",
                charactersRemaining: "Remaining characters",
                minimumCharacter:
                  "or more characters are required, please add more characters.",
                selectableTextMessage:
                  "Click on a word to begin customising it.",
              },
              reviewScreen: {
                activate: true,
                mainReviewSection: {
                  headerLabel: "",
                  backLabel: "",
                  textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
                },
                choosenOptionsSection: {
                  header: "",
                  text: "",
                  size: "",
                  font: "",
                  mounting: "",
                  extras: "",
                  productType: "",
                  additionalItemsIncluded: {
                    header: "",
                    inclusions: "",
                  },
                  qualities: {
                    header: "",
                    qualitiesList: [
                      {
                        header: "",
                        description: "",
                      },
                    ],
                  },
                  additonalInformation: [
                    {
                      header: "",
                      description: "",
                      displayImage: "",
                    },
                  ],
                  contactSection: {
                    header: "",
                    description: "",
                  },
                },
              },
              visualizer: {
                defaultText: "Your Text",
                textUnderneathPrice: "",
                showNote: true,
                note: "",
                visualizerOn: "ON",
                visualizerOff: "OFF",
                visualizerLight: "Light",
                visualizerDark: "Dark",
                textIcon: "",
                fontIcon: "",
                sizeIcon: "",
                colorIcon: "",
                letterTypeIcon: "",
                materialIcon: "",
                jacketIcon: "",
                mountingIcon: "",
                backboardIcon: "",
                backboardColorIcon: "",
                additionalIcon: "",
                showTextEditorOverlay: false,
              },
            },
            infos: {
              sizes: "",
              colors: "",
              backboards: "",
              materials: "",
              jackets: "",
              mountings: "",
              extras: [],
            },
            themes: {
              skin: "default",
              colors: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                descriptionColor: "#000000",
                buttonColor: "#FFFFFF",
                buttonHoverColor: "#f8fafc",
                buttonTextColor: "#000000",
                activeButtonColor: "#0e7490",
                activeButtonHoverColor: "#0891b2",
                activeButtonTextColor: "#FFFFFF",
                beforePriceColor: "#000000",
                priceBackgroundColor: "#FFFFFF",
                priceColor: "#000000",
                delPriceColor: "#878787",
                afterPriceColor: "#000000",
                optionsSectionBackgroundColor: "#fafafa",
                optionBorderColor: "#4b5563",
                activeOptionBackgroundColor: "#ffffff",
                optionTextColor: "#4b5563",
                colorOfMeasuringBarText: "#FFFFFF",
                colorMeasuringBar: "#FFFFFF",
                activeOptionBorderColor: "#0891b2",
                activeOptionTextColor: "#0891b2",
                formErrorBg: "#ff0000",
                formErrorText: "#000000",
                finishModalColor: "#000000",
                finishModalLoaderColor: "#ece8e8",
                finishButtonContainerColor: "#FFFFFF",
                finishButtonContainerPriceColor: "#000000",
                finishButtonContainerDiscountPriceColor: "#000000",
                shareButtonContainerColor: "#FFFFFF",
                shareButtonTextColor: "#000000",
                selectedTextBorderColor: "#000000",
                selectedTextBorderCornerColor: "#000000",
                darkBackgroundColor: "#1c1c1c",
                darkTitleColor: "#FFFFFF",
                darkDescriptionColor: "#FFFFFF",
                darkButtonColor: "#1c1c1c",
                darkButtonHoverColor: "#292929",
                darkButtonTextColor: "#FFFFFF",
                darkActiveButtonColor: "#292929",
                darkActiveButtonHoverColor: "#292929",
                darkActiveButtonTextColor: "#0e7490",
                darkBeforePriceColor: "#FFFFFF",
                darkPriceBackgroundColor: "#FFFFFF",
                darkPriceColor: "#1c1c1c",
                darkAfterPriceColor: "#FFFFFF",
                darkOptionsSectionBackgroundColor: "#292929",
                darkOptionBorderColor: "#6b7280",
                darkOptionTextColor: "#6b7280",
                darkActiveOptionBackgroundColor: "#000000",
                darkActiveOptionBorderColor: "#0891b2",
                darkActiveOptionTextColor: "#0891b2",
                darkFinishModalColor: "#ffffff",
                darkFinishModalLoaderColor: "#cccbc8",
              },
              settings: {
                openOptions: false,
              },
              customCSS: "",
            },
            sortOptions: [
              "text-form",
              "fonts",
              "sizes",
              "colors",
              "materials",
              "jackets",
              "mountings",
              "backboards",
              "backboard-colors",
              "additionals-options",
            ],
          },
        },
      },
    },
  },
  {
    type: "neon",
    name: "Neon Logo Signs",
    description: "AI-powered custom logo signs",
    demoLink: "https://demos.signsdesigner.us/neon-logo-signs/",
    pricings: ["frame-fit"],
    previewImage:
      ncpcData.ncpc_assets_url + "/images/configs-previews/ai-design.webp",
    data: {
      title: "Neon Logo Signs",
      pricingMode: "frame-fit",
      productType: "neon",
      data: {
        requiredOptions: {
          sizeOptions: {
            label: "Sizes",
            description: "",
            minTextChar: 1,
            maxSignWidth: {
              unlimited: true,
              value: 300,
            },
            maxSignHeight: {
              unlimited: false,
              value: 300,
            },
            customSize: {
              activate: true,
              customs: {
                label: "Custom",
                maxRange: 300,
                step: 2,
                showCustomSizeInput: "selected",
                hideOtherSizes: false,
                initialDimensions: {
                  width: 50,
                  height: 50,
                },
                minDimensions: {
                  width: 50,
                  height: 50,
                },
              },
            },
            maxTextCharacters:{
                unlimited:true,
                value:0
            },
            maxNumberOfLines:{
                unlimited:true,
                value:0
            },
            sizes: [
              {
                label: "50CM",
                width: 50,
                height: 50,
                isDefault: true,
                resizeSettings: {
                  autoResize: true,
                  desktop: {
                    defaultFontSize: 110,
                    maxFontSize: 110,
                    minFontSize: 30,
                  },
                  mobile: {
                    defaultFontSize: 60,
                    maxFontSize: 60,
                    minFontSize: 30,
                  },
                },
              },
              {
                label: "75CM",
                width: 75,
                height: 75,
                isDefault: false,
                resizeSettings: {
                  autoResize: true,
                  desktop: {
                    defaultFontSize: 160,
                    maxFontSize: 160,
                    minFontSize: 40,
                  },
                  mobile: {
                    defaultFontSize: 80,
                    maxFontSize: 80,
                    minFontSize: 40,
                  },
                },
              },
              {
                label: "100CM",
                width: 100,
                height: 100,
                isDefault: false,
                resizeSettings: {
                  autoResize: true,
                  desktop: {
                    defaultFontSize: 160,
                    maxFontSize: 160,
                    minFontSize: 40,
                  },
                  mobile: {
                    defaultFontSize: 80,
                    maxFontSize: 80,
                    minFontSize: 40,
                  },
                },
              },
              {
                label: "120CM",
                width: 120,
                height: 120,
                isDefault: false,
                resizeSettings: {
                  autoResize: true,
                  desktop: {
                    defaultFontSize: 160,
                    maxFontSize: 160,
                    minFontSize: 40,
                  },
                  mobile: {
                    defaultFontSize: 80,
                    maxFontSize: 80,
                    minFontSize: 40,
                  },
                },
              },
            ],
          },
          priceOptions: [
            {
              label: "Basic",
              letterPricingMethod: "per-letter",
              signPartForMaterialCost: "Surface(W*H)",
              shippingMethod: "per-surface",
              divisorVolumetric: 5000,
              prices: [
                {
                  maxWidth: 50,
                  maxHeight: 50,
                  widthModifier: 0,
                  heightModifier: 0,
                  length: 0,
                  pricePerSqCm: 0.022,
                  pricePerLetter: 5,
                  pricePerMaterialCost: 0,
                  startPrice: 0,
                },
                {
                  maxWidth: 90,
                  maxHeight: 90,
                  widthModifier: 0,
                  heightModifier: 0,
                  length: 0,
                  pricePerSqCm: 0.021,
                  pricePerLetter: 10,
                  pricePerMaterialCost: 0,
                  startPrice: 0,
                },
                {
                  maxWidth: 120,
                  maxHeight: 120,
                  widthModifier: 0,
                  heightModifier: 0,
                  length: 0,
                  pricePerSqCm: 0.02,
                  pricePerLetter: 15,
                  pricePerMaterialCost: 0,
                  startPrice: 0,
                },
                {
                  maxWidth: 150,
                  maxHeight: 150,
                  widthModifier: 0,
                  heightModifier: 0,
                  length: 0,
                  pricePerSqCm: 0.019,
                  pricePerLetter: 20,
                  pricePerMaterialCost: 0,
                  startPrice: 0,
                },
              ],
            },
          ],
          fontOptions: {
            label: "",
            description: "",
            fonts: [
              {
                label: "Outline",
                url: ncpcData.ncpc_assets_url + "/fonts/outline.ttf",

                previewImg: "",
                isDefault: true,
                lineHeight: {
                  type: "custom",
                  value: 1,
                  calculHeight: 0,
                },
                isGoogleFont: false,
              },
              {
                label: "Allura",
                url: ncpcData.ncpc_assets_url + "/fonts/Allura-Regular.ttf",

                previewImg: "",
                isDefault: false,
                lineHeight: {
                  type: "custom",
                  value: 1,
                  calculHeight: 0,
                },
                isGoogleFont: false,
              },
              {
                label: "Avante",
                url: ncpcData.ncpc_assets_url + "/fonts/avante.ttf",
                previewImg: "",
                isDefault: false,
                lineHeight: {
                  type: "custom",
                  value: 1,
                  calculHeight: 0,
                },
                isGoogleFont: false,
              },
              {
                label: "Corinthia",
                url: ncpcData.ncpc_assets_url + "/fonts/Corinthia-Regular.ttf",

                previewImg: "",
                isDefault: false,
                lineHeight: {
                  type: "custom",
                  value: 1,
                  calculHeight: 0,
                },
                isGoogleFont: false,
              },
              {
                label: "Melbourne",
                url: ncpcData.ncpc_assets_url + "/fonts/Melbourne_reg.ttf",
                previewImg: "",
                isDefault: false,
                lineHeight: {
                  type: "custom",
                  value: 1,
                  calculHeight: 0,
                },
                isGoogleFont: false,
              },
              {
                label: "Monaco",
                url: ncpcData.ncpc_assets_url + "/fonts/Monaco-Regular.ttf",
                previewImg: "",
                isDefault: false,
                lineHeight: {
                  type: "custom",
                  value: 1,
                  calculHeight: 0,
                },
                isGoogleFont: false,
              },
              {
                label: "Signature",
                url: ncpcData.ncpc_assets_url + "/fonts/signature.ttf",
                previewImg: "",
                isDefault: false,
                lineHeight: {
                  type: "custom",
                  value: 1,
                  calculHeight: 0,
                },
                isGoogleFont: false,
              },
              {
                label: "Neon",
                url: ncpcData.ncpc_assets_url + "/fonts/neon.ttf",
                previewImg: "",
                isDefault: false,
                lineHeight: {
                  type: "custom",
                  value: 1,
                  calculHeight: 0,
                },
                isGoogleFont: false,
              },
            ],
          },
          colorOptions: {
            label: "",
            description: "",
            glowEffect: "light-color",
            colors: [
              {
                label: "Orange",
                type: "simple",
                codeHex: ["#FFA500"],
                minWidth: 0,
                minHeight: 0,
                isDefault: true,
                visibilityRule: "one-of-two",
                previewImg: "",
                popupImg: "",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Green",
                type: "simple",
                codeHex: ["#41F63F"],
                minWidth: 0,
                minHeight: 0,
                isDefault: false,
                visibilityRule: "one-of-two",
                previewImg: "",
                popupImg: "",
                price: {
                  type: "base",
                  value: 10,
                },
              },
              {
                label: "Yellow",
                type: "simple",
                codeHex: ["#F7CC19"],
                minWidth: 0,
                minHeight: 0,
                isDefault: false,
                visibilityRule: "one-of-two",
                previewImg: "",
                popupImg: "",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Red",
                type: "simple",
                codeHex: ["#EB3F34"],
                minWidth: 0,
                minHeight: 0,
                isDefault: false,
                visibilityRule: "one-of-two",
                previewImg: "",
                popupImg: "",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Blue",
                type: "simple",
                codeHex: ["#54B5F6"],
                minWidth: 0,
                minHeight: 0,
                isDefault: false,
                visibilityRule: "one-of-two",
                previewImg: "",
                popupImg: "",
                price: {
                  type: "none",
                  value: 0,
                },
              },
            ],
          },
        },
        additionalOptions: {
          backboardOptions: {
            label: "Backboard",
            description:
              "The backboard of a neon sign is a flat surface that serves as a base for mounting the neon tubes and electrical components",
            backboards: [
              {
                label: "None",
                description: "No visible backboard",
                type: "none",
                popupImg: "",
                previewImg: "",
                isDefault: false,
                backboardLength: {
                  shapeLength: 8,
                  layers: {
                    activate: false,
                    options: [
                      {
                        label: "",
                        description: "",
                        length: 8,
                      },
                    ],
                  },
                },
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Board",
                description:
                  "Backboard cut in a Rectangle around the outside of your wording",
                type: "board",
                popupImg:
                  ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                previewImg: "",
                backboardLength: {
                  shapeLength: 8,
                  layers: {
                    activate: false,
                    options: [
                      {
                        label: "",
                        description: "",
                        length: 8,
                      },
                    ],
                  },
                },
                isDefault: true,
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Box",
                description: "Your sign will be inside a 6 sided perspex box",
                type: "box",
                popupImg:
                  ncpcData.ncpc_assets_url + "/images/include-imgs/board.jpg",
                previewImg: "",
                backboardLength: {
                  shapeLength: 8,
                  layers: {
                    activate: false,
                    options: [
                      {
                        label: "",
                        description: "",
                        length: 8,
                      },
                    ],
                  },
                },
                isDefault: false,
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Raceway",
                description:
                  "Self supporting stand, great for office desks or table tops etc",
                type: "raceway-double",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/raceway-double.jpg",
                previewImg: "",
                isDefault: false,
                backboardLength: {
                  shapeLength: 8,
                  layers: {
                    activate: false,
                    options: [
                      {
                        label: "",
                        description: "",
                        length: 8,
                      },
                    ],
                  },
                },
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Stand",
                description:
                  "Self supporting stand, great for office desks or table tops etc",
                type: "stand",
                popupImg:
                  ncpcData.ncpc_assets_url + "/images/include-imgs/stand.webp",
                previewImg: "",
                backboardLength: {
                  shapeLength: 8,
                  layers: {
                    activate: false,
                    options: [
                      {
                        label: "",
                        description: "",
                        length: 8,
                      },
                    ],
                  },
                },
                isDefault: false,
                price: {
                  type: "none",
                  value: 0,
                },
              },
            ],
          },
          backboardColorsOptions: {
            label: "Backboards Colors Options",
            description: "",
            backboardColors: [
              {
                label: "Clear Acrylic",
                color: "#D7D7D769",
                backboardColorVisualization: true,
                backboards: [1, 2, 3, 4],
                minWidth: 0,
                minHeight: 0,
                visibilityRule: "one-of-two",
                previewImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Clear-Acrylic.webp",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Clear-Acrylic.webp",
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Black",
                color: "#000000",
                backboardColorVisualization: true,
                backboards: [1, 2, 3, 4],
                minWidth: 0,
                minHeight: 0,
                visibilityRule: "one-of-two",
                previewImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/black-backboard.webp",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/black-backboard.webp",
                price: {
                  type: "base",
                  value: 10,
                },
              },
              {
                label: "Gold",
                color: "#FFD700",
                backboardColorVisualization: true,
                backboards: [1, 2, 3, 4],
                minWidth: 0,
                minHeight: 0,
                visibilityRule: "one-of-two",
                previewImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/gold-backboard.webp",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/gold-backboard.webp",
                price: {
                  type: "base",
                  value: 10,
                },
              },
            ],
          },
          materialOptions: {
            label: "Material",
            description: "",
            materials: [
              {
                label: "Indoor (Free)",
                description: "For indoor use only",
                popupImg:
                  ncpcData.ncpc_assets_url + "/images/include-imgs/indoor.webp",
                previewImg: "",
                isDefault: true,
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Waterproof",
                description: "Outdoor waterproof sign",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Waterproof.webp",
                previewImg: "",
                isDefault: false,
                price: {
                  type: "none",
                  value: 0,
                },
              },
            ],
          },
          mountingOptions: {
            label: "Mounting",
            description: "",
            mountings: [
              {
                label: "Wall Mounting Kit",
                description:
                  "Your sign will come with screws and spacers to safely mount on the wall",
                previewImg: "",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Wall-Mounting-Kit.webp",
                isDefault: true,
                excludedBackboards: [],
                excludedColors: [],
                excludedLetterTypeTextures: [],
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Hanging Kit",
                description:
                  "Your sign will come with a wire hanging kit and screws",
                previewImg: "",
                popupImg:
                  ncpcData.ncpc_assets_url +
                  "/images/include-imgs/Hanging-Kit.webp",
                isDefault: false,
                excludedBackboards: [],
                excludedColors: [],
                excludedLetterTypeTextures: [],
                price: {
                  type: "none",
                  value: 0,
                },
              },
            ],
          },
          jacketOptions: {
            label: "Jacket",
            description: "Choose the tube color when sign is turned off",
            jackets: [
              {
                label: "White",
                description: "Your sign will be white when turned off",
                previewImg: "",
                popupImg: "",
                isDefault: true,
                price: {
                  type: "none",
                  value: 0,
                },
              },
              {
                label: "Colored",
                description:
                  "The tube will be colored when turned off. Not available with the RGB color option",
                previewImg: "",
                popupImg: "",
                isDefault: false,
                price: {
                  type: "none",
                  value: 19,
                },
              },
            ],
          },
          customAdditionalsOptions: [
            {
              type: "yes/no",
              label: "Remote control (Dimmer)",
              description: "A remote control is included free with every sign",
              inputs: {
                yes: "yes",
                no: "no",
              },
              default: "yes",
              popupImg:
                ncpcData.ncpc_assets_url +
                "/images/include-imgs/Remote-control.jpg",
              price: {
                type: "none",
                value: 0,
              },
            },
            {
              type: "dropdown",
              label: "Plug Type",
              description: "Choose the right plug for your country",
              options: [
                {
                  label: "USA/CAN",
                  value: "usa/can",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Plug-Type.jpg",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "AZ/NZ",
                  value: "az/nz",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Plug-Type.jpg",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "AZ/NZ",
                  value: "az/nz",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Plug-Type.jpg",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "EU",
                  value: "eu",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Plug-Type.jpg",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "UK",
                  value: "uk",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Plug-Type.jpg",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "JAP",
                  value: "jap",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Plug-Type.jpg",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "HK",
                  value: "hk",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/Plug-Type.jpg",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            {
              type: "image-input",
              label: "Cable colour",
              description: "",
              options: [
                {
                  label: "Black",
                  value: "black",
                  color: "#000000",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/cable-black.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/cable-black.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
                {
                  label: "White",
                  value: "white",
                  color: "#FFFFFF",
                  previewImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/cable-white.webp",
                  popupImg:
                    ncpcData.ncpc_assets_url +
                    "/images/include-imgs/cable-white.webp",
                  price: {
                    type: "none",
                    value: 0,
                  },
                },
              ],
            },
            {
              type: "note",
              label: "Any other special requests",
              description:
                "Place in special requests and we will contact you before production",
              noteLimitChar: 255,
            },
          ],
        },
        settings: {
          generals: {
            customizer: {
              measurementUnit: "cm",
              showHideMeasurements: "both",
              decimalFormatMeasurements: "no-decimal",
              fontFamilyName: "",
              useExampleIcon: true,
              exampleText: "Example",
              showExampleOnHover: false,
              priceStartOptions: "at-zero",
              priceMeasurementAnimation: "on",
              destokColumnOrder: "right",
              glowSwitch: "glow-only",
              shadowSwitch: true,
              discount: "none",
              displayOptions: "name",
              discountValue: 0,
              showDayNightButton: true,
              displayPriceBeforeFinishBotton: "hide",
              showNumberedSelections: false,
              showTextAlign: true,
              defaultTextAlign: "center",
              showColorNameOnHover: false,
            },
            mobile: {
              showNavigatorMenu: "off",
              showNavigationMenuFirst: "yes",
              mobileSelectionOptionsDisplay: "horizontally-stack",
            },
            output: {
              fileFormat: "svg",
              manufacturerEmail: {
                sendDesignByEmail: true,
                receiverEmail: [],
                subject: "New order for Manufacturer",
                emailTemplate:
                  '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additonal_options}}<b>{{label}}:</b> {{value}}<br>{{/additonal_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>',
              },
            },
            product: {
              enableAddToCart: true,
              redirectAfterAddToCart: true,
              redirectToCheckOutPage: false,
              displayRecapsOnCheckout: false,
              hideAddToCartButtonCustomProducts: true,
              hideDesignButtonsOnShopPage: false,
              hideAddToCartButtonOnShopPage: true,
            },
            requestQuote: {
              enableRequestQuote: false,
              receiversEmail: "",
              sendToCustomer: false,
              allowUploadFiles: false,
              acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
              maxFileSize: 10,
              maxFilesNumber: 5,
              emailSubject: "Request A Quote",
            },
            mode: {
              type: "simple",
              allowMultiFonts: true,
              allowMultiColors: true,
            },
          },
          languageImages: {
            customDesign: {
              link: {
                activate: false,
                link: "",
                phraseSubmitCustom: "Take a customization",
              },
              aiDesigner: {
                activate: true,
              },
              editorModes: {
                enableTextEditor: false,
              },
              screen: {
                activate: false,
                customDesignText:
                  "To submit the personalized design, please click on this button before",
                buttonLabel: "Send Custom Design",
                phraseToLinkBackTextCustomiser: "Custom now",
                steps: {
                  headers: "",
                  data: [],
                },
              },
            },
            images: {
              previewImage: {
                activate: true,
                allowUpload: false,
                uploadText: "",
                displayDefaultBackgroundImage: true,
              },
              enableReviewImage: true,
              reviewScreenImages: {
                activate: false,
                displayDefaultBackgroundImage: false,
              },
              manageImages: [
                ncpcData.ncpc_assets_url + "/images/include-imgs/img13.jpg",
                ncpcData.ncpc_assets_url + "/images/include-imgs/img14.jpg",
                ncpcData.ncpc_assets_url + "/images/include-imgs/img15.jpg",
                ncpcData.ncpc_assets_url + "/images/include-imgs/img21.jpg",
                ncpcData.ncpc_assets_url + "/images/include-imgs/img24.jpg",
                ncpcData.ncpc_assets_url + "/images/include-imgs/img27.jpg",
              ],
            },
            main: {
              header: "CREATE YOUR SIGN",
              textTabLabel: "Text",
              customTabLabel: "Custom",
              textBoxLabel: "Write your text",
              customDesign: {
                dropText: "Drop an image here or tap to browse",
                processingText: "Processing your image",
              },
              lineCount: "Lines",
              maxCharacters: "max characters per line for current size",
              addingToCartButton: "Add to the cart",
              requestAQuoteButton: "Get A Quote",
              buttonSendAQuoteFormLabel: "Submit",
              firstName: "First Name",
              lastName: "Last Name",
              email: "Email",
              phone: "Phone",
              quoteAdditionalNotes: "Additional Notes",
              quoteUploadFileTitle: "Upload your files",
              quoteFilesFormats: "Formats",
              maxFileSize: "Max File Size",
              emailError: "Please enter a valid email address",
              quoteThanksMessage: "Your quote has been sent successfully",
              quoteModalTitle: "Quote Request Submission",
              finishButton: "Finish",
              textBeforePriceValue: "",
              textAfterPriceValue: "Tax included",
              maxSignLabel: "the size exceeds the limit",
              textAlignment: "Text Align",
              textAlignmentValue: {
                left: "Left",
                center: "Center",
                right: "Right",
              },
              maxSignModals: {
                width: "Your sign has exceeded the maximum width",
                height: "Your sign has exceeded the maximum height",
                lines: "Your sign has exceeded the maximum number of lines",
                characters:
                  "Your sign has exceeded the maximum number of characters",
              },
              measurementLabel: {
                width: "Width",
                height: "Height",
              },
              customSizeSection: {
                sliderButton: "Switch back to slider",
                manualButton: "Enter dimensions manually",
                inchButton: "Use inches",
                cmButton: "Use cm",
                aspectRatioWarning:
                  "Values may be modified to maintain the required aspect ratio",
              },
              summaryLabel: "Summary",
              editLabel: "Edit",
              sectionText: "Text",
              sectionAdditionalOptions: "Additional Options",
              charactersRemaining: "Remaining characters",
              minimumCharacter:
                "or more characters are required, please add more characters.",
              selectableTextMessage: "Click on a word to begin customising it.",
            },
            reviewScreen: {
              activate: true,
              mainReviewSection: {
                headerLabel: "",
                backLabel: "",
                textFieldsDisplayUndeneathImageCarousel: ["", "", ""],
              },
              choosenOptionsSection: {
                header: "",
                text: "",
                size: "",
                font: "",
                mounting: "",
                extras: "",
                productType: "",
                additionalItemsIncluded: {
                  header: "",
                  inclusions: "",
                },
                qualities: {
                  header: "",
                  qualitiesList: [
                    {
                      header: "",
                      description: "",
                    },
                  ],
                },
                additonalInformation: [
                  {
                    header: "",
                    description: "",
                    displayImage: "",
                  },
                ],
                contactSection: {
                  header: "",
                  description: "",
                },
              },
            },
            visualizer: {
              defaultText: "Your Text",
              textUnderneathPrice: "",
              showNote: true,
              note: "",
              visualizerOn: "ON",
              visualizerOff: "OFF",
              visualizerLight: "Light",
              visualizerDark: "Dark",
              textIcon: "",
              fontIcon: "",
              sizeIcon: "",
              colorIcon: "",
              letterTypeIcon: "",
              materialIcon: "",
              jacketIcon: "",
              mountingIcon: "",
              backboardIcon: "",
              backboardColorIcon: "",
              additionalIcon: "",
              showTextEditorOverlay: false,
            },
          },
          infos: {
            sizes: "",
            colors: "",
            backboards: "",
            materials: "",
            jackets: "",
            mountings: "",
            extras: [],
          },
          themes: {
            skin: "default",
            colors: {
              backgroundColor: "#FFFFFF",
              titleColor: "#000000",
              descriptionColor: "#000000",
              buttonColor: "#FFFFFF",
              buttonHoverColor: "#f8fafc",
              buttonTextColor: "#000000",
              activeButtonColor: "#0e7490",
              activeButtonHoverColor: "#0891b2",
              activeButtonTextColor: "#FFFFFF",
              beforePriceColor: "#000000",
              priceBackgroundColor: "#FFFFFF",
              priceColor: "#000000",
              delPriceColor: "#878787",
              afterPriceColor: "#000000",
              optionsSectionBackgroundColor: "#fafafa",
              optionBorderColor: "#4b5563",
              activeOptionBackgroundColor: "#ffffff",
              optionTextColor: "#4b5563",
              colorOfMeasuringBarText: "#FFFFFF",
              colorMeasuringBar: "#FFFFFF",
              activeOptionBorderColor: "#0891b2",
              activeOptionTextColor: "#0891b2",
              formErrorBg: "#ff0000",
              formErrorText: "#000000",
              finishModalColor: "#000000",
              finishModalLoaderColor: "#ece8e8",
              finishButtonContainerColor: "#FFFFFF",
              finishButtonContainerPriceColor: "#000000",
              finishButtonContainerDiscountPriceColor: "#000000",
              shareButtonContainerColor: "#FFFFFF",
              shareButtonTextColor: "#000000",
              selectedTextBorderColor: "#000000",
              selectedTextBorderCornerColor: "#000000",
              darkBackgroundColor: "#1c1c1c",
              darkTitleColor: "#FFFFFF",
              darkDescriptionColor: "#FFFFFF",
              darkButtonColor: "#1c1c1c",
              darkButtonHoverColor: "#292929",
              darkButtonTextColor: "#FFFFFF",
              darkActiveButtonColor: "#292929",
              darkActiveButtonHoverColor: "#292929",
              darkActiveButtonTextColor: "#0e7490",
              darkBeforePriceColor: "#FFFFFF",
              darkPriceBackgroundColor: "#FFFFFF",
              darkPriceColor: "#1c1c1c",
              darkAfterPriceColor: "#FFFFFF",
              darkOptionsSectionBackgroundColor: "#292929",
              darkOptionBorderColor: "#6b7280",
              darkOptionTextColor: "#6b7280",
              darkActiveOptionBackgroundColor: "#000000",
              darkActiveOptionBorderColor: "#0891b2",
              darkActiveOptionTextColor: "#0891b2",
              darkFinishModalColor: "#ffffff",
              darkFinishModalLoaderColor: "#cccbc8",
            },
            settings: {
              openOptions: false,
            },
            customCSS: "",
          },
          sortOptions: [
            "text-form",
            "fonts",
            "sizes",
            "colors",
            "materials",
            "jackets",
            "mountings",
            "backboards",
            "backboard-colors",
            "additionals-options",
          ],
        },
      },
    },
  },
];

const pricings = [
  {
    name: "Fixed height per size",
    value: "fixed-height",
    previewImg:
      ncpcData.ncpc_assets_url +
      "/images/configs-previews/pricing-previews/fixed-height.svg",
    description: [
      {
        icon: "info",
        text: "Letter height is fixed for each size tier, width adjusts based on text.",
      },
      {
        icon:
          ncpcData.ncpc_assets_url +
          "/images/configs-previews/pricing-previews/sizes.svg",
        text: "Best for standard height constraints.",
      },
    ],
  },
  {
    name: "Fixed width per size",
    value: "fixed-width",
    previewImg:
      ncpcData.ncpc_assets_url +
      "/images/configs-previews/pricing-previews/fixed-witdh.svg",
    description: [
      {
        icon: "info",
        text: "Letter width is fixed for each size tier, height adjusts based on text.",
      },
      {
        icon:
          ncpcData.ncpc_assets_url +
          "/images/configs-previews/pricing-previews/sizes.svg",
        text: "Best for standard width constraints.",
      },
    ],
  },
  {
    name: "Price by material length",
    value: "advanced",
    previewImg:
      ncpcData.ncpc_assets_url +
      "/images/configs-previews/pricing-previews/advanced.svg",
    description: [
      {
        icon: "info",
        text: "Price is calculated based on the total length of material used in the sign.",
      },
      {
        icon:
          ncpcData.ncpc_assets_url +
          "/images/configs-previews/pricing-previews/sizes.svg",
        text: "Most accurate for neon and LED tube signs.",
      },
    ],
  },
  {
    name: "Price per square meter/foot",
    value: "frame-fit",
    previewImg:
      ncpcData.ncpc_assets_url +
      "/images/configs-previews/pricing-previews/frame-fit.svg",
    description: [
      {
        icon: "info",
        text: "Price is calculated based on the total area (width x height) of the sign.",
      },
      {
        icon:
          ncpcData.ncpc_assets_url +
          "/images/configs-previews/pricing-previews/sizes.svg",
        text: "Best for frame-focused signs.",
      },
    ],
  },
];
export { configs, pricings };
export default { configs, pricings };
