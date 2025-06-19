# Blockchain Application Allowlist

This project contains a Solidity smart contract (`AllowList.sol`) that manages an on-chain allowlist of approved application names. It works together with an off-chain monitoring agent (`agent.js`) that verifies whether running processes match the allowed applications.

---

## 📂 Key Files

* **`contracts/AllowList.sol`** — The Solidity smart contract that stores the list of approved applications.
* **`scripts/deploy.js`** — Script to deploy the smart contract and initialize it.
* **`agent.js`** — Off-chain monitoring agent that reads currently running processes and checks them against the allowlist.
* **`.env`** — Environment configuration file (already present in the repository).

---

## 🚀 Installation & Setup

### 1️⃣ Install Dependencies

Run the following commands to install required packages:

```bash
npm install ps-list
npm install ethers
npm install dotenv
npm i hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

---

### 2️⃣ Start the Local Blockchain

In your terminal, start a local Hardhat node:

```bash
npx hardhat node
```

> ⚠️ Keep this terminal running. This simulates your local blockchain environment.

---

### 3️⃣ Deploy the Smart Contract

In a **new terminal window**, deploy the contract to the local blockchain:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

> After deployment, copy the deployed contract address shown in the console output.

---

### 4️⃣ Update `.env` File

The `.env` file is already present in the repository.
Simply update the existing value of `CONTRACT_ADDRESS` with the newly deployed contract address:

```env
CONTRACT_ADDRESS=your_deployed_contract_address_here
```

---

### 5️⃣ Run the Monitoring Agent

Once the contract address is updated, start the monitoring agent:

```bash
node agent.js
```

The agent will list currently running processes and compare them against the allowlist stored on-chain.

---

## 🛠 Hardhat Utility Commands

You can also use standard Hardhat commands:

* **Compile contracts:**

```bash
npx hardhat compile
```

* **Run tests (if available):**

```bash
npx hardhat test
```

* **List all Hardhat tasks:**

```bash
npx hardhat help
```

---

