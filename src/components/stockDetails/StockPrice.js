import React from "react";

function StockPrice({ currentPrice, change }) {
    return (
        <div className="d-flex align-items-center mb-3">
            <h1 className="me-3">
                ${currentPrice ? currentPrice.toFixed(2) : "N/A"}
            </h1>
            <span
                className={`fs-4 ${
                    change?.percentage >= 0 ? "text-success" : "text-danger"
                }`}
            >
                {change?.percentage >= 0 ? "+" : ""}
                {change?.percentage?.toFixed(2) || "0.00"}% (
                {change?.absolute >= 0 ? "+" : ""}
                {change?.absolute?.toFixed(2) || "0.00"})
            </span>
        </div>
    );
}

export default StockPrice;
