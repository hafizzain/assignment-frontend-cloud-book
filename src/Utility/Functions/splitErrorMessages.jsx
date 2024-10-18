// Function to split the string into two parts
export const splitErrorMessages = (errorString) => {
    // Use regex to match numbers followed by "issue(s)", "page(s)", "content(s)"
    const regex = /(\d+)\s+(issue|issues|page|pages|content|contents)\s+(.*)/i;
    const match = errorString.match(regex);

    if (match) {
        const number = parseInt(match[1], 10);
        let type = match[2];

        // Adjust the type (singular/plural) based on the number
        if (number === 1 && type.endsWith('s')) {
            type = type.slice(0, -1); // Convert to singular if it ends with 's'
        } else if (number > 1 && !type.endsWith('s')) {
            type = type + 's'; // Convert to plural if it doesn't end with 's'
        }

        return {
            data1: `${number} ${type}`, // e.g., "1 issue" or "2 pages"
            data2: match[3], // Remaining part of the string
            count: number,   // Store the count
        };
    }

    return { data1: '', data2: '', count: null }; // Default to empty strings if no match
};
