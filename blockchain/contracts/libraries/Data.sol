// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

library Data {
    struct Stream {
        address creator;
        bytes32 tipId;
        bytes32 drmId;
    }

    struct DRM {
        address creator;
        address collectionId;
        bool isExternal;
    }

    struct Tip {
        address creator;
        uint256 minTip;
        uint256 maxTip;
        uint256 targetAmount;
        uint256 raisedAmount;
        bool paused;
        bool ended;
        bool claimed;
    }
}
