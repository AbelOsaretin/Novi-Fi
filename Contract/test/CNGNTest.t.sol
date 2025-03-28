// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console} from "forge-std/Test.sol";
import {cNGN} from "../src/cNGN.sol";

contract CNGNTest is Test {
    cNGN public cngnToken;
    address public owner;
    address public testUser;

    function setUp() public {
        owner = address(this);
        testUser = address(0x123);

        vm.startPrank(owner);
        cngnToken = new cNGN();
        vm.stopPrank();
    }

    function testInitialSupply() public {
        uint256 expectedSupply = 2100000 * 10 ** cngnToken.decimals();
        assertEq(
            cngnToken.totalSupply(),
            expectedSupply,
            "Initial supply incorrect"
        );
        assertEq(
            cngnToken.balanceOf(owner),
            expectedSupply,
            "Owner should receive initial supply"
        );
    }

    function testTokenDetails() public {
        assertEq(cngnToken.name(), "cNGN", "Token name incorrect");
        assertEq(cngnToken.symbol(), "cNGN", "Token symbol incorrect");
        assertEq(cngnToken.decimals(), 18, "Token decimals incorrect");
    }

    function testMintTokens() public {
        vm.startPrank(owner);
        cngnToken.mint(testUser, 1000 * 10 ** cngnToken.decimals());

        uint256 userBalance = cngnToken.balanceOf(testUser);
        assertEq(
            userBalance,
            1000 * 10 ** cngnToken.decimals(),
            "Minting failed"
        );
        vm.stopPrank();
    }

    // function testMintTokensByNonOwner() public {
    //     vm.startPrank(testUser);
    //     vm.expectRevert("Ownable: caller is not the owner");
    //     cngnToken.mint(testUser, 1000 * 10 ** cngnToken.decimals());
    //     vm.stopPrank();
    // }
}
