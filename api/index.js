const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://apisearch.topgear.com.ph/topgear/v1/buyers-guide/search-vehicles/motorcycle?keywords=honda&filterType=vehicle_name&match=wildcard',
  headers: { 
    'Origin': 'https://www.topgear.com.ph'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});