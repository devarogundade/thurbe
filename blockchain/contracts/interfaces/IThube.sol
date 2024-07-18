// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

interface IThube {
    event StreamPaused(bytes32 streamId);
    event StreamResumed(bytes32 streamId);
    event StreamEnded(bytes32 streamId);
    event StreamTipCreated(bytes32 streamId, bytes32 tipId);
    event StreamTipClaimed(bytes32 streamId);
    event StreamTip(bytes32 streamId, address viewer, uint256 amount);
    event StreamTipEnded(bytes32 streamId, bytes32 tipId);
    event StreamCreated(address streamer, address cardId);
    event StreamerCreated(address streamer);
    event ClaimedThurbe(address streamer, uint256 amount);
    event ClaimedTfuel(address streamer, uint256 amount);

    // === Streamer Functions ===
    function create(string memory cardBaseURI) external;
    function createExclusiveCard(
        string memory name,
        string memory symbol,
        uint256 mintPrice,
        string memory baseURI
    ) external;
    function startStream(bytes32 streamId, bool exclusive) external;
    function endStream(bytes32 streamId) external;
    function startTip(bytes32 streamId) external;
    function pauseTip(bytes32 streamId) external;

    // === Viewers Functions ===
    function tipStream(bytes32 streamId, uint256 amount) external;
    function mintCard(
        address streamer,
        address to,
        bool exclusive
    ) external payable;
}
