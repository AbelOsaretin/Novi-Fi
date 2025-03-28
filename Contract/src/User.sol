// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract User {
    address public owner;
    address public tokenAddress;
    // uint256 balance;

    mapping(address => uint256) public userBalances;
    mapping(string => address) public ensAddresses;
    mapping(uint256 => address) public tokenAddresses;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event AirtimePurchased(string phoneNumber, uint256 amount);
    event DataPurchased(string phoneNumber, uint256 amount);

    constructor(address _tokenAddress) {
        owner = msg.sender;
        tokenAddress = _tokenAddress;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        userBalances[msg.sender] += amount;
        emit Deposit(msg.sender, amount);
    }
    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= userBalances[msg.sender], "Insufficient balance");
        IERC20(tokenAddress).transfer(msg.sender, amount);
        userBalances[msg.sender] -= amount;
        emit Withdraw(msg.sender, amount);
    }

    function getBalance() external view returns (uint256) {
        return userBalances[msg.sender];
    }

    function transferTokens(address to, uint256 amount) external onlyOwner {
        require(amount <= userBalances[msg.sender], "Insufficient balance");
        IERC20(tokenAddress).transfer(to, amount);
        userBalances[msg.sender] -= amount;
    }

    function setENSAddress(string memory ensName, address ensAddress) external {
        ensAddresses[ensName] = ensAddress;
    }

    function getENSAddress(
        string memory ensName
    ) external view returns (address) {
        return ensAddresses[ensName];
    }

    function buyAirtime(
        string memory phoneNumber,
        uint256 amount
    ) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= userBalances[msg.sender], "Insufficient balance");

        userBalances[msg.sender] -= amount;

        emit AirtimePurchased(phoneNumber, amount);
    }

    function buyData(
        string memory phoneNumber,
        uint256 amount
    ) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= userBalances[msg.sender], "Insufficient balance");

        userBalances[msg.sender] -= amount;

        emit DataPurchased(phoneNumber, amount);
    }

    function setTokenAddress(
        uint256 tokenId,
        address _tokenAddress
    ) external onlyOwner {
        tokenAddresses[tokenId] = _tokenAddress;
    }
    function getTokenAddress(uint256 tokenId) external view returns (address) {
        return tokenAddresses[tokenId];
    }

    function getTokenBalance() external view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }
    function getUserTokenBalance(address user) external view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(user);
    }
}
