const fs = require('fs');
// const Web3 = require('web3');
const truffle = require('../truffle');
const helpers = require('./helpers');

module.exports = async () => {
    const network = getNetworkFromArgs();
    const networkId = getNetworkIdFromArgs();
    const addressesFilePath = getAddressesFilePathFromArgs(); // E.g. '../addresses_ropsten.json'

    // const providerUrl = `http://${truffle.networks[network].host}:${truffle.networks[network].port}`;
    // const web3 = new Web3(providerUrl);

    const {Configuration, Validator, DriipSettlementChallenge, Exchange} = initContracts(networkId, addressesFilePath);

    const exchangeAddress = helpers.getOwnerAccountFromArgs();
    const exchangePassword = helpers.getPasswordFromArgs();

    helpers.unlockAddress(web3, exchangeAddress, exchangePassword, 3600);

    console.log((await Configuration.getDriipSettlementChallengeTimeout.call()).toString());
    await Configuration.setDriipSettlementChallengeTimeout(300);
    console.log((await Configuration.getDriipSettlementChallengeTimeout.call()).toString());

    console.log(await DriipSettlementChallenge.validator.call());
    await Configuration.changeValidator(Validator.address);
    console.log(await DriipSettlementChallenge.validator.call());

    console.log(await Exchange.validator.call());
    await Exchange.changeValidator(Validator.address);
    console.log(await Exchange.validator.call());

    helpers.lockAddress(web3, exchangeAddress);
};

const initContract = (jsonFilePath, address) => {
    const parsed = JSON.parse(fs.readFileSync(jsonFilePath));
    return new web3.eth.Contract(parsed.abi, address);
};

const initContracts = (networkId, addressesFilePath) => {
    const parsed = JSON.parse(fs.readFileSync(addressesFilePath));
    const networkAddresses = parsed.networks[networkId];
    return {
        Configuration: initContract('./build/contracts/Configuration.json', networkAddresses.Configuration),
        Validator: initContract('./build/contracts/Validator.json', networkAddresses.Validator),
        Exchange: initContract('./build/contracts/Exchange.json', networkAddresses.Exchange),
        DriipSettlementChallenge: initContract('./build/contracts/DriipSettlementChallenge.json', networkAddresses.DriipSettlementChallenge),
    };
};

const getAddressesFilePathFromArgs = () => {
    var i;

    for (i = 0; i < process.argv.length; i++) {
        if (process.argv[i] == '--addresses') {
            if (i >= process.argv.length + 1)
                throw new Error('Error: Missing argument for \'--addresses\'');

            const addresses = process.argv[i + 1];
            return addresses;
        }
    }
    throw new Error('Error: Missing \'--addresses\' parameter');
};

const getNetworkFromArgs = () => {
    var i;

    for (i = 0; i < process.argv.length; i++) {
        if (process.argv[i] == '--network') {
            if (i >= process.argv.length + 1)
                throw new Error('Error: Missing argument for \'--network\'');

            const network = process.argv[i + 1];
            return network;
        }
    }
    throw new Error('Error: Missing \'--network\' parameter');
};

const getNetworkIdFromArgs = () => {
    var i;

    for (i = 0; i < process.argv.length; i++) {
        if (process.argv[i] == '--network-id') {
            if (i >= process.argv.length + 1)
                throw new Error('Error: Missing argument for \'--network-id\'');

            const networkId = process.argv[i + 1];
            if (!/^[0-9]*$/.test(address))
                throw new Error('Error: Invalid value specified in \'--network-id\' argument');
            return networkId;
        }
    }
    throw new Error('Error: Missing \'--network-id\' parameter');
};
