// Utility function to sanitize raw JSON string by replacing NaN with a placeholder
const sanitizeRawJSON = (rawJSON) => {
    return rawJSON.replace(/NaN/g, '"NaN"'); // Temporarily replace NaN with a string placeholder
};

// Function to handle JSON parsing with NaN sanitization
const parseSanitizedJSON = (rawJSON) => {
    const sanitizedJSON = sanitizeRawJSON(rawJSON); // Replace NaN with "NaN"
    return JSON.parse(sanitizedJSON); // Parse the sanitized JSON string
};

// Function to sanitize the data after parsing
const sanitizeData = (data) => {
    return data.map(stock => {
        return {
            ...stock,
            peRatio: stock.peRatio === "NaN" ? null : stock.peRatio, // Replace placeholder "NaN" with null
            price: Number.isNaN(stock.price) ? 0 : stock.price, // Replace NaN in price with 0
            change1M: Number.isNaN(stock.change1M) ? 0 : stock.change1M,
            change1Y: Number.isNaN(stock.change1Y) ? 0 : stock.change1Y,
            change3M: Number.isNaN(stock.change3M) ? 0 : stock.change3M,
            change6M: Number.isNaN(stock.change6M) ? 0 : stock.change6M,
            volume: Number.isNaN(stock.volume) ? 0 : stock.volume,
        };
    });
};

// Function to get authorization headers
const getAuthHeaders = () => {
    const userToken = localStorage.getItem('userToken');
    return userToken ? { 'Authorization': `Bearer ${userToken}` } : {};
};

// Handle fetch errors
const handleFetchError = (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};

// Fetch stock data
export const fetchStockData = async (page = 1, perPage = 10) => {
    const apiUrl = `http://localhost:8080/predictor/data/tickers?page=${page}&per_page=${perPage}`;
    const userToken = localStorage.getItem('userToken'); // Get token from localStorage

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        handleFetchError(response);

        // Get the raw response as text
        const rawJSON = await response.text();

        // Parse sanitized JSON data
        const result = parseSanitizedJSON(rawJSON);

        // Sanitize data to replace NaN values with default values
        const sanitizedData = sanitizeData(result.data);

        return {
            data: sanitizedData.map(stock => ({
                ...stock,
                favorite: false, // Adding a default 'favorite' property
            })),
            total: result.pagination.total_records, // Assuming the API provides total number of records
        };
    } catch (error) {
        console.error('Error fetching stock data:', error.message);
        throw error;
    }
};

// Fetch stock data by symbol
export const fetchStockDataBySymbol = async (symbol, period = "1y", interval = "1h") => {
    const apiUrl = `http://localhost:8080/predictor/data/stock_info/${symbol}`;
    const userToken = localStorage.getItem('userToken'); // Get token from localStorage

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        handleFetchError(response);

        // Get the raw response as text
        const rawJSON = await response.text();

        // Parse sanitized JSON data
        const result = parseSanitizedJSON(rawJSON);

        // Extract relevant data from the response
        const stockData = result.data;

        // Sanitize and format the stock data
        const sanitizedData = sanitizeData([stockData]);

        // Ensure the scores are included correctly
        const sanitizedStockData = {
            ...sanitizedData[0], // Use the sanitized stock data
            scores: stockData.scores || [], // Ensure the scores array is present
        };

        return sanitizedStockData; // Return the sanitized stock data with scores
    } catch (error) {
        console.error(`Error fetching stock data for symbol ${symbol}:`, error.message);
        throw error;
    }
};

