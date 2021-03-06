const TVTTokenCrowdsale = artifacts.require("TVT/TVTTokenCrowdsale");
const TVTToken = artifacts.require("TVT/TVTToken");

module.exports = async function (deployer, _network, _accounts) {
  require("dotenv").config();

  const token = await TVTToken.deployed();

  const crowdsale = await deployer.deploy(
    TVTTokenCrowdsale,
    process.env.TVT_TOKEN_RATE,
    token.address
  );

  console.log("Deployed", crowdsale.address);
};
