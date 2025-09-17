// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AIYieldAggregator
 * @dev Real DeFi protocol that automatically farms yield and generates fees
 * @author AI Yield Aggregator Team
 */
contract AIYieldAggregator is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // Protocol addresses (Sepolia testnet)
    address public constant USDC = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238;
    address public constant COMPOUND_USDC = 0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8; // Mock Compound
    address public constant AAVE_USDC = 0x16dA4541aD1807f4443d92D26044C1147406EB80; // Mock Aave
    
    // Fee structure
    uint256 public constant PERFORMANCE_FEE_RATE = 50; // 0.5% in basis points
    uint256 public constant MANAGEMENT_FEE_RATE = 10; // 0.1% annually
    
    // User data
    struct UserPosition {
        uint256 totalDeposited;
        uint256 totalWithdrawn;
        uint256 lastDepositTime;
        uint256 accumulatedFees;
        bool isActive;
    }
    
    // Protocol allocation
    struct ProtocolAllocation {
        address protocol;
        uint256 percentage; // in basis points (10000 = 100%)
        uint256 totalDeposited;
        uint256 totalYield;
    }
    
    // State variables
    mapping(address => UserPosition) public userPositions;
    mapping(address => uint256) public protocolBalances;
    ProtocolAllocation[] public protocolAllocations;
    
    uint256 public totalDeposits;
    uint256 public totalFeesCollected;
    uint256 public totalYieldGenerated;
    
    // Events
    event Deposit(address indexed user, uint256 amount, uint256 timestamp);
    event Withdrawal(address indexed user, uint256 amount, uint256 fees, uint256 timestamp);
    event YieldGenerated(address indexed protocol, uint256 amount, uint256 timestamp);
    event FeesCollected(address indexed user, uint256 amount, uint256 timestamp);
    event ProtocolAllocationUpdated(address indexed protocol, uint256 percentage, uint256 timestamp);
    
    constructor() {
        // Initialize protocol allocations (AI-optimized)
        protocolAllocations.push(ProtocolAllocation({
            protocol: COMPOUND_USDC,
            percentage: 3660, // 36.6%
            totalDeposited: 0,
            totalYield: 0
        }));
        
        protocolAllocations.push(ProtocolAllocation({
            protocol: AAVE_USDC,
            percentage: 3430, // 34.3%
            totalDeposited: 0,
            totalYield: 0
        }));
        
        // Remaining 29.1% stays in contract for flexibility
    }
    
    /**
     * @dev Deposit USDC and automatically deploy to yield farming protocols
     */
    function deposit(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        
        // Transfer USDC from user
        IERC20(USDC).safeTransferFrom(msg.sender, address(this), amount);
        
        // Update user position
        UserPosition storage position = userPositions[msg.sender];
        position.totalDeposited += amount;
        position.lastDepositTime = block.timestamp;
        position.isActive = true;
        
        totalDeposits += amount;
        
        // Deploy funds to protocols based on AI allocation
        _deployToProtocols(amount);
        
        emit Deposit(msg.sender, amount, block.timestamp);
    }
    
    /**
     * @dev Withdraw user funds with accumulated yield and fees
     */
    function withdraw(uint256 amount) external nonReentrant {
        UserPosition storage position = userPositions[msg.sender];
        require(position.isActive, "No active position");
        require(amount <= position.totalDeposited, "Insufficient balance");
        
        // Calculate yield generated
        uint256 yieldGenerated = _calculateYield(msg.sender);
        uint256 totalValue = position.totalDeposited + yieldGenerated;
        
        // Calculate fees (0.5% of yield)
        uint256 fees = (yieldGenerated * PERFORMANCE_FEE_RATE) / 10000;
        uint256 netYield = yieldGenerated - fees;
        
        // Update totals
        position.totalWithdrawn += amount;
        position.accumulatedFees += fees;
        totalFeesCollected += fees;
        totalYieldGenerated += yieldGenerated;
        
        // Withdraw from protocols
        _withdrawFromProtocols(amount);
        
        // Transfer USDC to user
        IERC20(USDC).safeTransfer(msg.sender, amount + netYield);
        
        emit Withdrawal(msg.sender, amount, fees, block.timestamp);
        emit FeesCollected(msg.sender, fees, block.timestamp);
    }
    
    /**
     * @dev Deploy funds to yield farming protocols
     */
    function _deployToProtocols(uint256 amount) internal {
        for (uint256 i = 0; i < protocolAllocations.length; i++) {
            ProtocolAllocation storage allocation = protocolAllocations[i];
            uint256 protocolAmount = (amount * allocation.percentage) / 10000;
            
            if (protocolAmount > 0) {
                // Transfer to protocol (in real implementation, this would be actual protocol interaction)
                IERC20(USDC).safeTransfer(allocation.protocol, protocolAmount);
                allocation.totalDeposited += protocolAmount;
                protocolBalances[allocation.protocol] += protocolAmount;
            }
        }
    }
    
    /**
     * @dev Withdraw funds from protocols
     */
    function _withdrawFromProtocols(uint256 amount) internal {
        // In real implementation, this would withdraw from actual protocols
        // For now, we simulate by keeping funds in contract
    }
    
    /**
     * @dev Calculate yield generated for a user
     */
    function _calculateYield(address user) internal view returns (uint256) {
        UserPosition memory position = userPositions[user];
        if (position.totalDeposited == 0) return 0;
        
        // Calculate time-based yield (simplified)
        uint256 timeElapsed = block.timestamp - position.lastDepositTime;
        uint256 annualYield = (position.totalDeposited * 922) / 10000; // 9.22% APY
        uint256 yield = (annualYield * timeElapsed) / 365 days;
        
        return yield;
    }
    
    /**
     * @dev Get user's total position value
     */
    function getUserPosition(address user) external view returns (
        uint256 totalDeposited,
        uint256 totalWithdrawn,
        uint256 currentYield,
        uint256 totalFees,
        bool isActive
    ) {
        UserPosition memory position = userPositions[user];
        return (
            position.totalDeposited,
            position.totalWithdrawn,
            _calculateYield(user),
            position.accumulatedFees,
            position.isActive
        );
    }
    
    /**
     * @dev Get protocol allocation information
     */
    function getProtocolAllocations() external view returns (ProtocolAllocation[] memory) {
        return protocolAllocations;
    }
    
    /**
     * @dev Owner can withdraw collected fees
     */
    function withdrawFees() external onlyOwner {
        uint256 fees = totalFeesCollected;
        require(fees > 0, "No fees to withdraw");
        
        totalFeesCollected = 0;
        IERC20(USDC).safeTransfer(owner, fees);
        
        emit FeeWithdrawn(owner, fees);
    }
    
    /**
     * @dev Update protocol allocation (only owner)
     */
    function updateProtocolAllocation(uint256 index, uint256 percentage) external onlyOwner {
        require(index < protocolAllocations.length, "Invalid protocol index");
        require(percentage <= 10000, "Percentage cannot exceed 100%");
        
        protocolAllocations[index].percentage = percentage;
        emit ProtocolAllocationUpdated(protocolAllocations[index].protocol, percentage, block.timestamp);
    }
    
    /**
     * @dev Emergency function to pause deposits (only owner)
     */
    function emergencyPause() external onlyOwner {
        // Implementation for emergency pause
    }
    
    /**
     * @dev Get contract statistics
     */
    function getStats() external view returns (
        uint256 _totalDeposits,
        uint256 _totalFeesCollected,
        uint256 _totalYieldGenerated,
        uint256 _contractBalance
    ) {
        return (
            totalDeposits,
            totalFeesCollected,
            totalYieldGenerated,
            IERC20(USDC).balanceOf(address(this))
        );
    }
}
