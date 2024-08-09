
const fileExtensions = {
    "image": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".bmp", ".tiff"],
    "icon": [".ico", ".icns",".svg"],
    "video": [".mp4", ".mov", ".avi", ".wmv", ".mkv", ".flv", ".webm"],
    "font": [".ttf", ".otf", ".woff", ".woff2"]
  };
 export function getFileType(filename: string) {
    let part = filename.split('.');
    let ext = `.${part.pop()}`.toLowerCase();
    
   
  
    for (const [fileType, extensions] of Object.entries(fileExtensions)) {
      if (extensions.includes(ext)) {
        return fileType;
      }
    }
  
    return null;
  }