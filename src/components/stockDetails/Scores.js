import React from "react";

function Scores({ scores }) {
    return (
        <div className="mb-5">
            <h5>Scores</h5>
            <div className="d-flex justify-content-between">
                {(scores || []).map((score, index) => (
                    <div key={index} className="text-center">
                        <p className="fw-bold">{score.label}</p>
                        <div className="d-flex justify-content-center align-items-center">
                            <div
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    marginRight: "5px",
                                }}
                            ></div>
                            <p className="text-success mb-0">{score.buy || 0}% Buy</p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: "gray",
                                    borderRadius: "50%",
                                    marginRight: "5px",
                                }}
                            ></div>
                            <p className="text-secondary mb-0">{score.hold || 0}% Hold</p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: "red",
                                    borderRadius: "50%",
                                    marginRight: "5px",
                                }}
                            ></div>
                            <p className="text-danger mb-0">{score.sell || 0}% Sell</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Scores;
