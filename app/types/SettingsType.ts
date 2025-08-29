export interface OutputType{
    zipName: boolean;
    calculateOutput: boolean;
    pdfDpi?: 72 | 150 | 300 | 600;
}

export interface ShapeType {
    name: string,
    icon: string,
    value: string,
}

export interface FixingMethodType    {
    name: string;
    description?: string;
    icon: string;
    popImg: string;
    type: string;
}

export interface BorderType {
    name: string;
    icon: string;
    value: string;
}