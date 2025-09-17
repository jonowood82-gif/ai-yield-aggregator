// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title FeeCollector
 * @dev Smart contract for collecting and managing performance fees in the AI Yield Aggregator
 * @author AI Yield Aggregator Team
 * @notice This contract handles fee collection from user profits and allows owner to withdraw collected fees
 */
contract FeeCollector {
    /// @notice The owner of the contract who can withdraw fees
    address public owner;
    
    /// @notice Total fees collected across all users
    uint256 public totalFeesCollected;
    
    /// @notice Performance fee rate in basis points (50 = 0.5%)
    uint256 public performanceFeeRate = 50;
    
    /// @notice Mapping of user addresses to their total fees paid
    mapping(address => uint256) public userFees;
    
    /// @notice Mapping of user addresses to their total profits
    mapping(address => uint256) public userProfits;
    
    /// @notice Emitted when fees are collected from a user
    event FeesCollected(address indexed user, uint256 amount);
    
    /// @notice Emitted when owner withdraws collected fees
    event FeeWithdrawn(address indexed owner, uint256 amount);
    
    /// @notice Emitted when fee rate is updated
    event FeeRateUpdated(uint256 oldRate, uint256 newRate);
    
    /// @notice Emitted when ownership is transferred
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
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
    
    /// @notice Update the performance fee rate (only owner)
    /// @param newRate New fee rate in basis points (max 1000 = 10%)
    function updateFeeRate(uint256 newRate) external onlyOwner {
        require(newRate <= 1000, "Fee rate cannot exceed 10%"); // Max 10%
        uint256 oldRate = performanceFeeRate;
        performanceFeeRate = newRate;
        emit FeeRateUpdated(oldRate, newRate);
    }
    
    /// @notice Transfer ownership of the contract
    /// @param newOwner Address of the new owner
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        address previousOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }
    
    // Receive function to accept ETH
    receive() external payable {}
}
