require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const contractData = require("./contract.json");

const app = express();
app.use(express.json());

// Setup provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract Address and ABI
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your contract address
const contract = new ethers.Contract(contractAddress, contractData.abi, wallet);

// POST: Store Message
app.post("/api/store-message", async (req, res) => {
  try {
    const { message } = req.body;

    // Input validation: Ensure the message is not empty
    if (!message || message.trim() === "") {
      return res.status(400).json({ success: false, error: "Message cannot be empty" });
    }

    // Interact with the smart contract to store the message
    const tx = await contract.storeMessage(message);
    await tx.wait(); // Wait for the transaction to be mined

    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Retrieve Message
app.get("/api/retrieve-message", async (req, res) => {
  try {
    // Retrieve the message from the smart contract
    const message = await contract.retrieveMessage();
    res.json({ success: true, message });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
