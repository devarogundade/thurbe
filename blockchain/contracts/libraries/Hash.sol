// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {Data} from "./Data.sol";

library Hash {
    bytes32 internal constant LEAF_DOMAIN_SEPARATOR =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE000000000000000000000000;

    function tipId(Data.Tip memory tip) internal view returns (bytes32) {
        return
            keccak256(
                abi.encode(LEAF_DOMAIN_SEPARATOR, tip.streamer, block.timestamp)
            );
    }
}
