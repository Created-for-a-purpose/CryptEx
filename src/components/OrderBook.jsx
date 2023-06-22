import React, { useState } from "react";
import styles from "./OrderBook.module.css";

const OrderBook = ({ orders }) => {
  const [choice, setChoice] = useState("Buy Orders");

  const handleChoice = (e) => {
    setChoice(e.target.innerText);
  };

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
          <div className={styles.tableHeaderHeading}>PPT</div>
          <div className={styles.tableHeaderHeading}>PPT/ETH</div>
          <div className={styles.tableHeaderHeading}>ETH</div>
        </div>
        <div className={styles.tableData}>
          {orders.map((token) => {
            return (
              <div className={styles.tableEntry} key={token.ppt}>
                <div className={styles.tableEntryValue}>{token.ppt}</div>
                <div className={styles.tableEntryValue}>{token.ratio}</div>
                <div className={styles.tableEntryValue}>{token.eth}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
