const Configuration = artifacts.require('Configuration');
const Exchange = artifacts.require('Exchange');
const Validator = artifacts.require('Validator');

module.exports = async (param1, param2) => {
    const configuration = await Configuration.deployed();

    console.log((await configuration.getDriipSettlementChallengeTimeout.call()).toString());

    await configuration.setDriipSettlementChallengeTimeout(300);

    console.log((await configuration.getDriipSettlementChallengeTimeout.call()).toString());
};
