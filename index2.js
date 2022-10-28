const fetchMyIP = require('./iss-promised');

fetchMyIP()
.then((body) => {
  console.log('sucess!', body);
})
.catch((error) => {
  console.log('fail :(', error);
});