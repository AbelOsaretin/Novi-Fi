// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {User} from "../src/User.sol";
import {cNGN} from "../src/cNGN.sol";

contract UserScript is Script {
    User public user;
    cNGN public cngnToken;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        user = new User();
        cngnToken = new cNGN();

        vm.stopBroadcast();
    }
}
