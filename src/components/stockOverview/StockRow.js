import React from "react";
import { useNavigate } from "react-router-dom";
import {fetchStockDataBySymbol} from "../../service/stockService";

function StockRow({ stock, index, onToggleFavorite }) {

    const navigate = useNavigate();

    // Format change with safety check for invalid values
    const formatChange = (value) => {
        if (value === undefined || value === null || isNaN(value)) {
            return '-'; // Return a fallback value like '-' if the value is invalid
        }

        const isPositive = value >= 0;
        return (
            <span className={isPositive ? "text-success" : "text-danger"}>
                {isPositive ? "+" : ""}
                {value.toFixed(2)}%
            </span>
        );
    };

    // Safe formatting for price, peRatio, and volume
    const formatPrice = (value) => {
        if (value === undefined || value === null || isNaN(value)) {
            return '-'; // Return fallback value if invalid
        }
        return `$${value.toFixed(2)}`;
    };

    const formatPeRatio = (value) => {
        if (value === undefined || value === null || isNaN(value)) {
            return '-'; // Return fallback value if invalid
        }
        return value.toFixed(2);
    };

    const formatVolume = (value) => {
        if (value === undefined || value === null || isNaN(value)) {
            return '-'; // Return fallback value if invalid
        }
        return value.toLocaleString(); // Format volume with commas
    };

    const handleStockClick = async (symbol) => {
        try {
            const stockData = await fetchStockDataBySymbol(symbol);
            if (stockData) {
                navigate(`/stock/${symbol}`, { state: { stockData } });
            }
        } catch (error) {
            console.error("Error fetching stock data:", error.message);
            alert("Stock not found or an error occurred.");
        }
    };

    return (
        <tr>
            <td>
                <button
                    onClick={() => onToggleFavorite(stock.symbol)}
                    className="btn"
                    style={{
                        color: stock.favorite ? "gold" : "gray",
                        fontSize: "1.5rem",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                    }}
                >
                    {stock.favorite ? "★" : "☆"}
                </button>

                {stock.symbol}
            </td>
            <td
                onClick={() => handleStockClick(stock.symbol)}
                style={{ cursor: "pointer" }}
            >
                {stock.name}
            </td>
            <td>{formatPrice(stock.price)}</td>
            <td>{formatPeRatio(stock.peRatio)}</td>
            <td>{formatVolume(stock.volume)}</td>
            <td>{formatChange(stock.change1M)}</td>
            <td>{formatChange(stock.change3M)}</td>
            <td>{formatChange(stock.change6M)}</td>
            <td>{formatChange(stock.change1Y)}</td>
            <td>{formatChange(stock.change3Y)}</td>
        </tr>
    );
}

export default StockRow;
