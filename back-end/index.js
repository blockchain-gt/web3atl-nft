const fs = require('fs').promises;
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const Web3 = require("web3");
const ethers = require("ethers");
const SHA256 = require('crypto-js/sha256')

const web3 = new Web3();

const address = require('./addresses.json');
console.log(address);

let teamAddr = address["team"]
let hackerAddr = address["hacker"]
let generalAddr = address["general"]
let speakerAddr = address["speaker"]


function callBack() {
    console.log("just a callback function!");
}


const teamLeave = teamAddr.map(x => SHA256(x));
const hackerLeave = hackerAddr.map(x => SHA256(x));
const generalLeave = generalAddr.map(x => SHA256(x));
const speakerLeave = speakerAddr.map(x => SHA256(x));


const merkleTreeTeam = new MerkleTree(teamLeave, SHA256);
const merkleTreeHacker = new MerkleTree(hackerLeave, SHA256);
const merkleTreeGeneral = new MerkleTree(generalLeave, SHA256);
const merkleTreeSpeaker = new MerkleTree(speakerLeave, SHA256);

console.log(merkleTreeHacker)


async function main() {
    console.log("Hacker Merkle Root: " + merkleTreeHacker.getHexRoot());
    console.log("General Merkle Root: " + merkleTreeGeneral.getHexRoot());
    console.log("Team Merkle Root: " + merkleTreeTeam.getHexRoot());
    console.log("Speaker Merkle Root: " + merkleTreeSpeaker.getHexRoot());

    hacker1Leaf = SHA256(hackerAddr[0])
    hacker1Proof = merkleTreeHacker.getProof(SHA256(hackerAddr[0]));
    root = merkleTreeHacker.getRoot().toString('hex')
    
    console.log(merkleTreeTeam.verify(hacker1Proof, hacker1Leaf, root))

    hacker1Leaf = SHA256("bullshit@gmail.com")
    hacker1Proof = merkleTreeHacker.getProof(SHA256("bullshit@gmail.com"));
    root = merkleTreeHacker.getRoot().toString('hex')
    
    console.log(merkleTreeTeam.verify(hacker1Proof, hacker1Leaf, root))
}

main();