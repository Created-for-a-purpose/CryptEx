import React from "react";
import styles from "./Trade.module.css";
import { useSelector } from "react-redux";
import { tradedOrdersSelector } from "../redux/selectors";

const Trade = () => {
  const tradedOrders = useSelector(tradedOrdersSelector);
  const symbols = useSelector((state) => state.tokens.symbols);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Trade</div>
      <div className={styles.table}>
        { symbols && symbols[0] && symbols[1] &&
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderHeading}>Time</div>
          <div className={styles.tableHeaderHeading}>{symbols[0]}</div>
          <div className={styles.tableHeaderHeading}>{symbols[0]}/{symbols[1]}</div>
        </div>}
        <div className={styles.tableData}>
          {tradedOrders && tradedOrders.map((order, index) => {
            return (
              <div className={styles.tableEntry} key={index}>
                <div className={styles.tableEntryValue}>{order.time}</div>
                <div className={styles.tableEntryValue}>{order.token0Amount}</div>
                <div className={styles.tableEntryValue}>{order.price}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trade;
