import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Input
} from "react-native";

function InputText(props) {
  return <Text style={styles.inputText}>{props.placeholder}</Text>
}
function InputField(props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={props.props.value}
        onChangeText={props.props.setValue}
        placeholder={props.props.placeholder}
        style={styles.inputfield}
        secureTextEntry={props.props.secureTextEntry}
        placeholderTextColor="white"
      ></TextInput>
    </View>
  );
}
export default function CustomInput(props) {
  return (
   <View><Text>Hi</Text></View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "white",
    marginVertical: 10,
    //paddingHorizontal: 20,
    //backgroundColor: "white"
  },
  inputfield: {
    width: "100%",
    color: "white",
    padding: 10,
    //marginHorizontal: 20,
    borderColor: "white",
  },
  inputText: {
    color: "white",
    fontSize: 24,
    alignItems: "center",
    padding: 10,
  },
});


//<InputText placeholder={props.placeholder} />
   //   <InputField props={props} />