# Hasher
[see the source](git+https://github.com/hubiinetwork/nahmii-contracts/tree/master/contracts/Hasher.sol)
> Hasher


**Execution cost**: less than 42717 gas

**Deployment cost**: less than 1541800 gas

**Combined cost**: less than 1584517 gas

## Constructor



Params:

1. **deployer** *of type `address`*

## Events
### SetDeployerEvent(address,address)


**Execution cost**: No bound available


Params:

1. **oldDeployer** *of type `address`*
2. **newDeployer** *of type `address`*

--- 
### SetOperatorEvent(address,address)


**Execution cost**: No bound available


Params:

1. **oldOperator** *of type `address`*
2. **newOperator** *of type `address`*


## Methods
### hashPaymentAsOperator(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **payment** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashOrderAsOperator(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **order** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### deployer()


**Execution cost**: less than 1053 gas

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

--- 
### destructor()
>
>Return the address that is able to initiate self-destruction


**Execution cost**: less than 745 gas

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

--- 
### setDeployer(address)
>
>Set the deployer of this contract


**Execution cost**: No bound available


Params:

1. **newDeployer** *of type `address`*

    > The address of the new deployer



--- 
### hashPaymentRecipientDataAsWallet(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **payment** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashOrderPlacementData(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **order** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashOrderPlacementResidualsData(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **order** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashPaymentAsWallet(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **payment** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashPaymentRecipientDataAsDriipSettlement(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **payment** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashOrderAsWallet(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **order** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashPaymentAmountCurrencyData(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **payment** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashOrderGlobalData(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **order** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashPaymentNonce(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **payment** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashPaymentTransfersData(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **payment** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashTradeTransfersData(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **trade** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashPaymentSenderDataAsDriipSettlement(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **payment** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashTradeSellerData(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **trade** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashPaymentSenderDataAsWallet(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **payment** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashSignature(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **signature** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashTradeGlobalData(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **trade** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashTrade(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **trade** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### hashTradeBuyerData(tuple)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **trade** *of type `tuple`*

Returns:


1. **output_0** *of type `bytes32`*

--- 
### operator()


**Execution cost**: less than 767 gas

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

--- 
### setOperator(address)
>
>Set the operator of this contract


**Execution cost**: No bound available


Params:

1. **newOperator** *of type `address`*

    > The address of the new operator



--- 
### triggerDestroy()
>
>Destroy this contract
>
> Requires that msg.sender is the defined destructor


**Execution cost**: No bound available




--- 
### hashOrderAsOperator((uint256,address,(uint8,int256,((address,uint256),(address,uint256)),int256,(int256,int256)),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashOrderAsWallet((uint256,address,(uint8,int256,((address,uint256),(address,uint256)),int256,(int256,int256)),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashOrderGlobalData((uint256,address,(uint8,int256,((address,uint256),(address,uint256)),int256,(int256,int256)),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashOrderPlacementData((uint256,address,(uint8,int256,((address,uint256),(address,uint256)),int256,(int256,int256)),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashOrderPlacementResidualsData((uint256,address,(uint8,int256,((address,uint256),(address,uint256)),int256,(int256,int256)),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashPaymentAmountCurrencyData((uint256,int256,(address,uint256),(uint256,address,(int256,int256),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,(int256,int256),((int256,(address,uint256))[])),(int256,int256),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashPaymentAsOperator((uint256,int256,(address,uint256),(uint256,address,(int256,int256),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,(int256,int256),((int256,(address,uint256))[])),(int256,int256),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashPaymentAsWallet((uint256,int256,(address,uint256),(uint256,address,(int256,int256),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,(int256,int256),((int256,(address,uint256))[])),(int256,int256),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashPaymentNonce((uint256,int256,(address,uint256),(uint256,address,(int256,int256),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,(int256,int256),((int256,(address,uint256))[])),(int256,int256),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashPaymentRecipientDataAsDriipSettlement((uint256,int256,(address,uint256),(uint256,address,(int256,int256),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,(int256,int256),((int256,(address,uint256))[])),(int256,int256),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashPaymentRecipientDataAsWallet((uint256,int256,(address,uint256),(uint256,address,(int256,int256),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,(int256,int256),((int256,(address,uint256))[])),(int256,int256),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashPaymentSenderDataAsDriipSettlement((uint256,int256,(address,uint256),(uint256,address,(int256,int256),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,(int256,int256),((int256,(address,uint256))[])),(int256,int256),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashPaymentSenderDataAsWallet((uint256,int256,(address,uint256),(uint256,address,(int256,int256),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,(int256,int256),((int256,(address,uint256))[])),(int256,int256),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashPaymentTransfersData((uint256,int256,(address,uint256),(uint256,address,(int256,int256),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,(int256,int256),((int256,(address,uint256))[])),(int256,int256),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashSignature((bytes32,bytes32,uint8))


**Execution cost**: No bound available




--- 
### hashTrade((uint256,int256,((address,uint256),(address,uint256)),int256,(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),((int256,int256),(int256,int256)),(bytes32,(bytes32,bytes32,uint8)),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashTradeBuyerData((uint256,int256,((address,uint256),(address,uint256)),int256,(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),((int256,int256),(int256,int256)),(bytes32,(bytes32,bytes32,uint8)),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashTradeGlobalData((uint256,int256,((address,uint256),(address,uint256)),int256,(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),((int256,int256),(int256,int256)),(bytes32,(bytes32,bytes32,uint8)),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashTradeSellerData((uint256,int256,((address,uint256),(address,uint256)),int256,(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),((int256,int256),(int256,int256)),(bytes32,(bytes32,bytes32,uint8)),uint256,uint256))


**Execution cost**: No bound available




--- 
### hashTradeTransfersData((uint256,int256,((address,uint256),(address,uint256)),int256,(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),((int256,int256),(int256,int256)),(bytes32,(bytes32,bytes32,uint8)),uint256,uint256))


**Execution cost**: No bound available




[Back to the top ↑](#hasher)
