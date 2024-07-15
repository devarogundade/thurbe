// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {Data} from "./libraries/Data.sol";
import {Hash} from "./libraries/Hash.sol";
import {IThube} from "./interfaces/IThube.sol";
import {CardProvider} from "./providers/CardProvider.sol";
import {TipProvider} from "./providers/TipProvider.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract Thube is IThube, AccessControl, Pausable {
    CardProvider private _cardProvider;
    TipProvider private _tipProvider;

    mapping(bytes32 => Data.Stream) private _streams;
    mapping(address => Data.Streamer) private _streamers;

    constructor() {
        // Create providers.
        _cardProvider = new CardProvider(address(this));
        _tipProvider = new TipProvider(address(this));

        // Grant admin role.
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function createStreamer(
        string memory inclusiveCardBaseURI
    ) external override {
        address streamer = _msgSender();
        require(_streamers[streamer].createdAt == 0);

        _cardProvider.createInclusiveCard(streamer, inclusiveCardBaseURI);

        _streamers[streamer] = Data.Streamer({createdAt: block.timestamp});

        emit StreamerCreated(streamer);
    }

    function createExclusiveCard(
        string memory name,
        string memory symbol,
        uint256 mintPrice,
        string memory baseURI
    ) external {
        address streamer = _msgSender();
        require(_streamers[streamer].createdAt > 0);

        _cardProvider.createExclusiveCard(
            streamer,
            name,
            symbol,
            mintPrice,
            baseURI
        );
    }

    // === Creator Functions ===
    function startInclusiveStream(
        bytes32 streamId
    ) external whenNotPaused returns (bytes32) {
        address streamer = _msgSender();

        address cardId = _cardProvider.getInclusiveCard(streamer);
        require(cardId != address(0), "Inclusive card not created");

        return _startStream(streamId, streamer, cardId);
    }

    function startExclusiveStream(
        bytes32 streamId
    ) external whenNotPaused returns (bytes32) {
        address streamer = _msgSender();

        address cardId = _cardProvider.getExclusiveCard(streamer);
        require(cardId != address(0), "Exclusive card not created");

        return _startStream(streamId, streamer, cardId);
    }

    function endStream(bytes32 streamId) external whenNotPaused {
        address streamer = _msgSender();

        Data.Stream storage stream = _streams[streamId];
        require(stream.streamer == streamer);
        require(stream.ongoing, "Stream is not active.");
        require(!stream.ended, "Stream has already ended.");

        if (stream.tipId != bytes32(0) && !_tipProvider.isEnded(stream.tipId)) {
            _tipProvider.end(streamer, stream.tipId);
        }

        stream.ongoing = false;
        stream.ended = true;

        emit StreamEnded(streamId);
    }

    // === Creator-Tip Functions ===
    function startTip(
        bytes32 streamId,
        uint256 minTip,
        uint256 maxTip,
        uint256 targetAmount
    ) external whenNotPaused returns (bytes32) {
        address streamer = _msgSender();

        bytes32 tipId = _tipProvider.create(
            streamer,
            minTip,
            maxTip,
            targetAmount
        );

        _streams[streamId].tipId = tipId;

        emit StreamTipCreated(streamId, tipId, minTip, maxTip, targetAmount);

        return tipId;
    }

    function pauseTip(bytes32 streamId) external whenNotPaused {
        address streamer = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        _tipProvider.pause(streamer, stream.tipId);

        emit StreamPaused(streamId);
    }

    function resumeTip(bytes32 streamId) external whenNotPaused {
        address streamer = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        _tipProvider.resume(streamer, stream.tipId);

        emit StreamResumed(streamId);
    }

    function endTip(bytes32 streamId) external whenNotPaused {
        address streamer = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        _tipProvider.end(streamer, stream.tipId);

        emit StreamTipEnded(streamId, stream.tipId);
    }

    function claimTip(bytes32 streamId) external whenNotPaused {
        address streamer = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        uint256 raisedAmount = _tipProvider.claim(streamer, stream.tipId);

        payable(stream.streamer).transfer(raisedAmount);

        emit StreamTipClaimed(streamId);
    }

    // === Streamer Functions ===
    function donateStream(bytes32 streamId) external payable whenNotPaused {
        address viewer = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        uint256 amount = msg.value;

        uint256 raisedAmount = _tipProvider.donate(
            stream.tipId,
            viewer,
            amount
        );

        emit StreamDonated(streamId, raisedAmount, viewer, amount);
    }

    // === Internal Functions ===
    function _startStream(
        bytes32 streamId,
        address streamer,
        address cardId
    ) internal returns (bytes32) {
        require(_streams[streamId].streamer == address(0));

        Data.Stream memory stream = Data.Stream({
            streamer: streamer,
            tipId: bytes32(0),
            cardId: cardId,
            ongoing: false,
            ended: false
        });

        _streams[streamId] = stream;

        emit StreamCreated(streamer, cardId);

        return streamId;
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unPause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
