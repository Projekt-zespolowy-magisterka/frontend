import React, {useEffect, useState} from "react";
import {addFavoriteStock, getFavoriteStocks, removeFavoriteStock} from "../../service/favoriteService";

function StockHeader({ symbol, name }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const favorites = await getFavoriteStocks();
                setIsFavorite(favorites.includes(symbol));
            } catch (error) {
                console.error("Error fetching favorite status:", error);
            }
        };

        fetchFavoriteStatus();
    }, [symbol]);

    const handleToggleFavorite = async () => {
        setLoading(true);
        try {
            if (isFavorite) {
                await removeFavoriteStock(symbol);
            } else {
                await addFavoriteStock(symbol);
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error toggling favorite status:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">
            {/* Stock Symbol, Name, and Star Button in One Line */}
            <div className="d-flex align-items-center justify-content-between ms-3">
                <h1 className="fw-bold me-2" style={{ fontSize: "1.8rem", margin: 0 }}>
                    {symbol || "N/A"} <span className="text-muted" style={{ fontSize: "1.5rem" }}>{name || "N/A"}</span>
                </h1>
                {/* Star Button */}
                <button
                    onClick={handleToggleFavorite}
                    className="btn"
                    style={{
                        color: isFavorite ? "gold" : "gray",
                        fontSize: "1.8rem",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                    }}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? "★" : "☆"}
                </button>
            </div>

            {/* Separator Line */}
            <hr className="mt-3 mb-3" style={{ borderTop: "1px solid #ddd" }} />
        </div>
    );
}

export default StockHeader;
