import React from "react";
import styles from "./Trade.module.css";

const Trade = ({ transactions }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Trade</div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderHeading}>Time</div>
          <div className={styles.tableHeaderHeading}>PPT</div>
          <div className={styles.tableHeaderHeading}>PPT/ETH</div>
        </div>
        <div className={styles.tableData}>
          {transactions.map((token) => {
            return (
              <div className={styles.tableEntry} key={token.time}>
                <div className={styles.tableEntryValue}>{token.time}</div>
                <div className={styles.tableEntryValue}>{token.ppt}</div>
                <div className={styles.tableEntryValue}>{token.ratio}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trade;
