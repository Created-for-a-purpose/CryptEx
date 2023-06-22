import React, { useState } from "react";
import styles from "./BalanceBox.module.css";

const BalanceBox = ({tokens}) => {
  const [choice, setChoice] = useState("Deposit");
  const [deposit, setDeposit] = useState({});

  const handleChoice = (e) => {
    setChoice(e.target.innerText);
  };

  const handleInput = (e) => {
    setDeposit({ value: e.target.value, token: e.target.id });
  };

  const handleSubmit = () => {
    console.log(deposit);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Balance</div>
      <div className={styles.choices}>
        <div
          onClick={handleChoice}
          className={`${styles.choice} ${choice === "Deposit" ? styles.active : ""}`}
        >
          Deposit
        </div>
        <div
          onClick={handleChoice}
          className={`${styles.choice} ${choice !== "Deposit" ? styles.active : ""}`}
        >
          Withdraw
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderHeading}>Token</div>
            <div className={styles.tableHeaderHeading}>Wallet</div>
            <div className={styles.tableHeaderHeading}>DeTEx</div>
          </div>
          {tokens.map((token) => {
            return (
              <>
                <div className={styles.tableEntry} key={token.Token}>
                  <div className={styles.tableEntryValue}>{token.token}</div>
                  <div className={styles.tableEntryValue}>
                    {token.wallet}
                  </div>
                  <div className={styles.tableEntryValue}>
                    {token.DeTEx}
                  </div>
                </div>
                <div className={styles.depositInput}>
                  <label htmlFor={token.token} className={styles.label}>Deposit {token.token}</label>
                  <div className={styles.inputBox}>
                    <input
                      type="text"
                      id={token.token}
                      value={deposit.value}
                      onChange={handleInput}
                      className={styles.input}
                      placeholder="Amount"
                    />
                    <button
                      className={styles.button}
                      onClick={handleSubmit}
                    >{choice}</button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BalanceBox;
