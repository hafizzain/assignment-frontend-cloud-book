// Function to format the percentage value
export const formatPercentage = (value) => {
    if (value) {
        // Parse the value to a number
        const numberValue = parseFloat(value);

        // Check if the number is an integer (e.g., 100.0 should be displayed as 100)
        if (Number.isInteger(numberValue)) {
            return numberValue?.toFixed(0); // Return without decimal places
        }

        // Otherwise, return the number with one decimal place
        return numberValue?.toFixed(1);
    }
};