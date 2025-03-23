require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY, SEPOLIA_RPC_URL } = process.env;

module.exports = {
  solidity: "0.8.20",  // Make sure this matches the version you're using
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,  // Use the value from .env
      accounts: [PRIVATE_KEY],  // Use the private key from .env
      gas: 5000000,  // Gas limit
      gasPrice: 1000000000,  // Adjust gas price if needed
    },
  },
};
