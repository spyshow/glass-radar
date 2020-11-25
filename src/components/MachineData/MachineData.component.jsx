import React from "react";
import { useFind } from "figbird";
import { Skeleton } from "antd";
import ReactEcharts from "echarts-for-react";

const MachineData = ({ machine_name, machine_sensors, timeRange }) => {
  let chartData = [];
  const machineData = useFind("machine-data", {
    query: {
      machine_name: machine_name,
      startDate: timeRange[0]._d,
      endDate: timeRange[1]._d,
    },
  });
  /*
    [
      {dim_diameter: 12}
      {dim_error: 0}
      {dim_height: 10}
      {dim_verticality: 9}
      {inspected: 4558}
      {mold: 0}
      {rejected: 69}
      {sidewall_bird: 0}
      {sidewall_blackimage: 4}
      {sidewall_blister: 10}
      {sidewall_density: 0}
      {sidewall_drawn: 31}
      {sidewall_error: 0}
      {sidewall_sideobject: 1}
      {sidewall_sidewallother: 9}
      {sidewall_stone: 26}
      {sidewall_thin: 0}
      {sidewall_wing: 0}
      {stress_blackimage: 0}
      {stress_error: 4}
      {stress_stress: 4}
    ]
  */
  if (machineData.status !== "success") {
    return <Skeleton active />;
  } else if (machineData.data.data || machineData.data.length === 0) {
    return <div>No data</div>;
  }

  // temp1.map((obj, i) => {
  //   if (Object.keys(obj)[0].search("sidewall") > -1) {
  //     console.log(Object.keys(obj)[0]);
  //     temp2[i] = Object.keys(obj)[0][defect.id];
  //   }
  // });
  chartData = machine_sensors.sensors.map((sensor) => {
    let data = {
      label: { rotate: "tangential" },
      name: sensor.id,
      itemStyle: {
        color: "#da0d68",
      },
      children: [],
      emphasis: {
        label: {
          formatter: "{b}\n\n{c}",
        },
      },
      downplay: {
        label: {
          formatter: "{b}\n\n{c}",
        },
      },
    };
    sensor.counter.forEach((defect, index) => {
      let value = 0;
      machineData.data.forEach((obj, i) => {
        if (Object.keys(obj)[0].search(defect.id.toLowerCase()) > -1) {
          value = obj[Object.keys(obj)[0]];
        }
      });
      data.children[index] = {
        label: { formatter: "{b}\n\n{c}" },
        name: defect.id,
        value: value,
        itemStyle: {
          color: "#975e6d",
        },
      };
      // machineData.foreach((machine,i)=>{
      //   data.children[index].value += machine[`${defect,id}_${}`]
      // })
    });
    return data;
  });
  console.log(chartData);
  let option = {
    title: {
      text: "WORLD COFFEE RESEARCH SENSORY LEXICON",
      subtext: "Source: https://worldcoffeeresearch.org/work/sensory-lexicon/",
      textStyle: {
        fontSize: 14,
        align: "center",
      },
      subtextStyle: {
        align: "center",
      },
      sublink: "https://worldcoffeeresearch.org/work/sensory-lexicon/",
    },
    series: {
      type: "sunburst",
      highlightPolicy: "ancestor",
      data: chartData,
      radius: [0, "50%"],
      sort: null,
      levels: [
        {},
        {
          r0: "15%",
          r: "35%",
          itemStyle: {
            borderWidth: 2,
          },
          label: {
            rotate: "tangential",
          },
        },
        {
          r0: "35%",
          r: "70%",
          label: {
            align: "right",
            rotate: "radial",
            position: "outside",
            textShadowBlur: 5,
            textShadowColor: "#333",
          },
        },
      ],
    },
  };

  return (
    <ReactEcharts
      lazyUpdate={true}
      option={option}
      style={{ height: "600px", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default MachineData;
