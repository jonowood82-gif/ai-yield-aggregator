// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract FeeCollector {
    address public owner;
    IERC20 public usdc;
    
    // User balances
    mapping(address => uint256) public userBalances;
    mapping(address => uint256) public userProfits;
    
    // Fee management
    uint256 public performanceFeeRate = 50; // 0.5% in basis points
    uint256 public totalFeesCollected;
    uint256 public totalDeposits;
    
    // Events
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event FeeCollected(uint256 amount);
    event ProfitDistributed(address indexed user, uint256 amount);
    
    constructor(address _usdcAddress) {
        owner = msg.sender;
        usdc = IERC20(_usdcAddress);
    }
    
    // Deposit USDC into the contract
    function depositUSDC(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(usdc.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        userBalances[msg.sender] += amount;
        totalDeposits += amount;
        
        emit Deposit(msg.sender, amount);
    }
    
    // Withdraw USDC from the contract
    function withdrawUSDC(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        
        userBalances[msg.sender] -= amount;
        totalDeposits -= amount;
        
        require(usdc.transfer(msg.sender, amount), "Transfer failed");
        
        emit Withdrawal(msg.sender, amount);
    }
    
    // Collect fees (admin only)
    function collectFees() external {
        require(msg.sender == owner, "Only owner can collect fees");
        
        uint256 contractBalance = usdc.balanceOf(address(this));
        uint256 totalUserBalances = totalDeposits;
        
        if (contractBalance > totalUserBalances) {
            uint256 fees = contractBalance - totalUserBalances;
            totalFeesCollected += fees;
            emit FeeCollected(fees);
        }
    }
    
    // Withdraw collected fees (admin only)
    function withdrawFees() external {
        require(msg.sender == owner, "Only owner can withdraw fees");
        
        uint256 contractBalance = usdc.balanceOf(address(this));
        uint256 totalUserBalances = totalDeposits;
        
        if (contractBalance > totalUserBalances) {
            uint256 fees = contractBalance - totalUserBalances;
            require(usdc.transfer(owner, fees), "Transfer failed");
        }
    }
    
    // Get user's total balance (deposits + profits)
    function getUserTotalBalance(address user) external view returns (uint256) {
        return userBalances[user] + userProfits[user];
    }
    
    // Get available fees for collection
    function getAvailableFees() external view returns (uint256) {
        uint256 contractBalance = usdc.balanceOf(address(this));
        uint256 totalUserBalances = totalDeposits;
        
        if (contractBalance > totalUserBalances) {
            return contractBalance - totalUserBalances;
        }
        return 0;
    }
    
    // Simulate profit distribution (for testing)
    function distributeProfits(address user, uint256 profitAmount) external {
        require(msg.sender == owner, "Only owner can distribute profits");
        require(profitAmount > 0, "Profit amount must be greater than 0");
        
        userProfits[user] += profitAmount;
        emit ProfitDistributed(user, profitAmount);
    }
    
    // Update fee rate (admin only)
    function updateFeeRate(uint256 newRate) external {
        require(msg.sender == owner, "Only owner can update fee rate");
        require(newRate <= 1000, "Fee rate cannot exceed 10%");
        performanceFeeRate = newRate;
    }
    
    // Transfer ownership
    function transferOwnership(address newOwner) external {
        require(msg.sender == owner, "Only owner can transfer ownership");
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
}
