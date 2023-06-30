import { createSelector } from 'reselect';
import { get, groupBy, reject, maxBy, minBy } from 'lodash';
import { ethers } from 'ethers';

const account = state => get(state, 'provider.account');
const allOrders = state => get(state, 'trade.orders', []);
const cancelledOrders = state => get(state, 'trade.cancelledOrders', []);
const tradedOrders = state => get(state, 'trade.tradedOrders', []);
const tokens = state => get(state, 'tokens.contracts');

const openOrders = state=>{
    const all = allOrders(state);
    const cancelled = cancelledOrders(state);
    const traded = tradedOrders(state);
    // console.log('traded', traded)
    const openOrders = reject(all, (order)=>{
        const tradedOrder = traded.some((o)=> o.id.toString()===order.id.toString());
        const cancelledOrder = cancelled.some((o)=>o.id.toString()===order.id.toString());
        
        return(tradedOrder || cancelledOrder);
    })

    return openOrders;
}

const formatTime = (timestamp)=>{
    
// Convert the timestamp to milliseconds
const milliseconds = timestamp * 1000;

// Create a new Date object with the converted milliseconds
const date = new Date(milliseconds);

// Get the various components of the date
const year = date.getFullYear();
const month = date.getMonth() + 1; // Months are zero-based, so add 1
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// Construct the formatted date string
const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
return formattedDate;
}

export const orderBookSelector = createSelector(openOrders, tokens, (orders, tokens)=>{
    if (!tokens[0] || !tokens[1]) { return }
    // console.log('orders', allOrders);
    orders = orders.filter((o)=>o.tokenToSell===tokens[0].target || o.tokenToSell===tokens[1].target)
     orders = orders.filter((o)=>o.tokenToBuy===tokens[0].target || o.tokenToBuy===tokens[1].target)

     orders = modifyOrderbook(orders, tokens);
     orders = groupBy(orders, 'orderType');

     const buyOrders = get(orders, 'buy', []);
     orders ={
        ...orders,
        buyOrders: buyOrders.sort((a,b)=>b.price - a.price)
     }

     const sellOrders = get(orders, 'sell', []);
        orders ={
        ...orders,
        sellOrders: sellOrders.sort((a,b)=>b.price - a.price)
        }

        return orders
})

const modifyOrder = (order, tokens) => {
  let token0Amount, token1Amount, price;

  if(order.tokenToBuy === tokens[0].target){
    token0Amount = parseFloat(ethers.formatUnits(order.amountToBuy, 'ether'));
    token1Amount = Math.round(parseFloat(ethers.formatUnits(order.amountToSell,'ether'))*1000)/1000;
    }else{
    token0Amount = parseFloat(ethers.formatUnits(order.amountToSell,'ether'));
    token1Amount = Math.round(parseFloat(ethers.formatUnits(order.amountToBuy,'ether'))*1000)/1000;
    }
    price = parseFloat(token1Amount/token0Amount);
    // console.log('token1', ethers.formatUnits(order.amountToSell, 'ether'));
    price = Math.round(price*1000000)/1000000;
    
    const time = formatTime(parseInt(order.timestamp.toString()));
    // console.log('type',  token0Amount.toString());

    return({
        ...order,
        token0Amount: token0Amount.toString(),
        token1Amount: token1Amount.toString(),
        price,
        time
    })
}

const modifyOrderbook = (orders, tokens) => {
    
     return(
        orders.map((order)=>{
            order = modifyOrder(order, tokens);
            order = modifyOrderType(order, tokens);
            return(order)
        })
     )
}

const modifyOrderType = (order, tokens) => {
    const orderType = (order[2]===tokens[1].target)?'buy':'sell';
    // console.log(order[2], 'and',tokens[1].target);
    return({
        ...order,
        orderType,
        orderTypeClass: (orderType==='buy'? '#25CE8F' : '#FF4949')
    })
}


//   ------------- Price chart ----------------

export const priceChartSelector = createSelector(
    tradedOrders, tokens, (orders, tokens)=>{
        if(!tokens[0] || !tokens[1] || !orders) {return}
        // console.log('orders', orders)
        orders= orders.filter((o)=>o.tokenToSell===tokens[0].target || o.tokenToSell===tokens[1].target)
        orders= orders.filter((o)=>o.tokenToBuy===tokens[0].target || o.tokenToBuy===tokens[1].target)
        
        orders=orders.sort((a,b)=>{
            const aTime = parseInt(a[7].toString());
            const bTime = parseInt(b[7].toString());
            return(aTime - bTime);
            });
        orders = orders.map((o)=>modifyOrder(o, tokens));
        // console.log('orders', orders)
        orders = groupBy(orders, (o)=>{
            const date = new Date(parseInt(o[7].toString())*1000)
            const hours = date.getHours();
            return hours;
        });
        // console.log('orders2', orders)
        let firstHour = 25
        let lastHour = -1
        Object.keys(orders).forEach((hour)=>{
            hour = parseInt(hour);
            if(hour<firstHour) firstHour = hour;
            if(hour>lastHour) lastHour = hour;
        })
        
        const chartData = Object.keys(orders).map((hour)=>{
            const group = orders[hour];

            // o,h,l,c
           const open = group[0];
           const high = maxBy(group, 'price');
           const low = minBy(group, 'price');
           const close = group[group.length-1];
        //    console.log('hour', group)
           return({
            x: new Date(parseInt(hour)*1000),
            y: [open.price, high.price, low.price, close.price]
           })
        })
        
        const firstOrder = (firstHour===25)?null:orders[firstHour][0]
        const firstPrice = get(firstOrder, 'price', 0);
        const lastOrder = (lastHour===-1)?null:orders[lastHour][orders[lastHour].length-1]
        const lastPrice = get(lastOrder, 'price', 0);
        // console.log(firstHour, lastHour)

        return ({
            lastPrice,
            netChange: (lastPrice - firstPrice),
            series: [{
                data: chartData
            }]
        })
    }
)


// --------- Traded orders ----------------

export const tradedOrdersSelector = createSelector(tradedOrders, tokens, 
    (orders, tokens)=>{
        if(!tokens[0] || !tokens[1] || !orders) {return}
        orders= orders.filter((o)=>o.tokenToSell===tokens[0].target || o.tokenToSell===tokens[1].target)
        orders= orders.filter((o)=>o.tokenToBuy===tokens[0].target || o.tokenToBuy===tokens[1].target)
        
        orders=orders.sort((a,b)=>{
            const aTime = parseInt(a[7].toString());
            const bTime = parseInt(b[7].toString());
            return(aTime - bTime);
            });
        orders = modifyTradedOrders(orders, tokens);
        orders=orders.sort((a,b)=>{
            // console.log('a', a[7]);
            const aTime = parseInt(a[7].toString());
            const bTime = parseInt(b[7].toString());
            return(bTime - aTime);
            });

        return orders;
})

const modifyTradedOrders = (orders, tokens) => {
    let prevOrder = orders[0];

    orders = orders.map((order)=>{
        order = modifyOrder(order, tokens);
        order = modifyTradedOrder(order, prevOrder);
        prevOrder = order;
        return order;
    })

    return orders;
}

const modifyTradedOrder = (order, prevOrder) => {
    const tradeColor = (order.price >= prevOrder.price)?'#25CE8F' : '#FF4949';
    return({
        ...order,
        tradeClass: tradeColor
    })
}

// ------------- My orders ----------------

export const myOrdersSelector = createSelector(account, openOrders, tokens, (account, orders, tokens)=>{
     if(!tokens[0] || !tokens[1]) {return}
     orders = orders.filter((o)=>o.user===account);
     orders = orders.filter((o)=>o.tokenToSell===tokens[0].target || o.tokenToSell===tokens[1].target)
     orders = orders.filter((o)=>o.tokenToBuy===tokens[0].target || o.tokenToBuy===tokens[1].target)

     orders = orders.map((order)=>{
          order = modifyOrder(order, tokens);
          order = modifyOrderType(order, tokens);
          return (order)
     })
     
     orders=orders.sort((a,b)=>{
        const aTime = parseInt(a[6]);
        const bTime = parseInt(b[6]);
        return(bTime - aTime);
        });

     return orders;
})

// ------------- My traded orders ----------------

export const myTradedOrdersSelector = createSelector(account, tradedOrders, tokens, (account, orders, tokens)=>{
     if(!tokens[0] || !tokens[1]) {return}

     orders = orders.filter((o)=>o.maker===account || o.taker===account);
     orders = orders.filter((o)=>o.tokenToSell===tokens[0].target || o.tokenToSell===tokens[1].target)
     orders = orders.filter((o)=>o.tokenToBuy===tokens[0].target || o.tokenToBuy===tokens[1].target)

     orders=orders.sort((a,b)=>{
        const aTime = parseInt(a[6]);
        const bTime = parseInt(b[6]);
        return(aTime - bTime);
        });

     orders = orders.map((order)=>{
          order = modifyOrder(order, tokens);
          order = modifyMyTradedOrder(order, tokens, account);
          return (order)
     })
     
     return orders;
})

const modifyMyTradedOrder = (order, tokens, account) => {
const isMine = (order[1]===account);

let orderType;
if(isMine){
    orderType = (order[3]===tokens[0].target)?'sell':'buy';
}else{
    orderType = (order[3]===tokens[0].target)?'buy':'sell';
}
// console.log('orderType', order[3], tokens[0].target)
return({
    ...order,
    orderType,
    orderTypeClass: (orderType==='buy'? '#25CE8F' : '#FF4949'),
    orderTypeRev: (orderType==='buy'? '#FF4949' : '#25CE8F'),
    sign: (orderType==='buy'? '+' : '-')
})

}