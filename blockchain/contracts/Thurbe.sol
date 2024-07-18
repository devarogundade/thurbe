// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {Data} from "./libraries/Data.sol";
import {Hash} from "./libraries/Hash.sol";
import {IThube} from "./interfaces/IThube.sol";
import {ICard} from "./interfaces/ICard.sol";
import {CardProvider} from "./providers/CardProvider.sol";
import {TipProvider} from "./providers/TipProvider.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Thurbe is IThube, AccessControl, Pausable {
    CardProvider private _cardProvider;
    TipProvider private _tipProvider;

    mapping(bytes32 => Data.Stream) private _streams;
    mapping(address => Data.Streamer) private _streamers;

    IERC20 private _thurbeToken;

    constructor(address thurbeToken) {
        // Create providers.
        _cardProvider = new CardProvider(address(this));
        _tipProvider = new TipProvider(address(this));

        // Grant admin role.
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _thurbeToken = IERC20(thurbeToken);
    }

    function create(string memory cardBaseURI) external override {
        address streamer = _msgSender();

        require(_streamers[streamer].createdAt == 0);

        _streamers[streamer] = Data.Streamer({
            totalUnClaimedTfuel: 0,
            totalClaimedTfuel: 0,
            totalUnClaimedThurbe: 0,
            totalClaimedThurbe: 0,
            createdAt: block.timestamp
        });

        _cardProvider.createCard(streamer, cardBaseURI);

        emit StreamerCreated(streamer);
    }

    function createExclusiveCard(
        string memory name,
        string memory symbol,
        uint256 mintPrice,
        string memory baseURI
    ) external override {
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

    // === Streamer Functions ===
    function startStream(
        bytes32 streamId,
        bool exclusive
    ) external override whenNotPaused {
        address streamer = _msgSender();

        address cardId = exclusive
            ? _cardProvider.getExclusiveCard(streamer)
            : _cardProvider.getCard(streamer);

        require(cardId != address(0), "Inclusive card not created");

        _startStream(streamId, streamer, cardId);
    }

    function endStream(bytes32 streamId) external whenNotPaused {
        address streamer = _msgSender();

        Data.Stream storage stream = _streams[streamId];
        require(stream.streamer == streamer, "Not owner");
        require(stream.ongoing, "Stream is not ongoing.");
        require(!stream.ended, "Stream has already ended.");

        if (
            stream.tipId != bytes32(0) && !_tipProvider.isPaused(stream.tipId)
        ) {
            _tipProvider.pause(streamer, stream.tipId);
        }

        stream.ongoing = false;
        stream.ended = true;

        emit StreamEnded(streamId);
    }

    function startTip(bytes32 streamId) external override whenNotPaused {
        address streamer = _msgSender();

        bytes32 tipId = _tipProvider.start(streamer);
        _streams[streamId].tipId = tipId;

        emit StreamTipCreated(streamId, tipId);
    }

    function pauseTip(bytes32 streamId) external whenNotPaused {
        address streamer = _msgSender();

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        _tipProvider.pause(streamer, stream.tipId);

        emit StreamPaused(streamId);
    }

    function claimTips(uint256 amount) external whenNotPaused {
        address streamer = _msgSender();

        Data.Streamer storage streamerData = _streamers[streamer];
        require(streamerData.totalUnClaimedThurbe >= amount, "Insufficient");

        _thurbeToken.transfer(streamer, amount);

        streamerData.totalUnClaimedThurbe -= amount;
        streamerData.totalClaimedThurbe += amount;

        emit ClaimedThurbe(streamer, amount);
    }

    function claimEarnigs(uint256 amount) external whenNotPaused {
        address streamer = _msgSender();

        Data.Streamer storage streamerData = _streamers[streamer];
        require(streamerData.totalUnClaimedTfuel >= amount, "Insufficient");

        payable(streamer).transfer(amount);

        streamerData.totalUnClaimedTfuel -= amount;
        streamerData.totalClaimedTfuel += amount;

        emit ClaimedTfuel(streamer, amount);
    }

    // === Viewers Functions ===
    function tipStream(
        bytes32 streamId,
        uint256 amount
    ) external whenNotPaused {
        address viewer = _msgSender();

        _thurbeToken.transferFrom(viewer, address(this), amount);

        Data.Stream memory stream = _streams[streamId];
        require(stream.tipId != bytes32(0), "No stream tip");

        _tipProvider.tipStreamer(stream.tipId, amount);

        Data.Streamer storage streamerData = _streamers[stream.streamer];
        streamerData.totalUnClaimedThurbe += amount;

        emit StreamTip(streamId, viewer, amount);
    }

    function mintCard(
        address streamer,
        address to,
        bool exclusive
    ) external payable override {
        address cardId = exclusive
            ? _cardProvider.getExclusiveCard(streamer)
            : _cardProvider.getCard(streamer);

        uint256 amount = msg.value;

        ICard card = ICard(cardId);
        require(amount >= card.getMintPrice());

        Data.Streamer storage streamerData = _streamers[streamer];
        streamerData.totalUnClaimedTfuel += amount;

        _cardProvider.mintCard(cardId, to);
    }

    // === Internal Functions ===
    function _startStream(
        bytes32 streamId,
        address streamer,
        address cardId
    ) internal {
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
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unPause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
