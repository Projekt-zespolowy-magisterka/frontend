// Utility function to convert prediction format to chartData format
export const convertPredictionToChartData = (prediction) => {
    return {
        close: prediction.Close,
        date: new Date(prediction.Timestamp).toISOString(), // Ensures date is in ISO format
        high: prediction.High,
        low: prediction.Low,
        open: prediction.Open,
        volume: prediction.Volume > 0 ? prediction.Volume : 0,
        isPrediction: true
    };
};