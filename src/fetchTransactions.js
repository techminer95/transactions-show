import { ethers } from "ethers";

// Replace with your Infura Project ID
const INFURA_PROJECT_ID = "5c8a4408251144f69108766f1ed046a2";

// Initialize the Ethereum provider
const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
);

// Replace this with the DEX Router address (e.g., Uniswap V2 Router)
const DEX_ROUTER_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD7f24Ff1f3A13D5eD"; // Uniswap Example

export const fetchTransactions = async (address) => {
  const blockNumber = await provider.getBlockNumber(); // Get the latest block number
  const transactions = [];

  // Scan the last 10 blocks
  for (let i = blockNumber - 10; i <= blockNumber; i++) {
    const block = await provider.getBlock(i); // Fetch the block
    const txs = await Promise.all(
      block.transactions.map((txHash) => provider.getTransaction(txHash))
    ); // Fetch all transactions in the block

    // Process each transaction
    txs.forEach((tx) => {
      if (tx.to === address || tx.from === address) {
        let status = "Other";

        const isToDex = tx.to && tx.to.toLowerCase() === DEX_ROUTER_ADDRESS.toLowerCase();
        const isFromDex = tx.from && tx.from.toLowerCase() === DEX_ROUTER_ADDRESS.toLowerCase();

        if (isFromDex) {
          status = "Sell";
        } else if (isToDex) {
          status = "Buy";
        }

        if (tx.data.includes("addLiquidity")) {
          status = "Add Liquidity";
        } else if (tx.data.includes("removeLiquidity")) {
          status = "Remove Liquidity";
        }

        transactions.push({
          from: tx.from,
          to: tx.to,
          value: ethers.utils.formatEther(tx.value), // Convert from wei to ETH
          status,
        });
      }
    });
  }

  return transactions;
};
