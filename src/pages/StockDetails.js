import React, {useState} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import mockedStockDetails from "../utils/mockedStockDetails";
import BackButton from "../components/stockDetails/BackButton";
import StockHeader from "../components/stockDetails/StockHeader";
import StockPrice from "../components/stockDetails/StockPrice";
import Scores from "../components/stockDetails/Scores";
import Statistics from "../components/stockDetails/Statistics";
import {fetchPredictionData} from "../service/predictionService";
import {convertPredictionToChartData} from "../utils/convertor";
import StockChart from "../components/stockDetails/StockChart";
import PredictionButtons from "../components/stockDetails/PredictionButtons";

function StockDetails() {
    const { symbol } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const stock = state?.stockData || mockedStockDetails.find((item) => item.symbol === symbol);

    const [chartData, setChartData] = useState(stock?.chartData || []);
    const [predictionData, setPredictionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [previousChartData, setPreviousChartData] = useState(null); // For undo functionality

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
            setPreviousChartData([...chartData]); // Save current chart data for undo
            const predictions = await fetchPredictionData(symbol, "2y", "1h", "3d");
            const formattedPredictions = predictions.map((p) => convertPredictionToChartData(p));
            setPredictionData(formattedPredictions);
        } catch (error) {
            console.error("Error fetching predictions:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const undoPredictions = () => {
        if (previousChartData) {
            setChartData(previousChartData);
            setPredictionData([]);
            setPreviousChartData(null);
        }
    };

    return (
        <div className="container mt-1">

            <StockHeader symbol={stock.symbol} name={stock.name} />
            <StockPrice currentPrice={stock.currentPrice} change={stock.change} />
            {/*<TimeFrameSelector timeFrames={stock.timeFrames} />*/}
            {/*<EnhancedStockChart*/}
            {/*    data={chartData}*/}
            {/*    predictionData={predictionData}*/}
            {/*/>*/}


            <StockChart initialData = {chartData} predictionData={predictionData}/>
            <PredictionButtons
                fetchPredictions={fetchPredictions}
                undoPredictions={undoPredictions}
                isLoading={isLoading}
                previousChartData={previousChartData}
            />
            <Scores scores={stock.scores} />
            <Statistics statistics={stock.statistics} />
        </div>
    );
}

export default StockDetails;
