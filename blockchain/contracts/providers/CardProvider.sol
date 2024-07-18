// SPDX-License-Identifier: MIT
pragma solidity <=0.8.24;

import {ICard} from "../interfaces/ICard.sol";
import {Data} from "../libraries/Data.sol";
import {Hash} from "../libraries/Hash.sol";
import {ICardProvider} from "../interfaces/ICardProvider.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Card} from "../cards/Card.sol";
import {ExclusiveCard} from "../cards/ExclusiveCard.sol";

contract CardProvider is Ownable, ICardProvider {
    mapping(address => address) private _cards;
    mapping(address => address) private _exclusiveCards;

    constructor(address controller) Ownable(controller) {}

    function createCard(
        address streamer,
        string memory baseURI
    ) external override onlyOwner returns (address) {
        require(_cards[streamer] == address(0));

        Card card = new Card(address(this), baseURI);

        address cardId = address(card);
        _cards[streamer] = cardId;

        return cardId;
    }

    function createExclusiveCard(
        address streamer,
        string memory name,
        string memory symbol,
        uint256 mintPrice,
        string memory baseURI
    ) external override returns (address) {
        require(_exclusiveCards[streamer] == address(0));

        ExclusiveCard card = new ExclusiveCard(
            address(this),
            name,
            symbol,
            mintPrice,
            baseURI
        );

        address cardId = address(card);
        _exclusiveCards[streamer] = cardId;

        return cardId;
    }

    function getCard(
        address streamer
    ) external view override returns (address) {
        return _cards[streamer];
    }

    function getExclusiveCard(
        address streamer
    ) external view override returns (address) {
        return _exclusiveCards[streamer];
    }

    function mintCard(address cardId, address to) external onlyOwner {
        ICard(cardId).mint(to);
    }
}
