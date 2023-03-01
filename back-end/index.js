const fs = require('fs').promises;
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const Web3 = require("web3");
const ethers = require("ethers");

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

    hacker1Leaf = keccak256(hackerAddr[0])
    hacker1Proof = merkleTreeHacker.getHexProof(keccak256(hackerAddr[0]));
    root = merkleTreeHacker.getRoot().toString('hex')
    console.log(hacker1Proof)
    console.log(keccak256(hackerAddr[0]).toString('hex'))

    // for (let i =0; i<hacker1Proof.length; i++) {
    //     console.log(hacker1Proof[i].data.toString("hex"));
    // }

    
    console.log(merkleTreeTeam.verify(hacker1Proof, hacker1Leaf, root))

    hacker1Leaf = keccak256("bullshit@gmail.com")
    hacker1Proof = merkleTreeHacker.getProof(keccak256("bullshit@gmail.com"));
    root = merkleTreeHacker.getRoot().toString('hex')
    
    console.log(merkleTreeTeam.verify(hacker1Proof, hacker1Leaf, root))
}

main();