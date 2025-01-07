import {config} from "../profiles";

const sanitizeRawJSON = (rawJSON) => {
    return rawJSON.replace(/NaN/g, '"NaN"');
};

const parseSanitizedJSON = (rawJSON) => {
    const sanitizedJSON = sanitizeRawJSON(rawJSON);
    return JSON.parse(sanitizedJSON);
};

const sanitizeData = (data) => {
    return data.map(stock => {
        return {
            ...stock,
            peRatio: stock.peRatio === "NaN" ? null : stock.peRatio,
            price: Number.isNaN(stock.price) ? 0 : stock.price,
            change1M: Number.isNaN(stock.change1M) ? 0 : stock.change1M,
            change1Y: Number.isNaN(stock.change1Y) ? 0 : stock.change1Y,
            change3M: Number.isNaN(stock.change3M) ? 0 : stock.change3M,
            change6M: Number.isNaN(stock.change6M) ? 0 : stock.change6M,
            volume: Number.isNaN(stock.volume) ? 0 : stock.volume,
        };
    });
};

const getAuthHeaders = () => {
    const userToken = localStorage.getItem('userToken');
    return userToken ? { 'Authorization': `Bearer ${userToken}` } : {};
};

const handleFetchError = (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};

export const fetchStockData = async (page = 1, perPage = 10) => {
    const apiUrl = `${config.API_BASE_URL}/predictor/data/tickers?page=${page}&per_page=${perPage}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        handleFetchError(response);

        const rawJSON = await response.text();

        const result = parseSanitizedJSON(rawJSON);

        const sanitizedData = sanitizeData(result.data);

        return {
            data: sanitizedData.map(stock => ({
                ...stock,
                favorite: false,
            })),
            total: result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching stock data:', error.message);
        throw error;
    }
};


export const fetchStockDataBySymbol = async (symbol, period = "1y", interval = "1h") => {
    const apiUrl = `${config.API_BASE_URL}/predictor/data/stock_info/${symbol}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        handleFetchError(response);

        const rawJSON = await response.text();

        const result = parseSanitizedJSON(rawJSON);

        const stockData = result.data;

        const sanitizedData = sanitizeData([stockData]);

        const sanitizedStockData = {
            ...sanitizedData[0],
            scores: stockData.scores || [],
        };

        return sanitizedStockData;
    } catch (error) {
        console.error(`Error fetching stock data for symbol ${symbol}:`, error.message);
        throw error;
    }
};

