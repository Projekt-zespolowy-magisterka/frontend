import React, { useState, useEffect } from "react";
import mockedData from "../utils/mockedData";
import FiltersSidebar from "../components/stockOverview/FiltersSidebar";
import StocksTable from "../components/stockOverview/StocksTable";
import CategoryTabs from "../components/stockOverview/CategoryTabs";

function StockOverview() {
    const initialFilters = {
        peRatio: [0, 40],
        price: [null, null],
        search: "",
        volume: [null, null],
        change1M: [null, null],
        change1Y: [null, null],
        favorite: false,
    };

    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [filters, setFilters] = useState(initialFilters);
    const [activeCategory, setActiveCategory] = useState("Stocks");

    useEffect(() => {
        // Symulacja ładowania danych
        setStockData(mockedData);
        setLoading(false);
    }, []);

    const toggleFavorite = (symbol) => {
        setStockData((prevData) =>
            prevData.map((stock) =>
                stock.symbol === symbol
                    ? { ...stock, favorite: !stock.favorite }
                    : stock
            )
        );
    };


    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        setStockData((prevData) => {
            return [...prevData].sort((a, b) => {
                if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
                if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
                return 0;
            });
        });
    };

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
    };

    const hasActiveFilters = Object.keys(filters).some((key) => {
        const value = filters[key];
        const initialValue = initialFilters[key];
        return JSON.stringify(value) !== JSON.stringify(initialValue);
    });


    const filteredData = stockData.filter((stock) => {
        const matchesWatchlist = activeCategory !== "Watchlist" || stock.favorite;

        const matchesSearch = stock.name.toLowerCase().includes(filters.search.toLowerCase());

        const withinPriceRange =
            !filters.price ||
            ((filters.price[0] == null || stock.price >= filters.price[0]) &&
                (filters.price[1] == null || stock.price <= filters.price[1]));

        const withinPERatio =
            !filters.peRatio ||
            ((filters.peRatio[0] == null || stock.peRatio >= filters.peRatio[0]) &&
                (filters.peRatio[1] == null || stock.peRatio <= filters.peRatio[1]));

        const withinVolumeRange =
            !filters.volume ||
            ((filters.volume[0] == null || stock.volume >= filters.volume[0]) &&
                (filters.volume[1] == null || stock.volume <= filters.volume[1]));

        const within1MChangeRange =
            !filters.change1M ||
            ((filters.change1M[0] == null || stock.change1M >= filters.change1M[0]) &&
                (filters.change1M[1] == null || stock.change1M <= filters.change1M[1]));

        const within1YChangeRange =
            !filters.change1Y ||
            ((filters.change1Y[0] == null || stock.change1Y >= filters.change1Y[0]) &&
                (filters.change1Y[1] == null || stock.change1Y <= filters.change1Y[1]));

        return (
            matchesWatchlist &&
            matchesSearch &&
            withinPriceRange &&
            withinPERatio &&
            withinVolumeRange &&
            within1MChangeRange &&
            within1YChangeRange
        );
    });


    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-3 container">
                    <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
                    <FiltersSidebar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onResetFilters={resetFilters}
                        hasActiveFilters={hasActiveFilters}
                    />
                </div>
                <div className="col-md-9 pb-5 ">
                    <StocksTable
                        data={filteredData}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        onToggleFavorite={toggleFavorite}
                    />
                </div>
            </div>
        </div>
    );
}

export default StockOverview;
