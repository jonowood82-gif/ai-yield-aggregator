pragma solidity ^0.8.19;
contract FeeCollector {
    address public owner;
    constructor() { owner = msg.sender; }
}
