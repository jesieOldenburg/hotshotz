'use strict';

var firebase = require('firebase');

require('firebase/database');

var config = {
  apiKey: "AIzaSyBDourGEc2oTUogyCiWfkAQG1Sjdi3L0KU",
  authDomain: "hotshotz.firebaseapp.com",
  databaseURL: "https://hotshotz.firebaseio.com",
  projectId: "hotshotz",
  storageBucket: "hotshotz.appspot.com",
  messagingSenderId: "25983931155"
};
firebase.initializeApp(config);
module.exports = {
  firebase: firebase
};
//# sourceMappingURL=fb_config.js.map
