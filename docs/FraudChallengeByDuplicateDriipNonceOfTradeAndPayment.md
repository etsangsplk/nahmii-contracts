# FraudChallengeByDuplicateDriipNonceOfTradeAndPayment
[see the source](git+https://github.com/hubiinetwork/nahmii-contracts/tree/master/contracts/FraudChallengeByDuplicateDriipNonceOfTradeAndPayment.sol)
> FraudChallengeByDuplicateDriipNonceOfTradeAndPayment


**Execution cost**: less than 42586 gas

**Deployment cost**: less than 1416400 gas

**Combined cost**: less than 1458986 gas

## Constructor



Params:

1. **deployer** *of type `address`*

## Events
### ChallengeByDuplicateDriipNonceOfTradeAndPaymentEvent(bytes32,bytes32,address)


**Execution cost**: No bound available


Params:

1. **tradeHash** *of type `bytes32`*
2. **paymentHash** *of type `bytes32`*
3. **challenger** *of type `address`*

--- 
### SetConfigurationEvent(address,address)


**Execution cost**: No bound available


Params:

1. **oldConfiguration** *of type `address`*
2. **newConfiguration** *of type `address`*

--- 
### SetDeployerEvent(address,address)


**Execution cost**: No bound available


Params:

1. **oldDeployer** *of type `address`*
2. **newDeployer** *of type `address`*

--- 
### SetFraudChallengeEvent(address,address)


**Execution cost**: No bound available


Params:

1. **oldFraudChallenge** *of type `address`*
2. **newFraudChallenge** *of type `address`*

--- 
### SetOperatorEvent(address,address)


**Execution cost**: No bound available


Params:

1. **oldOperator** *of type `address`*
2. **newOperator** *of type `address`*

--- 
### SetSecurityBondEvent(address,address)


**Execution cost**: No bound available


Params:

1. **oldAddress** *of type `address`*
2. **newAddress** *of type `address`*

--- 
### SetValidatorEvent(address,address)


**Execution cost**: No bound available


Params:

1. **oldAddress** *of type `address`*
2. **newAddress** *of type `address`*


## Methods
### setSecurityBond(address)
>
>Set the security bond contract


**Execution cost**: No bound available


Params:

1. **newAddress** *of type `address`*

    > The (address of) SecurityBond contract instance



--- 
### deployer()


**Execution cost**: less than 1006 gas

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

--- 
### challenge(tuple,tuple)


**Execution cost**: No bound available


Params:

1. **trade** *of type `tuple`*
2. **payment** *of type `tuple`*


--- 
### configuration()


**Execution cost**: No bound available

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

--- 
### fraudChallenge()


**Execution cost**: No bound available

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

--- 
### destructor()
>
>Return the address that is able to initiate self-destruction


**Execution cost**: less than 786 gas

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

--- 
### operator()


**Execution cost**: less than 808 gas

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

--- 
### securityBond()


**Execution cost**: No bound available

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

--- 
### setConfiguration(address)
>
>Set the configuration contract


**Execution cost**: No bound available


Params:

1. **newConfiguration** *of type `address`*

    > The (address of) Configuration contract instance



--- 
### setDeployer(address)
>
>Set the deployer of this contract


**Execution cost**: No bound available


Params:

1. **newDeployer** *of type `address`*

    > The address of the new deployer



--- 
### setFraudChallenge(address)
>
>Set the fraud challenge contract


**Execution cost**: No bound available


Params:

1. **newFraudChallenge** *of type `address`*

    > The (address of) FraudChallenge contract instance



--- 
### setOperator(address)
>
>Set the operator of this contract


**Execution cost**: No bound available


Params:

1. **newOperator** *of type `address`*

    > The address of the new operator



--- 
### setValidator(address)
>
>Set the validator contract


**Execution cost**: No bound available


Params:

1. **newAddress** *of type `address`*

    > The (address of) Validator contract instance



--- 
### triggerDestroy()
>
>Destroy this contract
>
> Requires that msg.sender is the defined destructor


**Execution cost**: No bound available




--- 
### validator()


**Execution cost**: No bound available

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

--- 
### challenge((uint256,int256,((address,uint256),(address,uint256)),int256,(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,uint256,uint8,(int256,(bytes32,bytes32),(int256,int256)),((int256,int256),(int256,int256)),((int256,(address,uint256)),(int256,(address,uint256))[])),((int256,int256),(int256,int256)),(bytes32,(bytes32,bytes32,uint8)),uint256,uint256),(uint256,int256,(address,uint256),(uint256,address,(int256,int256),((int256,(address,uint256)),(int256,(address,uint256))[])),(uint256,address,(int256,int256),((int256,(address,uint256))[])),(int256,int256),((bytes32,(bytes32,bytes32,uint8)),(bytes32,(bytes32,bytes32,uint8))),uint256,uint256))
>
>Submit one trade candidate and one payment candidate in continuous Fraud Challenge (FC) to be tested for duplicate driip nonce


**Execution cost**: No bound available


Params:

1. **payment** *of type `undefined`*

    > Payment with duplicate driip nonce

2. **trade** *of type `undefined`*

    > Trade with duplicate driip nonce



[Back to the top ↑](#fraudchallengebyduplicatedriipnonceoftradeandpayment)
