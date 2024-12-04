import React from "react";
import RangeFilter from "./RangeFilter";

function FiltersSidebar({ filters, onFilterChange, onResetFilters, hasActiveFilters }) {
    const handleRangeChange = (e, filterName, bound) => {
        const value = parseInt(e.target.value, 10) || null; // Null dla pustego pola
        onFilterChange(filterName, bound === "min" ? [value, filters[filterName]?.[1]] : [filters[filterName]?.[0], value]);
    };

    const handleInputChange = (e, filterName) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        onFilterChange(filterName, value);
    };

    return (
        <div className="border rounded p-4 bg-white shadow">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-primary m-0">Filters</h5>
                {hasActiveFilters && (
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={onResetFilters}
                    >
                        Reset All
                    </button>
                )}
            </div>

            {/* Search Filter */}
            <div className="mt-3">
                <label className="form-label">Search</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search stocks..."
                    value={filters.search || ""}
                    onChange={(e) => handleInputChange(e, "search")}
                />
            </div>

            {/* PE Ratio Filter */}
            <RangeFilter
                label="PE Ratio (TTM)"
                filterName="peRatio"
                values={filters.peRatio || [null, null]}
                onRangeChange={handleRangeChange}
            />

            {/* Price Range Filter */}
            <RangeFilter
                label="Price Range"
                filterName="price"
                values={filters.price || [null, null]}
                onRangeChange={handleRangeChange}
            />

            {/* Volume Range Filter */}
            <RangeFilter
                label="Volume Range"
                filterName="volume"
                values={filters.volume || [null, null]}
                onRangeChange={handleRangeChange}
            />

            {/* 1M Change Filter */}
            <RangeFilter
                label="1M Change (%)"
                filterName="change1M"
                values={filters.change1M || [null, null]}
                onRangeChange={handleRangeChange}
            />

            {/* 1Y Change Filter */}
            <RangeFilter
                label="1Y Change (%)"
                filterName="change1Y"
                values={filters.change1Y || [null, null]}
                onRangeChange={handleRangeChange}
            />
        </div>
    );
}

export default FiltersSidebar;
