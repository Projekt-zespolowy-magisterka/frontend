import React, { useState, useEffect } from "react";
import mockedData from "../utils/mockedData";

function StockOverview() {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        setStockData(mockedData);
        setLoading(false);
    }, []);

    // Function to toggle favorite status
    const toggleFavorite = (index) => {
        setStockData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index] = {
                ...updatedData[index],
                favorite: !updatedData[index].favorite,
            };
            return updatedData;
        });
    };


    // Function to sort data
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        const sortedData = [...stockData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setStockData(sortedData);
    };

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
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar Filters */}
                <div className="col-md-3">
                    <div className="border rounded p-3 bg-white shadow-sm">
                        <h5>Filters</h5>
                        <div className="mt-3">
                            <label className="form-label">PE Ratio (TTM)</label>
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                max="40"
                                step="1"
                            />
                        </div>
                        <hr />
                        {[...Array(8).keys()].map((filter) => (
                            <div key={filter} className="mt-2">
                                <a href="#" className="text-dark text-decoration-none">
                                    Filter {filter + 2} >
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stock Table */}
                <div className="col-md-9">
                    <div className="border rounded p-3 bg-white shadow-sm">
                        <ul className="nav nav-tabs mb-3">
                            <li className="nav-item">
                                <button className="nav-link active">Stocks</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link">ETFs</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link">Bonds</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link">⭐ Watchlist</button>
                            </li>
                        </ul>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Symbol</th>
                                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                                    Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
                                    Price {sortConfig.key === "price" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th onClick={() => handleSort("peRatio")} style={{ cursor: "pointer" }}>
                                    PE Ratio {sortConfig.key === "peRatio" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th onClick={() => handleSort("volume")} style={{ cursor: "pointer" }}>
                                    Volume {sortConfig.key === "volume" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th onClick={() => handleSort("change1M")} style={{ cursor: "pointer" }}>
                                    1M in % {sortConfig.key === "change1M" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th onClick={() => handleSort("change3M")} style={{ cursor: "pointer" }}>
                                    3M in % {sortConfig.key === "change3M" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th onClick={() => handleSort("change6M")} style={{ cursor: "pointer" }}>
                                    6M in % {sortConfig.key === "change6M" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th onClick={() => handleSort("change1Y")} style={{ cursor: "pointer" }}>
                                    1Y in % {sortConfig.key === "change1Y" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th onClick={() => handleSort("change3Y")} style={{ cursor: "pointer" }}>
                                    3Y in % {sortConfig.key === "change3Y" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {stockData.map((stock, index) => (
                                <tr key={index}>
                                    <td>
                                        <button
                                            className="btn p-0 border-0"
                                            onClick={() => toggleFavorite(index)}
                                            aria-label={
                                                stock.favorite
                                                    ? "Remove from favorites"
                                                    : "Add to favorites"
                                            }
                                        >
                                            {stock.favorite ? (
                                                <span className="text-warning">★</span> // Filled star
                                            ) : (
                                                <span className="text-muted">☆</span> // Empty star
                                            )}
                                        </button>{" "}
                                        {stock.symbol}
                                    </td>
                                    <td>{stock.name}</td>
                                    <td>${stock.price.toFixed(2)}</td>
                                    <td>{stock.peRatio.toFixed(2)}</td>
                                    <td>{stock.volume.toLocaleString()}</td>
                                    <td
                                        className={
                                            stock.change1M >= 0
                                                ? "text-success"
                                                : "text-danger"
                                        }
                                    >
                                        {stock.change1M >= 0 && "+"}
                                        {stock.change1M.toFixed(2)}%
                                    </td>
                                    <td
                                        className={
                                            stock.change3M >= 0
                                                ? "text-success"
                                                : "text-danger"
                                        }
                                    >
                                        {stock.change3M >= 0 && "+"}
                                        {stock.change3M.toFixed(2)}%
                                    </td>
                                    <td
                                        className={
                                            stock.change6M >= 0
                                                ? "text-success"
                                                : "text-danger"
                                        }
                                    >
                                        {stock.change6M >= 0 && "+"}
                                        {stock.change6M.toFixed(2)}%
                                    </td>
                                    <td
                                        className={
                                            stock.change1Y >= 0
                                                ? "text-success"
                                                : "text-danger"
                                        }
                                    >
                                        {stock.change1Y >= 0 && "+"}
                                        {stock.change1Y.toFixed(2)}%
                                    </td>
                                    <td
                                        className={
                                            stock.change3Y >= 0
                                                ? "text-success"
                                                : "text-danger"
                                        }
                                    >
                                        {stock.change3Y >= 0 && "+"}
                                        {stock.change3Y.toFixed(2)}%
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockOverview;
