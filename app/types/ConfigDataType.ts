
  
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
  
 export interface ConfigSize {
    manageSizeId: number;
    textNumber: number; 
    maxTextChar: number;
    charPrice: number;
    basePrice: number;
  }
  
 export interface ConfigBorder {
    manageBorderId: string;
    additionalPrice: number;
    excludeSizes: number[];
    settings: {
      codeHex: string;
      enableBorderWidth: boolean;
      enableBorderColor: boolean;
    };
  }
  
 export interface ConfigShape {
    shapeId: string;
    additionalPrice: number;
  }
  
 export interface ConfigTextImages {
    enableText: boolean;
    enableImages: boolean;
  }
  
 export interface ConfigFixingMethod {
    fixingMethodId: string;
    additionalPrice: number;
  }
  
 export interface ConfigColor {
    manageColorId: number;
    additionalPrice: number;
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
    };
    additionalPrice: number;
 }
  
export interface MaterialAdvanceComponentType{
  name: string;
  description: string;
  icon: string;
  options?: MaterialAdvanceOptionType[];
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