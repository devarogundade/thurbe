// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

library Data {
    struct Stream {
        address streamer;
        bytes32 tipId;
        address cardId;
        bool ongoing;
        bool ended;
    }

    struct Streamer {
        uint256 createdAt;
    }

    struct Tip {
        address streamer;
        uint256 minTip;
        uint256 maxTip;
        uint256 targetAmount;
        uint256 raisedAmount;
        bool paused;
        bool ended;
        bool claimed;
    }
}
