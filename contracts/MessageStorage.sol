// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MessageStorage {
    string public message;
    address public owner;

    event MessageStored(string message);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can store a message");
        _;
    }

    constructor() {
        owner = msg.sender;  // Set the contract owner to the deployer's address
    }

    function storeMessage(string memory newMessage) public onlyOwner {
        message = newMessage;
        emit MessageStored(newMessage);
    }

    function retrieveMessage() public view returns (string memory) {
        return message;
    }
}
