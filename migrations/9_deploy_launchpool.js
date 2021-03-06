const Date = artifacts.require("Date");
const Launchpool = artifacts.require("Launchpool/Launchpool");
const Mint = artifacts.require("Mint");
const Treasury = artifacts.require("Treasury");

const depositOptions = require("../test/DepositOptions");

module.exports = async function (deployer, _network, _accounts) {
  require("dotenv").config();

  const mint = await Mint.deployed();
  const treasury = await Treasury.deployed();

  await deployer.link(Date, Launchpool);

  const launchpool = await deployer.deploy(
    Launchpool,
    treasury.address,
    depositOptions,
    [
      {
        agreement: mint.address,
        reward: process.env.LAUNCHPOOL_MINT_REFIL_REWARD,
      },
      {
        agreement: treasury.address,
        reward: process.env.LAUNCHPOOL_TREASURY_REFIL_REWARD,
      },
    ]
  );

  mint.initialize([
    {
      agreement: launchpool.address,
      share: 100,
    },
  ]);

  console.log("Deployed", launchpool.address);
};
