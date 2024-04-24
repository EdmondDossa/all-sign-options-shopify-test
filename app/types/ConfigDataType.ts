import { number } from 'zod';

  
 export interface ConfigCustomSize {
    active: boolean;
    width: {
      label: string;
      min: number;
      max: number;
    };
    height: {
      label: string;
      min: number;
      max: number;
    };
 }

 export interface configSizeThickness {
  active: boolean;
  values: Array<any>;
 }
  
 export interface ConfigCustomColor {
  active: boolean;
   label: string;
   prevImg: string;
}
  
export interface ConfigSize {
    label: string;
    width:number,
    height:number,
    textNumber: number; 
    maxTextChar: number;
    charPrice: number;
    basePrice: number;
    startPriceAtChar: number;
    isDefault?: boolean;
  }
  
 export interface ConfigBorder {
    manageBorderId: number;
    additionalPrice: number;
    excludeSizes: number[];
    excludeShapes: number[];
    isDefault?: boolean;
 }
  
 export interface BorderSettingType {
  colors:Array<{ codeHex: string; name: string; }>;
  enableBorderWidth:boolean,
  enableBorderColor:boolean,
 }
  
 export interface ConfigShape {
    shapeId: number;
   additionalPrice: number;
   isDefault?: boolean;
  }
  
 export interface ConfigTextImages {
    enableText: boolean;
    enableImages: boolean;
  }
  
 export interface ConfigFixingMethod {
    fixingMethodId: number;
    additionalPrice: number;
    isDefault?: boolean;
  }
  
export interface ConfigColor {
  name: string;
    additionalPrice: number;
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
  image: string;
   additionalPrice: number;
   isDefault?: boolean;
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
    };
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
      width: number;
      height: number;
      basePrice: number;
      startPriceAtChar: number;
      maxTextChar: number;
      charPrice: number;
    };
    additionalPrice: number;
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
    data?: MaterialAdvanceComponentType[];
 }
  
export interface MaterialType{
  name: string;
  description: string;
  icon: string;
  popImg: string;
  type: 'advance'|"simple";
}
  
  export type Material = MaterialSimple | MaterialAdvance;