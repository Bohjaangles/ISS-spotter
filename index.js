const { fetchMyIP, fetchCoordsByIP, IP, flyOverData, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP(IP, (error, data) => {
//   if (error) {
//     console.log(`Error: ${error}`);
//   }
//   console.log(`it worked! latitude: ${data.latitude}, longitude: ${data.longitude} `);
// });

// let longzz = -104.6188944;
// let latzz = 50.4452112;

// flyOverData(longzz, latzz, (error, flydata) => {
//   if(error) {
//     console.log('error: ', error);
//   }
//   console.log('success! :', flydata);
// })

const printPassTimes = (passTimes) => {
  for(const times of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(times.risetime);
    const duration = times.duration;
    console.log(`Next pass will take place at ${datetime} for ${duration} seconds`);
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});