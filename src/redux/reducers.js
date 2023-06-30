export const provider = (state={}, action)=>{
    switch(action.type){
        case 'LOADED_PROVIDER':
            return {
                ...state,
                connection: action.connection,
            };
        
        case 'LOADED_ACCOUNT':
            return {
                ...state,
                account: action.account,
            }

        case 'LOADED_NETWORK':
            return {
                ...state,
                chainId: action.chainId,
            }

        case 'LOADED_BALANCE':
            return {
                ...state,
                balance: action.balance,
            }

        default:
            return state;
    }
}

export const tokens = (state={contracts:[], loaded: false, symbols:[]}, action)=>{
    switch(action.type){
        case 'LOADED_TOKEN_1':
            return {
                ...state,
                contracts: [action.token],
                symbols: [action.symbol],
                loaded: true,
            }
        case 'LOADED_TOKEN_2':
           return{
                ...state,
                contracts: [...state.contracts,action.token],
                symbols: [...state.symbols, action.symbol],
                loaded: true,
           }
        case 'LOADED_TOKEN_1_BALANCE':
            return {
                ...state,
                balances: [action.balance],
            }
        case 'LOADED_TOKEN_2_BALANCE':
            return {
                ...state,
                balances: [...state.balances, action.balance],
            }
            
        default:    
            return state;
    }        

}

export const trade = (state={contract: null, loaded:false, transferProcessing: false, orders:[], events:[]}, action)=>{
    let index, data;
    switch(action.type){
        case 'LOADED_TRADE':
            return {
                ...state,
                loaded: true,
                contract: action.trade,
            }
        case 'LOADED_TRADE_BALANCE_1':
            return {
                ...state,
                balances: [action.balance],
            }
        case 'LOADED_TRADE_BALANCE_2':
            return {
                ...state,
                balances: [...state.balances, action.balance],
            }
        case 'TRANSFER_REQUEST':
            return{
                ...state,
                transferProcessing: true
            }
        case 'TRANSFER_MADE':
            return{
                ...state,
                transferProcessing: false,
                events: [action.event, ...state.events]
            }
        case 'TRANSFER_FAILED':
            return{
                ...state,
                transferProcessing: false,
            }
        case 'ORDER_MADE':
            index = state.orders.findIndex(order=>order.id.toString() === action.order.id.toString());
            if(index===-1){
                data  = [...state.orders, action.order];
            }
            else{
                data = [...state.orders];
            }
            return{
                ...state,
                orders: data,
            }
        case 'ORDER_CANCELLED':
             return{
                ...state,
                cancelledOrders: [...state.cancelledOrders, action.order],
             }
        case 'ORDER_TRADED':
            let tradedData;
            index=state.tradedOrders.findIndex(order=>order.id.toString() === action.order.id.toString());
            console.log('index',index)
            if(index===-1){
                tradedData = [...state.tradedOrders, action.order];
            }
            else{
                tradedData = [...state.tradedOrders];
            }
            return{
                ...state,
                tradedOrders: tradedData,
            }
        case 'LOADED_CANCELLED_ORDERS':
            return {
                ...state,
                cancelledOrders: action.cancelledOrders,
            }
        case 'LOADED_TRADED_ORDERS':
            return {
                ...state,
                tradedOrders: action.tradedOrders,
            }
        case 'LOADED_ALL_ORDERS':
            return {
                ...state,
                orders: action.allOrders,
            }
        // Alerts
        case 'INVALID_AMOUNT':
            return {
                ...state,
                entryInvalid: true,
            }
        case 'ALERTED_INVALID_AMOUNT':
            return {
                ...state,
                entryInvalid: false,
            }
        case 'BOOK_FAILED':
            return {
                ...state,
                bookFailed: true,
            }
        case 'ALERTED_BOOK_FAILED':
            return {
                ...state,
                bookFailed: false,
            }
        case 'FILL_FAILED':
            return {
                ...state,
                fillFailed: true,
            }
        case 'ALERTED_FILL_FAILED':
            return {
                ...state,
                fillFailed: false,
            }
        default:
            return state;
    }
}