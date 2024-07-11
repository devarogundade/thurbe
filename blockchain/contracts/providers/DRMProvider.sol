// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {Data} from "../libraries/Data.sol";
import {Hash} from "../libraries/Hash.sol";
import {IDRMProvider} from "../interfaces/IDRMProvider.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {StreamDRMCollection} from "../tokens/StreamDRMCollection.sol";

contract DRMProvider is Ownable, IDRMProvider {
    mapping(bytes32 => Data.DRM) private _drms;

    constructor(address controller) Ownable(controller) {}

    function create(
        address creator
    ) external override onlyOwner returns (bytes32) {
        StreamDRMCollection collection = new StreamDRMCollection(address(this));

        Data.DRM memory drm = Data.DRM({
            creator: creator,
            collectionId: address(collection),
            isExternal: false
        });

        bytes32 drmId = Hash.drmId(drm);

        _drms[drmId] = drm;

        return drmId;
    }

    function createExternal(
        address creator,
        address collectionId
    ) external override onlyOwner returns (bytes32) {
        Data.DRM memory drm = Data.DRM({
            creator: creator,
            collectionId: collectionId,
            isExternal: true
        });

        bytes32 drmId = Hash.drmId(drm);

        _drms[drmId] = drm;

        return drmId;
    }

    function addStreamers(
        address creator,
        bytes32 drmId,
        address[] memory streamers
    ) external override onlyOwner {
        Data.DRM storage drm = _drms[drmId];

        require(creator == drm.creator, "Not owner");

        // Can only call mint of poccessed collections.
        require(!drm.isExternal, "Collection is external");

        for (uint index = 0; index < streamers.length; index++) {
            address streamer = streamers[index];
            uint256 balance = IERC721(drm.collectionId).balanceOf(streamer);

            // Mint streamer a drm NFT if it they do not have.
            if (balance == 0) {
                StreamDRMCollection(drm.collectionId).mint(streamer);
            }
        }
    }

    function hasKey(
        bytes32 drmId,
        address streamer
    ) external view override returns (bool) {
        Data.DRM memory drm = _drms[drmId];
        uint256 balance = IERC721(drm.collectionId).balanceOf(streamer);

        return balance > 0;
    }
}
