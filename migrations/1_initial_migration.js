const Migrations = artifacts.require("Migrations");
const IkaToken = artifacts.require("IkaToken");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(IkaToken);
};
