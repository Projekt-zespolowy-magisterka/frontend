import React from "react";

function TimeFrameSelector({ timeFrames }) {
    return (
        <div className="d-flex mb-4">
            {(timeFrames || []).map((frame, index) => (
                <button key={index} className="btn btn-outline-secondary me-2">
                    {frame}
                </button>
            ))}
        </div>
    );
}

export default TimeFrameSelector;
