import react, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { Children } from "react/cjs/react.production.min";
import logo from "../assets/images/splash.png";
import { useNavigation } from "@react-navigation/native";
import { useStocks } from "./../contexts/StocksContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function BodyText(props) {
  return <Text style={styles.bodyText}>{props.text}</Text>;
}

function HeadlineText(props) {
  return <Text style={styles.headlineText}>{props.text}</Text>;
}

function ImageDisplay(props) {
  return (
    props.selectedImage && (
      <Image source={props.selectedImage} style={{ width: 305, height: 200 }} />
    )
  );
}
//these two button should be disappear after logined
export default function HomeScreen({ navigation }) {
  const { loginToken, setLoginToken } = useStocks();
  const [email, setEmail] = useState("");
  const [logout, setLogout] = useState(false);

  let _retriveEmail = async () => {
    try {
      const value = await AsyncStorage.getItem("@email");
      if (value !== null) {
        setEmail(JSON.parse(value));
      } 
    } catch (error) {
      console.log("Fail to retrive email.");
      console.log(error);
    }
  };

  let _retrivetoken = async () => {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        setLoginToken(JSON.parse(value));
      }  
    } catch (error) {
      console.log("Fail to retrive token.");
      console.log(error);
    }
  };


useEffect(()=>{
  _logOut();
}, [logout])
  function _logOut() {
    if (loginToken.token && logout) {
      try {
        AsyncStorage.getAllKeys()
          .then((keys) => AsyncStorage.multiRemove(keys))
          .then(() => alert("Log Out success"))
          .then(setLogout(false))
          .finally(document.location.reload(true));
      } catch (err) {
        console.log("Fail to removing token.");
        console.log(err);
      }
    }
  }

  useEffect(() => {
    _retriveEmail();
    _retrivetoken();
  }, []);

//  if(logout){
//    _logOut();
 // }
  return (
    <View style={styles.container}>
      <ImageDisplay selectedImage={logo} />
      <HeadlineText
        text="IFN666 Stock Application"
        style={styles.headlineText}
      />
      {(loginToken.token && loginToken.expires_in < Date.now()) ? (
        <View style={styles.subcontainer}>
          <BodyText text="Welcome Back!"></BodyText>
          <BodyText text={email}></BodyText>
          
        </View>
      ) : (
        <View style={styles.subcontainer}>
          <BodyText text="Welcome to the Stock Application, please login or sign up." />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.push("LogIn");
            }}
          >
            <Text>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.push("SignUp");
            }}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subcontainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headlineText: {
    color: "white",
    fontSize: 40,
  },
  bodyText: {
    color: "white",
    fontSize: 18,
  },
  button: {
    marginVertical: 10,
    height: 40,
    width: 200,
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 10,
  },
});


/**
 *   <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setLogout(true)
            }}
          >
            <Text>Log Out</Text>
          </TouchableOpacity>
 */