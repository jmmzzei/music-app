const fetch = require('node-fetch')

exports.handler = function (event, context, callback) {
  console.log(0)
    callback(null, { 
       statusCode: 200, 
        body: "Hello World" 
    });
}
