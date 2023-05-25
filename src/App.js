import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const TICKER = "SPUS";
const API_BASE_URL = "https://query1.finance.yahoo.com/v7/finance/download";

const App = () => {
  const [fromDate, setFromDate] = useState(1633381200);
  const [toDate, setToDate] = useState(1664917199);
  const [interval, setInterval] = useState("1d");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate, interval]);

  const fetchData = async () => {
    try {
      const url = `${API_BASE_URL}/${TICKER}?period1=${fromDate}&period2=${toDate}&interval=${interval}&events=history`;
      const response = await fetch(url);
      const data = await response.text();

      const parsedData = data
        .split("\n")
        .slice(1)
        .map((row) => {
          const [date, open, high, low, close] = row.split(",");
          return {
            x: new Date(date),
            y: [
              parseFloat(open),
              parseFloat(high),
              parseFloat(low),
              parseFloat(close),
            ],
          };
        });

      setChartData(parsedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <div className="filters">
        <div>
          <label htmlFor="fromDate">From: </label>
          <input
            id="fromDate"
            type="text"
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </div>
        <div>
          <label htmlFor="toDate">To: </label>
          <input
            id="toDate"
            type="text"
            value={toDate}
            onChange={handleToDateChange}
          />
        </div>
        <div>
          <label htmlFor="interval">Interval: </label>
          <select
            id="interval"
            value={interval}
            onChange={handleIntervalChange}
          >
            <option value="1d">1 Day</option>
            <option value="1wk">1 Week</option>
            <option value="1mo">1 Month</option>
          </select>
        </div>
      </div>
      <div>
        <ReactApexChart
          options={options}
          series={[{ data: chartData }]}
          type="candlestick"
          height={350}
        />
      </div>
    </div>
  );
};

export default App;
