import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./OrderBook.module.css";
import { orderBookSelector } from "../redux/selectors";

const OrderBook = () => {
  const [choice, setChoice] = useState("Buy Orders");
  const orders = useSelector(orderBookSelector);
  const symbols = useSelector(state => state.tokens.symbols);
  const provider = useSelector(state => state.provider.connection);
  const trade = useSelector(state => state.trade.contract);
  const dispatch = useDispatch();
  //  console.log('orders are ', orders);
  const handleChoice = (e) => {
    setChoice(e.target.innerText);
  };

  const fillOrder = async (order) => {
    try{
      const signer = await provider.getSigner();
      const id = order[0];
      const tx = await trade.connect(signer).confirmOrder(id);
      await tx.wait(); 
    }
    catch(err){
      dispatch({ type: 'FILL_FAILED'})
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Order Book</div>
      <div className={styles.choices}>
        <div
          onClick={handleChoice}
          className={`${styles.choice} ${
            choice === "Buy Orders" ? styles.active : ""
          }`}
        >
          Buy Orders
        </div>
        <div
          onClick={handleChoice}
          className={`${styles.choice} ${
            choice !== "Buy Orders" ? styles.active : ""
          }`}
        >
          Sell Orders
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          { symbols && symbols[0] && symbols[1] && 
          <div className={styles.tableHeaderHeading}>{symbols[0]}</div>}
          <div className={styles.tableHeaderHeading}>{symbols[0]}/{symbols[1]}</div> 
          <div className={styles.tableHeaderHeading}>{symbols[1]}</div>
          {/* <div className={styles.tableHeaderHeading}>Expires</div> */}
           
        </div>
        <div className={styles.tableData}>
          { orders && choice==='Buy Orders' &&
          orders.buyOrders.map((order, index) => {
            // console.log('order is ', typeof order.price)
            return (
              <div className={styles.tableEntry} key={index} onClick={()=>fillOrder(order)}>
                <div className={styles.tableEntryValue}>{order.token0Amount}</div>
                <div className={styles.tableEntryValue} style={{ color: `${order.orderTypeClass}` }}>{order.price}</div>
                <div className={styles.tableEntryValue}>{order.token1Amount}</div>
                {/* <div className={styles.tableEntryValue}>{order.expire.toString()}</div> */}
              </div>
            );
          })}
          { orders && choice==='Sell Orders' &&
          orders.sellOrders.map((order, index) => {
            // console.log('order is ', orders.sellOrders)
            return (
              <div className={styles.tableEntry} key={index} onClick={()=>fillOrder(order)}>
                <div className={styles.tableEntryValue}>{order.token0Amount}</div>
                <div className={styles.tableEntryValue} style={{ color: `${order.orderTypeClass}` }}>{order.price}</div>
                <div className={styles.tableEntryValue}>{order.token1Amount}</div>
                {/* <div className={styles.tableEntryValue}>{order.expire.toString()}</div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
