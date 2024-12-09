import React from "react";

function BackButton({ onClick }) {
    return (
        <button className="btn btn-link mb-3" onClick={onClick}>
            &larr; Back to Stocks
        </button>
    );
}

export default BackButton;
