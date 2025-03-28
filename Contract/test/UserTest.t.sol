// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console} from "forge-std/Test.sol";
import {User} from "../src/User.sol";
import {cNGN} from "../src/cNGN.sol";

contract UserTest is Test {
    User public userContract;
    cNGN public cngnToken;
    address public owner;
    address public testUser;

    function setUp() public {
        // Deploy contracts
        owner = address(this);
        vm.startPrank(owner);

        cngnToken = new cNGN();
        userContract = new User();

        // Set token address in User contract
        userContract.setTokenAddress(address(cngnToken));

        // Mint tokens to test user
        testUser = address(0x123);
        cngnToken.mint(testUser, 1000 * 10 ** cngnToken.decimals());

        vm.stopPrank();
    }

    function testSetTokenAddress() public {
        // Verify token address was set correctly
        address setTokenAddress = userContract.getTokenAddress(1);
        assertEq(
            setTokenAddress,
            address(cngnToken),
            "Token address not set correctly"
        );
        assertEq(
            userContract.tokenAddressCount(),
            1,
            "Token address count incorrect"
        );
    }

    function testDepositTokens() public {
        // Prepare tokens for deposit
        vm.startPrank(testUser);
        cngnToken.approve(
            address(userContract),
            500 * 10 ** cngnToken.decimals()
        );

        // Deposit tokens
        userContract.depositTokens(1, 500 * 10 ** cngnToken.decimals());

        // Check balance
        uint256 userBalance = userContract.getUserTokenBalance(1);
        assertEq(
            userBalance,
            500 * 10 ** cngnToken.decimals(),
            "Deposit amount incorrect"
        );
        vm.stopPrank();
    }

    function testWithdrawTokens() public {
        // Prepare and deposit tokens
        vm.startPrank(testUser);
        cngnToken.approve(
            address(userContract),
            500 * 10 ** cngnToken.decimals()
        );
        userContract.depositTokens(1, 500 * 10 ** cngnToken.decimals());

        // Withdraw tokens
        userContract.withdrawTokens(1, 300 * 10 ** cngnToken.decimals());

        // Check balance
        uint256 userBalance = userContract.getUserTokenBalance(1);
        assertEq(
            userBalance,
            200 * 10 ** cngnToken.decimals(),
            "Withdrawal amount incorrect"
        );
        vm.stopPrank();
    }

    function testRegisterENSName() public {
        // Register ENS name
        userContract.registerENSName("testuser.eth", testUser);

        // Verify ENS name registration
        address registeredAddress = userContract.getENSNameAddress(
            "testuser.eth"
        );
        assertEq(
            registeredAddress,
            testUser,
            "ENS name not registered correctly"
        );
    }

    function testCannotRegisterDuplicateENSName() public {
        // First registration should succeed
        userContract.registerENSName("testuser.eth", testUser);

        // Second registration should revert
        vm.expectRevert("ENS name already registered");
        userContract.registerENSName("testuser.eth", address(0x456));
    }

    function testOnlyOwnerCanSetTokenAddress() public {
        // Try to set token address as non-owner
        vm.startPrank(testUser);
        vm.expectRevert("Not the contract owner");
        userContract.setTokenAddress(address(0x789));
        vm.stopPrank();
    }

    function testInvalidTokenDeposit() public {
        vm.startPrank(testUser);
        vm.expectRevert("Invalid token ID");
        userContract.depositTokens(0, 100);

        vm.expectRevert("Invalid token ID");
        userContract.depositTokens(2, 100);
        vm.stopPrank();
    }
}
