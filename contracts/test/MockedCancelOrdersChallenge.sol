/*
 * Hubii Striim
 *
 * Compliant with the Hubii Striim specification v0.12.
 *
 * Copyright (C) 2017-2018 Hubii AS
 */

pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

//import {CancelOrdersChallenge} from "../CancelOrdersChallenge.sol";
import {Types} from "../Types.sol";

/**
@title MockedCancelOrdersChallenge
@notice Mocked implementation of cancel orders challenge contract
*/
contract MockedCancelOrdersChallenge /*is CancelOrdersChallenge*/ {

    //
    // Variables
    // -----------------------------------------------------------------------------------------------------------------
    bytes32[] cancelledOrderHashes;
    mapping(bytes32 => bool) orderHashCancelledMap;

    //
    // Events
    // -----------------------------------------------------------------------------------------------------------------
    event CancelOrdersEvent(Types.Order[] orders, address wallet);
    event CancelOrdersByHashEvent(bytes32[] orders, address wallet);

    //
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(/*address owner*/) public /*CancelOrdersChallenge(owner)*/ {
    }

    //
    // Functions
    // -----------------------------------------------------------------------------------------------------------------
    function reset() public {
        for (uint256 i = 0; i < cancelledOrderHashes.length; i++)
            orderHashCancelledMap[cancelledOrderHashes[i]] = false;
        cancelledOrderHashes.length = 0;
    }

    function cancelOrders(Types.Order[] orders) public {
        for (uint256 i = 0; i < orders.length; i++) {
            cancelledOrderHashes.push(orders[i].seals.exchange.hash);
            orderHashCancelledMap[orders[i].seals.exchange.hash] = true;
        }

        emit CancelOrdersEvent(orders, msg.sender);
    }

    function cancelOrdersByHash(bytes32[] orderHashes) public {
        for (uint256 i = 0; i < orderHashes.length; i++) {
            cancelledOrderHashes.push(orderHashes[i]);
            orderHashCancelledMap[orderHashes[i]] = true;
        }

        emit CancelOrdersByHashEvent(orderHashes, msg.sender);
    }

    function isOrderCancelled(address wallet, bytes32 orderHash) public view returns (bool) {
        // To silence unused function parameter compiler warning
        require(wallet == wallet);
        return orderHashCancelledMap[orderHash];
    }
}