// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {Data} from "./libraries/Data.sol";
import {Hash} from "./libraries/Hash.sol";
import {IzkStream} from "./interfaces/IzkStream.sol";
import {DRMProvider} from "./providers/DRMProvider.sol";
import {TipProvider} from "./providers/TipProvider.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract zkStream is IzkStream, AccessControl, Pausable {
    DRMProvider private _drmProvider;
    TipProvider private _tipProvider;

    mapping(bytes32 => Data.Stream) private _streams;

    constructor() {
        _drmProvider = new DRMProvider(address(this));
        _tipProvider = new TipProvider(address(this));

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    // === Creator Functions ===
    function startPublicStream() external whenNotPaused returns (bytes32) {
        address creator = _msgSender();

        return _startStream(creator, bytes32(0));
    }

    function startExternalPrivateStream(
        address collectionId
    ) external whenNotPaused returns (bytes32) {
        address creator = _msgSender();

        bytes32 drmId = _drmProvider.createExternal(creator, collectionId);

        return _startStream(creator, drmId);
    }

    function startPrivateStream() external whenNotPaused returns (bytes32) {
        address creator = _msgSender();

        bytes32 drmId = _drmProvider.create(creator);

        return _startStream(creator, drmId);
    }

    // === Creator-Tip Functions ===
    function startTip(
        bytes32 streamId,
        uint256 minTip,
        uint256 maxTip,
        uint256 targetAmount
    ) external whenNotPaused returns (bytes32) {
        address creator = _msgSender();

        bytes32 tipId = _tipProvider.create(
            creator,
            minTip,
            maxTip,
            targetAmount
        );

        _streams[streamId].tipId = tipId;

        emit StreamTipCreated(streamId, tipId, minTip, maxTip, targetAmount);

        return tipId;
    }

    function pauseTip(bytes32 streamId) external whenNotPaused {
        address creator = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        _tipProvider.pause(creator, stream.tipId);

        emit StreamPaused(streamId);
    }

    function resumeTip(bytes32 streamId) external whenNotPaused {
        address creator = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        _tipProvider.resume(creator, stream.tipId);

        emit StreamResumed(streamId);
    }

    function endTip(bytes32 streamId) external whenNotPaused {
        address creator = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        _tipProvider.end(creator, stream.tipId);

        emit StreamEnded(streamId);
    }

    function claimTip(bytes32 streamId) external whenNotPaused {
        address creator = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        uint256 raisedAmount = _tipProvider.claim(creator, stream.tipId);

        payable(stream.creator).transfer(raisedAmount);

        emit StreamTipClaimed(streamId);
    }

    // === Streamer Functions ===
    function donateStream(bytes32 streamId) external payable whenNotPaused {
        address streamer = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        uint256 amount = msg.value;

        uint256 raisedAmount = _tipProvider.donate(
            stream.tipId,
            streamer,
            amount
        );

        emit StreamDonated(streamId, raisedAmount, streamer, amount);
    }

    // === Internal Functions ===
    function _startStream(
        address creator,
        bytes32 drmId
    ) internal returns (bytes32) {
        Data.Stream memory stream = Data.Stream({
            creator: creator,
            tipId: bytes32(0),
            drmId: drmId
        });

        bytes32 streamId = Hash.streamId(stream);

        emit StreamCreated(creator, drmId);

        return streamId;
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unPause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
