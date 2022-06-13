import React, { useRef } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import chroma from "chroma-js";

import autoColorPicker from "../../helper/color.js";

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  DataZoomComponent,
  DataZoomInsideComponent,
]);

function ChartPreview({ primaryColor, secondaryColor }) {
  const chartEl = useRef(null);

  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // label: {
        //   show: true,
        //   backgroundColor: "#fff",
        //   color: "#556677",
        //   borderColor: "rgba(0,0,0,0)",
        //   shadowColor: "rgba(0,0,0,0)",
        //   shadowOffsetY: 0,
        // },
        lineStyle: {
          width: 0,
          show: true,
          backgroundColor: "#a4c",
          color: "#556677",
          borderColor: "rgba(0,0,0,0)",
          shadowColor: "rgba(0,0,0,0)",
          shadowOffsetY: 0,
        },
      },
      // },
      backgroundColor: "#fff",

      padding: [10, 10],
      extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
    },
    grid: {
      top: "15%",
    },
    xAxis: [
      {
        type: "time",
        axisLine: {
          lineStyle: {
            color: "#DCE2E8",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: "auto", // interval,
          textStyle: {
            color: "#556677",
          },
          fontSize: 12,
          margin: 15,
          rotate: 50,
        },
        axisPointer: {
          label: {
            // padding: [11, 5, 7],
            padding: [0, 0, 10, 0],

            margin: 15,
            fontSize: 12,
            backgroundColor: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#fff",
                },
                {
                  offset: 0.86,

                  color: "#fff",
                },
                {
                  offset: 0.86,
                  color: "#33c0cd",
                },
                {
                  offset: 1,
                  color: "#33c0cd",
                },
              ],
              global: false,
            },
          },
        },
        boundaryGap: false,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#DCE2E8",
          },
        },
        axisLabel: {
          textStyle: {
            color: "#556677",
          },
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: "line",
        data: [
          ["2022-06-04T12:03:00.000Z", 4],
          ["2022-06-04T13:03:00.000Z", 1],
          ["2022-06-04T14:03:00.000Z", 3],
          ["2022-06-04T15:03:00.000Z", 5],
          ["2022-06-04T16:03:00.000Z", 2],
        ],
        symbolSize: 1,
        symbol: "circle",
        smooth: true,
        yAxisIndex: 0,
        showSymbol: false,
        lineStyle: {
          width: 2.5,
          color: {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: primaryColor, //color1, // color at 0% position
              },
              {
                offset: 1,
                color: autoColorPicker(primaryColor), //color2, // color at 100% position
              },
            ],
            global: false, // false by default
          },
          shadowColor: primaryColor, //color1,
          shadowBlur: 10,
          shadowOffsetY: 7,
        },
        itemStyle: {
          color: primaryColor, //color1,
          borderColor: primaryColor, //color1,
        },
      },
      {
        type: "line",
        data: [
          ["2022-06-04T12:03:00.000Z", 1],
          ["2022-06-04T13:03:00.000Z", 3],
          ["2022-06-04T14:03:00.000Z", 5],
          ["2022-06-04T15:03:00.000Z", 2],
          ["2022-06-04T16:03:00.000Z", 4],
        ],
        symbolSize: 1,
        symbol: "circle",
        smooth: true,
        yAxisIndex: 0,
        showSymbol: false,
        lineStyle: {
          width: 2.5,
          color: {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: secondaryColor, //color1, // color at 0% position
              },
              {
                offset: 1,
                color: autoColorPicker(secondaryColor), //color2, // color at 100% position
              },
            ],
            global: false, // false by default
          },
          shadowColor: secondaryColor, //color1,
          shadowBlur: 10,
          shadowOffsetY: 7,
        },
        itemStyle: {
          color: secondaryColor, //color1,
          borderColor: secondaryColor, //color1,
        },
      },
    ],
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      id="ChartPreview"
      ref={chartEl}
      replaceMerge={["xAxis", "yAxis", "series"]}
      option={option}
      style={{ height: "150px", width: "260px", display: "inline-block" }}
      opts={{ renderer: "canvas" }}
      notMerge={true}
    />
  );
}

export default ChartPreview;
