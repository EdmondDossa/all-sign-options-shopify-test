
export interface CategoryType{
    id?: number;
    name: string;
}


export  interface TemplateType{
    id?: number;
    name: string;
    basePrice: number|any;
    prevImg: string;
    enabledAddToCart:boolean;
    enabledAutoImgUpdate?:boolean;
    configurationId: number;
    categoryId?:number
    sessionId?: string,
    recaps?:any;
    data?:any;
}


