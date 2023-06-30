import { legacy_createStore as createStore, combineReducers } from 'redux';
import { provider, tokens, trade } from './reducers';

const reducers = combineReducers({
  provider,
  tokens,
  trade
});

const initialState = {}
const store = createStore(reducers, initialState);
export default store;