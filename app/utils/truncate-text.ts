export function truncateText(str?: string|null, length = 25, ending = '...') {
    // Check if string length is less than or equal to the desired length
    str = str || '';
    if (str.length <= length) return str;
  
    // If truncation is needed, slice the string and add the ending
    return str.slice(0, length) + ending;
}