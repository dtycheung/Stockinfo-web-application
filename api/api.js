import { useState, useEffect } from "react";

const API_KEY = "9c7d78fa90084b4fa992460521743749";
const AV_API_KEY = "M363MS99GJF7AXO0";
const AV_API_KEY2 = "W4IOPEI2VREDWZW8";
const AV_API_KEY3 = "XGGLW9LB6DOABAEI";
const AV_API_KEY4 = "VI5DM5EILJE5DADB";
const FMP_API_KEY = `1543e134b52f63b7de61d6f48496f27f`; //symbol, name and industry fd34313f133b2dd91fb82b71c6c505b8
const FMP_API_KEY2 = `fd34313f133b2dd91fb82b71c6c505b8`; 
const FMP_API_KEY3 = `fc9b94339593753d49b8f0a42a46ef07`;

//const URL_API = `https://financialmodelingprep.com/api/v3/stock/list?apikey=${FMP_API_KEY}`;

async function getHeadlines(){
  const url = `https://newsapi.org/v2/everything?q=stocks&apiKey=${API_KEY}`;
  let res = await fetch(url);
  let data = await res.json();
  let articles = data.articles;
  return articles;
}

async function getStock() {
  let url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${FMP_API_KEY}`;
  let res = await fetch(url);
  let data2 = await res.json();
  return data2;
}

async function getHistory(search) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=${search}&apikey=${AV_API_KEY4}`;
  let res = await fetch(url);
  let data2 = await res.json();
  return data2;
}

async function getOverview(search) {
  const url = `https://financialmodelingprep.com/api/v3/profile/${search}?apikey=${FMP_API_KEY3}`;
  let res = await fetch(url);
  let data2 = await res.json();
  return data2;
}

export function useNewsArticles() {
  const [loading, setLoading] = useState(true);
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    (async () => {
      try{
        setHeadlines(await getHeadlines()); 
        setLoading(false);
      } catch(err){
        setError(err);
      }
      
    })();
  }, []); //list [] , run once if [] is empty, it will run again if the thing inside [] is changedwhen search is change


  return {loading, headlines, error };
}

export function useAPIData() {
  const [loading, setLoading] = useState(true);
  const [apistocks, setStocks] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
          setStocks(await getStock());
          setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    apistocks,
    error,
  };
}

export function useAPIHistory(search) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (search===false) {
          setError("Something Wrong, please check your Symbol or URL.");
        } else{
          setHistory(await getHistory(search));
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);
  return {
    loading,
    history,
    error,
  };
}

export function useAPIHistory2(search) {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (search===false) {
          setError("Something Wrong, please check your Symbol or URL.");
        } else{
          setOverview(await getOverview(search))
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);
 
  return {
    loading,
    overview,
    error,
  };
}
