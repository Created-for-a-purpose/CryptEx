import React from "react";
import styles from "./Navbar.module.css";
import logo from '../assets/images/logo.png';

const Navbar = (props) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="CryptEx Logo" className={styles.logo} />
        <div className={styles.dropdown}>
          <select className={styles.dropdownContent}>
            <option>------Select from below------</option>
            <option>BTC</option>
          </select>
        </div>
        <div className={styles.dropdown}>
          <select className={styles.dropdownContent}>
            <option>------Select from below------</option>
            <option value="ETH">ETH</option>
          </select>
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.connectButton}>Connect</button>
      </div>
    </nav>
  );
};

export default Navbar;
