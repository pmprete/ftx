import axios from 'axios'
import hmacSHA256 from 'crypto-js/hmac-sha256';


// https://docs.ftx.com/?javascript#get-markets
async function getMarketPrice(market) {
    try {
      const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}/api/markets/${market}`);
      console.log(response);
      //Take result?.price
    } catch (error) {
      console.error(error);
    }
    return response;
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

// https://docs.ftx.com/?javascript#get-options-positions
async function getOptionsPosition() {
    const ts = Date.now();
    const path_url = '/api/options/positions';
    const signature_payload = `${ts}GET${path_url}`;
    const signature = hmacSHA256(signature_payload, process.env.VUE_APP_API_SECRET).toString();
    const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}${path_url}`, {
      headers: {
        'FTX-KEY': process.env.VUE_APP_API_KEY,
        'FTX-SIGN': signature,
        'FTX-TS': ts.toString(),
        'FTX-SUBACCOUNT': process.env.VUE_APP_API_SUBACCOUNT
      }
    });
    return response.data.result;
}

async function getAccountInformation() {
  const ts = Date.now();
  const path_url = '/api/account';
  const signature_payload = `${ts}GET${path_url}`;
  const signature = hmacSHA256(signature_payload, process.env.VUE_APP_API_SECRET).toString();
  const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}${path_url}`, {
    headers: {
      'FTX-KEY': process.env.VUE_APP_API_KEY,
      'FTX-SIGN': signature,
      'FTX-TS': ts.toString(),
      'FTX-SUBACCOUNT': process.env.VUE_APP_API_SUBACCOUNT
    }
  });
  return response.data.result;
}

async function get24hOptionVolume() {
    try {
      const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}/api/stats/24h_options_volume`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    return response;
}

// async function getOpenOrders() {
//     try {
//       const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}/api/orders`);
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//     return response;
// }

// // https://docs.ftx.com/?javascript#get-order-history
// async function getOrdersHistory() {
//     try {
//       const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}/api/orders/history`);
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//     return response;
// }

// async function getLimitOrdersHistory() {
//     try {
//       const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}/api/conditional_orders/history`);
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//     return response;
// }

// async function getOpenOrdersByClientId(clientId) {
//     try {
//       const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}/api/orders/by_client_id/${clientId}`);
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//     return response;
// }

//  async function getOpenOrdersByClientId(clientId) {
//     try {
//       const response = await axios.get(`${process.env.VUE_APP_ENDPOINT_URL}/api/orders/by_client_id/${clientId}`);
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//     return response;
// }

export default {
  getMarketPrice,
  getBtcPrice,
  getEthPrice,
  getUsdtPrice,
  getOptionsPosition,
  getAccountInformation,
  get24hOptionVolume,
}