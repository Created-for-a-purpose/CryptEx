import React, { useState } from "react";
import { useSelector } from "react-redux";
import { myOrdersSelector, myTradedOrdersSelector } from "../redux/selectors";
import styles from "./Transactions.module.css";

const Transactions = () => {
  const [choice, setChoice] = useState("Transactions");
  const myOrders = useSelector(myOrdersSelector);
  const myTradedOrders = useSelector(myTradedOrdersSelector)
  const symbols = useSelector((state) => state.tokens.symbols);
  const provider = useSelector(state => state.provider.connection);
  const trade = useSelector(state => state.trade.contract);

  const handleChoice = (e) => {
    setChoice(e.target.innerText);
  };

  const cancelOrder = async (order) => {
    try{
    const signer = await provider.getSigner();
    const id=order[0];
    const tx = await trade.connect(signer).cancelOrder(id)
    await tx.wait()
    }catch(err){
      alert('Error cancelling order')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>My Transactions</div>
      <div className={styles.choices}>
        <div
          onClick={handleChoice}
          className={`${styles.choice} ${
            choice !== "Transactions" ? styles.active : ""
          }`}
        >
          Orders
        </div>
        <div
          onClick={handleChoice}
          className={`${styles.choice} ${
            choice === "Transactions" ? styles.active : ""
          }`}
        >
          Transactions
        </div>
      </div>
      <div className={styles.table}>
        {/* choice 1 */}
      {choice==='Orders' && <><div className={styles.tableHeader}>
          <div className={styles.tableHeaderHeading}>Type</div>
          {symbols && <div className={styles.tableHeaderHeading}>{symbols[0]}</div>}
          {symbols && symbols[1] &&<div className={styles.tableHeaderHeading}>{symbols[1]}</div>}
          {symbols && symbols[1] &&<div className={styles.tableHeaderHeading}>{symbols[0]}/{symbols[1]}</div>}
          <div className={styles.tableHeaderHeading}>Time</div>
          <div className={styles.tableHeaderHeading}>Action</div>
        </div>
        <div className={styles.tableData}>
          {myOrders && myOrders.map((order, index) => {
            return (
              <div className={styles.tableEntry} key={index}>
                <div className={styles.tableEntryValue}>{order.orderType}</div>
                <div className={styles.tableEntryValue}>{order.token0Amount}</div>
                <div className={styles.tableEntryValue}>{order.token1Amount}</div>
                <div className={styles.tableEntryValue} style={{ color: `${order.orderTypeClass}` }}>{order.price}</div>
                <div className={styles.tableEntryValue}>{order.time}</div>
                <div className={styles.tableEntryValue}><button className={styles.button} onClick={()=>cancelOrder(order)}>Cancel</button></div>
              </div>
            );
          })}
        </div>
      </>}
       {/* choice 2 */}
      {choice==='Transactions' && <><div className={styles.tableHeader}>
          <div className={styles.tableHeaderHeading}>Time</div>
          {symbols && <div className={styles.tableHeaderHeading}>{symbols[0]}</div>}
          {symbols && symbols[1] &&<div className={styles.tableHeaderHeading}>{symbols[1]}</div>}
          {symbols && symbols[1] &&<div className={styles.tableHeaderHeading}>{symbols[0]}/{symbols[1]}</div>}
        </div>
        <div className={styles.tableData}>
          {myTradedOrders && myTradedOrders.map((order, index) => {
            return (
              <div className={styles.tableEntry} key={index}>
                <div className={styles.tableEntryValue}>{order.time}</div>
                <div className={styles.tableEntryValue} style={{ color: `${order.orderTypeClass}` }}>{order.sign}{order.token0Amount}</div>
                <div className={styles.tableEntryValue} style={{color: `${order.orderTypeRev}`}}>{(order.orderType==='buy'?'- ':'+ ')}{order.token1Amount}</div>
                <div className={styles.tableEntryValue}>{order.price}</div>
              </div>
            );
          })}
        </div>
      </>}

     </div>
    </div>
  );
};

export default Transactions;
