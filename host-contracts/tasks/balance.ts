import { task } from "hardhat/config";
import { formatEther } from "ethers";

task("balance", "Prints the list of accounts and their balances")
  .setAction(async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
      const address = await account.getAddress();
      const balance = await hre.ethers.provider.getBalance(address);
      console.log(`${address}: ${formatEther(balance)} ETH`);
    }
  });