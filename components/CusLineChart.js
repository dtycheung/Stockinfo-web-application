import { LineChart } from "react-native-chart-kit";
import React from "react";
import { Dimensions } from "react-native";
import ScaleSize from "../constants/Layout";

export default function CusLineChart(props) {
  function precentage(){
    if(props.precent){
      return " %"
    }else {
      return " $"
    }
  }
  return (
    <LineChart
      data={props.chartdata}
      width={Dimensions.get("window").width} // from react-native
      height={ScaleSize(180)}
      yAxisLabel= {precentage()}
      yAxisInterval={20} // optional, defaults to 1
      xAxisInterval={1} // optional, defaults to 1
      verticalLabelRotation={-45}
      chartConfig={{
        backgroundColor: "#303030",
        backgroundGradientFrom: "#303030",
        backgroundGradientTo: "#303030",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "4",
          strokeWidth: "2",
          stroke: "#202020",
        },
      }}
      bezier
      style={{
        borderRadius: 16,
      }}
    />
  );
}
