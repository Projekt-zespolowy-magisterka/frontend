import React from "react";

function RangeFilter({ label, filterName, values, onRangeChange }) {
    return (
        <div className="mt-3">
            <label className="form-label">{label}</label>
            <div className="d-flex">
                <input
                    type="number"
                    className="form-control me-2"
                    placeholder="Min"
                    value={values[0] || ""}
                    onChange={(e) => onRangeChange(e, filterName, "min")}
                />
                <input
                    type="number"
                    className="form-control"
                    placeholder="Max"
                    value={values[1] || ""}
                    onChange={(e) => onRangeChange(e, filterName, "max")}
                />
            </div>
        </div>
    );
}

export default RangeFilter;
