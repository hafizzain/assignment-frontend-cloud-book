export const removeTrailingSlash = (url) => {
    // Ensure the input is a string, return it directly if it's falsy or not a string
    if (!url || typeof url !== 'string') {
        return url;
    }
    
    // Use a while loop to remove all trailing slashes
    while (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    
    return url;
};