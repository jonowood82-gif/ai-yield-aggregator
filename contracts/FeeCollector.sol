// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FeeCollector {
    address public owner;
    uint256 public totalFeesCollected;
    uint256 public performanceFeeRate = 50; // 0.5% (50 basis points)
    
    mapping(address => uint256) public userFees;
    mapping(address => uint256) public userProfits;
    
    event FeesCollected(address indexed user, uint256 amount);
    event FeeWithdrawn(address indexed owner, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    // Function to collect fees from user profits
    function collectFees(address user, uint256 profit) external {
        require(profit > 0, "Profit must be greater than 0");
        
        uint256 feeAmount = (profit * performanceFeeRate) / 10000; // 0.5% fee
        userFees[user] += feeAmount;
        totalFeesCollected += feeAmount;
        userProfits[user] += profit;
        
        emit FeesCollected(user, feeAmount);
    }
    
    // Function for owner to withdraw collected fees
    function withdrawFees() external onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "No fees to withdraw");
        
        totalFeesCollected = 0; // Reset counter after withdrawal
        
        (bool success, ) = payable(owner).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit FeeWithdrawn(owner, amount);
    }
    
    // Function to get total fees available for withdrawal
    function getAvailableFees() external view returns (uint256) {
        return address(this).balance;
    }
    
    // Function to get user's total fees paid
    function getUserFees(address user) external view returns (uint256) {
        return userFees[user];
    }
    
    // Function to get user's total profits
    function getUserProfits(address user) external view returns (uint256) {
        return userProfits[user];
    }
    
    // Function to update fee rate (only owner)
    function updateFeeRate(uint256 newRate) external onlyOwner {
        require(newRate <= 1000, "Fee rate cannot exceed 10%"); // Max 10%
        performanceFeeRate = newRate;
    }
    
    // Function to transfer ownership
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
    
    // Receive function to accept ETH
    receive() external payable {}
}
