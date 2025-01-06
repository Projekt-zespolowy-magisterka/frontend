import React from "react";

function BackButton({ onClick }) {
    return (
        <button
            className="btn btn-outline-ligh mb-3 mt-3 d-flex align-items-center"
            onClick={onClick}
            style={{ fontWeight: "bold", fontSize: "1rem" }}
            aria-label="Back to Stocks"
        >
            <i className="fas fa-arrow-left me-2"></i>
            Back
        </button>
    );
}

export default BackButton;
