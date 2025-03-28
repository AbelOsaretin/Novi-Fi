// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract User {
    address public owner;
    uint256 public tokenAddressCount;

    mapping(uint256 => address) public tokenAddress;
    mapping(address => mapping(address => uint256)) public userTokenBalance;
    mapping(string => address) public userENSName;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event TokenAddressSet(
        uint256 indexed tokenId,
        address indexed tokenAddress
    );
    event ENSNameRegistered(
        string indexed ensName,
        address indexed userAddress
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setTokenAddress(address _tokenAddr) public onlyOwner {
        require(_tokenAddr != address(0), "Invalid token address");
        tokenAddressCount++;
        tokenAddress[tokenAddressCount] = _tokenAddr;
        emit TokenAddressSet(tokenAddressCount, _tokenAddr);
    }

    function getTokenAddress(uint256 _tokenId) public view returns (address) {
        return tokenAddress[_tokenId];
    }

    function depositTokens(uint256 _tokenId, uint256 _amount) public {
        require(
            _tokenId > 0 && _tokenId <= tokenAddressCount,
            "Invalid token ID"
        );
        require(_amount > 0, "Amount must be greater than zero");

        address tokenAddr = tokenAddress[_tokenId];
        require(tokenAddr != address(0), "Token address not set");

        IERC20(tokenAddr).transferFrom(msg.sender, address(this), _amount);
        userTokenBalance[msg.sender][tokenAddr] += _amount;
        emit Deposit(msg.sender, _amount);
    }

    function withdrawTokens(uint256 _tokenId, uint256 _amount) public {
        require(
            _tokenId > 0 && _tokenId <= tokenAddressCount,
            "Invalid token ID"
        );
        require(_amount > 0, "Amount must be greater than zero");

        address tokenAddr = tokenAddress[_tokenId];
        require(tokenAddr != address(0), "Token address not set");

        require(
            userTokenBalance[msg.sender][tokenAddr] >= _amount,
            "Insufficient balance"
        );

        userTokenBalance[msg.sender][tokenAddr] -= _amount;
        IERC20(tokenAddr).transfer(msg.sender, _amount);
        emit Withdraw(msg.sender, _amount);
    }

    function getUserTokenBalance(
        uint256 _tokenId
    ) public view returns (uint256) {
        require(
            _tokenId > 0 && _tokenId <= tokenAddressCount,
            "Invalid token ID"
        );
        address tokenAddr = tokenAddress[_tokenId];
        return userTokenBalance[msg.sender][tokenAddr];
    }

    function registerENSName(
        string memory _ensName,
        address _userAddress
    ) public {
        require(
            userENSName[_ensName] == address(0),
            "ENS name already registered"
        );
        userENSName[_ensName] = _userAddress;
        emit ENSNameRegistered(_ensName, _userAddress);
    }
    function getENSNameAddress(
        string memory _ensName
    ) public view returns (address) {
        return userENSName[_ensName];
    }
}
