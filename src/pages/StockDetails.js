import React, {useState} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import mockedStockDetails from "../utils/mockedStockDetails";
import BackButton from "../components/stockDetails/BackButton";
import StockHeader from "../components/stockDetails/StockHeader";
import StockPrice from "../components/stockDetails/StockPrice";
import TimeFrameSelector from "../components/stockDetails/TimeFrameSelector";
import Chart from "../components/stockDetails/Chart";
import Scores from "../components/stockDetails/Scores";
import Statistics from "../components/stockDetails/Statistics";
import EnhancedStockChart from "../components/stockDetails/EnhancedStockChart";
import {fetchPredictionData} from "../service/predictionService";

function StockDetails() {
    const { symbol } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const stock = state?.stockData || mockedStockDetails.find((item) => item.symbol === symbol);

    const [chartData, setChartData] = useState(stock?.chartData || []);
    const [predictionData, setPredictionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    if (!stock) {
        return (
            <div className="container mt-4">
                <h3>Stock not found</h3>
                <BackButton onClick={() => navigate(-1)} />
            </div>
        );
    } else {
        console.log(stock)
    }

    const fetchPredictions = async () => {
        setIsLoading(true);
        try {
            const predictions = await fetchPredictionData(symbol, "2y", "1h", "3d");
            const formattedPredictions = predictions.map((p) => ({
                ...p,
                isPrediction: true,
            }));
            setPredictionData(formattedPredictions);
        } catch (error) {
            console.error("Error fetching predictions:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-1">
            <BackButton onClick={() => navigate(-1)} />
            <StockHeader symbol={stock.symbol} name={stock.name} />
            <StockPrice currentPrice={stock.currentPrice} change={stock.change} />
            {/*<TimeFrameSelector timeFrames={stock.timeFrames} />*/}
            <button className="btn btn-primary mb-3" onClick={fetchPredictions} disabled={isLoading}>
                {isLoading ? "Loading Predictions..." : "Fetch Predictions"}
            </button>
            <EnhancedStockChart
                data={chartData}
                predictionData={predictionData}
            />
            <Scores scores={stock.scores} />
            <Statistics statistics={stock.statistics} />
        </div>
    );
}

export default StockDetails;
