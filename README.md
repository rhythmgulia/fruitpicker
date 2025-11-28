FruitPicker Smart Contract

A simple and fun introductory Solidity project that allows users to "pick" a random fruit on-chain.
Designed especially for beginners who want to understand arrays, mappings, events, and pseudo-randomness in smart contracts.

Project Description

FruitPicker is a lightweight smart contract that simulates a fruit-picking game on the Ethereum blockchain.
Each user can pick a fruit by calling a single function, and the contract will randomly assign one from a predefined list.
This project is perfect for getting started with smart contract development, experimentation, and learning how blockchain storage works.

What It Does

Stores a built-in list of fruits that users can pick from

Lets any wallet address “pick” a random fruit

Keeps track of:

How many fruits each user has picked

The last fruit picked by each user

Emits an event every time a fruit is picked

Allows anyone to view the available fruits

Everything is preset — no inputs required during deployment.

Features
Predefined On-Chain Fruit List
Includes: Apple, Banana, Mango, Orange.

Random Fruit Selection
Uses simple pseudo-randomness (good for learning; not secure for gambling or production).

User Tracking
pickedCount[address] → number of fruits picked
lastPickedFruit[address] → last fruit picked

Event Emission
Every fruit pick triggers a FruitPicked event.

Public View Functions
All core data is accessible and transparent on-chain.


📦 Smart Contract Code
//paste your code
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FruitPicker {
    // List of fruits available
    string[] public fruits = ["Apple", "Banana", "Mango", "Orange"];

    // Track how many fruits each player has picked
    mapping(address => uint256) public pickedCount;

    // Store the last fruit picked by each player
    mapping(address => string) public lastPickedFruit;

    // Event to notify when a fruit is picked
    event FruitPicked(address indexed player, string fruit);

    // Function to pick a fruit randomly
    function pickFruit() public {
        // Use pseudo-randomness (simple for beginners, not secure)
        uint256 randomIndex = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        ) % fruits.length;

        string memory fruit = fruits[randomIndex];

        pickedCount[msg.sender] += 1;
        lastPickedFruit[msg.sender] = fruit;

        emit FruitPicked(msg.sender, fruit);
    }

    // Helper to get the full fruit list
    function getFruits() public view returns (string[] memory) {
        return fruits;
    }
}


