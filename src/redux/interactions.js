import { ethers } from 'ethers';
import tokenABI from '../abi/token.json';
import tradeABI from '../abi/trade.json';

export const loadAccount=async (dispatch, provider)=>{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.getAddress(accounts[0]);
    
    dispatch({type: 'LOADED_ACCOUNT', account});

    let balance = await provider.getBalance(account);
    balance = ethers.formatEther(balance);
    dispatch({type: 'LOADED_BALANCE', balance});

    return account;
}

export const loadProvider=(dispatch)=>{
    const provider = new ethers.BrowserProvider(window.ethereum);
    dispatch({type: 'LOADED_PROVIDER', connection: provider});

    return provider;
}

export const loadNetwork=async (dispatch, provider)=>{
   const { chainId } = await provider.getNetwork();
   dispatch({type: 'LOADED_NETWORK', chainId});

   return chainId;
}

export const loadTokens=async (dispatch, provider, addresses)=>{
    let token, symbol;
    token = new ethers.Contract(addresses[0], tokenABI, provider);
    symbol = await token.symbol();
    dispatch({type: 'LOADED_TOKEN_1', token, symbol});
    // await token.
    token = new ethers.Contract(addresses[1], tokenABI, provider);
    symbol = await token.symbol();
    dispatch({type: 'LOADED_TOKEN_2', token, symbol});

    return token;
}

export const loadTrade = async (dispatch, provider, address)=>{
    const trade = new ethers.Contract(address, tradeABI, provider);
    dispatch({type: 'LOADED_TRADE', trade});

    return trade;
}

export const loadBalances = async(dispatch, trade, tokens, account)=>{
    
    let balance = ethers.formatEther(await tokens[0].balanceOf(account));
    dispatch({type: 'LOADED_TOKEN_1_BALANCE', balance});
    balance = ethers.formatEther(await tokens[1].balanceOf(account));
    dispatch({type: 'LOADED_TOKEN_2_BALANCE', balance});
    balance = ethers.formatEther(await trade.balanceOf(tokens[0].target, account));
    dispatch({type: 'LOADED_TRADE_BALANCE_1', balance});
    balance = ethers.formatEther(await trade.balanceOf(tokens[1].target, account));
    dispatch({type: 'LOADED_TRADE_BALANCE_2', balance});
}

export const subscribeToEvents = async(dispatch, trade)=>{
    trade.on('Ordered', (id, maker, ts, as, tb, ab, time, event) => {
        const order = event.args;
        dispatch({type: 'ORDER_MADE', order})
      })
    
    trade.on('Cancelled', (id, maker, ts, as, tb, ab, time, event) => {
        const order = event.args;
        dispatch({type: 'ORDER_CANCELLED', order})
    })

    trade.on('Traded', (id, maker, taker, ts, as, tb, ab, time, event) => {
        const order = event.args;
        dispatch({type: 'ORDER_TRADED', order})
    })

    trade.on('Deposit', (token, from, amount, balance, event) => {
        dispatch({type: 'TRANSFER_MADE', event})
        console.log('deposit')
      })

    trade.on('Withdraw', ( token, from, amount, balance, event) => {
        dispatch({type: 'TRANSFER_MADE', event})
      })

}

export const loadOrders= async(dispatch, trade, provider)=>{
    const block = await provider.getBlockNumber();

    const cancelStream = await trade.queryFilter('Cancelled', 0, block);
    const cancelledOrders = cancelStream.map(event=>event.args);
    dispatch({type: 'LOADED_CANCELLED_ORDERS', cancelledOrders})
    
    const tradeStream = await trade.queryFilter('Traded', 0, block);
    const tradedOrders = tradeStream.map(event=>event.args);
    dispatch({type: 'LOADED_TRADED_ORDERS', tradedOrders})
    
    const stream = await trade.queryFilter('Ordered', 0, block);
    const allOrders = stream.map(event=>event.args);
    dispatch({type: 'LOADED_ALL_ORDERS', allOrders})
}