export const objectKeyConvertToArray = (object) => {
    if (!object || typeof object !== 'object') {
        return []; // Return an empty array if the input is not a valid object
    }
    return Object.keys(object);
};


export const convertObjectToArray = (obj) => {
    // Filter object entries that have non-empty values and return them as an array
    if (typeof obj == 'object')
        return Object.entries(obj)
            .filter(([key, value]) => value !== undefined && value !== null && value !== '')
            .map(([key, value]) => ({ [key]: value }));
    else
        return []
};

export const convertImgToUrl = (file) => {
    let data;
    if (file) {
        data = URL.createObjectURL(file);
    }
    return data
};
