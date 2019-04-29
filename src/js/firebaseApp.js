'use strict';
var $ = require('jquery');
var moment = require('moment');
var firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

var config = {
    apiKey: "AIzaSyBDourGEc2oTUogyCiWfkAQG1Sjdi3L0KU",
    authDomain: "hotshotz.firebaseapp.com",
    databaseURL: "https://hotshotz.firebaseio.com",
    projectId: "hotshotz",
    storageBucket: "hotshotz.appspot.com",
    messagingSenderId: "25983931155"
};

firebase.initializeApp(config);
var auth = firebase.auth();

var db = firebase.firestore();

firebase.getFBsettings = function(config) {
    console.log("getFBsettings", config);
    return config;
};

// End firebase configuration ....

var eventObj = {
    date: '',
    desc: '',
    title: ''
};

$('#submit-event').on('click', (e, obj) => {
    e.preventDefault();
    var currentDate = $('#date-picker').val();
    currentDate = moment().format(currentDate);
    console.log(currentDate);
    var eventTitle = $('#event-title').val();
    var eventDesc = $('#event-description').val();

    eventObj.desc = eventDesc;
    eventObj.title = eventTitle;
    eventObj.date = currentDate;

    db.collection("events").add({
            eventObj
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
});


/* ----------------- Begin user auth -------------- */

let currentUser = null;
//listen for changed state
firebase.auth().onAuthStateChanged((user) => {
    console.log("onAuthStateChanged", user);
    if (user) {
        currentUser = user.uid;
        console.log("current user Logged in?", currentUser);
    } else {
        currentUser = null;
        console.log("current user NOT logged in:", currentUser);
    }
});

function loginWithEmail(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

function logOut() {
    return firebase.auth().signOut();
}

$('#admin-login-button').on('click', (e) => {
    e.preventDefault();
    let userEmail = $('#user-email').val();
    let userPass = $('#user-password').val();
    loginWithEmail(userEmail, userPass).then((user) => {
        // console.log('DERRR USER', user);
        if (user) {
            $('#event-form').removeClass('d-none');
            $('#login-form').addClass('d-none');
        }
    });
});

$('#logout-btn').on('click', (e) => {
    logOut().then((user) => {
        currentUser = null;
        $('#event-form').addClass('d-none');
        $('#login-form').removeClass('d-none');
    });
});


function getUser(user) {
    return auth.currentUser;
}

//--------------- End user auth ---------------

let eventsREF = db.collection('events');
$(function() {
    getData();
});

function appendCards(data) {
    console.log('WHAT IS DOC DATA?', data.eventObj.date);

    let CARD =
        `<div class="card text-center">
                <div class="card-header">
                    <h5 class="card-title text-center">
                        ${data.eventObj.title}
                    </h5>
                </div>
                <div class="card-body">
                    <p class="card-text text-center">
                        ${data.eventObj.desc}
                    </p>
                    <a href="#" class="btn btn-outline-primary to-calendar-button">
                        ${data.eventObj.date}
                    </a>
                </div>
            </div>`;

    $('#card-target').append(CARD);
}


function getData() {
    db.collection("events").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            let eventKey = doc.id;
            let data = doc.data();

            appendCards(data);
        });
    });
}