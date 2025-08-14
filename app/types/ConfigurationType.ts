 export interface ConfigurationType {
    id?: number;
    name: string;
    description: string;
    icon: string;
     popupImg: string;
    data?: any;
     product?: any;
     products?: Array<{id: string, title: string}>;
     templates?: any
}