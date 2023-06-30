import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import config from './config.json';

//Components
import BalanceBox from "./components/BalanceBox";
import BuySellBox from "./components/BuySellBox";
import OrderBook from "./components/OrderBook";
import Trade from "./components/Trade";
import Transactions from "./components/Transactions";
import Navbar from "./components/Navbar";
import PriceChart from './components/PriceChart';
import Alert from './components/Alert';

// redux interactions
import { loadProvider, loadAccount, 
         loadNetwork, loadTrade, subscribeToEvents,
         loadOrders
        } from "./redux/interactions";

function App() {
  const dispatch = useDispatch();

  const loadContracts = async () => {
    const provider = loadProvider(dispatch);
    const chainId  = await loadNetwork(dispatch, provider);
    
    window.ethereum.on('chainChanged', () => {
    window.location.reload();
    });
    
    window.ethereum.on('accountsChanged', () => {
    loadAccount(dispatch, provider);
    });

    // const addresses = [config[chainId].Martian.address, config[chainId].EthCoins.address]
    // await loadTokens(dispatch, provider, addresses);
    const trade = await loadTrade(dispatch, provider, config[chainId].trade.address);
    loadOrders(dispatch, trade, provider);  
    subscribeToEvents(dispatch, trade);
    console.log('subscribed')
  }

  useEffect(() => {
    loadContracts();
  })

  return (
    <>
    <Navbar />
      <div className="container">
        <div className="left">
          <div className="balanceBox">
            <BalanceBox />
          </div>
          <div className="buySellBox">
            <BuySellBox />
          </div>
        </div>
        <div className="middle">
          <div className="orderBook">
            <OrderBook />
          </div>
          <div className="trades">
            <Trade />
          </div>
        </div>
        <div className="right">
          <div className="priceChart">
            <PriceChart />
          </div>
          <div className="transactions">
            <Transactions />
          </div>
        </div>
          <Alert /> 
      </div>
    </>
  );
}

export default App;
