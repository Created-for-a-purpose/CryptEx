import React, { useState, useEffect } from "react";
import {ethers} from 'ethers'
import { useSelector, useDispatch } from "react-redux";
import styles from "./BalanceBox.module.css";
import { loadBalances } from "../redux/interactions";

const BalanceBox = () => {
  const dispatch = useDispatch();
  const provider = useSelector(state => state.provider.connection);
  const symbols = useSelector(state => state.tokens.symbols);
  const tokens = useSelector(state => state.tokens.contracts);
  const trade = useSelector(state => state.trade.contract);
  const account = useSelector(state => state.provider.account);
  const token_balances = useSelector(state => state.tokens.balances);
  const trade_balances = useSelector(state => state.trade.balances);
  const transferProcessing = useSelector(state => state.trade.transferProcessing);
  // console.log('here', transferProcessing)
  useEffect(() => {
    if(account && trade && tokens[0] && tokens[1])
      loadBalances(dispatch, trade, tokens, account)
    
  }, [trade, tokens, account, transferProcessing, dispatch]);

  const [choice, setChoice] = useState("Deposit");
  const [deposits, setDeposit] = useState(['', '']);

  const handleChoice = (e) => {
    setChoice(e.target.innerText);
  };

  const handleInput = (e) => {
    if(e.target.id === '0')
    setDeposit([e.target.value,''])
    else if(e.target.id === '1')
    setDeposit(['', e.target.value])
  };

  const handleSubmit = async (e) => {
    const signer = await provider.getSigner()
    const id = e.target.id;
    let amount;
    try{
     amount = ethers.parseEther(deposits[id])
     if(amount<=0) return
    }catch(err){
      alert('Invalid amount')
      return
    }
    dispatch({ type: 'TRANSFER_REQUEST' })
    try{
    if(choice === 'Deposit'){
        const tx = await tokens[id].connect(signer).approve(trade.target, amount)
        await tx.wait()
        const tx2 = await trade.connect(signer).depositToken(tokens[id].target, amount)
        await tx2.wait()
      }
      else if(choice === 'Withdraw'){
          const tx = await trade.connect(signer).withdrawToken(tokens[id].target, amount)
          await tx.wait()
      }}catch(err){
        alert('Transaction failed');
        dispatch({ type: 'TRANSFER_FAILED' })
      }
      setDeposit(['', '']);
}

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
            <div className={styles.tableHeaderHeading}>CryptEx</div>
          </div>
          {symbols && trade_balances && token_balances &&
          symbols.map((token, index) => {
            return (
              <>
                <div className={styles.tableEntry}>
                  <div className={styles.tableEntryValue}>{token}</div>
                  <div className={styles.tableEntryValue}>
                    {Math.round(token_balances[index]*100)/100}
                  </div>
                  <div className={styles.tableEntryValue}>
                    {Math.round(trade_balances[index]*100)/100}
                  </div>
                </div>
                <div className={styles.depositInput}>
                  <label htmlFor={token} className={styles.label}>{choice} {token}</label>
                  <div className={styles.inputBox}>
                    <input
                      type="text"
                      id={index}
                      value={deposits[index]}
                      onChange={handleInput}
                      className={styles.input}
                      placeholder="Amount"
                    />
                    <button
                      className={styles.button}
                      id={index}
                      onClick={handleSubmit}
                    >{choice}{transferProcessing && 'ing...'}</button>
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
