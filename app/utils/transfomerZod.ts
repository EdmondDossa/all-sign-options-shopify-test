export const booleanTransform = (value: any) => {
   
    return value == true || value == "true" || value ==1 || value == "1";
};
  
export const jsonTransform = (value: any) => {
    try {
        return JSON.parse(value as string) || {}
    } catch (error) {
        console.log( "errors  on json format", error, "value", value);
        return value;
    }
}



export const stringTransform = (value: any) => { return value || ""; }