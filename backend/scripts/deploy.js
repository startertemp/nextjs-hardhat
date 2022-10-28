const hre = require("hardhat");

//* How to change this file
/*
- Fill in the `ContractName` with your contract name.
- Uncomment the verification process if you want to verify your contract but make sure to uncomment the same in the `hardhat.config.js` and change the values as required.

You can pass in values into your contract like doing the following :
ex : Asssume you have a string and a number to pass
` const lock = await Lock.deploy("hello", 5);`
*/

async function main() {
  //* Deployment Process
  const Lock = await hre.ethers.getContractFactory("ContratName");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log("Contract Deployed to : ", lock.address);

  //* Un-comment this segment for the verification process
  // console.log("Sleeping...");
  // await sleep(50000);

  // await hre.run("verify:verify", {
  //   address: lock.address,
  //   constructorArguments: [],
  // });
}
//* Un-comment this segment for the verification process
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
