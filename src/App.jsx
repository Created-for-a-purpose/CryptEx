import React from "react";
import "./App.css";
import BalanceBox from "./components/BalanceBox";
import BuySellBox from "./components/BuySellBox";
import OrderBook from "./components/OrderBook";
import Trade from "./components/Trade";
import Transactions from "./components/Transactions";
import Navbar from "./components/Navbar";

function App() {
  const tokens = [
    { token: "PPT", wallet: 100, DeTEx: 53.29 },
    { token: "PPT", wallet: 100, DeTEx: 53.29 },
  ];

  const orders = [
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
    { ppt: 100, ratio: 0.0001, eth: 0.01 },
  ];

  const trades = [
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
    { time: "12:00", ppt: 100, ratio: 0.0001 },
  ];

  const transactions = [
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
    {transaction : "0x1234567890", type: "Buy Order",ppt: 100, ratio: 0.0001, eth: 0.01},
  ]

  return (
    <>
    <Navbar />
      <div className="container">
        <div className="left">
          <div className="balanceBox">
            <BalanceBox tokens={tokens} />
          </div>
          <div className="buySellBox">
            <BuySellBox tokens={tokens} />
          </div>
        </div>
        <div className="middle">
          <div className="orderBook">
            <OrderBook orders = {orders} />
          </div>
          <div className="trades">
            <Trade transactions = {trades} />
          </div>
        </div>
        <div className="right">
          <div className="priceChart"></div>
          <div className="transactions">
            <Transactions transactions={transactions}></Transactions>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
