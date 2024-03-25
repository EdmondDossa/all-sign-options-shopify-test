export const booleanTransform = (value: any) => {
    console.log(" valeu is ", value);
    return value == true || value == "true" || value ==1 || value == "1";
};
  
export const jsonTransform = (value: any) => {
    try {
        return JSON.parse(value as string) || {}
    } catch (error) {
        return value;
    }
}