const fs = require('fs').promises;
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const Web3 = require("web3");
const ethers = require("ethers");
const write = require('write');

const web3 = new Web3();


const address = require('./addresses.json');
console.log(address);
let lowerCase = false; //change this if need to lower case every email 
let teamAddr = address["team"]
let hackerAddr = address["hacker"]
let generalAddr = address["general"]
let speakerAddr = address["speaker"]


//lower case email process 
if (lowerCase) {
    for (let i = 0; i<teamAddr.length; i++) {
        teamAddr[i] = teamAddr[i].split(",")[0].toLowerCase()
    } 
    address["team"] = teamAddr;
    
    for (let i = 0; i<hackerAddr.length; i++) {
        hackerAddr[i] = hackerAddr[i].split(",")[0].toLowerCase()
    } 
    address["hacker"] = hackerAddr;
    
    for (let i = 0; i<generalAddr.length; i++) {
        generalAddr[i] = generalAddr[i].split(",")[0].toLowerCase()
    } 
    address["general"] = generalAddr;
    
    for (let i = 0; i<speakerAddr.length; i++) {
        speakerAddr[i] = speakerAddr[i].split(",")[0].toLowerCase()
    } 
    address["speaker"] = speakerAddr;
    var str = JSON.stringify(address);
    write.sync('updated.json', str, { newline: true }); 
}
    

function callBack() {
    console.log("just a callback function!");
}

const teamLeave = teamAddr.map(x => keccak256(x));
const hackerLeave = hackerAddr.map(x => keccak256(x));
const generalLeave = generalAddr.map(x => keccak256(x));
const speakerLeave = speakerAddr.map(x => keccak256(x));


const merkleTreeTeam = new MerkleTree(teamLeave, keccak256, { sortPairs: true });
const merkleTreeHacker = new MerkleTree(hackerLeave, keccak256, { sortPairs: true });
const merkleTreeGeneral = new MerkleTree(generalLeave, keccak256, { sortPairs: true });
const merkleTreeSpeaker = new MerkleTree(speakerLeave, keccak256, { sortPairs: true });


async function main() {
    console.log("Hacker Merkle Root: " + merkleTreeHacker.getHexRoot());
    console.log("General Merkle Root: " + merkleTreeGeneral.getHexRoot());
    console.log("Team Merkle Root: " + merkleTreeTeam.getHexRoot());
    console.log("Speaker Merkle Root: " + merkleTreeSpeaker.getHexRoot());

    hacker2Leaf = keccak256("rschleusner@gatech.edu")
    hacker2Proof = merkleTreeTeam.getHexProof(hacker2Leaf);
    root = merkleTreeTeam.getRoot().toString('hex')
    console.log(merkleTreeTeam.verify(hacker2Proof, hacker2Leaf, root))
    
    //console.log(hacker2Proof)
    //console.log(hacker2Leaf.toString('hex'))

    // for (let i =0; i<hacker1Proof.length; i++) {
    //     console.log(hacker1Proof[i].data.toString("hex"));
    // }

    
    

    hacker1Leaf = keccak256("bullshit@gmail.com")
    hacker1Proof = merkleTreeHacker.getProof(keccak256("bullshit@gmail.com"));
    root = merkleTreeHacker.getRoot().toString('hex')
    console.log(merkleTreeTeam.verify(hacker1Proof, hacker1Leaf, root))


    speaker1Leaf = keccak256("ewvanwinkle@gmail.com")
    speaker1Proof = merkleTreeSpeaker.getProof(keccak256("ewvanwinkle@gmail.com"));
    root = merkleTreeSpeaker.getRoot().toString('hex')
    
    console.log(merkleTreeTeam.verify(speaker1Proof, speaker1Leaf, root))
}

main();