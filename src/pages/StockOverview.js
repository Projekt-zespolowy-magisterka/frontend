import React, { useState, useEffect } from "react";
import mockedData from "../mockedData";

function StockOverview() {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Use mocked data for simplicity
        setStockData(mockedData);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">📈 Stock Market Overview</h1>
            <div className="row">
                {stockData.map((category, index) => (
                    <div key={index} className="col-lg-6 col-md-6 mb-4">
                        <div className="card shadow-sm border-0 rounded">
                            <div className="card-header bg-gradient bg-dark text-white text-center fw-bold">
                                {category.category}
                            </div>
                            {/* Scrollable container with better design */}
                            <div
                                className="list-group-flush"
                                style={{
                                    maxHeight: "400px",
                                    overflowY: "auto",
                                    scrollbarWidth: "thin", // For Firefox
                                    scrollbarColor: "#888 #e0e0e0", // For Firefox
                                }}
                            >
                                {category.stocks.map((stock, idx) => (
                                    <div
                                        key={idx}
                                        className="list-group-item d-flex justify-content-between align-items-center bg-light"
                                    >
                                        <div>
                                            <strong>{stock.symbol}</strong> - {stock.name}
                                        </div>
                                        <div className="text-end">
                                            <div className="fw-bold">
                                                ${stock.last.toFixed(2)}
                                            </div>
                                            <div
                                                className={
                                                    stock.change >= 0
                                                        ? "text-success small"
                                                        : "text-danger small"
                                                }
                                            >
                                                {stock.change >= 0 && "+"}
                                                {stock.change.toFixed(2)} (
                                                {stock.changePercent.toFixed(2)}%)
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default StockOverview;