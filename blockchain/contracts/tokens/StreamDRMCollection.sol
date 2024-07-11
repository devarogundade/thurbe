// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract StreamDRMCollection is ERC721, Ownable {
    uint256 private _tokenId;

    constructor(
        address controller
    ) ERC721("Strean DRM Collection", "SDC") Ownable(controller) {}

    function mint(address to) external onlyOwner {
        _mint(to, _tokenId);
        _tokenId++;
    }
}
