// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

interface ITipProvider {
    function create(
        address streamer,
        uint256 minTip,
        uint256 maxTip,
        uint256 targetAmount
    ) external returns (bytes32);

    function donate(
        bytes32 tipId,
        address streamer,
        uint256 amount
    ) external returns (uint256);

    function pause(address streamer, bytes32 tipId) external;

    function resume(address streamer, bytes32 tipId) external;

    function end(address streamer, bytes32 tipId) external;

    function claim(address streamer, bytes32 tipId) external returns (uint256);
}
