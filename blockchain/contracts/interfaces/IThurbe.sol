// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {Data} from "../libraries/Data.sol";

interface IThube {
    event StreamPaused(bytes32 streamId);
    event StreamResumed(bytes32 streamId);
    event StreamEnded(bytes32 streamId);
    event TipCreated(bytes32 streamId, bytes32 tipId);
    event StreamTipClaimed(bytes32 streamId);
    event Tipped(bytes32 streamId, address viewer, uint256 amount);
    event StreamTipEnded(bytes32 streamId, bytes32 tipId);
    event StreamCreated(address streamer, address cardId);
    event VideoCreated(address streamer, address cardId);
    event StreamerCreated(address streamer);
    event ClaimedThurbe(address streamer, uint256 amount);
    event ClaimedTfuel(address streamer, uint256 amount);

    // === Streamer Functions ===
    function create(
        string memory cardBaseURI,
        string memory name,
        string memory symbol,
        uint256 mintPrice,
        string memory cardExlusiveBaseURI
    ) external;

    function startStream(bytes32 streamId, bool exclusive, bool tips) external;

    function uploadVideo(bytes32 videoId, bool exclusive, bool tips) external;

    function pauseTip(bytes32 streamId) external;

    function claimTfuel(uint256 amount) external;

    function claimThurbe(uint256 amount) external;

    function claimAll() external;

    // === Viewers Functions ===
    function tipStream(bytes32 streamId, uint256 amount) external;

    function tipVideo(bytes32 videoId, uint256 amount) external;

    function mintCard(
        address streamer,
        address to,
        bool exclusive
    ) external payable;

    function getCardId(
        address streamer,
        bool exclusive
    ) external view returns (address);

    function getStreamer(
        address streamer
    ) external view returns (Data.Streamer memory);

    function getStream(
        bytes32 streamId
    ) external view returns (Data.Stream memory);

    function getVideo(
        bytes32 videoId
    ) external view returns (Data.Video memory);
}
