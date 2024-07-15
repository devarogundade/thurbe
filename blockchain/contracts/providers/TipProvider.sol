// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {Data} from "../libraries/Data.sol";
import {Hash} from "../libraries/Hash.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ITipProvider} from "../interfaces/ITipProvider.sol";

contract TipProvider is Ownable, ITipProvider {
    mapping(bytes32 => Data.Tip) private _tips;
    mapping(bytes32 => mapping(address => uint256)) private _streamerDonors;

    constructor(address controller) Ownable(controller) {}

    function create(
        address streamer,
        uint256 minTip,
        uint256 maxTip,
        uint256 targetAmount
    ) external override onlyOwner returns (bytes32) {
        Data.Tip memory tip = Data.Tip({
            streamer: streamer,
            minTip: minTip,
            maxTip: maxTip,
            targetAmount: targetAmount,
            raisedAmount: 0,
            paused: false,
            ended: false,
            claimed: false
        });

        bytes32 tipId = Hash.tipId(tip);

        _tips[tipId] = tip;

        return tipId;
    }

    function donate(
        bytes32 tipId,
        address viewer,
        uint256 amount
    ) external override onlyOwner returns (uint256) {
        Data.Tip storage tip = _tips[tipId];
        uint256 donated = _streamerDonors[tipId][viewer];

        require(
            (donated + amount) < tip.maxTip,
            "Amount too much from streamer"
        );
        require(!tip.ended, "Data.Tip is ended");
        require(!tip.paused, "Data.Tip is paused");
        require(amount >= tip.minTip, "Not enough amount");
        require(amount < tip.maxTip, "Amount too much");
        require(
            (tip.raisedAmount + amount) < tip.targetAmount,
            "Amount is too large"
        );

        tip.raisedAmount += amount;
        _streamerDonors[tipId][viewer] += amount;

        return tip.raisedAmount;
    }

    function pause(
        address streamer,
        bytes32 tipId
    ) external override onlyOwner {
        Data.Tip storage tip = _tips[tipId];

        require(streamer == tip.streamer, "Not owner");
        require(!tip.ended, "Data.Tip is ended");
        require(!tip.paused, "Data.Tip was already paused");

        tip.paused = true;
    }

    function resume(
        address streamer,
        bytes32 tipId
    ) external override onlyOwner {
        Data.Tip storage tip = _tips[tipId];

        require(streamer == tip.streamer, "Not owner");
        require(!tip.ended, "Data.Tip is ended");
        require(tip.paused, "Data.Tip was not paused");

        tip.paused = false;
    }

    function isEnded(bytes32 tipId) external override returns (bool) {
        return _tips[tipId].ended;
    }

    function end(address streamer, bytes32 tipId) external override onlyOwner {
        Data.Tip storage tip = _tips[tipId];

        require(streamer == tip.streamer, "Not owner");
        require(!tip.ended, "Data.Tip was already ended");

        tip.ended = true;
    }

    function claim(
        address streamer,
        bytes32 tipId
    ) external override onlyOwner returns (uint256) {
        Data.Tip storage tip = _tips[tipId];

        require(streamer == tip.streamer, "Not owner");
        require(tip.ended, "Data.Tip is not ended");
        require(!tip.claimed, "Data.Tip was already claimed");

        tip.claimed = true;

        return tip.raisedAmount;
    }
}
