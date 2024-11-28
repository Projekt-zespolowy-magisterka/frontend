import React from "react";

function StockHeader({ symbol, name }) {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h1>{symbol || "N/A"}</h1>
                <h4 className="text-muted">{name || "N/A"}</h4>
            </div>
        </div>
    );
}

export default StockHeader;
