// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title AIYieldAggregatorProduction
 * @dev Production-ready DeFi yield aggregator with real yield data from backend
 *      This version uses backend-triggered updates for cost efficiency
 */
contract AIYieldAggregatorProduction is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // --- Constants ---
    address public immutable USDC;
    uint256 public constant PERFORMANCE_FEE_RATE = 50; // 0.5% in basis points
    uint256 public constant YIELD_UPDATE_THRESHOLD = 100; // 1% minimum change to update

    // --- State Variables ---
    struct UserPosition {
        uint256 totalDeposited;
        uint256 totalWithdrawn;
        uint256 currentYield;
        uint256 totalFeesPaid;
        bool isActive;
        uint256 lastYieldUpdate; // Timestamp of last yield calculation
    }

    struct YieldData {
        uint256 currentAPY; // Current APY in basis points (e.g., 922 = 9.22%)
        uint256 lastUpdate; // Timestamp of last update
        uint256 totalYieldGenerated; // Total yield generated across all users
    }

    mapping(address => UserPosition) public userPositions;
    YieldData public yieldData;
    
    uint256 public totalDeposits;
    uint256 public totalFeesCollected;
    uint256 public lastYieldUpdate;

    // Events
    event Deposit(address indexed user, uint256 amount, uint256 timestamp);
    event Withdrawal(address indexed user, uint256 amount, uint256 fees, uint256 timestamp);
    event YieldUpdated(uint256 newAPY, uint256 timestamp, string source);
    event FeesCollected(address indexed user, uint256 amount, uint256 timestamp);
    event FeeWithdrawn(address indexed owner, uint256 amount);

    constructor(address _usdc) {
        _transferOwnership(msg.sender);
        USDC = _usdc;
        
        // Initialize yield data
        yieldData = YieldData({
            currentAPY: 922, // Start with 9.22% APY
            lastUpdate: block.timestamp,
            totalYieldGenerated: 0
        });
        lastYieldUpdate = block.timestamp;
    }

    /**
     * @dev Update yield data from backend (only owner/backend)
     * @param newAPY New APY in basis points (e.g., 922 = 9.22%)
     * @param source Source of the update (e.g., "compound", "aave", "yearn")
     */
    function updateYieldData(uint256 newAPY, string calldata source) external onlyOwner {
        require(newAPY > 0, "Invalid APY");
        require(newAPY <= 5000, "APY too high"); // Max 50% APY
        
        uint256 oldAPY = yieldData.currentAPY;
        uint256 apyChange = newAPY > oldAPY ? newAPY - oldAPY : oldAPY - newAPY;
        
        // Only update if change is significant (1% or more)
        if (apyChange >= YIELD_UPDATE_THRESHOLD) {
            yieldData.currentAPY = newAPY;
            yieldData.lastUpdate = block.timestamp;
            lastYieldUpdate = block.timestamp;
            
            emit YieldUpdated(newAPY, block.timestamp, source);
        }
    }

    /**
     * @dev Deposit USDC into the aggregator
     * @param amount Amount of USDC to deposit
     */
    function deposit(uint256 amount) external nonReentrant {
        require(amount > 0, "Deposit amount must be greater than 0");

        IERC20(USDC).safeTransferFrom(msg.sender, address(this), amount);

        UserPosition storage position = userPositions[msg.sender];
        
        // Update user's yield before adding new deposit
        _updateUserYield(msg.sender);
        
        position.totalDeposited += amount;
        position.isActive = true;
        position.lastYieldUpdate = block.timestamp;
        totalDeposits += amount;

        emit Deposit(msg.sender, amount, block.timestamp);
    }

    /**
     * @dev Withdraw USDC from the aggregator
     * @param amount Amount of USDC to withdraw
     */
    function withdraw(uint256 amount) external nonReentrant {
        UserPosition storage position = userPositions[msg.sender];
        require(position.isActive, "No active position");
        require(amount > 0, "Withdrawal amount must be greater than 0");

        // Update user's yield before withdrawal
        _updateUserYield(msg.sender);

        uint256 totalValue = position.totalDeposited + position.currentYield;
        require(totalValue >= amount, "Insufficient funds to withdraw");

        // Calculate fees on the yield (profit) only
        uint256 yieldAmount = position.currentYield;
        uint256 fees = 0;
        
        if (yieldAmount > 0) {
            fees = (yieldAmount * PERFORMANCE_FEE_RATE) / 10000;
            totalFeesCollected += fees;
            position.totalFeesPaid += fees;
            position.currentYield = 0; // Reset yield after fee calculation
        }

        // Ensure contract has enough balance
        require(IERC20(USDC).balanceOf(address(this)) >= amount, "Contract has insufficient USDC balance");

        IERC20(USDC).safeTransfer(msg.sender, amount);

        position.totalWithdrawn += amount;
        if (position.totalDeposited + position.currentYield - position.totalWithdrawn <= 0) {
            position.isActive = false;
        }
        totalDeposits -= amount;

        emit Withdrawal(msg.sender, amount, fees, block.timestamp);
    }

    /**
     * @dev Update user's yield based on current APY and time elapsed
     * @param user User address to update
     */
    function _updateUserYield(address user) internal {
        UserPosition storage position = userPositions[user];
        
        if (position.totalDeposited == 0) return;
        
        uint256 timeElapsed = block.timestamp - position.lastYieldUpdate;
        if (timeElapsed == 0) return;
        
        // Calculate yield: (deposit * APY * time) / (365 days * 10000 basis points)
        uint256 yieldEarned = (position.totalDeposited * yieldData.currentAPY * timeElapsed) / (365 days * 10000);
        
        position.currentYield += yieldEarned;
        position.lastYieldUpdate = block.timestamp;
        yieldData.totalYieldGenerated += yieldEarned;
        
        emit YieldGenerated(user, yieldEarned, block.timestamp);
    }

    /**
     * @dev Withdraw collected fees (only owner)
     */
    function withdrawFees() external onlyOwner {
        uint256 fees = totalFeesCollected;
        require(fees > 0, "No fees to withdraw");

        totalFeesCollected = 0;
        IERC20(USDC).safeTransfer(owner(), fees);

        emit FeeWithdrawn(owner(), fees);
    }

    /**
     * @dev Get user's current position with real yield data
     * @param user User address
     * @return totalDeposited Total amount deposited
     * @return totalWithdrawn Total amount withdrawn
     * @return currentYield Current accumulated yield
     * @return totalFeesPaid Total fees paid
     * @return isActive Whether position is active
     * @return realAPY Current real APY being earned
     */
    function getUserPosition(address user) public view returns (
        uint256 totalDeposited,
        uint256 totalWithdrawn,
        uint256 currentYield,
        uint256 totalFeesPaid,
        bool isActive,
        uint256 realAPY
    ) {
        UserPosition storage position = userPositions[user];
        
        // Calculate current yield without updating state
        uint256 timeElapsed = block.timestamp - position.lastYieldUpdate;
        uint256 additionalYield = 0;
        
        if (position.totalDeposited > 0 && timeElapsed > 0) {
            additionalYield = (position.totalDeposited * yieldData.currentAPY * timeElapsed) / (365 days * 10000);
        }
        
        return (
            position.totalDeposited,
            position.totalWithdrawn,
            position.currentYield + additionalYield,
            position.totalFeesPaid,
            position.isActive,
            yieldData.currentAPY
        );
    }

    /**
     * @dev Get overall contract statistics
     * @return totalDeposits_ Total deposits in contract
     * @return totalFeesCollected_ Total fees collected
     * @return totalYieldGenerated_ Total yield generated
     * @return contractBalance_ Current USDC balance
     * @return currentAPY_ Current real APY
     * @return lastUpdate_ Last yield update timestamp
     */
    function getStats() public view returns (
        uint256 totalDeposits_,
        uint256 totalFeesCollected_,
        uint256 totalYieldGenerated_,
        uint256 contractBalance_,
        uint256 currentAPY_,
        uint256 lastUpdate_
    ) {
        return (
            totalDeposits,
            totalFeesCollected,
            yieldData.totalYieldGenerated,
            IERC20(USDC).balanceOf(address(this)),
            yieldData.currentAPY,
            yieldData.lastUpdate
        );
    }

    /**
     * @dev Emergency function to update yield data (only owner)
     * @param newAPY New APY in basis points
     */
    function emergencyUpdateYield(uint256 newAPY) external onlyOwner {
        require(newAPY > 0 && newAPY <= 5000, "Invalid APY");
        yieldData.currentAPY = newAPY;
        yieldData.lastUpdate = block.timestamp;
        lastYieldUpdate = block.timestamp;
        emit YieldUpdated(newAPY, block.timestamp, "emergency");
    }

    // Events for yield generation
    event YieldGenerated(address indexed user, uint256 amount, uint256 timestamp);
}
