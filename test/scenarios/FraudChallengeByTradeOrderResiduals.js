const chai = require('chai');
const sinonChai = require("sinon-chai");
const chaiAsPromised = require("chai-as-promised");
const {Wallet, Contract, utils} = require('ethers');
const mocks = require('../mocks');
const cryptography = require('omphalos-commons').util.cryptography;
const MockedFraudChallenge = artifacts.require("MockedFraudChallenge");
const MockedConfiguration = artifacts.require("MockedConfiguration");
const MockedValidator = artifacts.require("MockedValidator");
const MockedClientFund = artifacts.require("MockedClientFund");

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

let provider;

module.exports = (glob) => {
    describe('FraudChallengeByTradeOrderResiduals', () => {
        let web3FraudChallengeByTradeOrderResiduals, ethersFraudChallengeByTradeOrderResiduals;
        let web3FraudChallenge, ethersFraudChallenge;
        let web3Configuration, ethersConfiguration;
        let web3Validator, ethersValidator;
        let web3ClientFund, ethersClientFund;
        let blockNumber0, blockNumber10, blockNumber20;

        before(async () => {
            provider = glob.signer_owner.provider;

            web3FraudChallengeByTradeOrderResiduals = glob.web3FraudChallengeByTradeOrderResiduals;
            ethersFraudChallengeByTradeOrderResiduals = glob.ethersIoFraudChallengeByTradeOrderResiduals;

            web3FraudChallenge = await MockedFraudChallenge.new(glob.owner);
            ethersFraudChallenge = new Contract(web3FraudChallenge.address, MockedFraudChallenge.abi, glob.signer_owner);
            web3Configuration = await MockedConfiguration.new(glob.owner);
            ethersConfiguration = new Contract(web3Configuration.address, MockedConfiguration.abi, glob.signer_owner);
            web3Validator = await MockedValidator.new(glob.owner);
            ethersValidator = new Contract(web3Validator.address, MockedValidator.abi, glob.signer_owner);
            web3ClientFund = await MockedClientFund.new(/*glob.owner*/);
            ethersClientFund = new Contract(web3ClientFund.address, MockedClientFund.abi, glob.signer_owner);

            await ethersFraudChallengeByTradeOrderResiduals.changeFraudChallenge(ethersFraudChallenge.address);
            await ethersFraudChallengeByTradeOrderResiduals.changeConfiguration(ethersConfiguration.address);
            await ethersFraudChallengeByTradeOrderResiduals.changeValidator(ethersValidator.address);
            await ethersFraudChallengeByTradeOrderResiduals.changeClientFund(ethersClientFund.address);

            await ethersConfiguration.registerService(ethersFraudChallengeByTradeOrderResiduals.address, 'OperationalMode');
        });

        beforeEach(async () => {
            blockNumber0 = await provider.getBlockNumber();
            blockNumber10 = blockNumber0 + 10;
            blockNumber20 = blockNumber0 + 20;
        });

        describe('constructor', () => {
            it('should initialize fields', async () => {
                const owner = await web3FraudChallengeByTradeOrderResiduals.owner.call();
                owner.should.equal(glob.owner);
            });
        });

        describe('owner()', () => {
            it('should equal value initialized', async () => {
                const owner = await ethersFraudChallengeByTradeOrderResiduals.owner();
                owner.should.equal(utils.getAddress(glob.owner));
            });
        });

        describe('changeOwner()', () => {
            describe('if called with (current) owner as sender', () => {
                afterEach(async () => {
                    await web3FraudChallengeByTradeOrderResiduals.changeOwner(glob.owner, {from: glob.user_a});
                });

                it('should set new value and emit event', async () => {
                    const result = await web3FraudChallengeByTradeOrderResiduals.changeOwner(glob.user_a);
                    result.logs.should.be.an('array').and.have.lengthOf(1);
                    result.logs[0].event.should.equal('ChangeOwnerEvent');
                    const owner = await web3FraudChallengeByTradeOrderResiduals.owner.call();
                    owner.should.equal(glob.user_a);
                });
            });

            describe('if called with sender that is not (current) owner', () => {
                it('should revert', async () => {
                    web3FraudChallengeByTradeOrderResiduals.changeOwner(glob.user_a, {from: glob.user_a}).should.be.rejected;
                });
            });
        });

        describe('fraudChallenge()', () => {
            it('should equal value initialized', async () => {
                const fraudChallenge = await ethersFraudChallengeByTradeOrderResiduals.fraudChallenge();
                fraudChallenge.should.equal(utils.getAddress(ethersFraudChallenge.address));
            });
        });

        describe('changeFraudChallenge()', () => {
            let address;

            before(() => {
                address = Wallet.createRandom().address;
            });

            describe('if called with owner as sender', () => {
                let fraudChallenge;

                beforeEach(async () => {
                    fraudChallenge = await web3FraudChallengeByTradeOrderResiduals.fraudChallenge.call();
                });

                afterEach(async () => {
                    await web3FraudChallengeByTradeOrderResiduals.changeFraudChallenge(fraudChallenge);
                });

                it('should set new value and emit event', async () => {
                    const result = await web3FraudChallengeByTradeOrderResiduals.changeFraudChallenge(address);
                    result.logs.should.be.an('array').and.have.lengthOf(1);
                    result.logs[0].event.should.equal('ChangeFraudChallengeEvent');
                    const fraudChallenge = await web3FraudChallengeByTradeOrderResiduals.fraudChallenge();
                    utils.getAddress(fraudChallenge).should.equal(address);
                });
            });

            describe('if called with sender that is not owner', () => {
                it('should revert', async () => {
                    web3FraudChallengeByTradeOrderResiduals.changeFraudChallenge(address, {from: glob.user_a}).should.be.rejected;
                });
            });
        });

        describe('configuration()', () => {
            it('should equal value initialized', async () => {
                const configuration = await ethersFraudChallengeByTradeOrderResiduals.configuration();
                configuration.should.equal(utils.getAddress(ethersConfiguration.address));
            });
        });

        describe('changeConfiguration()', () => {
            let address;

            before(() => {
                address = Wallet.createRandom().address;
            });

            describe('if called with owner as sender', () => {
                let configuration;

                beforeEach(async () => {
                    configuration = await web3FraudChallengeByTradeOrderResiduals.configuration.call();
                });

                afterEach(async () => {
                    await web3FraudChallengeByTradeOrderResiduals.changeConfiguration(configuration);
                });

                it('should set new value and emit event', async () => {
                    const result = await web3FraudChallengeByTradeOrderResiduals.changeConfiguration(address);
                    result.logs.should.be.an('array').and.have.lengthOf(1);
                    result.logs[0].event.should.equal('ChangeConfigurationEvent');
                    const configuration = await web3FraudChallengeByTradeOrderResiduals.configuration();
                    utils.getAddress(configuration).should.equal(address);
                });
            });

            describe('if called with sender that is not owner', () => {
                it('should revert', async () => {
                    web3FraudChallengeByTradeOrderResiduals.changeConfiguration(address, {from: glob.user_a}).should.be.rejected;
                });
            });
        });

        describe('validator()', () => {
            it('should equal value initialized', async () => {
                const validator = await ethersFraudChallengeByTradeOrderResiduals.validator();
                validator.should.equal(utils.getAddress(ethersValidator.address));
            });
        });

        describe('changeValidator()', () => {
            let address;

            before(() => {
                address = Wallet.createRandom().address;
            });

            describe('if called with owner as sender', () => {
                let validator;

                beforeEach(async () => {
                    validator = await web3FraudChallengeByTradeOrderResiduals.validator.call();
                });

                afterEach(async () => {
                    await web3FraudChallengeByTradeOrderResiduals.changeValidator(validator);
                });

                it('should set new value and emit event', async () => {
                    const result = await web3FraudChallengeByTradeOrderResiduals.changeValidator(address);
                    result.logs.should.be.an('array').and.have.lengthOf(1);
                    result.logs[0].event.should.equal('ChangeValidatorEvent');
                    const validator = await web3FraudChallengeByTradeOrderResiduals.validator();
                    utils.getAddress(validator).should.equal(address);
                });
            });

            describe('if called with sender that is not owner', () => {
                it('should revert', async () => {
                    web3FraudChallengeByTradeOrderResiduals.changeValidator(address, {from: glob.user_a}).should.be.rejected;
                });
            });
        });

        describe('clientFund()', () => {
            it('should equal value initialized', async () => {
                const clientFund = await ethersFraudChallengeByTradeOrderResiduals.clientFund();
                clientFund.should.equal(utils.getAddress(ethersClientFund.address));
            });
        });

        describe('changeClientFund()', () => {
            let address;

            before(() => {
                address = Wallet.createRandom().address;
            });

            describe('if called with owner as sender', () => {
                let clientFund;

                beforeEach(async () => {
                    clientFund = await web3FraudChallengeByTradeOrderResiduals.clientFund.call();
                });

                afterEach(async () => {
                    await web3FraudChallengeByTradeOrderResiduals.changeClientFund(clientFund);
                });

                it('should set new value and emit event', async () => {
                    const result = await web3FraudChallengeByTradeOrderResiduals.changeClientFund(address);
                    result.logs.should.be.an('array').and.have.lengthOf(1);
                    result.logs[0].event.should.equal('ChangeClientFundEvent');
                    const clientFund = await web3FraudChallengeByTradeOrderResiduals.clientFund();
                    utils.getAddress(clientFund).should.equal(address);
                });
            });

            describe('if called with sender that is not owner', () => {
                it('should revert', async () => {
                    web3FraudChallengeByTradeOrderResiduals.changeClientFund(address, {from: glob.user_a}).should.be.rejected;
                });
            });
        });

        describe('challenge()', () => {
            let firstTrade, lastTrade, overrideOptions, filter;

            before(async () => {
                overrideOptions = {gasLimit: 2e6};
            });

            beforeEach(async () => {
                await ethersFraudChallenge.reset(overrideOptions);
                await ethersConfiguration.reset(overrideOptions);
                await ethersValidator.reset(overrideOptions);
                await ethersClientFund.reset(overrideOptions);

                firstTrade = await mocks.mockTrade(glob.owner, {
                    buyer: {
                        wallet: glob.user_a,
                        order: {
                            hashes: {
                                wallet: cryptography.hash('some buy order wallet hash')
                            }
                        }
                    },
                    seller: {
                        wallet: glob.user_b,
                        order: {
                            hashes: {
                                wallet: cryptography.hash('some sell order wallet hash')
                            }
                        }
                    },
                    blockNumber: utils.bigNumberify(blockNumber10)
                });
                lastTrade = await mocks.mockTrade(glob.owner, {
                    buyer: {
                        wallet: glob.user_a,
                        order: {
                            hashes: {
                                wallet: cryptography.hash('some buy order wallet hash')
                            }
                        }
                    },
                    seller: {
                        wallet: glob.user_b,
                        order: {
                            hashes: {
                                wallet: cryptography.hash('some sell order wallet hash')
                            }
                        }
                    },
                    blockNumber: utils.bigNumberify(blockNumber20)
                });

                filter = await fromBlockTopicsFilter(
                    ...ethersFraudChallengeByTradeOrderResiduals.interface.events.ChallengeByTradeOrderResidualsEvent.topics
                );
            });

            describe('if trades are genuine', () => {
                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.buyer.wallet, firstTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if first trade is not sealed', () => {
                beforeEach(async () => {
                    await ethersValidator.setGenuineTradeSeal(false);
                });

                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.buyer.wallet, firstTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if last trade is not sealed', () => {
                beforeEach(async () => {
                    await ethersValidator.setGenuineTradeSeal(true);
                    await ethersValidator.setGenuineTradeSeal(false);
                });

                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.buyer.wallet, firstTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if wallet is not party in first trade', () => {
                beforeEach(async () => {
                    firstTrade = await mocks.mockTrade(glob.owner, {
                        blockNumber: utils.bigNumberify(blockNumber10)
                    });
                });

                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, lastTrade.buyer.wallet, firstTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if wallet is not party in last trade', () => {
                beforeEach(async () => {
                    lastTrade = await mocks.mockTrade(glob.owner, {
                        blockNumber: utils.bigNumberify(blockNumber20)
                    });
                });

                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.buyer.wallet, firstTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if currency is not in first trade', () => {
                beforeEach(async () => {
                    firstTrade = await mocks.mockTrade(glob.owner, {
                        buyer: {wallet: glob.user_a},
                        seller: {wallet: glob.user_b},
                        currencies: {
                            intended: Wallet.createRandom().address,
                            conjugate: Wallet.createRandom().address,
                        },
                        blockNumber: utils.bigNumberify(blockNumber10)
                    });
                });

                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.buyer.wallet, lastTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if currency is not in last trade', () => {
                beforeEach(async () => {
                    lastTrade = await mocks.mockTrade(glob.owner, {
                        buyer: {wallet: glob.user_a},
                        seller: {wallet: glob.user_b},
                        currencies: {
                            intended: Wallet.createRandom().address,
                            conjugate: Wallet.createRandom().address,
                        },
                        blockNumber: utils.bigNumberify(blockNumber20)
                    });
                });

                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.buyer.wallet, firstTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if wallet is buyer in the one trade and seller in the other', () => {
                beforeEach(async () => {
                    lastTrade = await mocks.mockTrade(glob.owner, {
                        buyer: {wallet: glob.user_c},
                        seller: {wallet: glob.user_a},
                        blockNumber: utils.bigNumberify(blockNumber20)
                    });
                });

                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.buyer.wallet, lastTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if wallet is buyer and buyer order hashes differ', () => {
                beforeEach(async () => {

                    firstTrade = await mocks.mockTrade(glob.owner, {
                        buyer: {
                            wallet: glob.user_a
                        },
                        seller: {
                            wallet: glob.user_b,
                            order: {
                                hashes: {
                                    wallet: cryptography.hash('some sell order wallet hash')
                                }
                            }
                        },
                        blockNumber: utils.bigNumberify(blockNumber10)
                    });
                    lastTrade = await mocks.mockTrade(glob.owner, {
                        buyer: {
                            wallet: glob.user_a
                        },
                        seller: {
                            wallet: glob.user_b,
                            order: {
                                hashes: {
                                    wallet: cryptography.hash('some sell order wallet hash')
                                }
                            }
                        },
                        blockNumber: utils.bigNumberify(blockNumber20)
                    });
                });

                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.buyer.wallet, lastTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if wallet is seller and seller order hashes differ', () => {
                beforeEach(async () => {
                    firstTrade = await mocks.mockTrade(glob.owner, {
                        buyer: {
                            wallet: glob.user_a,
                            order: {
                                hashes: {
                                    wallet: cryptography.hash('some buy order wallet hash')
                                }
                            }
                        },
                        seller: {
                            wallet: glob.user_b
                        },
                        blockNumber: utils.bigNumberify(blockNumber10)
                    });
                    lastTrade = await mocks.mockTrade(glob.owner, {
                        buyer: {
                            wallet: glob.user_a,
                            order: {
                                hashes: {
                                    wallet: cryptography.hash('some buy order wallet hash')
                                }
                            }
                        },
                        seller: {
                            wallet: glob.user_b
                        },
                        blockNumber: utils.bigNumberify(blockNumber20)
                    });
                });

                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.seller.wallet, firstTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if not successive trade party nonces', () => {
                beforeEach(async () => {
                    await ethersValidator.setSuccessiveTradesPartyNonces(false);
                });

                it('should revert', async () => {
                    return ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.buyer.wallet, firstTrade.currencies.intended, overrideOptions
                    ).should.be.rejected;
                });
            });

            describe('if not genuine trade order residuals', () => {
                beforeEach(async () => {
                    await ethersValidator.setGenuineSuccessiveTradeOrderResiduals(false);
                });

                it('should set operational mode exit, store fraudulent trade and seize buyer\'s funds', async () => {
                    await ethersFraudChallengeByTradeOrderResiduals.challenge(
                        firstTrade, lastTrade, firstTrade.buyer.wallet, firstTrade.currencies.intended, overrideOptions
                    );
                    const [operationalModeExit, fraudulentTradesCount, seizedWalletsCount, seizedWallet, seizure, logs] = await Promise.all([
                        ethersConfiguration.isOperationalModeExit(),
                        ethersFraudChallenge.fraudulentTradesCount(),
                        ethersFraudChallenge.seizedWalletsCount(),
                        ethersFraudChallenge.seizedWallets(utils.bigNumberify(0)),
                        ethersClientFund.seizures(utils.bigNumberify(0)),
                        provider.getLogs(filter)
                    ]);
                    operationalModeExit.should.be.true;
                    fraudulentTradesCount.eq(1).should.be.true;
                    seizedWalletsCount.eq(1).should.be.true;
                    seizedWallet.should.equal(utils.getAddress(firstTrade.buyer.wallet));
                    seizure.source.should.equal(utils.getAddress(firstTrade.buyer.wallet));
                    seizure.destination.should.equal(utils.getAddress(glob.owner));
                    logs.should.have.lengthOf(1);
                });
            });
        });
    });
};

const fromBlockTopicsFilter = async (...topics) => {
    return {
        fromBlock: await provider.getBlockNumber(),
        topics
    };
};
