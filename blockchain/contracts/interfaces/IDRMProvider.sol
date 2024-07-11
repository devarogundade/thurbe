// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

interface IDRMProvider {
    function create(address creator) external returns (bytes32);

    function createExternal(
        address creator,
        address collectionId
    ) external returns (bytes32);

    function addStreamers(
        address creator,
        bytes32 drmId,
        address[] memory streamers
    ) external;

    function hasKey(
        bytes32 drmId,
        address streamer
    ) external view returns (bool);
}
