const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Erc20 smart contract testing", function () {
    let token;
    let accounts;
    const amount = ethers.utils.parseEther("1");
    //this line will take input str format and convert to ether wei format
    before(async () => {
        const contract = await ethers.getContractFactory("ICO");
        token = await contract.deploy();
        accounts = await ethers.getSigners();
        await token.deployed();
    });
    it("Assign initial balance", async function () {
        const totalSupply = await token.totalSupply();
        expect(await token.balanceOf(accounts[0].address)).to.equal(totalSupply);
    });

    it("Do not have permission to mint tokens", async function () {
        const wallet = await token.connect(accounts[2]);
        await expect(wallet.mint(accounts[2].address, amount)).to.be.reverted;
    });

    it("Do not have permission to burn tokens", async function () {
        const wallet = await token.connect(accounts[2]);
        await expect(wallet.burn(accounts[2].address, amount)).to.be.reverted;
    });

    it("buy token with ether", async function () {
        const wallet = token.connect(accounts[2]);
        const option = { value: amount };
        const calculate = (option.value).mul(1000) //1000 is declaird in smart contract
        await wallet.buy(option);
        expect(await wallet.balanceOf(accounts[2].address)).to.equal(calculate)
    });

    it("you dont have permission to withdraw ether from contract", async function () {
        const wallet = token.connect(accounts[2]);
        await expect(wallet.withdraw(amount)).to.be.reverted;
    })

    it("transfer amount to destination account", async function () {
        await token.transfer(accounts[1].address, amount);
        expect(await token.balanceOf(accounts[1].address)).to.equal(amount);
    });

    it("can not transfer above thje amt", async function () {
        const wallet = token.connect(accounts[3]);
        await expect(wallet.transfer(accounts[1].address, 2)).to.be.reverted;
    });

    it("can not transfer from an empty account", async function () {
        const wallet = token.connect(accounts[3]);
        await expect(wallet.transfer(accounts[1].address, 2)).to.be.reverted;
    });

    it("test minting token", async function () {
        const before_mint = await token.balanceOf(accounts[0].address);
        await token.mint(accounts[0].address, amount);
        const after_mint = await token.balanceOf(accounts[0].address);
        expect(after_mint).to.equal((before_mint.add(amount)));
    });

    it("test to burn token", async function () {
        const before_burn = await token.balanceOf(accounts[0].address);
        await token.burn(accounts[0].address, amount);
        const after_burn = await token.balanceOf(accounts[0].address);
        expect(after_burn).to.equal((before_burn.sub(amount)));
    });

    it("wihdraw ether from smart contarct", async function () {
        const before_withdraw = await accounts[0].getBalance();
        await token.withdraw(amount);
        const after_withdraw = await accounts[0].getBalance();
        expect(before_withdraw.lt(after_withdraw)).to.equal(true);
    });

    it("do not have enough ether to buy token", async function () {
        const wallet = token.connect(accounts[3]);
        const big_amount = ethers.utils.parseEther("9999");
        const option = { value: big_amount };
        let error;
        try {
            await wallet.buy(option);
        } catch (err) {
            error = "sender does not enought fund";
        }
        expect(error).to.equal("sender does not enought fund");
    });

});

