// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
// const collection = require('firebase/firestore/collection');
// const doc = require('firebase/firestore/doc');
// const setDoc = require('firebase/firestore/setDoc');
const fs = require('fs').promises;
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const Web3 = require("web3");
const ethers = require("ethers");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');


admin.initializeApp();



// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.param;
    console.log(original);
    let email = original[0].toLowerCase();
    let type = original[1].toLowerCase();

    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();
     
    data[type].push(email+",");
    db.collection('Email').doc("Attendance List").set(data);

    res.send(original + " email has been added to " + type + " email list!");
});


exports.verifyEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.param;
    console.log(original);
    let email = original[0].toLowerCase();
    let type = original[1].toLowerCase();
    let address = original[2].toLowerCase();
 
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();

    console.log(type)

    let list = data[type]
    let size = list.length
    
    for (let i = 0; i<size; i++) {
        let currentString = list[i]
        console.log(currentString)
        let components = currentString.split(",")
        let currentEmail = components[0]
        if (currentEmail.localeCompare(email)==0) {
            list[i] = currentEmail+","+address;
            data[type] = list
            db.collection('Email').doc("Attendance List").set(data)
        } 
    }
});


exports.updateAddress = functions.https.onRequest(async (req, res) => {
    const original = req.query.param;
    console.log(original);
    let email = original[0].toLowerCase();
    let type = original[1].toLowerCase();
    let address = original[2].toLowerCase();
 
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();

    console.log(type)

    let list = data[type]
    let size = list.length
    
    for (let i = 0; i<size; i++) {
        let currentString = list[i]
        console.log(currentString)
        let components = currentString.split(",")
        let currentEmail = components[0]
        if (currentEmail.localeCompare(email)==0) {
            list[i] = currentEmail+","+address;
            data[type] = list
            db.collection('Email').doc("Attendance List").set(data)
            res.send("Email Verified");
        } 
    }
    res.send("Email has not been registered!");
});


exports.queryList = functions.https.onRequest(async (req, res) => {
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();
    res.json({"general": data["general"], "speaker": data["speaker"], "hacker": data["hacker"], "team": data["team"]})
});


// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addGeneralEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();
    
    data["general"].push(original);
    db.collection('Email').doc("Attendance List").set(data);

    res.send(original + " email has been added!");
});

exports.verifyGeneralEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();

    let list = data["general"]
    let size = list.length;
    
    for (let i = 0; i<size; i++) {
        if (list[i].localeCompare(original)==0) {
            res.send("Email Verified");
        } 
    }
    res.send("Email has not been registered!");
});

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addSpeakerEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();
    
    data["speaker"].push(original);
    db.collection('Email').doc("Attendance List").set(data);

    res.send(original + " email has been added!");
});

exports.verifySpeakerEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();

    let list = data["speaker"];
    let size = list.length;
    
    for (let i = 0; i<size; i++) {
        if (list[i].localeCompare(original)==0) {
            res.send("Email Verified");
        } 
    }
    res.send("Email has not been registered!");
});

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addHackerEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();
    
    data["hacker"].push(original);
    db.collection('Email').doc("Attendance List").set(data);

    res.send(original + " email has been added!");
});

exports.verifyHackerEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();

    let list = data["hacker"]
    let size = list.length;
    
    for (let i = 0; i<size; i++) {
        if (list[i].localeCompare(original)==0) {
            res.send("Email Verified");
        } 
    }
    res.send("Email has not been registered!");
});

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addTeamEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();
    
    data["team"].push(original);
    db.collection('Email').doc("Attendance List").set(data);

    res.send(original + " email has been added!");
});

exports.verifyTeamEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();

    let list = data["team"]
    let size = list.length;
    
    for (let i = 0; i<size; i++) {
        if (list[i].localeCompare(original)==0) {
            res.send("Email Verified");
        } 
    }
    res.send("Email has not been registered!");
});

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addSpeakerEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();
    
    data["speaker"].push(original);
    db.collection('Email').doc("Attendance List").set(data);

    res.send(original + " email has been added!");
});


exports.verifySpeakerEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();

    let list = data["speaker"]
    let size = list.length;
    
    for (let i = 0; i<size; i++) {
        if (list[i].localeCompare(original)==0) {
            res.send("Email Verified");
        } 
    }
    res.send("Email has not been registered!");
});

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addSponserEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();
    
    data["sponser"].push(original);
    db.collection('Email').doc("Attendance List").set(data);

    res.send(original + " email has been added!");
});


exports.verifySponserEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();

    let list = data["sponser"]
    let size = list.length;
    
    for (let i = 0; i<size; i++) {
        if (list[i].localeCompare(original)==0) {
            res.send("Email Verified");
        } 
    }
    res.send("Email has not been registered!");
});














// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addGeneralEmailTest = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List Test").get();
    let data = (await doc).data();
    
    data["general"].push(original);
    db.collection('Email').doc("Attendance List Test").set(data);

    res.send(original + " email has been added!");
});

exports.verifyGeneralEmailTest = functions.https.onRequest(async (req, res) => {
    const original = req.query.text.toLowerCase();
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List Test").get();
    let data = (await doc).data();

    let list = data["general"]
    let size = list.length;
    
    for (let i = 0; i<size; i++) {
        if (list[i].localeCompare(original)==0) {
            res.send("Email Verified");
        } 
    }
    res.send("Email has not been registered!");
});
