// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

interface IThube {
    event StreamPaused(bytes32 streamId);
    event StreamResumed(bytes32 streamId);
    event StreamEnded(bytes32 streamId);
    event StreamTipCreated(
        bytes32 streamId,
        bytes32 tipId,
        uint256 minTip,
        uint256 maxTip,
        uint256 targetAmount
    );
    event StreamTipClaimed(bytes32 streamId);
    event StreamDonated(
        bytes32 streamId,
        uint256 raisedAmount,
        address streamer,
        uint256 amount
    );
    event StreamCreated(address creator, bytes32 drmId);

    function startPublicStream() external returns (bytes32);
    function startExternalPrivateStream(
        address collectionId
    ) external returns (bytes32);
    function startPrivateStream() external returns (bytes32);
    function startTip(
        bytes32 streamId,
        uint256 minTip,
        uint256 maxTip,
        uint256 targetAmount
    ) external returns (bytes32);
    function pauseTip(bytes32 streamId) external;
    function resumeTip(bytes32 streamId) external;
    function endTip(bytes32 streamId) external;
    function donateStream(bytes32 streamId) external payable;
}
