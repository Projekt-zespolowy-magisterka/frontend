import React from "react";

function TableHeader({ sortConfig, onSort }) {
    const headers = [
        { key: "symbol", label: "Symbol" },
        { key: "name", label: "Name" },
        { key: "price", label: "Price" },
        { key: "peRatio", label: "PE Ratio" },
        { key: "volume", label: "Volume" },
        { key: "change1M", label: "1M in %" },
        { key: "change3M", label: "3M in %" },
        { key: "change6M", label: "6M in %" },
        { key: "change1Y", label: "1Y in %" },
    ];

    return (
        <tr>
            {headers.map((header) => (
                <th
                    key={header.key}
                    onClick={() => onSort(header.key)}
                    style={{ cursor: "pointer" }}
                >
                    {header.label}{" "}
                    {sortConfig.key === header.key
                        ? sortConfig.direction === "asc"
                            ? "↑"
                            : "↓"
                        : ""}
                </th>
            ))}
        </tr>
    );
}

export default TableHeader;
