const sanitizeRawJSON = (rawJSON) => {
    return rawJSON.replace(/NaN/g, '"NaN"');
};

const parseSanitizedJSON = (rawJSON) => {
    const sanitizedJSON = sanitizeRawJSON(rawJSON);
    return JSON.parse(sanitizedJSON);
};

const sanitizePredictionData = (data) => {
    return data.map((prediction) => {
        return {
            ...prediction,
            Close: Number.isNaN(prediction.Close) ? 0 : prediction.Close,
            High: Number.isNaN(prediction.High) ? 0 : prediction.High,
            Low: Number.isNaN(prediction.Low) ? 0 : prediction.Low,
            Open: Number.isNaN(prediction.Open) ? 0 : prediction.Open,
            Volume: Number.isNaN(prediction.Volume) ? 0 : prediction.Volume,
            Timestamp: new Date(prediction.Timestamp).toISOString(),
        };
    });
};

const getAuthHeaders = () => {
    const userToken = localStorage.getItem("userToken");
    return userToken ? { Authorization: `Bearer ${userToken}` } : {};
};

const handleFetchError = (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};

export const fetchPredictionData = async (
    symbol,
    period = "2y",
    interval = "1h",
    daysAhead = "3d"
) => {
    const apiUrl = `http://127.0.0.1:8080/predictor/predict/${symbol}?period=${period}&interval=${interval}&days_ahead=${daysAhead}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        handleFetchError(response);

        const rawJSON = await response.text();

        const result = parseSanitizedJSON(rawJSON);

        const sanitizedPredictionData = sanitizePredictionData(result.prediction);

        return sanitizedPredictionData;
    } catch (error) {
        console.error(
            `Error fetching prediction data for symbol ${symbol}:`,
            error.message
        );
        throw error;
    }
};
