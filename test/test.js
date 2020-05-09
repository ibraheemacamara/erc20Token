let IkaToken = artifacts.require("IkaToken")

let tokenInstance;
let expectedTotalSupply = 100000000000000000000000000;

contract("IkaTokenContract", function(accounts){

    it("Contract deployment", () => {
        return IkaToken.deployed().then(function(instance){
            tokenInstance = instance;
            assert(tokenInstance !== undefined, "Contract should be deployed");
        });
    });

    it("Contract name", () => {
        return tokenInstance.name().then(function(result){
            assert.equal(result, "IkaToken", "Name is correct");
        });
    });

    it("Contract symbol", () => {
        return tokenInstance.symbol().then(function(result){
            assert.equal(result, "IKA", "Symbol is correct");
        });
    });

    it("Toatl supply", () => {
        return tokenInstance.totalSupply().then(function(result){
            assert.equal(expectedTotalSupply, result, "Total supply correctly created");
        });
    });

    it("Balance of contract owner", () => {
        return tokenInstance.balanceOf(accounts[0]).then(function(result){
            assert.equal(expectedTotalSupply, result, "Total supply correctly created");
        });
    });

    //Transfer token from owner to another address
    it("Transfer Token", () => {
        return tokenInstance.transfer(accounts[1], 10000).then(function(result){
            
            //Account 0 (owner) should be withdrowed by 10000
            return tokenInstance.balanceOf(accounts[0]).then(function(result){
                assert.equal(expectedTotalSupply - 10000, result);

                //Account[1] should be credited by 10000
                return tokenInstance.balanceOf(accounts[1]).then(function(result){
                    assert.equal(10000, result);
                });
            });
        });
    });
});