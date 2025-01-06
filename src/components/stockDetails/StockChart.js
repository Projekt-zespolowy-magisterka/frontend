import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
    elderRay,
    ema,
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    CurrentCoordinate,
    BarSeries,
    CandlestickSeries,
    ElderRaySeries,
    LineSeries,
    MovingAverageTooltip,
    OHLCTooltip,
    SingleValueTooltip,
    lastVisibleItemBasedZoomAnchor,
    XAxis,
    YAxis,
    CrossHairCursor,
    EdgeIndicator,
    MouseCoordinateX,
    MouseCoordinateY,
    ZoomButtons,
    withDeviceRatio,
    withSize
} from "react-financial-charts";
const StockChart = ({initialData, predictionData}) => {
    if (!Array.isArray(initialData) || initialData.length === 0) {
        console.error("initialData must be a non-empty array");
        return <p>No data to display the chart.</p>;
    }
    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => new Date(d.date)
    );
    const height = 700;
    const width = 1200;
    const margin = { left: 0, right: 48, top: 0, bottom: 24 };

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

    const elder = elderRay();

    const mergedData = [...initialData, ...predictionData];
    const calculatedData = elder(ema26(ema12(mergedData)));
    const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
        calculatedData
    );
    const pricesDisplayFormat = format(".2f");
    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max + 5];

    const gridHeight = height - margin.top - margin.bottom;

    const elderRayHeight = 100;
    const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
    const chartHeight = gridHeight - elderRayHeight;
    const yExtents = (data) => {
        return [data.high, data.low];
    };
    const dateTimeFormat = "%d %b";
    const timeDisplayFormat = timeFormat(dateTimeFormat);

    const predictionLineColor = "#604141";

    const barChartExtents = (data) => {
        return data.volume;
    };

    const candleChartExtents = (data) => {
        return [data.high, data.low];
    };

    const yEdgeIndicator = (data) => {
        return data.close;
    };

    const volumeColor = (data) => {
        return data.isPrediction
            ? "rgba(128, 128, 128, 0.3)" // Lighter color for prediction bars
            : data.close > data.open
                ? "rgba(38, 166, 154, 0.3)"
                : "rgba(239, 83, 80, 0.3)";
    };
    const volumeSeries = (data) => {
        return data.volume;
    };

    const openCloseColor = (data) => {
        return data.isPrediction ? "rgba(128, 128, 128, 0.3)"  : data.close > data.open ? "#26a69a" : "#ef5350";
    };

    const elderRayColor = (data) => {
        return data.isPrediction
            ? "rgba(128, 128, 128, 0.3)" // Lighter color for prediction bars
            : data.bullPower > 0
                ? "#26a69a"
                : "#ef5350";
    };


    return (
        <ChartCanvas
            height={height}
            ratio={3}
            width={width}
            margin={margin}
            data={data}
            displayXAccessor={displayXAccessor}
            seriesName="Data"
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
            zoomAnchor={lastVisibleItemBasedZoomAnchor}
        >
            <Chart
                id={2}
                height={barChartHeight}
                origin={barChartOrigin}
                yExtents={barChartExtents}
            >
                <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
            </Chart>
            <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
                <XAxis showGridLines showTickLabel={false} />
                <YAxis showGridLines tickFormat={pricesDisplayFormat} />
                <CandlestickSeries/>

                <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
                <CurrentCoordinate
                    yAccessor={ema26.accessor()}
                    fillStyle={ema26.stroke()}
                />
                <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
                <CurrentCoordinate
                    yAccessor={ema12.accessor()}
                    fillStyle={ema12.stroke()}
                />

                {/* Prediction Line */}
                <LineSeries
                    yAccessor={(d) => (d.isPrediction ? d.close : undefined)}
                    strokeStyle={predictionLineColor}
                    strokeDasharray="5,5" // Dashed line for prediction
                />
                <CurrentCoordinate
                    yAccessor={(d) => (d.isPrediction ? d.close : undefined)}
                    fillStyle={predictionLineColor}
                    />

                <MouseCoordinateX displayFormat={timeFormat("%d %b")} />
                <MouseCoordinateY
                    rectWidth={margin.right}
                    displayFormat={pricesDisplayFormat}
                />
                <EdgeIndicator
                    itemType="last"
                    rectWidth={margin.right}
                    fill={openCloseColor}
                    lineStroke={openCloseColor}
                    displayFormat={pricesDisplayFormat}
                    yAccessor={yEdgeIndicator}
                />
                <MovingAverageTooltip
                    origin={[8, 24]}
                    options={[
                        {
                            yAccessor: ema26.accessor(),
                            type: "EMA",
                            stroke: ema26.stroke(),
                            windowSize: ema26.options().windowSize
                        },
                        {
                            yAccessor: ema12.accessor(),
                            type: "EMA",
                            stroke: ema12.stroke(),
                            windowSize: ema12.options().windowSize
                        }
                    ]}
                />

                <ZoomButtons />
                <OHLCTooltip origin={[8, 16]} />
            </Chart>
            <Chart
                id={4}
                height={elderRayHeight}
                yExtents={[0, elder.accessor()]}
                origin={elderRayOrigin}
                padding={{ top: 8, bottom: 8 }}
            >
                <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
                <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

                <MouseCoordinateX displayFormat={timeDisplayFormat} />
                <MouseCoordinateY
                    rectWidth={margin.right}
                    displayFormat={pricesDisplayFormat}
                />

                <ElderRaySeries
                    yAccessor={elder.accessor()}
                />


                <SingleValueTooltip
                    yAccessor={elder.accessor()}
                    yLabel="Elder Ray"
                    yDisplayFormat={(d) =>
                        `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
                            d.bearPower
                        )}`
                    }
                    origin={[8, 16]}
                />

            </Chart>
            <CrossHairCursor stroke="red" />

        </ChartCanvas>
    );
};

export default StockChart;
