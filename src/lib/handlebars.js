const {format} = require('timeago.js');


const helpers = {};

// helper para convertir la hora, en hora legible

helpers.timeago = (timestamp) => {
   return format(timestamp);  
};



module.exports = helpers;  