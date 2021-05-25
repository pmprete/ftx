import axios from 'axios'
import hmacSHA256 from 'crypto-js/hmac-sha256';


// https://docs.ftx.com/?javascript#get-markets
async function getMarketPrice(market) {
    try {
      const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}/api/markets/${market}`);
      //Take result?.price
      return response.data.result;
    } catch (error) {
      console.error(error);
    }
}

async function getBtcPrice() {
    return getMarketPrice('BTC/USD');
}

async function getEthPrice() {
    return getMarketPrice('ETH/USD');
}

async function getUsdtPrice() {
    return getMarketPrice('USDT/USD');
}

function createHeaders(ts, signature) {
  return {
      headers: {
        'FTX-KEY': process.env.VUE_APP_API_KEY,
        'FTX-SIGN': signature,
        'FTX-TS': ts.toString(),
        'FTX-SUBACCOUNT': process.env.VUE_APP_API_SUBACCOUNT,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }
}

async function getFromFTX(path_url) {
  const ts = Date.now();
  const signature_payload = `${ts}GET${path_url}`;
  const signature = hmacSHA256(signature_payload, process.env.VUE_APP_API_SECRET).toString();
  const headers = createHeaders(ts, signature);
  const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}${path_url}`, headers);
  return response.data.result;
}

// https://docs.ftx.com/?javascript#get-options-positions
async function getOptionsPosition() {
    const path_url = '/api/options/positions';
    return getFromFTX(path_url);
}

// https://docs.ftx.com/#get-account-information
async function getAccountInformation() {
  const path_url = '/api/account';
  return getFromFTX(path_url);
}

// Same positions that comes from Account Information
// https://docs.ftx.com/#get-positions
async function getPositions() {
  const path_url = '/api/positions';
  return getFromFTX(path_url);
}

// https://docs.ftx.com/#get-open-orders
async function getOpenOrders(market) {
  const path_url = market ? `/api/orders?market=${market}` : '/api/orders';
  return getFromFTX(path_url);
}

async function getOrderStatus(orderId) {
  const path_url = `/api/orders/${orderId}`;
  return getFromFTX(path_url);
}

// // https://docs.ftx.com/?javascript#get-order-history
async function getOrdersHistory() {
  const path_url = '/api/orders/history';
  return getFromFTX(path_url);
}

async function getLimitOrdersHistory() {
  const path_url = '/api/conditional_orders/history';
  return getFromFTX(path_url);
}

async function getBalances() {
  const path_url = '/api/wallet/balances';
  return getFromFTX(path_url);
}


export default {
  getMarketPrice,
  getBtcPrice,
  getEthPrice,
  getUsdtPrice,
  getAccountInformation,
  getOrdersHistory,
  getOrderStatus,
  getBalances,

  getPositions,
  getLimitOrdersHistory,
  getOpenOrders,
  getOptionsPosition,
}