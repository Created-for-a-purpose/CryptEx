import React, { useState } from "react";
import styles from "./BuySellBox.module.css";

const BuySellBox = ({ tokens }) => {
  const [choice, setChoice] = useState("Buy Order");
  const [order, setorder] = useState({});

  const handleChoice = (e) => {
    setChoice(e.target.innerText);
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setorder({ ...order, [id]: value });
  };

  const handleSubmit = () => {
    console.log(order);
  };

  const fields = [
    { label: `Amount to ${choice === 'Buy Order'? 'Buy' : 'Sell'}`, id: "Amount" },
    { label: "Price", id: "Price" },
    { label: "Total", id: "Total" },
    { label: "Expires", id: "Expires" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>Buy/Sell</div>
      <div className={styles.choices}>
        <div
          onClick={handleChoice}
          className={`${styles.choice} ${
            choice === "Buy Order" ? styles.active : ""
          }`}
        >
          Buy Order
        </div>
        <div
          onClick={handleChoice}
          className={`${styles.choice} ${
            choice !== "Buy Order" ? styles.active : ""
          }`}
        >
          Sell Order
        </div>
      </div>
      <div className={styles.form}>
        {fields.map((field) => {
          return (
            <div className={styles.inputBox}>
              <label htmlFor={field.id} className={styles.label}>
                {field.label}
              </label>
              <input
                type="text"
                id={field.id}
                value={order[field.id]}
                onChange={handleInput}
                className={styles.input}
              />
            </div>
          );
        })}
        <div className={styles.buttonBox}>
          <button onClick={handleSubmit} className={styles.button}>
            {choice}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuySellBox;
