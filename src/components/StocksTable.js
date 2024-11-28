import React from "react";
import TableHeader from "./TableHeader";
import StockRow from "./StockRow";

function StocksTable({ data, sortConfig, onSort, onToggleFavorite }) {
    return (
        <table className="table table-striped">
            <thead>
            <TableHeader sortConfig={sortConfig} onSort={onSort} />
            </thead>
            <tbody>
            {data.map((stock, index) => (
                <StockRow
                    key={index}
                    stock={stock}
                    index={index}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
            </tbody>
        </table>
    );
}

export default StocksTable;
