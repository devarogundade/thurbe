// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StreamToken is ERC20 {
    constructor() ERC20("Strean Token", "STM") {
        _mint(msg.sender, 1_000_000_000 * 10 ** decimals());
    }
}
