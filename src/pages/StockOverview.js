import React, { useState, useEffect } from "react";
import { fetchStockData } from "../service/stockService";
import FiltersSidebar from "../components/stockOverview/FiltersSidebar";
import StocksTable from "../components/stockOverview/StocksTable";
import CategoryTabs from "../components/stockOverview/CategoryTabs";
import {addFavoriteStock, getFavoriteStocks, removeFavoriteStock} from "../service/favoriteService";

function StockOverview() {
    const initialFilters = {
        peRatio: [null, null],
        price: [null, null],
        search: "",
        volume: [null, null],
        change1M: [null, null],
        change1Y: [null, null],
        favorite: false,
    };

    const [stockData, setStockData] = useState([]);
    const [favoriteSymbols, setFavoriteSymbols] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [filters, setFilters] = useState(initialFilters);
    const [activeCategory, setActiveCategory] = useState("Stocks");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadStockData = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, total } = await fetchStockData(currentPage, 10);
                const favorites = await getFavoriteStocks();

                const favoriteSymbols = Array.isArray(favorites) ? favorites : [];

                setStockData(
                    data.map((stock) => ({
                        ...stock,
                        favorite: favoriteSymbols.includes(stock.symbol),
                    }))
                );
                setFavoriteSymbols(favorites);
                setTotalPages(Math.ceil(total / 10));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadStockData();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    const toggleFavorite = async (symbol) => {
        try {
            if (favoriteSymbols.includes(symbol)) {
                await removeFavoriteStock(symbol);
                setFavoriteSymbols((prev) => prev.filter((fav) => fav !== symbol));
            } else {
                await addFavoriteStock(symbol);
                setFavoriteSymbols((prev) => [...prev, symbol]);
            }

            setStockData((prevData) =>
                prevData.map((stock) =>
                    stock.symbol === symbol
                        ? { ...stock, favorite: !stock.favorite }
                        : stock
                )
            );
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
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
                <div className="col-md-9 pb-5">
                    <StocksTable
                        data={filteredData}
                        sortConfig={sortConfig}
                        onSort={setSortConfig}
                        onToggleFavorite={toggleFavorite}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default StockOverview;
