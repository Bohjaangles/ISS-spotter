const request = require('request-promise-native');



const fetchMyIP = () => {
  return require('https://api.ipify.org?format=json');
}

module.exports = fetchMyIP;


