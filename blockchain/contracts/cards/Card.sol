// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {ICard} from "../interfaces/ICard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Card is ERC721, Ownable, ICard {
    uint256 private _tokenId;
    string private _baseUri;

    mapping(uint256 => string) private _tokenUris;

    constructor(
        address controller,
        string memory baseURI
    ) ERC721("InclusiveCard", "INC") Ownable(controller) {
        _baseUri = baseURI;
    }

    function mint(address to) external override onlyOwner {
        _mint(to, _tokenId);
        _tokenUris[_tokenId] = _baseUri;
        _tokenId++;
    }

    function burn(uint256 tokenId) external onlyOwner {
        delete _tokenUris[tokenId];
        _burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        return _tokenUris[tokenId];
    }

    function getMintPrice() external pure override returns (uint256) {
        return 0;
    }
}
