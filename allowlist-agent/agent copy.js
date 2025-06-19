import dotenv from 'dotenv';
import { ethers } from 'ethers';
import psList from 'ps-list';
import lighthouse from '@lighthouse-web3/sdk';
import crypto from 'crypto';

dotenv.config();

const contractAddress = process.env.CONTRACT_ADDRESS;
const rpcUrl = process.env.RPC_URL;
const apiKey = process.env.LIGHTHOUSE_API_KEY;

const contractAbi = ["function allowlistCID() external view returns (string)"];
const provider = new ethers.JsonRpcProvider(rpcUrl);
const allowListContract = new ethers.Contract(contractAddress, contractAbi, provider);

const SYSTEM_CRITICAL_EXCEPTIONS = new Set([
    'System', 'System Idle Process', 'Registry', 'MemCompression', 'smss.exe',
    'csrss.exe', 'wininit.exe', 'winlogon.exe', 'services.exe', 'lsass.exe',
    'LsaIso.exe', 'svchost.exe', 'taskhostw.exe', 'dllhost.exe', 'RuntimeBroker.exe',
    'explorer.exe', 'dwm.exe', 'sihost.exe', 'ctfmon.exe', 'fontdrvhost.exe',
    'TextInputHost.exe', 'StartMenuExperienceHost.exe', 'ShellExperienceHost.exe',
    'SearchHost.exe', 'Widgets.exe', 'WidgetService.exe', 'MsMpEng.exe', 'NisSrv.exe',
    'SecurityHealthService.exe', 'SecurityHealthSystray.exe', 'smartscreen.exe',
    'audiodg.exe', 'spoolsv.exe', 'nvcontainer.exe', 'NVDisplay.Container.exe',
    'RadeonSoftware.exe', 'AMDRSServ.exe', 'AMDRSSrcExt.exe', 'igfxCUIService.exe',
    'igfxEM.exe', 'RtkAudUService64.exe','[System Process]','Secure System','Memory Compression',
    'SearchProtocolHost.exe','WindowsPackageManagerServer.exe', 'sppsvc.exe', 'MoUsoCoreWorker.exe',
    'SIHClient.exe', 'TiWorker.exe', 'LockApp.exe', 'TrustedInstaller.exe',
    'powercfg.exe', 'MpCmdRun.exe', 'CompatTelRunner.exe', 'VSSVC.exe',
    'SDXHelper.exe', 'NgcIso.exe', 'PickerHost.exe', 'BackgroundTransferHost.exe',
    'wermgr.exe', 'lpremove.exe', 'lpksetup.exe', 'SrTasks.exe', 'msiexec.exe'
]);

let allowlistHashes = new Set();
let currentCID = "";

function hashApp(name) {
    return crypto.createHash('sha256').update(name.toLowerCase()).digest('hex');
}

async function refreshAllowlist() {
    console.log("\n🔄 Checking for allowlist updates...");
    const cid = await allowListContract.allowlistCID();

    if (cid === currentCID) {
        console.log("✅ Allowlist already up-to-date.");
        return;
    }

    const { data } = await lighthouse.fetch(cid, apiKey);
    const hashList = JSON.parse(data);
    allowlistHashes = new Set(hashList);
    currentCID = cid;

    console.log(`✅ Loaded ${allowlistHashes.size} hashed apps from blockchain allowlist`);
}

async function checkProcesses() {
    console.log("\n🔍 Scanning running processes...");
    const processes = await psList();
    for (const proc of processes) {
        const appName = proc.name;
        if (SYSTEM_CRITICAL_EXCEPTIONS.has(appName)) continue;
        const hashed = hashApp(appName);
        if (!allowlistHashes.has("0x" + hashed)) {
            console.log(`🚨 Shadow IT detected: ${appName}`);
        }
    }
}

async function main() {
    await refreshAllowlist();
    setInterval(checkProcesses, 20000);
    setInterval(refreshAllowlist, 120000);
}

main();
