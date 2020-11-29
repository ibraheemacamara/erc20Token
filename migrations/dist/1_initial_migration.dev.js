"use strict";

var Migrations = artifacts.require("Migrations");

var IkaToken = artifacts.require("IkaToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(IkaToken);
};