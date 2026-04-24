// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WearToEarn {
    struct User {
        uint256 totalReceived;
        uint256 totalClaims;
        uint256 reputation;
    }

    mapping(address => User) public users;
    mapping(address => bool) public hasClaimed;

    address public immutable owner;
    uint256 public rewardAmount = 0.01 ether;

    event PaymentReceived(address indexed from, address indexed to, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);
    event RewardAmountUpdated(uint256 oldAmount, uint256 newAmount);
    event Funded(address indexed from, uint256 amount);

    error NotOwner();
    error NoValueSent();
    error AlreadyClaimed();
    error InsufficientRewardPool();

    constructor() {
        owner = msg.sender;
    }

    function tip(address to) external payable {
        if (msg.value == 0) revert NoValueSent();

        users[to].totalReceived += msg.value;
        users[to].reputation += msg.value;

        emit PaymentReceived(msg.sender, to, msg.value);
    }

    function claimReward() external {
        if (hasClaimed[msg.sender]) revert AlreadyClaimed();
        if (address(this).balance < rewardAmount) revert InsufficientRewardPool();

        hasClaimed[msg.sender] = true;
        users[msg.sender].totalClaims += 1;

        payable(msg.sender).transfer(rewardAmount);

        emit RewardClaimed(msg.sender, rewardAmount);
    }

    function fund() external payable {
        if (msg.value == 0) revert NoValueSent();
        emit Funded(msg.sender, msg.value);
    }

    function setReward(uint256 newAmount) external {
        if (msg.sender != owner) revert NotOwner();

        uint256 oldAmount = rewardAmount;
        rewardAmount = newAmount;

        emit RewardAmountUpdated(oldAmount, newAmount);
    }

    function getUser(address user)
        external
        view
        returns (uint256 totalReceived, uint256 totalClaims, uint256 reputation)
    {
        User memory u = users[user];
        return (u.totalReceived, u.totalClaims, u.reputation);
    }

    receive() external payable {
        emit Funded(msg.sender, msg.value);
    }
}
