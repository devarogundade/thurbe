// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

library Data {
    struct Stream {
        address streamer;
        bytes32 tipId;
        address cardId;
    }
    
    struct Video {
        address streamer;
        bytes32 tipId;
        address cardId;
    }

    struct Streamer {
        uint256 totalUnClaimedTfuel;
        uint256 totalClaimedTfuel;
        uint256 totalUnClaimedThurbe;
        uint256 totalClaimedThurbe;
        uint256 createdAt;
    }

    struct Tip {
        address streamer;
        uint256 raisedAmount;
        bool paused;
    }
}
