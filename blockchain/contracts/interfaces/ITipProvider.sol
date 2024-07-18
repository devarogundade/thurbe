// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

interface ITipProvider {
    function start(address streamer) external returns (bytes32);
    function pause(address streamer, bytes32 tipId) external;

    function tipStreamer(bytes32 tipId, uint256 amount) external;

    function isPaused(bytes32 tipId) external view returns (bool);

    function raisedAmount(bytes32 tipId) external view returns (uint256);
}
