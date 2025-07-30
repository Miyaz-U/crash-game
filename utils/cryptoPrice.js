const axios = require('axios');

async function fetchBTCPrice() {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr'
    );
    return response.data.bitcoin.inr;
  } catch (err) {
    console.error('❌ Error fetching BTC price:', err.message);
    return null;
  }
}

module.exports = fetchBTCPrice;