import React from "react";

function StockPrice({ currentPrice, change }) {
    return (
        <div className="d-flex align-items-center ms-3 mb-4">
            {/* Current Price */}
            <div className="text-center me-4">
                <h2 className="fw-bold mb-0" style={{ fontSize: "1.8rem" }}>
                    ${currentPrice ? currentPrice.toFixed(2) : "N/A"}
                </h2>
                <small className="text-muted">Current Price</small>
            </div>

            {/* Percentage Change */}
            <div className="text-center me-4">
                <span
                    className={`fw-bold ${
                        change?.percentage >= 0 ? "text-success" : "text-danger"
                    }`}
                    style={{ fontSize: "1.5rem" }}
                >
                    {change?.percentage >= 0 ? "+" : ""}
                    {change?.percentage?.toFixed(2) || "0.00"}%
                </span>
                <small className="text-muted d-block">Percentage Change</small>
            </div>

            {/* Absolute Change */}
            <div className="text-center">
                <span
                    className={`fw-bold ${
                        change?.absolute >= 0 ? "text-success" : "text-danger"
                    }`}
                    style={{ fontSize: "1.5rem" }}
                >
                    {change?.absolute >= 0 ? "+" : ""}
                    {change?.absolute?.toFixed(2) || "0.00"}
                </span>
                <small className="text-muted d-block">Absolute Change</small>
            </div>
        </div>
    );
}

export default StockPrice;
