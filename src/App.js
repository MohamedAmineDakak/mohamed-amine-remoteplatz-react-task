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

  return <div>Loading...</div>;
};

export default App;
