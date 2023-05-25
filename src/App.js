import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import * as constants from "./constants";

const App = () => {
  const [fromDate, setFromDate] = useState(constants.DEFAULT_DATE_FROM);
  const [toDate, setToDate] = useState(constants.DEFAULT_DATE_TO);
  const [interval, setInterval] = useState(constants.DEFAULT_INTERVAL);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate, interval]);

  const getTimeStamp = (date) => {
    return Math.floor(new Date(date).getTime() / 1000);
  };

  const fetchData = async () => {
    try {
      const fromTimestamp = getTimeStamp(fromDate);
      const toTimestamp = getTimeStamp(toDate);

      const url = `${constants.API_BASE_URL}/${constants.TICKER}?period1=${fromTimestamp}&period2=${toTimestamp}&interval=${interval}&events=history`;
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
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </div>
        <div>
          <label htmlFor="toDate">To: </label>
          <input
            id="toDate"
            type="date"
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
        {chartData.length > 0 ? (
          <ReactApexChart
            options={options}
            series={[{ data: chartData }]}
            type="candlestick"
            height={350}
          />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default App;
