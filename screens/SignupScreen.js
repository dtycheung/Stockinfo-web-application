import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ScaleSize from "./../constants/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStocks } from "../contexts/StocksContext";

const URL = "localhost:3002"; //url in here /register

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [passwrod, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loginToken, setLoginToken } = useStocks(); /////
  const [res, setRes] = useState({});
  const [click, setClick]=useState(false)

  async function RegPostReq(un, em, pw) {
    const URL = "http://172.22.27.18:3002"; //url in here /register
    try{
      if(passwrod.length >=6 && email.includes('@')){
        let res = await fetch(`${URL}/users/register`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: em,
            password: pw,
            username: un,
          }),
        });
        let data = await res.json();
        setRes(data);
        console.log(data)
        if (data.error===false) {
          setTimeout(() => {
            navigation.push("LogIn");
          }, 1000);
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  function clicklogin(){
    setClick(true);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Sign Up</Text>
      </View>
      {res.error && (
        <Text style={{ color: "red", fontSize: ScaleSize(16) }}>
          {res.message}
        </Text>
      )}
      {res.error === false && (
        <Text style={styles.headertext}>{res.message}</Text>
      )}
      { (click && passwrod.length <6 )&& (<Text style={styles.headertext}>Password should be more then 6 characters</Text>)}
      { ( !email.includes('@') && click)&& (<Text style={styles.headertext}>Invalid email </Text>)}

      <View style={styles.row}>
        <View style={styles.arow}>
          <Text style={styles.headertext}>Username: </Text>
        </View>

        <View style={styles.brow}>
          <TextInput
            style={styles.ipf}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.arow}>
          <Text style={styles.headertext}>Email: </Text>
        </View>
        <View style={styles.brow}>
          <TextInput
            style={styles.ipf}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.arow}>
          <Text style={styles.headertext}>Password: </Text>
        </View>
        <View style={styles.brow}>
          <TextInput
            secureTextEntry={true}
            style={styles.ipf}
            placeholder="Password"
            value={passwrod}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
              clicklogin();
              RegPostReq(username, email, passwrod);
          }}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    //alignContent: "space-around",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "white",
    alignSelf: "center",
    fontSize: ScaleSize(18),
    padding: 10,
  },
  headertext: {
    color: "white",
    fontSize: ScaleSize(18),
    padding: 10,
  },
  row: {
    //paddingVertical: 10,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  arow: {
    //flexDirection: "row",
    paddingVertical: 10,
    width: "35%",
  },
  brow: {
    //flexDirection: "row",
    paddingVertical: 10,
    width: "65%",
  },

  ipf: {
    //alignItems:  "flex-right",
    //justifyContent: "flex-right",
    width: "100%",
    color: "white",
    //padding: 10,
    fontSize: ScaleSize(18),
    borderColor: "white",
    borderWidth: 2,
  },
  button: {
    marginVertical: 10,
    height: 40,
    width: 150,
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 10,
  },
  buttons: {
    alignSelf: "center",
  },
});
