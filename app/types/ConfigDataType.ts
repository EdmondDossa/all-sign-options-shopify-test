import { number } from 'zod';

  
 export interface ConfigCustomSize {
    active: boolean;
    hideSizes?: boolean;
    width: {
      label: string;
      min: number|string;
      max: number|string;
      default?: number|string;
    };
    height: {
      label: string;
      min: number|string;
      max: number|string;
      default?: number|string;
    };
   pricings: {
     type: "unit"|"range";
     rangePricingPerUnit?:boolean;
     range:  Array<{
        basePrice: number | string;
        surface: number | string;
        charPrice: number | string;
      }>;
      unit:{
        basePrice: number | string;
        surface: number | string;
        charPrice: number | string;
        areaConversionFactor?: number | string;
      };

   
   }
 }

export interface ThicknessValue {
  label: string;
  value: number | string;
  pricingType: 'additional' | 'multiplier';
  additionalPrice: number | string;
  multiplier: number | string;
}

export interface DoubleSidedPricing {
  type: 'additional' | 'multiplier';
  additionalPrice: number | string;
  multiplier: number | string;
}

export interface configSizeThickness {
  active: boolean;
  values: Array<ThicknessValue | number | string>;
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
    isVisible?: boolean;
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
    discounts?:any|Array<{
      quantity: any ,
      discountPercentage:any
    }>;
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
    active?: boolean;
    name: string;
    description: string;
    icon: string;
    popImg: string;
    type: 'advance'|"simple";
    discounts?:any|Array<{
      quantity: any ,
      discountPercentage:any
    }>;
    data?: MaterialAdvanceComponentType[] | any;
 }
  
export interface MaterialType{
  active?: boolean;
  name: string;
  description: string;
  icon: string;
  popImg: string;
  discounts?:any|Array<{
    quantity: any ,
    discountPercentage:any
  }>;
  type: 'advance'|"simple";
}
  
  export type Material = MaterialSimple | MaterialAdvance;

export interface ConfigDiscount {
  lots: Array<{
    quantity: string;
    discountPercentage: string;
  }>;
}

export interface SimpleOptionItem {
  label: string;
  value: string;
}

export interface SimpleOptionGroup {
  id: string;
  name: string;
  required: boolean;
  options: SimpleOptionItem[];
}

export interface SimpleProductOptions {
  enabled: boolean;
  optionGroups: SimpleOptionGroup[];
}