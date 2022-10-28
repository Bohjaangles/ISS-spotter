
const request = require('request');


//  * Makes a single API request to retrieve the user's IP address.
//  * Input:
//  *   - A callback (to pass back an error or the IP string)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The IP address as a string (null if error). Example: "162.245.144.188"



const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when fetching the IP. response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const IP = JSON.parse(body).ip;
    return callback(null, IP);
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request(`http://ipwho.is/${IP}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const geo = JSON.parse(body);
    if (!geo.success) {
      const messagio = `Sucess status was ${geo.success}, server message: ${geo.message}`;
      callback(Error(messagio), null);
      return;
    }
    const { latitude, longitude } = geo;
    return callback(null, { latitude, longitude });
  });
};

let coords = {longitude: -104.6188944, latitude: 50.4452112 };

const flyOverData = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when fetching the IP. response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passTimes = JSON.parse(body).response;
    return callback(null, passTimes);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, IP) => {
    if (error) {
      return callback(error, null);
    }
      fetchCoordsByIP(IP, (error, coords) => {
        if (error) {
          return callback(error, null);
        }
          flyOverData(coords, (error, passTimes) => {
            if (error) {
              return callback(error, null);
            }
            callback(null, passTimes);
          })
      })
  })
};



module.exports = { nextISSTimesForMyLocation, fetchMyIP };