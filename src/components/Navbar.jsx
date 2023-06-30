import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Navbar.module.css";
import logo from '../assets/images/cryptex.png';
import { loadAccount, loadTokens } from "../redux/interactions";
import config from '../config.json';

const Navbar = () => {
  const account = useSelector((state) => state.provider.account);
  const provider = useSelector((state) => state.provider.connection);
  const balance = useSelector((state) => state.provider.balance);
  const chainId = useSelector((state) => state.provider.chainId);
  const dispatch = useDispatch();

  const connectHandler = async () => {
      await loadAccount(dispatch, provider)
  }

  const networkHandler = async (e) => {
    if(e.target.value === '0') return
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: e.target.value }],
    });
  }

  const tokenHandler = async (e) => {
    if(e.target.value === '0') return
    loadTokens(dispatch, provider, e.target.value.split(','));
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="CryptEx Logo" className={styles.logo} />
        <div className={styles.dropdown}>
          { chainId && config[chainId] &&
          <select className={styles.dropdownContent} onChange={tokenHandler}>
            <option value='0'>Select Token Pair</option>
            <option value={`${config[chainId].EthCoins.address},${config[chainId].StellarCoins.address}`}>ETC/STC </option>
            <option value={`${config[chainId].EthCoins.address},${config[chainId].Martian.address}`}>ETC/MTI </option>
          </select>
          }  
        </div>
        <div className={styles.dropdown}>
          <select className={styles.dropdownContent} onChange={networkHandler}
                 value={config[chainId]?('0x'+chainId.toString(16)):'0'}> 
            <option value='0'>Select Network</option>
            <option value='0xaa36a7'>Sepolia Testnet</option>
            <option value='0x7a69'>Localhost</option>
            <option value='0x5a2' disabled>Polygon zkEVM Testnet</option>
          </select>
        </div>
      </div>
      
      <div className={styles.right}>
        {account && (<><a href={config[chainId]?`${config[chainId].blockExplorer}/address/${account}`:'#'}
                          target="_blank" rel="noreferrer">
          {account.slice(0,5)+'...'+account.slice(38,42)}</a><p>&nbsp;{'||'}</p>
          <small className={styles.balance}>&nbsp;{parseFloat(balance).toFixed(4)} ETH</small></>)
        }
        { !account &&
        <button className={styles.connectButton} onClick={connectHandler}>Connect Metamask</button>
        }
      </div>
    </nav>
  );
};

export default Navbar;
