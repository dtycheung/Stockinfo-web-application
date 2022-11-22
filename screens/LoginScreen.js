import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ScaleSize from "./../constants/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStocks } from "../contexts/StocksContext";

export default function Login({ navigation }) {
  const [passwrod, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [click, setClick]=useState(false)
  // const [token, setToken] = useState({});
  const { loginToken, setLoginToken } = useStocks(); /////

  async function LoginPostReq(em, pw, navigation) {
    if(pw.length >=6 || email.includes('@')){
    const URL = "http://172.22.27.18:3002"; //url in here /register
    try{
    let res = await fetch(`${URL}/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: em,
        password: pw,
      }),
    }
    );
   let data = await res.json();
    
    if(data.token){
      AsyncStorage.setItem("@token", JSON.stringify(data));
      AsyncStorage.setItem("@email", JSON.stringify(em));
      setTimeout(() => {
        navigation.push('Root');
      }, 1000);
    }
    setLoginToken(data);
    }catch(err){
      console.log("SERVER ERROR");
      return <Text style={styles.headertext}>Server Error</Text>
    }
    }

  }

  function clicklogin(){
    setClick(true);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Login</Text>
      </View>
      {loginToken.error && (
          <Text style={{ color: "red" , fontSize: ScaleSize(16) }}>
            {loginToken.message}
          </Text>
        )}

      {loginToken.token && (<Text style={styles.headertext}>Login success</Text>)}
      { (click && passwrod.length <6 )&& (<Text style={styles.headertext}>Password should be more then 6 characters</Text>)}
      { ( !email.includes('@') && click)&& (<Text style={styles.headertext}>Invalid email </Text>)}

      <View style={styles.row}>
        <View style={styles.arow}>
        <Text style={styles.headertext}>Email:{"    "}</Text>

        </View>
        <View style={styles.brow}>

        <TextInput
          style={styles.ipf}
          keyboardType={"email-address"}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        </View>
      </View>



      <View style={styles.row}><View style={styles.arow}>
      <Text style={styles.headertext}>Password: </Text>
      </View>

      <View style={styles.brow}>
      <TextInput
          style={styles.ipf}
          secureTextEntry={true}
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
            LoginPostReq(email, passwrod, navigation);
          }}
        >
          <Text>Log In</Text>
        </TouchableOpacity>
      

        <Text style={{ color: "grey", fontSize: ScaleSize(14) }}>
          Do not have a account?{" "}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push("SignUp");
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
    alignItems:"center"

  },
  arow: {
    //flexDirection: "row",
    paddingVertical: 10,

    width: "30%"
  },
  brow: {
    //flexDirection: "row",
    paddingVertical: 10,

    width: "70%"

  },
  ipf: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
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

/**
 * <CustomInput placeholder="Email" value={email} setValue={setEmail} />  
      <CustomInput
        placeholder="Password"
        value={passwrod}
        setValue={setPassword}
        secureTextEntry={true}
      />




       <View style={styles.container}>

      <View>

      </View>




      <View>
        <Text style={styles.headertext}> Email </Text>

      <TextInput
     style={styles.input}
     placeholder="email"
     value={email}
     onChangeText={setEmail}
      />

      </View>
 */
