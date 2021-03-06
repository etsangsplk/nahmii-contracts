/*
 * Hubii Nahmii
 *
 * Compliant with the Hubii Nahmii specification v0.12.
 *
 * Copyright (C) 2017-2018 Hubii AS
 */

pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import {Ownable} from "./Ownable.sol";
import {AccrualBeneficiary} from "./AccrualBeneficiary.sol";
import {Servable} from "./Servable.sol";
import {TransferControllerManageable} from "./TransferControllerManageable.sol";
import {SafeMathIntLib} from "./SafeMathIntLib.sol";
import {SafeMathUintLib} from "./SafeMathUintLib.sol";
import {RevenueToken} from "./RevenueToken.sol";
import {TransferController} from "./TransferController.sol";
import {BalanceLib} from "./BalanceLib.sol";
import {TxHistoryLib} from "./TxHistoryLib.sol";
import {MonetaryTypesLib} from "./MonetaryTypesLib.sol";

/**
@title TokenHolderRevenueFund
@notice Fund that manages the revenue earned by revenue token holders.
@dev Asset descriptor combo (currencyCt == 0x0, currencyId == 0) corresponds to ethers
*/
contract TokenHolderRevenueFund is Ownable, AccrualBeneficiary, Servable, TransferControllerManageable {
    using BalanceLib for BalanceLib.Balance;
    using TxHistoryLib for TxHistoryLib.TxHistory;
    using SafeMathIntLib for int256;
    using SafeMathUintLib for uint256;

    //
    // Constants
    // -----------------------------------------------------------------------------------------------------------------
    string constant public CLOSE_ACCRUAL_PERIOD_ACTION = "close_accrual_period";

    string constant public DEPOSIT_BALANCE_TYPE = "deposit";

    //
    // Structures
    // -----------------------------------------------------------------------------------------------------------------
    struct AccrualItem {
        address currencyCt;
        uint256 currencyId;
    }

    struct Wallet {
        BalanceLib.Balance staged;

        TxHistoryLib.TxHistory txHistory;

        // Claim accrual tracking
        mapping(address => mapping(uint256 => uint256[])) claimAccrualBlockNumbers;
    }

    //
    // Variables
    // -----------------------------------------------------------------------------------------------------------------
    RevenueToken private revenueToken;

    BalanceLib.Balance  periodAccrual;
    MonetaryTypesLib.Currency[]  periodCurrenciesList;
    mapping(address => mapping(uint256 => bool)) public periodAccrualMap;

    BalanceLib.Balance  aggregateAccrual;
    MonetaryTypesLib.Currency[]  aggregateCurrenciesList;
    mapping(address => mapping(uint256 => bool)) public aggregateAccrualMap;

    mapping(address => Wallet) private walletMap;

    uint256[] accrualBlockNumbers;

   //
    // Events
    // -----------------------------------------------------------------------------------------------------------------
    event SetRevenueTokenEvent(RevenueToken oldRevenueToken, RevenueToken newRevenueToken);
    event ReceiveEvent(address from, string balanceType, int256 amount, address currencyCt, uint256 currencyId);
    event WithdrawEvent(address to, int256 amount, address currencyCt, uint256 currencyId);
    event CloseAccrualPeriodEvent();
    event ClaimAccrualEvent(address from, address currencyCt, uint256 currencyId);

    //
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(address deployer) Ownable(deployer) public {
    }

    //
    // Functions
    // -----------------------------------------------------------------------------------------------------------------
    /// @notice Set the revenue token contract
    /// @param newRevenueToken The (address of) RevenueToken contract instance
    function setRevenueToken(RevenueToken newRevenueToken) public onlyDeployer notNullAddress(newRevenueToken) {
        if (newRevenueToken != revenueToken) {
            //set new revenue token
            RevenueToken oldRevenueToken = revenueToken;
            revenueToken = newRevenueToken;

            // Emit event
            emit SetRevenueTokenEvent(oldRevenueToken, newRevenueToken);
        }
    }

    //
    // Deposit functions
    // -----------------------------------------------------------------------------------------------------------------
    function() public payable {
        receiveEthersTo(msg.sender, "");
    }

    function receiveEthersTo(address wallet, string balanceType) public payable {
        require(
            0 == bytes(balanceType).length ||
            keccak256(abi.encodePacked(DEPOSIT_BALANCE_TYPE)) == keccak256(abi.encodePacked(balanceType))
        );

        int256 amount = SafeMathIntLib.toNonZeroInt256(msg.value);

        //add to balances
        periodAccrual.add(amount, address(0), 0);
        aggregateAccrual.add(amount, address(0), 0);

        //add deposit info
        walletMap[wallet].txHistory.addDeposit(amount, address(0), 0);

        // Emit event
        emit ReceiveEvent(wallet, balanceType, amount, address(0), 0);
    }

    function receiveTokens(string balanceType, int256 amount, address currencyCt, uint256 currencyId, string standard) public {
        receiveTokensTo(msg.sender, balanceType, amount, currencyCt, currencyId, standard);
    }

    function receiveTokensTo(address wallet, string balanceType, int256 amount, address currencyCt, uint256 currencyId, string standard) public {
        require(
            0 == bytes(balanceType).length ||
            keccak256(abi.encodePacked(DEPOSIT_BALANCE_TYPE)) == keccak256(abi.encodePacked(balanceType))
        );

        require(amount.isNonZeroPositiveInt256());

        //execute transfer
        TransferController controller = getTransferController(currencyCt, standard);
        if (!address(controller).delegatecall(controller.getReceiveSignature(), msg.sender, this, uint256(amount), currencyCt, currencyId)) {
            revert();
        }

        //add to balances
        periodAccrual.add(amount, currencyCt, currencyId);
        aggregateAccrual.add(amount, currencyCt, currencyId);

        //add currency to in-use list
        if (!periodAccrualMap[currencyCt][currencyId]) {
            periodAccrualMap[currencyCt][currencyId] = true;
            periodCurrenciesList.push(MonetaryTypesLib.Currency(currencyCt, currencyId));
        }

        if (!aggregateAccrualMap[currencyCt][currencyId]) {
            aggregateAccrualMap[currencyCt][currencyId] = true;
            aggregateCurrenciesList.push(MonetaryTypesLib.Currency(currencyCt, currencyId));
        }

        //add deposit info
        walletMap[wallet].txHistory.addDeposit(amount, currencyCt, currencyId);

        // Emit event
        emit ReceiveEvent(wallet, balanceType, amount, currencyCt, currencyId);
    }

    function deposit(address wallet, uint index) public view returns (int256 amount, uint256 blockNumber, address currencyCt, uint256 currencyId) {
        return walletMap[wallet].txHistory.deposit(index);
    }

    function depositsCount(address wallet) public view returns (uint256) {
        return walletMap[wallet].txHistory.depositsCount();
    }

    //
    // Balance retrieval functions
    // -----------------------------------------------------------------------------------------------------------------
    function periodAccrualBalance(address currencyCt, uint256 currencyId) public view returns (int256) {
        return periodAccrual.get(currencyCt, currencyId);
    }

    function aggregateAccrualBalance(address currencyCt, uint256 currencyId) public view returns (int256) {
        return aggregateAccrual.get(currencyCt, currencyId);
    }

    function stagedBalance(address wallet, address currencyCt, uint256 currencyId) public view returns (int256) {
        //require(wallet != address(0));
        return walletMap[wallet].staged.get(currencyCt, currencyId);
    }

    //
    // Accrual functions
    // -----------------------------------------------------------------------------------------------------------------
    function closeAccrualPeriod() public onlyEnabledServiceAction(CLOSE_ACCRUAL_PERIOD_ACTION) {
        uint256 i;
        uint256 len;

        //register this block
        accrualBlockNumbers.push(block.number);

        //clear accruals
        len = periodCurrenciesList.length;
        for (i = 0; i < len; i++) {
            MonetaryTypesLib.Currency storage currency = periodCurrenciesList[i];
            periodAccrual.set(0, currency.ct, currency.id);
        }

        // Emit event
        emit CloseAccrualPeriodEvent();
    }

    function claimAccrual(address currencyCt, uint256 currencyId) public {
        int256 balance;
        int256 amount;
        int256 fraction;
        int256 bb;
        uint256 bn_low;
        uint256 bn_up;

        require(address(revenueToken) != address(0));

        balance = aggregateAccrual.get(currencyCt, currencyId);
        require(balance.isNonZeroPositiveInt256());

        // lower bound = last accrual block number claimed for currency c by msg.sender OR 0
        // upper bound = last accrual block number

        require(accrualBlockNumbers.length > 0);
        bn_up = accrualBlockNumbers[accrualBlockNumbers.length - 1];

        uint256[] storage claimAccrualBlockNumbers = walletMap[msg.sender].claimAccrualBlockNumbers[currencyCt][currencyId];
        if (claimAccrualBlockNumbers.length == 0)
            bn_low = 0; //no block numbers for claimed accruals yet
        else
            bn_low = claimAccrualBlockNumbers[claimAccrualBlockNumbers.length - 1];

        require(bn_low != bn_up);
        // avoid division by 0

        bb = int256(revenueToken.balanceBlocksIn(msg.sender, bn_low, bn_up));

        fraction = bb.mul_nn(1e18).mul_nn(balance).div_nn(balance.mul_nn(int256(bn_up.sub(bn_low))).mul_nn(1e18));
        amount = fraction.mul_nn(balance).div_nn(1e18);
        if (amount <= 0)
            return;

        // Move calculated amount a of currency c from aggregate active balance of currency c to msg.sender’s staged balance of currency c
        aggregateAccrual.sub(amount, currencyCt, currencyId);
        walletMap[msg.sender].staged.add(amount, currencyCt, currencyId);

        // Store upper bound as the last claimed accrual block number for currency
        claimAccrualBlockNumbers.push(bn_up);

        // Emit event
        emit ClaimAccrualEvent(msg.sender, currencyCt, currencyId);
    }

    //
    // Withdrawal functions
    // -----------------------------------------------------------------------------------------------------------------
    function withdraw(int256 amount, address currencyCt, uint256 currencyId, string standard) public notDeployer {
        require(amount.isNonZeroPositiveInt256());

        amount = amount.clampMax(walletMap[msg.sender].staged.get(currencyCt, currencyId));
        if (amount <= 0)
            return;

        //subtract to per-wallet staged balance
        walletMap[msg.sender].staged.sub(amount, currencyCt, currencyId);
        walletMap[msg.sender].txHistory.addWithdrawal(amount, currencyCt, currencyId);

        //execute transfer
        if (currencyCt == address(0)) {
            msg.sender.transfer(uint256(amount));
        }
        else {
            TransferController controller = getTransferController(currencyCt, standard);
            if (!address(controller).delegatecall(controller.getDispatchSignature(), this, msg.sender, uint256(amount), currencyCt, currencyId)) {
                revert();
            }
        }

        // Emit event
        emit WithdrawEvent(msg.sender, amount, currencyCt, currencyId);
    }

    function withdrawal(address wallet, uint index) public view returns (int256 amount, uint256 blockNumber, address currencyCt, uint256 currencyId) {
        return walletMap[wallet].txHistory.withdrawal(index);
    }

    function withdrawalsCount(address wallet) public view returns (uint256) {
        return walletMap[wallet].txHistory.withdrawalsCount();
    }

    //
    // Modifiers
    // -----------------------------------------------------------------------------------------------------------------
    modifier revenueTokenInitialized() {
        require(revenueToken != address(0));
        _;
    }
}
