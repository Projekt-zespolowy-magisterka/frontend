import React, { useState, useEffect, useRef } from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
    ChartCanvas,
    Chart,
    CandlestickSeries,
    BarSeries,
    XAxis,
    YAxis,
    OHLCTooltip,
    MovingAverageTooltip,
    MouseCoordinateX,
    MouseCoordinateY,
    CrossHairCursor,
    discontinuousTimeScaleProviderBuilder,
    LineSeries,
    ema,
    EdgeIndicator,
} from "react-financial-charts";

const EnhancedStockChart = ({ data }) => {
    const [chartDimensions, setChartDimensions] = useState({ width: 1200, height: 500 });
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (chartContainerRef.current) {
                const { clientWidth } = chartContainerRef.current;
                setChartDimensions({
                    width: clientWidth,
                    height: clientWidth * 0.5, // Maintain a 2:1 aspect ratio
                });
            }
        };

        handleResize(); // Call it initially to set the dimensions
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (!data || data.length === 0) {
        return <p>No data available to display the chart</p>;
    }

    const ema12 = ema()
        .id(1)
        .options({ windowSize: 12 })
        .merge((d, c) => {
            d.ema12 = c;
        })
        .accessor((d) => d.ema12);

    const ema26 = ema()
        .id(2)
        .options({ windowSize: 26 })
        .merge((d, c) => {
            d.ema26 = c;
        })
        .accessor((d) => d.ema26);

    const calculatedData = ema26(ema12(data));

    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => new Date(d.date)
    );

    const { data: chartData, xScale, xAccessor, displayXAccessor } = ScaleProvider(
        calculatedData
    );

    const xExtents = [
        xAccessor(chartData[0]),
        xAccessor(chartData[chartData.length - 1]),
    ];

    const pricesDisplayFormat = format(".2f");
    const volumeColor = (d) => (d.close > d.open ? "rgba(38, 166, 154, 0.3)" : "rgba(239, 83, 80, 0.3)");

    const customZoomAnchor = (options) => {
        const { xScale } = options;
        const domain = xScale.domain();
        const center = (domain[1] + domain[0]) / 2;
        return center;
    };

    return (
        <div ref={chartContainerRef} style={{ width: "100%", height: "auto" }}>
            <ChartCanvas
                height={chartDimensions.height}
                width={chartDimensions.width}
                ratio={3}
                margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                data={chartData}
                seriesName="Stock Data"
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
                xExtents={xExtents}
                zoomAnchor={customZoomAnchor}
            >
                <Chart id={1} yExtents={(d) => d.volume} origin={[0, 400]} height={100}>
                    <BarSeries yAccessor={(d) => d.volume} fillStyle={volumeColor} />
                    <YAxis axisAt="left" orient="left" />
                </Chart>

                <Chart id={2} yExtents={(d) => [d.high, d.low]}>
                    <XAxis axisAt="bottom" orient="bottom" />
                    <YAxis axisAt="left" orient="left" ticks={5} />
                    <CandlestickSeries />
                    <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
                    <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
                    <MovingAverageTooltip
                        options={[
                            { yAccessor: ema12.accessor(), type: "EMA", stroke: ema12.stroke(), windowSize: 12 },
                            { yAccessor: ema26.accessor(), type: "EMA", stroke: ema26.stroke(), windowSize: 26 },
                        ]}
                        origin={[0, 10]}
                    />
                    <OHLCTooltip origin={[0, 0]} />
                    <MouseCoordinateX displayFormat={timeFormat("%H:%M")} />
                    <MouseCoordinateY displayFormat={pricesDisplayFormat} />
                    <EdgeIndicator itemType="last" orient="right" edgeAt="right" yAccessor={(d) => d.close} />
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        </div>
    );
};

export default EnhancedStockChart;
