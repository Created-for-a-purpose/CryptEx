import styles from './PriceChart.module.css'
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts'
import { options, series } from './PriceChart.config'
import { priceChartSelector } from '../redux/selectors';
import up from '../assets/images/up.svg'
import down from '../assets/images/down.svg'

const PriceChart = ()=>{
    const account = useSelector(state => state.provider.account);
    const symbols = useSelector(state=>state.tokens.symbols)
    const priceChart = useSelector(priceChartSelector);
    
    return(
  <div className={styles.container}>
    { !account && <h1 className={styles.placeholder}>Connect to Metamask !</h1>}
    {symbols && symbols[0]&& symbols[1]&&
    <div className={styles.header}>
    <div className={styles.header}>{symbols[0]} / {symbols[1]}</div>
    {priceChart && <div className={styles.header}>{priceChart.lastPrice}</div>}
    {(priceChart.netChange) >= 0?(<img src={up} alt='up'/>):(<img src={down} alt='down'/>)}
    </div>}

{account &&
<Chart
            options={options}
            series={ (priceChart&&priceChart.series&&
              priceChart.series[0].data.length!==0)?priceChart.series
                :series}
            type="candlestick"
            width="100%"
            height="90%"
        />}

  </div>
    );
}

export default PriceChart;