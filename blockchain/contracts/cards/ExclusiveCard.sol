// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ExclusiveCard is ERC721, Ownable {
    uint256 private _tokenId;

    uint256 private _mintPrice;
    string private _baseUri;

    mapping(uint256 => string) private _tokenUris;

    constructor(
        address controller,
        string memory name,
        string memory symbol,
        uint256 mintPrice,
        string memory baseURI
    ) ERC721(name, symbol) Ownable(controller) {
        _mintPrice = mintPrice;
        _baseUri = baseURI;
    }

    function mint(address to) external onlyOwner {
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

    function getMintPrice() external view returns (uint256) {
        return _mintPrice;
    }
}
