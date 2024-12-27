import React, { useState } from "react";
import TableHeader from "./TableHeader";
import StockRow from "./StockRow";

function StocksTable({ data, sortConfig, onSort, onToggleFavorite, currentPage, totalPages, onPageChange }) {
    return (
        <div>
            <div className="table-responsive">
                <table className="table table-hover">
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
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                    className="btn btn-primary"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-primary"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default StocksTable;
