export const booleanTransform = (value: any) => {
   
    return value == true || value == "true" || value ==1 || value == "1";
};
  
export const jsonTransform = (value: any) => {

    try {
        return typeof value === "string" ? JSON.parse(value) : value;
    } catch (error) {
        console.log("Error parsing JSON:", error, "Value:", value);
        return value; // Return the original value if parsing fails
    }
};



export const stringTransform = (value: any) => { return value || ""; }