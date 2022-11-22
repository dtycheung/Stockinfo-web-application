import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Button
} from "react-native";
import ScaleSize from "../constants/Layout";
import { useNavigation } from "@react-navigation/core";
import { useStocks } from "../contexts/StocksContext";
import TabBarIcon, { Trash } from "../components/TabBarIcon";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import BottomSheet from "../components/BottomSheet";
import { StatusBar } from "react-native-web";
import {Provider } from "react-native-paper"
import StockDetail from "../screens/DetailScreen"

//this is the watch list
// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)

function StockPrice(props, search) {
 
  
    return (
      <View style={search.dp > 0 ? styles.up : styles.drop}>
        <Text style={{ width: "70%" }}>
          {" "}
          <Text style={styles.updroptext}>
            {search.c.toFixed(2)}
            {"\n"}
          </Text>
          <Text style={styles.updroptext}>{search.dp.toFixed(2)}%</Text>
        </Text>
        <View style={{ width: "30%" }}>
          <TabBarIcon name={search.dp > 0 ? "md-arrow-up" : "md-arrow-down"} />
        </View>
      </View>
    );
  
}

function WatchList(props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        {props.stocks.map((x) => (
          <WatchingStock symbol={x} key={x} nav={props.nav} />
        ))}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
} 

function WatchingStock(props) {
  const { RemoveItemFromList } = useStocks(); /////
    const [show, setShow] = useState();
      const[data, setData] = useState({});
      const [loading, setLoading] = useState(true);

    let API_KEY = `cajm16aad3icpj9q4gr0`;
    let API_KEY2 = `sandbox_cajm16aad3icpj9q4grg`;
    let URL_API = `https://finnhub.io/api/v1/quote?symbol=${props.symbol}&token=${API_KEY2}`; 
   
      useEffect(() => {
        try{
        fetch(URL_API)
          .then((res) => res.json())
          .then((res) => {
            setData(res);
          }) //need to change some thing
          .catch((err) => console.error("Something wrong with the API"))
          .finally(() => setLoading(false));
    }catch(e){
      console.log(e);
    }
    }, []);


    if (loading) {
      return <Text style={{ color: "white" }}>Loading...</Text>;
    } else {
  return (
    <View style={styles.stockview}>
      <View style={styles.stockview_left}>
        <TouchableOpacity
          onPress={()=> setShow(true)}
        >
          <Text style={styles.stock_symbol}>{props.symbol}</Text>
        </TouchableOpacity>
        <BottomSheet show={show} onDismiss={()=>{
          setShow(false)
          }} >
            <StockDetail symbol={props.symbol} data={data}/>

          </BottomSheet>
      </View>
      <View style={styles.stockview_mid}>
      {StockPrice(props, data)}
      </View>
      <View style={styles.stockview_right}>
        <TouchableOpacity
          onPress={() => {
            RemoveItemFromList(props.symbol);
            Toast.show({
              text1: `${props.symbol} removed from Watch List`,
            });
          }}
        >
          <Trash style={{ alignSelf: "center" }} name="md-trash" color="#f00" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
}

export default function StocksScreen({ navigation, route }) {
  const { stock, setStock } = useStocks(); /////
  if (stock.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.warningmgs}>No Stock is found in Watch List</Text>
      </View>
    );
  } else {
    return (
      <Provider>
      <View style={styles.container}>
        <Toast />
        <WatchList stocks={stock} nav={navigation} />
      </View>
      </Provider>

    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    marginHorizontal: 10,
    //width: "100%",
    //flexWrap: "wrap",
    //alignItems: "center",
    justifyContent: "center",
  },
  warningmgs: {
    color: "white",
  },
  stockview: {
    //width: "100%",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "white",
    margin: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //backgroundColor: "white"
  },
  stockview_left: {
    width: "40%",
    paddingHorizontal: 5,
  },
  stockview_mid: {
    width: "45%",
    paddingHorizontal: 5,
  },
  stockview_right: {
  width: "15%",
    paddingHorizontal: 5,
  },

  stock_name: {
    fontSize: ScaleSize(10),
    width: "100%",
    color: "white",
    padding: 10,
    //marginHorizontal: 20,
    borderColor: "white",
  },
  stock_symbol: {
    fontSize: ScaleSize(16),
    width: "100%",
    color: "white",
    paddingHorizontal: 10,
    marginLeft: 10,
    borderColor: "white",
  },
  up: {
    width: "70%",
    backgroundColor: "green",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  drop: {
    width: "70%",
    backgroundColor: "red",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updroptext: {
    fontSize: ScaleSize(14),
  },
});

/*
    let symbolarr = [];
    for (let x in stock) {
      symbolarr.push(stock[x].symbol);
    }
    let REQUEST = symbolarr.toString();
 <TouchableOpacity
          onPress={() => {
            props.nav.navigate({
              name: "Detail",
              params: { symbol: props.symbol, data: tabledata },
            });
          }}
        >
          <Button onPress={()=> setShow(true)} title="hihihihi"></Button>
        <BottomSheet show={show} onDismiss={()=>{
          setShow(false)
          
          }} ></BottomSheet>
          
          <Text style={styles.stock_symbol}>{props.symbol}</Text>
        </TouchableOpacity>
*/
