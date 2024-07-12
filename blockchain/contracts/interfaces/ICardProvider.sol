// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

interface ICardProvider {
    function createInclusiveCard(
        address streamer,
        string memory baseURI
    ) external returns (address);

    function createExclusiveCard(
        address streamer,
        string memory name,
        string memory symbol,
        uint256 mintPrice,
        string memory baseURI
    ) external returns (address);

    function getInclusiveCard(address streamer) external view returns (address);

    function getExclusiveCard(address streamer) external view returns (address);
}
