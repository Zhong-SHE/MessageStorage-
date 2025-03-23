const hre = require("hardhat");

async function main() {
  // Get the deployer's address
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory for MessageStorage
  const MessageStorage = await hre.ethers.getContractFactory("MessageStorage");

  // Deploy the contract
  const messageStorage = await MessageStorage.deploy();
  console.log("Waiting for contract deployment...");

  // Wait for the contract to be deployed and get the contract address

  // Log the deployed contract address
  console.log("MessageStorage contract deployed to:", messageStorage.address);
}

// Handle errors and exit gracefully
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
