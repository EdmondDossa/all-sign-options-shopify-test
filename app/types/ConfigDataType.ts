import { number } from 'zod';

  
 export interface ConfigCustomSize {
    active: boolean;
    width: {
      label: string;
      min: number|string;
      max: number|string;
    };
    height: {
      label: string;
      min: number|string;
      max: number|string;
    };
   pricings: {
     type: "unit"|"range";
     range:  Array<{
        basePrice: number | string;
        surface: number | string;
        charPrice: number | string;
      }>;
      unit:{
        basePrice: number | string;
        surface: number | string;
        charPrice: number | string;
      };

   
   }
 }

 export interface configSizeThickness {
  active: boolean;
  values: Array<any>;
 }
  
 export interface ConfigCustomColor {
  active: boolean;
   label: string;
   prevImg?: string;
}
  
export interface ConfigSize {
    label: string;
  width: number | string;
  height: number | string;
    textNumber: number|string; 
    maxTextChar: number|string;
    charPrice: number|string;
    basePrice: number|string;
    startPriceAtChar: number|string;
    isDefault?: boolean;
  }
  
 export interface ConfigBorder {
    manageBorderId: number;
    additionalPrice: number|string;
    excludeSizes: number[];
    excludeShapes: number[];
    isDefault?: boolean;
 }
  
 export interface BorderSettingType {
  colors:Array<{ codeHex: string; name: string; additionalPrice: number|string }>;
  enableBorderWidth:boolean,
   enableBorderColor: boolean,
   borderColorsLabel: string,
   customColorsPrevImg:string
 }
  
 export interface ConfigShape {
    shapeId: number;
   additionalPrice: number|string;
   isDefault?: boolean;
   enablePricingBySurface?:boolean,
   surface?:number|string;
   shapeSize?: {
     small: number;
     medium: number;
     large: number;
   };
  }
  
 export interface ConfigTextImages {
    enableText: boolean;
    enableImage: boolean;
    enableQrCode: boolean;
  }
  
 export interface ConfigFixingMethod {
    fixingMethodId: number;
    additionalPrice: number|string;
    excludeSizes: number[];
    excludeShapes: number[];
    isDefault?: boolean;
  }
  
export interface ConfigColor {
  name: string;
    additionalPrice: number|string;
   isDefault?: boolean;
    textColor:{
          active:boolean,
          sameForBorder:boolean,
          codeHex: string,
          name:string
      },
      pattern:{
          active:boolean,
          codeHex:string,
          url:string
      },
      prevImg:string,
  }
  
 export interface ConfigAdditionalOption {
    title: string;
    description: string;
    icon: string;
    options: any[];
 }
  
 export interface ConfigAdditionalOptionItem {
  title: string;
  description: string;
  icon: string;
   popImg: string;
   excludeColors: number[];
   additionalPrice: number|string;
   isDefault?: boolean;
   enablePricingBySurface?: boolean,
   surface?:number|string;
}
  
 export interface MaterialSimple {
    name: string;
    description: string;
    icon: string;
    popImg: string;
    type: 'advance'|"simple";
    data?: {
      sizes: {
        customSize: ConfigCustomSize;
        allSizes: ConfigSize[];
      };
      borders: ConfigBorder[];
      shapes: ConfigShape[];
      textImages: ConfigTextImages;
      fixingMethods: ConfigFixingMethod[];
      colors: ConfigColor[];
      additionalOptions: ConfigAdditionalOption[];
    } | any;
 }
  
 
  
 export interface MaterialAdvanceOptionType {
    name: string;
    description: string;
    icon: string;
   image: string;
   isDefault?: boolean;
    color:{
      name: string;
      codeHex?: string;
      prevImg?: string;
  }
   fixingMethods: number[];
    shapeId?: number;
    size: {
      width: number|string;
      height: number|string;
      basePrice: number|string;
      startPriceAtChar:number|string;
      maxTextChar: number|string;
      charPrice: number|string;
    };
    additionalPrice: number|string;
 }
  
export interface MaterialAdvanceComponentType{
  name: string;
  description: string;
  icon: string;
  options?: MaterialAdvanceOptionType[];
  isDefault: boolean;
}
  
 export interface MaterialAdvance{
    name: string;
    description: string;
    icon: string;
    popImg: string;
    type: 'advance'|"simple";
    data?: MaterialAdvanceComponentType[] | any;
 }
  
export interface MaterialType{
  name: string;
  description: string;
  icon: string;
  popImg: string;
  type: 'advance'|"simple";
}
  
  export type Material = MaterialSimple | MaterialAdvance;

export interface ConfigDiscount {
  lots: Array<{
    quantity: string;
    discountPercentage: string;
  }>;
}