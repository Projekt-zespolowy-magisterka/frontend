import React from "react";

function PredictionButtons({ fetchPredictions, undoPredictions, isLoading, previousChartData }) {
    return (
        <div className="d-flex flex-row-reverse mb-3 mt-3">
            {/* Fetch Predictions Button */}
            <button
                className="btn btn-primary ms-3 d-flex align-items-center"
                onClick={fetchPredictions}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <i className="spinner-border spinner-border-sm me-2" aria-hidden="true"></i>
                        <span>Loading Predictions...</span>
                    </>
                ) : (
                    <>
                        <i className="fas fa-download me-2"></i>
                        <span>Fetch Predictions</span>
                    </>
                )}
            </button>

            {/* Undo Predictions Button */}
            {previousChartData && (
                <button
                    className="btn btn-secondary d-flex align-items-center"
                    onClick={undoPredictions}
                >
                    <i className="fas fa-undo me-2"></i>
                    <span>Undo Predictions</span>
                </button>
            )}
        </div>
    );
}

export default PredictionButtons;
