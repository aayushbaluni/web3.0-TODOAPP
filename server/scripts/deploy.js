const { ethers } = require("hardhat");

const main=async()=>{

  const contactFactory=await ethers.getContractFactory("TaskContract");
  const contract=await contactFactory.deploy();
  await contract.deployed();
  console.log("Contract deployed at :", contract.address);
}
const runMain=async()=>{
    try{
      await main();
      process.exit(0);
    }
    catch(err){
      console.log(err);
      process.exit(1);
    }
}

runMain();
