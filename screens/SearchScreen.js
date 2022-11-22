import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ScaleSize from "../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useStocks } from "../contexts/StocksContext";
import TabBarIcon from "../components/TabBarIcon";
//import {useAPIData} from"../api/api"
//this one is for calling api from fdm
// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)

const errormsg = [{ name: "API ERROR", symbol: "ERR" },];
export default function SearchScreen({ navigation }) {
  //const { stocks, setStock } = useStocks();
  const [loading, setLoading] = useState(true);
  const [filterword, setFilterword] = useState(""); //fitler
  const [searchStock, setSearchStock] = useState(errormsg);
  const [filterShock, setFilterShock] = useState(errormsg);

  const FMP_API_KEY = `e883d1e8999e83b45b502c97f3c8cae1`; //
  const URL_API = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${FMP_API_KEY}`;

  // can put more code here
  useEffect(() => {
    fetch(URL_API)
      .then((res) => res.json())
      .then((res) => {
        setSearchStock(res);
        setFilterShock(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilterShock(searchStock);
    if (filterword !== "") {
      let sym = searchStock.filter((x) =>
        x.symbol.includes(filterword.toUpperCase())
      );
      let nam = searchStock.filter((x) =>
        x.name.toUpperCase().includes(filterword.toUpperCase())
      );
      let newArr = sym.concat(nam);
      const noduplicated = [...new Set(newArr)];
      setFilterShock(noduplicated);
    } else {
      setFilterShock(searchStock);
    }
  }, [filterword]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.reminder}>Type a company name or stock symbol </Text>
      <View style={styles.searchbar}>
        <TabBarIcon name="md-search" />
        <TextInput
          autoCapitalize = {"characters"}
          style={styles.input}
          placeholder="Search"
          value={filterword}
          onChangeText={setFilterword}
        />
      </View>
      <View style={styles.container}>
      <Toast />

        {loading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <StockList stocks={filterShock}></StockList>
        )}
      </View>
    </View>
  );
}
function StockList(props) {
  //this need a onclick event to trigger the addtowatchlist function

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        {props.stocks.map((x) => (
          <Stock name={x.name} key={x.symbol} symbol={x.symbol} />
        ))}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

function Stock(props) {
  const { addToWatchlist , loginToken} = useStocks();

  return (
    <TouchableOpacity
        onPress={() => {
          addToWatchlist(props.symbol, loginToken);
          Toast.show({
            text1: `${props.name} added into Watch List` ,
          });
        }}
      >
    <View style={styles.stockview}>
      <Text>
      <Text style={styles.stock_symbol}>{props.symbol}  </Text>
        <Text style={styles.stock_name}>{props.name}</Text>
      </Text>
        
    </View>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, marginHorizontal: 10 },
  stock: {
    color: "white",
    //textAlign: "center",
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  stockview: {
    //width: "50%",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "white",
    margin: 10,
    flexDirection: "row",
    justifyContent: "flex-start",

    paddingHorizontal: 5,
    paddingVertical: 10,

    //backgroundColor: "white"
  },
  stock_name: {
    fontSize: ScaleSize(14),
    width: "100%",
    color: "white",
    padding: 10,
    //marginHorizontal: 20,
    borderColor: "white",
  },
  stock_symbol: {
    fontSize: ScaleSize(20),
    width: "100%",
    color: "white",
    paddingHorizontal: 10,
    //marginHorizontal: 10,
    borderColor: "white",
  },
  input: {
    //fontSize: 20,
    // marginLeft: 10,
    width: "90%",
    borderWidth: 2,
    borderColor: "#999999",
    borderRadius:4,
    color: "white",
    alignSelf: "flex-end",
    height: 50,
    fontSize: ScaleSize(18),
  },
  searchbar: {
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reminder: {
    fontSize: ScaleSize(12),
    marginHorizontal: 10,
    marginTop: 10,
    color: "white",
    textAlign: "center",
  },
  loading:{
    fontSize: ScaleSize(16),
    color: "white"
  }
});