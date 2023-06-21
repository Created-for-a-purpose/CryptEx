const {ethers} = require("hardhat");
const { expect } = require("chai");

describe("Token", function () {
  
  it('deploys', async()=>{
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    expect(token.target).to.not.equal(0x0);
  })
});
