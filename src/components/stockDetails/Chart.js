import React, { useEffect, useRef } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {
    CandlestickController,
    CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    CandlestickController,
    CandlestickElement,
    Title,
    Tooltip,
    Legend
);

function StockChart({ chartData }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Get the canvas context
        const ctx = document.getElementById("candlestick-chart").getContext("2d");

        chartRef.current = new ChartJS(ctx, {
            type: "candlestick",
            data: {
                datasets: [
                    {
                        label: "Candlestick",
                        data: chartData.map((point) => ({
                            x: point.time, // ISO string for time
                            o: point.open,
                            h: point.high,
                            l: point.low,
                            c: point.close,
                        })), // Map the OHLC data
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const { o, h, l, c } = context.raw;
                                return `Open: ${o}, High: ${h}, Low: ${l}, Close: ${c}`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        type: "time", // Ensure time-based scaling
                        time: {
                            unit: "hour", // Set time unit to match your data granularity
                        },
                        title: {
                            display: true,
                            text: "Time",
                        },
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: false, // Disable starting from zero
                        suggestedMin: Math.min(...chartData.map((point) => point.low)) - 5, // Adjust padding below the lowest price
                        suggestedMax: Math.max(...chartData.map((point) => point.high)) + 5, // Adjust padding above the highest price
                        title: {
                            display: true,
                            text: "Price",
                        },
                        grid: {
                            color: "rgba(200, 200, 200, 0.2)",
                        },
                    },
                },

            },
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [chartData]);

    return (
        <canvas
            id="candlestick-chart"
            style={{
                height: "400px",
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #ddd",
                padding: "10px",
            }}
        ></canvas>
    );
}

export default StockChart;
