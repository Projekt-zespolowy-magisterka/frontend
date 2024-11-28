import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockedStockDetails from "../utils/mockedStockDetails";
import BackButton from "../components/stockDetails/BackButton";
import StockHeader from "../components/stockDetails/StockHeader";
import StockPrice from "../components/stockDetails/StockPrice";
import TimeFrameSelector from "../components/stockDetails/TimeFrameSelector";
import Chart from "../components/stockDetails/Chart";
import Scores from "../components/stockDetails/Scores";
import Statistics from "../components/stockDetails/Statistics";
import EnhancedStockChart from "../components/stockDetails/EnhancedStockChart";
import initialData from "../utils/chartData";


function StockDetails() {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const stock = mockedStockDetails.find((item) => item.symbol === symbol);


    if (!stock) {
        return (
            <div className="container mt-4">
                <h3>Stock not found</h3>
                <BackButton onClick={() => navigate(-1)} />
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <BackButton onClick={() => navigate(-1)} />
            <StockHeader symbol={stock.symbol} name={stock.name} />
            <StockPrice currentPrice={stock.currentPrice} change={stock.change} />
            <TimeFrameSelector timeFrames={stock.timeFrames} />
            <EnhancedStockChart data={initialData}/>
            <Scores scores={stock.scores} />
            <Statistics statistics={stock.statistics} />
        </div>
    );
}

export default StockDetails;
