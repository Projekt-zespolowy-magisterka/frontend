import React from "react";

function Statistics({ statistics = [] }) {
    // Filter out statistics with value "N/A"
    const filteredStatistics = statistics.filter((stat) => stat.value !== "N/A");

    // Helper function to format and round values
    const formatValue = (value) => {
        if (typeof value === "string" && value.includes("%")) {
            // Handle percentages, rounding to 2 decimal places
            const numericPart = parseFloat(value);
            return `${numericPart.toFixed(5)}%`;
        } else if (!isNaN(value)) {
            // Handle general numbers, rounding to 2 decimal places
            return parseFloat(value).toFixed(2);
        }
        return value; // Return as-is for other cases
    };

    if (filteredStatistics.length === 0) {
        return null; // Do not render if no valid statistics exist
    }

    return (
        <div className="mb-5">
            <h5>Statistics</h5>
            <div className="row">
                {filteredStatistics.map((stat, index) => (
                    <div key={index} className="col-md-4 col-sm-6 mb-3">
                        <div className="card p-3 h-100">
                            <h6 className="text-muted">{stat.label || "N/A"}</h6>
                            <h5 className="mb-0">{formatValue(stat.value)}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Statistics;
