import React from "react";

function ScoreIndicator({ label, value, color, isBold }) {
    return (
        <div className="d-flex align-items-center mb-2">
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: color,
                    borderRadius: "50%",
                    marginRight: "8px",
                }}
            ></div>
            <p
                className={`mb-0 ${
                    color === "green"
                        ? "text-success"
                        : color === "red"
                            ? "text-danger"
                            : "text-secondary"
                }`}
                style={{ fontWeight: isBold ? "bold" : "normal" }}
            >
                {value.toFixed(2) || 0}% {label}
            </p>
        </div>
    );
}

function Scores({ scores = [] }) {
    return (
        <div className="mb-5">
            <h5>Scores</h5>
            <div className="d-flex flex-wrap justify-content-between">
                {scores.map((score, index) => {
                    // Determine the maximum value
                    const maxValue = Math.max(score.buy, score.hold, score.sell);

                    return (
                        <div key={index} className="text-center mb-3">
                            <p className="fw-bold">{score.label}</p>
                            <ScoreIndicator
                                label="Buy"
                                value={score.buy}
                                color="green"
                                isBold={score.buy === maxValue}
                            />
                            <ScoreIndicator
                                label="Hold"
                                value={score.hold}
                                color="gray"
                                isBold={score.hold === maxValue}
                            />
                            <ScoreIndicator
                                label="Sell"
                                value={score.sell}
                                color="red"
                                isBold={score.sell === maxValue}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Scores;
