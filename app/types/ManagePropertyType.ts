export interface SizeType {
    id?: number;
    label?: string;
    width: number;
    height: number;
    thickness:{
        active:boolean,
        value:number
    } | any;
}

export interface  FontType{
    id?: number;
    label: string;
    url: string;
    isGoogleFont: boolean;
}


export interface  ColorType{
    id?: number;
    name: string;
    textColor: { active: boolean; codeHex: string };
    backgroundColor: string;
}

export interface ClipartType{
    id?: number;
    title: string;
    url: string;
    additionalPrice: number;
}


export interface ClipartsGroupType{
    id?: number;
    title: string;
    description: string;
  }
  


