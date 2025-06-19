const crypto = require('crypto');
const fs = require('fs');
const lighthouse = require('@lighthouse-web3/sdk');
require('dotenv').config();

// Import the allowlist from allowlist.js
const allowlist = require('./allowlist-agent/allowlist.js');

// Step 1: Hash the allowlist
const hashes = allowlist.map(app => {
  const hash = crypto.createHash('sha256').update(app.toLowerCase()).digest('hex');
  return "0x" + hash;
});

// Step 2: Save hashed allowlist to file
fs.writeFileSync('hashedAllowlist.json', JSON.stringify(hashes, null, 2));
console.log("✅ Hashed allowlist saved as hashedAllowlist.json");

// Step 3: Upload to Lighthouse
async function upload() {
  const apiKey = process.env.LIGHTHOUSE_API_KEY;
  const path = 'hashedAllowlist.json';

  const response = await lighthouse.upload(path, apiKey);
  console.log("✅ File uploaded successfully to Lighthouse");
  console.log("📦 CID:", response.data.Hash);
}

upload().catch(console.error);
