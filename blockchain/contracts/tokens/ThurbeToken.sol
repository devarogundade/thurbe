// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ThurbeToken is ERC20 {
    constructor() ERC20("Thurbe Token", "THUB") {
        _mint(msg.sender, 1_000_000_000 * 10 ** decimals());
    }
}
