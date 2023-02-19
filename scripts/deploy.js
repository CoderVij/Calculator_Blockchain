
const hre = require("hardhat");

async function main() {
 

  const Calc = await hre.ethers.getContractFactory("Calculator");
  const calc = await Calc.deploy();

  await calc.deployed();

  console.log(
    `Calculator contract deployed to ${calc.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
