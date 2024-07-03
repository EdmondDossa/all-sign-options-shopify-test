export function getError(actionData:any, key:string){
    if(actionData && typeof actionData == "object" && Object.keys(actionData).includes("errors")) {
        if (actionData.errors && typeof actionData.errors =="object" &&  Object.keys(actionData.errors).includes(key) && Array.isArray(actionData.errors[key])) {
            return actionData.errors[key][0];
        }
    }

    return '';
}                               



export  function getErrorFromZod(errors:any, inputs: string){
    try {
        const error = errors.find((currError: any) => currError.path.join(".") == inputs);
        return error? error.message : "";
    } catch (error) {
       return "" 
    }
}   