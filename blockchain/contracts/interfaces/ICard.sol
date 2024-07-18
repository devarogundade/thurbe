// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

interface ICard {
    function mint(address to) external;
    function getMintPrice() external view returns (uint256);
}
