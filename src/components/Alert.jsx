import styles from './Alert.module.css'
import { useSelector, useDispatch } from 'react-redux'

const Alert = ()=>{
  const transferring = useSelector(state => state.trade.transferProcessing);
  const invalidAmount = useSelector(state => state.trade.entryInvalid);
  const bookFailed = useSelector(state => state.trade.bookFailed);
  const fillFailed = useSelector(state => state.trade.fillFailed);
  const dispatch = useDispatch()
  if(invalidAmount){
    setTimeout(()=>{
        dispatch({ type: 'ALERTED_INVALID_AMOUNT'})
    }, 1500)
  }
    if(bookFailed){
    setTimeout(()=>{
        dispatch({ type: 'ALERTED_BOOK_FAILED'})
    }, 1500)
    }
    if(fillFailed){
    setTimeout(()=>{
        dispatch({ type: 'ALERTED_FILL_FAILED'})
    }, 1500)
    }

 return(
    <>
    {(transferring || invalidAmount || bookFailed || fillFailed) &&
    <div className={`${styles.alert}`}>
    {transferring && <span>Transferring...</span>}
    {invalidAmount && <span>Invalid amount !</span>}
    {bookFailed && <span>Failed to book order !</span>}
    {fillFailed && <span>Failed to fill order !</span>}
  </div>}
  </>
 )
}

export default Alert;