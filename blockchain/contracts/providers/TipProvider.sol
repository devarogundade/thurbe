// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {Data} from "../libraries/Data.sol";
import {Hash} from "../libraries/Hash.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ITipProvider} from "../interfaces/ITipProvider.sol";

contract TipProvider is Ownable, ITipProvider {
    mapping(bytes32 => Data.Tip) private _tips;

    constructor(address controller) Ownable(controller) {}

    function start(
        address streamer
    ) external override onlyOwner returns (bytes32) {
        Data.Tip memory tip = Data.Tip({
            streamer: streamer,
            raisedAmount: 0,
            paused: false
        });

        bytes32 tipId = Hash.tipId(tip);

        _tips[tipId] = tip;

        return tipId;
    }

    function tipStreamer(
        bytes32 tipId,
        uint256 amount
    ) external override onlyOwner {
        Data.Tip storage tip = _tips[tipId];

        require(!tip.paused, "Data.Tip is paused");
        tip.raisedAmount += amount;
    }

    function pause(
        address streamer,
        bytes32 tipId
    ) external override onlyOwner {
        Data.Tip storage tip = _tips[tipId];

        require(streamer == tip.streamer, "Not owner");
        require(!tip.paused, "Data.Tip was already paused");

        tip.paused = true;
    }

    function isPaused(bytes32 tipId) external view override returns (bool) {
        return _tips[tipId].paused;
    }

    function raisedAmount(
        bytes32 tipId
    ) external view override returns (uint256) {
        return _tips[tipId].raisedAmount;
    }
}
