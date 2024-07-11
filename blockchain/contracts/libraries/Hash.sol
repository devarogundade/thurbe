// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {Data} from "./Data.sol";

library Hash {
    bytes32 internal constant LEAF_DOMAIN_SEPARATOR =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE000000000000000000000000;

    function streamId(
        Data.Stream memory stream
    ) internal view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    LEAF_DOMAIN_SEPARATOR,
                    stream.creator,
                    stream.drmId,
                    block.timestamp
                )
            );
    }

    function tipId(Data.Tip memory tip) internal view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    LEAF_DOMAIN_SEPARATOR,
                    tip.creator,
                    tip.minTip,
                    tip.maxTip,
                    tip.targetAmount,
                    block.timestamp
                )
            );
    }

    function drmId(Data.DRM memory drm) internal view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    LEAF_DOMAIN_SEPARATOR,
                    drm.creator,
                    drm.collectionId,
                    drm.isExternal,
                    block.timestamp
                )
            );
    }
}
