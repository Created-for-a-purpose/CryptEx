import React, { useState } from "react";
import styles from "./Transactions.module.css";

const Transactions = ({ transactions }) => {
  const [choice, setChoice] = useState("Transactions");

  const handleChoice = (e) => {
    setChoice(e.target.innerText);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Your Transactions</div>
      <div className={styles.choices}>
        <div
          onClick={handleChoice}
          className={`${styles.choice} ${
            choice === "Transactions" ? styles.active : ""
          }`}
        >
          Transactions
        </div>
        <div
          onClick={handleChoice}
          className={`${styles.choice} ${
            choice !== "Transactions" ? styles.active : ""
          }`}
        >
          Orders
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderHeading}>Transaction</div>
          <div className={styles.tableHeaderHeading}>Type</div>
          <div className={styles.tableHeaderHeading}>PPT</div>
          <div className={styles.tableHeaderHeading}>ETH</div>
          <div className={styles.tableHeaderHeading}>PPT/ETH</div>
        </div>
        <div className={styles.tableData}>
          {transactions.map((token) => {
            return (
              <div className={styles.tableEntry} key={token.transaction}>
                <div className={styles.tableEntryValue}>{token.transaction}</div>
                <div className={styles.tableEntryValue}>{token.type}</div>
                <div className={styles.tableEntryValue}>{token.ppt}</div>
                <div className={styles.tableEntryValue}>{token.eth}</div>
                <div className={styles.tableEntryValue}>{token.ratio}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
