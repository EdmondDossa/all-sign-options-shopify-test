export const fileUrl = (url: any) => {
    
    if (url && typeof  url === "string") {
        const urlParts = url.split("/aso-proxy/");
        if (urlParts.length > 1) {
            return `/${urlParts[1]}`;
        }
    }

    return url;
}