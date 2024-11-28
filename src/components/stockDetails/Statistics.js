import React from "react";

function Statistics({ statistics }) {
    return (
        <div className="mb-5">
            <h5>Statistics</h5>
            <div className="row">
                {(statistics || []).map((stat, index) => (
                    <div key={index} className="col-md-3 mb-3">
                        <div className="card p-3">
                            <h6 className="text-muted">{stat.label || "N/A"}</h6>
                            <h5 className="mb-0">{stat.value || "N/A"}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Statistics;
