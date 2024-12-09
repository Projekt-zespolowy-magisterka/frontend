import React from "react";

function CategoryTabs({ activeCategory, onCategoryChange }) {
    const categories = ["Stocks", "ETFs", "Bonds", "Watchlist"];

    return (
        <div className="btn-group mb-3" role="group" aria-label="Category tabs">
            {categories.map((category) => (
                <button
                    key={category}
                    type="button"
                    className={`btn ${activeCategory === category ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategoryTabs;
