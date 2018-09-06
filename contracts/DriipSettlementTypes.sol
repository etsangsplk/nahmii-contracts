/*
 * Hubii Striim
 *
 * Compliant with the Hubii Striim specification v0.12.
 *
 * Copyright (C) 2017-2018 Hubii AS
 */

pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import {MonetaryTypes} from "./MonetaryTypes.sol";
import {StriimTypes} from "./StriimTypes.sol";

/**
 * @title     DriipSettlementTypes
 * @dev       Types for driip settlement challenge
 */
library DriipSettlementTypes {
    //
    // Structures
    // -----------------------------------------------------------------------------------------------------------------
    enum ChallengeStatus {Unknown, Qualified, Disqualified}
    enum ChallengeCandidateType {None, Order, Trade, Payment}
    enum SettlementRole {Origin, Target}

    struct OptionalFigure {
        int256 amount;
        MonetaryTypes.Currency currency;
        bool set;
    }

    struct Challenge {
        uint256 nonce; // TODO Consider removal of nonce in place of exchange' hash
        uint256 timeout;
        ChallengeStatus status;

        // Driip info
        //        bytes32 driipExchangeHash; // TODO Add exchange' hash
        StriimTypes.DriipType driipType;
        uint256 driipIndex;

        // Stage info
        OptionalFigure intendedStage;
        OptionalFigure conjugateStage;

        // Balances after amounts have been staged
        OptionalFigure intendedTargetBalance;
        OptionalFigure conjugateTargetBalance;

        // Candidate info updated when calling any of the challenge functions
        ChallengeCandidateType candidateType;
        uint256 candidateIndex;

        // Address of wallet that successfully challenged
        address challenger;
    }
}