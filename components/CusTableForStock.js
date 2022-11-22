import  React from "react";
import { Text, View, StyleSheet } from "react-native";
import ScaleSize from "../constants/Layout";

export default function CusTable(props) {
  console.log("in")

  console.log(props.data)
  try{
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.celllabel}>Symbol </Text>
        <Text style={styles.cell}>{props.symbol}</Text>
        <Text style={styles.celllabel}>Current</Text>
        <Text style={styles.cell}>{props.data.c}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.celllabel}>Change</Text>
        <Text style={styles.cell}>{props.data.d}</Text>
        <Text style={styles.celllabel}>Percent change</Text>
        <Text style={styles.cell}>{props.data.dp}%</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.celllabel}>High</Text>
        <Text style={styles.cell}>{props.data.h}</Text>
        <Text style={styles.celllabel}>Low</Text>
        <Text style={styles.cell}>{props.data.l}</Text>
      </View>
      <View style={styles.lastrow}>
        <Text style={styles.celllabel}>Open</Text>
        <Text style={styles.cell}>{props.data.o}</Text>
        <Text style={styles.celllabel}>Prev.close</Text>
        <Text style={styles.cell}>{props.data.pc}</Text>
      </View>
    </View>
  );
  }catch(err){
    console.log(err);
    return(
      <Text style={styles.cell}>SOMETHING W</Text>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#555555",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    //alignItems: "flex-start",
    borderBottomWidth: 2,
    borderColor: "#888888",
    marginVertical: 1,
  },
  cell: {
    color: "white",
    alignSelf: "center",
    paddingHorizontal: 13,
    fontSize: ScaleSize(14),
    width: "25%",
    paddingVertical: 1,

  },
  celllabel: {
    color: "#888888",
    paddingHorizontal: 13,
    fontSize: ScaleSize(14),
    width: "25%",
    paddingVertical: 1,
  },
  lastrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 1,

  },
});
