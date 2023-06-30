import React, { useState } from "react";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import styles from "./BuySellBox.module.css";

const BuySellBox = () => {
  const [choice, setChoice] = useState("Buy Order");
  const [order, setorder] = useState({});
  const provider = useSelector(state => state.provider.connection);
  const tokens = useSelector(state => state.tokens.contracts);
  const trade = useSelector(state => state.trade.contract);
  const dispatch = useDispatch();

  const handleChoice = (e) => {
    setChoice(e.target.innerText);
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setorder({ ...order, [id]: value });
    // console.log(order);
  };

  const handleSubmit = async () => {
    const signer = await provider.getSigner();
    let tokenToSell, tokenToBuy, amountToBuy, amountToSell;

    if(choice === 'Buy Order'){
       tokenToSell = tokens[1].target;
       tokenToBuy = tokens[0].target;
       try{
       amountToBuy = ethers.parseEther(order.Amount);
       amountToSell = ethers.parseEther((parseFloat(order.Amount)*parseFloat(order.Price)).toString());}
       catch(err){dispatch({type: 'INVALID_AMOUNT'});
         return}
    }

    else{
       tokenToBuy = tokens[1].target;
       tokenToSell = tokens[0].target;
       try{
       amountToSell = ethers.parseEther(order.Amount);
       amountToBuy = ethers.parseEther((parseFloat(order.Amount)*parseFloat(order.Price)).toString());}
       catch(err){dispatch({type: 'INVALID_AMOUNT'}); return}
    }
    if(amountToBuy<=0 || amountToSell<=0){return}
    
    try{
    const tx = await trade.connect(signer).makeOrder(tokenToSell, amountToSell, tokenToBuy, amountToBuy);
    await tx.wait();
    }catch(err){dispatch({type: 'BOOK_FAILED'})}
    setorder({ Amount: "", Price: "", Expires: "" });
  };

  const fields = [
    { label: `Amount to ${choice === 'Buy Order'? 'Buy' : 'Sell'}`, id: "Amount" },
    { label: "Price", id: "Price" },
    { label: "Expires", id: "Expires" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>Buy / Sell</div>
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
        {fields.map((field, index) => {
          return (
            <div className={styles.inputBox} key={index}>
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
          {/* <hr/> */}
        </div>
      </div>
    </div>
  );
};

export default BuySellBox;
