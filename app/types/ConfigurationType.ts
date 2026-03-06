 export interface ConfigurationType {
    id?: number;
    name: string;
    description: string;
    icon: string;
     popupImg: string;
    data?: any;
     products?: Array<{id: string, title: string}>;
     templates?: any;
     materialType?: string;
     productType?: string;
     pricingMode?: string | null;
}
