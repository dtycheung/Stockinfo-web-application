
import React from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Dimensions,
  } from "react-native"; 
  import ScaleSize from "../constants/Layout";


export default function DateButton(props){
  const action = ()=>{
    props.setDaynum(props.num)
    if(props.label==="%"){
      props.setPrecent(true);
    }else{
       props.setPrecent(false);
    }
  }

    return(
        <TouchableOpacity
              style={styles.button}
              onPress={() =>  action()}
            >
              <Text>{props.label}</Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: ScaleSize(40),
        width: ScaleSize(60),
        marginHorizontal: 10,
        backgroundColor: "#808080",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        paddingHorizontal: 10,
        margin:10,
      },


})