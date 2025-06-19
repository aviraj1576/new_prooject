require('dotenv').config();
const hre = require("hardhat");

async function main() {
  const initialCID = process.env.INITIAL_CID;
  if (!initialCID) {
    console.error("❌ INITIAL_CID not found in .env");
    process.exit(1);
  }

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);
  console.log("Using Allowlist CID:", initialCID);

  const AllowList = await hre.ethers.getContractFactory("AllowList");
  const allowlist = await AllowList.deploy(initialCID);
  await allowlist.waitForDeployment();

  console.log("✅ Contract deployed at:", await allowlist.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
