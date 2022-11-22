import React, { useState, useContext, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StocksContext = createContext();
export const useStocks = () => useContext(StocksContext);

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const[token, setToken] = useState({});
  const[data, setData] = useState({});

  let _retriveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@WatchList");
      if (value !== null) {
        setState(JSON.parse(value));
      }
    } catch (error) {
      console.log("Fail to retrive Watchlist.");
      //return {Error: true, Message: "Fail to retrive Watchlist."};
    }
  };

  function clearAllData() {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => alert("success"));
  }

  useEffect(() => {
    _retriveData();
  }, []);
  return (
    <StocksContext.Provider
      value={{
        stock: state,
        setStock: setState,
        loginToken: token,
        setLoginToken: setToken,
        tabledata: data, 
        setTableData: setData,
        addToWatchlist: (x) => addToWatchlist(x, state, setState, token),
        RemoveItemFromList: (x) => RemoveItemFromList(x, state, setState),
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};

function addToWatchlist(newStock, state, setState, token) {
  let count = 0;
  try {
    if (!state.some((e) => e === newStock)) {
      /*
      let arr = state;
      arr.push(newStock)
      console.log(arr);
      console.log(state)
      setState(arr);
*/
      setState((x) => {
        state.push(newStock);
        return [...x];
      });
      AsyncStorage.setItem("@WatchList", JSON.stringify(state));
    }
  } catch (err) {
    console.log("New array");
  }

  if(token.token){
    try{
       addToWatchlistServer(token, state)

    }catch(err){
      console.log("SERVER ERROR");

    }
  }
  
  //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
}


async function  addToWatchlistServer(token, state){
  let arr = String(state)

  const URL = "http://172.22.27.18:3002"; //url in here /register
  let res = await fetch(`${URL}/users/watchlist`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token.token, 
    },
    body: JSON.stringify({
      watchlist: arr
    }),
  });
  let data = await res.json();
  console.log(data);
}


function RemoveItemFromList(delstcok, state, setState) {


  let deleted = state.filter((stock) => stock !== delstcok);
  setState(deleted);
  AsyncStorage.setItem("@WatchList", JSON.stringify(deleted));
}

/**
 * 
 * 
 * 
 * 
 *       let arr = String(state)
      console.log(arr)
      if(loginToken.token){

      }
    }
  } catch (err) {
    console.log("New array");
  }
  //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
}

export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);

  // can put more code here

  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
  }, []);

  return {
    ServerURL: "http://131.181.190.87:3001",
    watchList: state,
    addToWatchlist,
  };
};

 */
