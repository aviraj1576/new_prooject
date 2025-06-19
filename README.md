# 🚀 **Shadow IT Detection — Complete Setup Guide**

This guide explains **how to clone, configure, deploy, and run** your blockchain-based Shadow IT monitoring system.

---

## ⚙️ **Technologies Used**

* **Hardhat (Local Ethereum Testnet)**
* **Solidity (Smart Contract)**
* **Lighthouse (Decentralized Storage)**
* **Node.js (Backend Agent)**

---

## 📦 **Project Structure**

| Folder/File                | Description                                  |
| -------------------------- | -------------------------------------------- |
| `contracts/AllowList.sol`  | Smart contract                               |
| `scripts/deploy.js`        | Deployment script                            |
| `uploadAllowlist.js`       | Hashes & uploads allowlist                   |
| `allowlist.js`             | Predefined allowlist (already inside repo ✅) |
| `allowlist-agent/agent.js` | Monitoring agent                             |
| `.env`                     | Environment configuration                    |

---

## 🖥️ **Step-by-Step Setup**

---

### 1️⃣ **Clone the GitHub Repository**

Open your terminal and clone:

```bash
git clone https://github.com/aviraj1576/new_prooject/
cd new_prooject
```

---

### 2️⃣ **Install All Dependencies**

Inside your project directory, run:

```bash
npm install
npm install ps-list ethers dotenv @lighthouse-web3/sdk crypto
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

✅ **Note:** No need to manually create `allowlist.js` — it already exists inside your repo.

---

### 3️⃣ **Get Lighthouse API Key**

* Sign up (or login) at: [https://lighthouse.storage/](https://lighthouse.storage/)
* Go to **API Keys** section.
* Generate a new API key.

---

### 4️⃣ **Configure `.env` File**

Create a `.env` file in root directory:

```bash
touch .env
```

Add the following contents:

```env
RPC_URL=http://127.0.0.1:8545
LIGHTHOUSE_API_KEY=your_lighthouse_api_key
INITIAL_CID=
CONTRACT_ADDRESS=
```

👉 You will update `INITIAL_CID` and `CONTRACT_ADDRESS` shortly.

---

### 5️⃣ **Generate Allowlist & Upload to Lighthouse**

Simply run:

```bash
node uploadAllowlist.js
```

This will:

* Hash all apps from your `allowlist.js`
* Save hashes into `hashedAllowlist.json`
* Upload file to Lighthouse
* Print **CID** on console output

✅ **Copy the CID shown** and paste it into `.env` file:

```env
INITIAL_CID=your_uploaded_cid_here
```

---

### 6️⃣ **Start Local Blockchain (Hardhat Node)**

In a new terminal window (keep it running):

```bash
npx hardhat node
```

✅ This will simulate your Ethereum blockchain locally.

---

### 7️⃣ **Deploy Smart Contract**

In another terminal window (in root directory):

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Output will show:

```
Deploying contract with account: 0x....
Allowlist contract deployed to: 0xABCDEF....
```

✅ **Copy the contract address** and update `.env`:

```env
CONTRACT_ADDRESS=your_deployed_contract_address
```

---

### 8️⃣ **Run Monitoring Agent**

Go to agent folder:

```bash
cd allowlist-agent
```

Start the agent:

```bash
node agent.js
```

---

✅ The agent will:

* Read allowlist CID from deployed smart contract.
* Download hashed allowlist from Lighthouse.
* Monitor your system processes continuously.
* Print `🚨 Shadow IT detected` if any unauthorized app is running.

---

## 🔄 **Whenever you want to update the allowlist:**

1️⃣ Update `allowlist.js` file (add or remove applications).
2️⃣ Rerun:

```bash
node uploadAllowlist.js
```

3️⃣ Take new CID, update `INITIAL_CID` in `.env`.
4️⃣ Rerun deploy:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

## 🔬 **Testing & Debugging Tips**

* You can open multiple terminals to monitor:

  * Hardhat node (`npx hardhat node`)
  * Deployment script (`npx hardhat run scripts/deploy.js`)
  * Agent (`node agent.js`)
* Add unauthorized apps manually to test shadow IT detection.

---
