import React from "react";

function StockRow({ stock, index, onToggleFavorite }) {
    const formatChange = (value) => {
        const isPositive = value >= 0;
        return (
            <span className={isPositive ? "text-success" : "text-danger"}>
                {isPositive ? "+" : ""}
                {value.toFixed(2)}%
            </span>
        );
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
            <td>{stock.name}</td>
            <td>${stock.price.toFixed(2)}</td>
            <td>{stock.peRatio.toFixed(2)}</td>
            <td>{stock.volume.toLocaleString()}</td>
            <td>{formatChange(stock.change1M)}</td>
            <td>{formatChange(stock.change3M)}</td>
            <td>{formatChange(stock.change6M)}</td>
            <td>{formatChange(stock.change1Y)}</td>
            <td>{formatChange(stock.change3Y)}</td>
        </tr>
    );
}

export default StockRow;
