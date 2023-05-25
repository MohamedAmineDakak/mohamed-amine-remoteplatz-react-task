import React, { useState, useEffect } from "react";

const TICKER = "SPUS";
const API_BASE_URL = "https://query1.finance.yahoo.com/v7/finance/download";

const App = () => {
  const [fromDate, setFromDate] = useState(1633381200);
  const [toDate, setToDate] = useState(1664917199);
  const [interval, setInterval] = useState("1d");

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate, interval]);

  const fetchData = async () => {
    try {
      const url = `${API_BASE_URL}/${TICKER}?period1=${fromDate}&period2=${toDate}&interval=${interval}&events=history`;
      const response = await fetch(url);
      const data = await response.text();

      console.log("Data:", data);
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
    </div>
  );
};

export default App;
