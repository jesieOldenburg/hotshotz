'use strict';

console.log('api calls is here'); // var database = firebase.database();

var $ = require('jquery');

var firebase = require('./fb_config');

var url = 'https://hotshotz.firebaseio.com/';

function getData(url) {
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: function success(response) {
      console.log(JSON.parse(response));
    }
  });
}

function postData(url) {}

postData(url); // getData(url);
// function api_Calls(url) {
//     console.log("we are in the api call function");
//     return new Promise(function(resolve, reject) {
//         let request = new XMLHttpRequest();
//         request.onload = function() {
//             if (request.status === 200) {
//                 let data = JSON.parse(request.responseText);
//                 console.log("data from request", data);
//                 resolve("INSERT FUNCTION NAME HERE>>>", (data));
//             } else {
//                 reject(new Error("XMLHttpRequest Error", request.statusText));
//             }
//         };
//         request.open('GET', url);
//         request.send();
//     });
// }
// api_Calls(url);
//# sourceMappingURL=apiCalls.js.map
