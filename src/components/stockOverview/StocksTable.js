import React, { useState } from "react";
import TableHeader from "./TableHeader";
import StockRow from "./StockRow";

function StocksTable({ data, sortConfig, onSort, onToggleFavorite }) {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; // Adjust as needed

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startIndex, startIndex + rowsPerPage);

    return (
        <div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <TableHeader sortConfig={sortConfig} onSort={onSort} />
                    </thead>
                    <tbody>
                    {currentData.map((stock, index) => (
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
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default StocksTable;
