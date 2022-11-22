export default function ChartDataForStock(stock, daynum, precent) {
  try {

    let date = [];
    let dataset = [];
    for (let x in stock["Time Series (Daily)"]) {
      if (daynum <= 7) {
        date.push(x);
      }
      if(precent){
        console.log("precent in ??")
        let close = stock["Time Series (Daily)"][x]["4. close"];
        let open =  stock["Time Series (Daily)"][x]["1. open"];
        let precentage = (( close - open ) / open ) *100
        dataset.push(precentage);
      }else{
        dataset.push(stock["Time Series (Daily)"][x]["4. close"]);
      }
    }
    dataset = dataset.slice(0, daynum);
    date = date.slice(0, daynum);
    dataset = dataset.reverse();
    date = date.reverse();
    let chart = {
      labels: date,
      datasets: [
        {
          data: dataset,
          strokeWidth: 2, // optional
        },
      ],
      legend: ["Close Price"], // optional
    };
    return chart;
  } catch (err) {
    console.log("DATA ERROR");
    return false;
  }
}
