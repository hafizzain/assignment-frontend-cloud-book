// build query string for api
export const buildQueryString = (data, removePage, ignoreKeys = []) => {
    let query = '?';

    // Exclude 'page' property from data if removePage is true
    if (data.page && removePage) {
        delete data.page;
    }

    // Iterate over data object to build the query string
    for (let dt in data) {
        // Skip the key if it's included in the ignoreKeys array
        if (data[dt] && !ignoreKeys?.includes(dt)) {
            query += `${dt}=${encodeURIComponent(data[dt])}&`;
        }
    }

    // Remove the last '&' character from the query
    query = query?.slice(0, -1);

    return query;
};
