#!/usr/bin/env node

//* Dependacy
const { execSync } = require("child_process");
const os = require("node:os");

// Get Folder name
const repoName = (process.argv[2] || "my-app").toLowerCase();

// Get Type of Installation
const insType = (process.argv[3] || "web3modal").toLowerCase();

// Run command and pass true to return with error
const runCommand = (command, error = true) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    if (error) {
      console.error("\x1b[31m%s\x1b[0m", `Failed to execute ${command} : ${e}`);
    }
    return false;
  }
  return true;
};

//* Git Clone Link
const gitCheckoutCommand = `git clone --dept 1 https://github.com/startertemp/nextjs-hardhat ${repoName}`;

//* INSTALLATION PROCEDURE
// Outputting Installation Mode
console.log("\x1b[34m%s\x1b[0m", `Installing ${insType} project`);

//* Cloning Project
console.log(
  "\x1b[34m%s\x1b[0m",
  `----- Downloading project template to ${repoName}`
);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(1);

//* Detect the Operating System
const platform = os.platform();
console.log("\x1b[34m%s\x1b[0m", `----- Detected Platform ${platform}`);
if (!platform) process.exit(1);

//* Install Rainbowkit
if (insType == "rainbowkit") {
  console.log("\x1b[34m%s\x1b[0m", `----- Installing Rainbowkit with Wagmi`);

  // Windows Platform
  if (platform == "win32") {
    // Changing Package Files
    const removeWagPackage = runCommand(
      `cd ${repoName}/frontend && del package.json`
    );
    const packageFix = runCommand(
      `cd ${repoName}/frontend && move "packageRain.json" "package.json"`
    );
    // Changing App File
    const removeWagApp = runCommand(
      `cd ${repoName}/frontend/pages && del _app.jsx`
    );
    const appFix = runCommand(
      `cd ${repoName}/frontend/pages && move "_appRain.jsx" "_app.jsx"`
    );
    if (!removeWagApp && !packageFix && !removeWagPackage && !appFix)
      process.exit(1);
  }

  // Linux/MacOs Platform
  else {
    // Changing Package Files
    const removeWagPackage = runCommand(
      `cd ${repoName}/frontend && rm -fv package.json`
    );
    const packageFix = runCommand(
      `cd ${repoName}/frontend && mv "packageRain.json" "package.json"`
    );
    // Changing App File
    const removeWagApp = runCommand(
      `cd ${repoName}/frontend/pages && rm -fv _app.jsx`
    );
    const appFix = runCommand(
      `cd ${repoName}/frontend/pages && mv "_appRain.jsx" "_app.jsx"`
    );
    if (!removeWagApp && !packageFix && !removeWagPackage && !appFix)
      process.exit(1);
  }
}
//* Install Web3Modal
else {
  console.log("\x1b[34m%s\x1b[0m", `----- Installing Web3Modal`);
  // Windows Platform
  if (platform == "win32") {
    // Removing Rainbowkit App and Package
    const removeWagPackage = runCommand(
      `cd ${repoName}/frontend && del package-rain.json`
    );
    const removeWagApp = runCommand(
      `cd ${repoName}/frontend/pages && del _app-rain.jsx`
    );
    if (!removeWagApp && !removeWagPackage) process.exit(1);
  }

  // Linux/MacOs Platform
  else {
    // Removing Rainbowkit App and Package
    const removeWagPackage = runCommand(
      `cd ${repoName}/frontend && rm -fv package-rain.json`
    );
    // Changing App File
    const removeWagApp = runCommand(
      `cd ${repoName}/frontend/pages && rm -fv _app-rain.jsx`
    );
    if (!removeWagApp && !removeWagPackage) process.exit(1);
  }
}

//* Installing the Front-end dependacies
console.log("\x1b[34m%s\x1b[0m", `----- Installing Frontend dependancies`);
const installFDeps = runCommand(`cd ${repoName}/frontend && npm i`);
if (!installFDeps) process.exit(1);

//* Installing backend dependancies
console.log("\x1b[34m%s\x1b[0m", `----- Installing Backend dependancies`);
const installBDeps = runCommand(`cd ${repoName}/backend && npm i`);
if (!installBDeps) process.exit(1);

//* Remaining File Deletion
// Windows Commands
if (platform == "win32") {
  // Clearing out installation files and setting up README File
  console.log(
    "\x1b[34m%s\x1b[0m",
    `----- Clearing out Installation Directories`
  );
  const clearBin = runCommand(`cd ${repoName} && rd /s /q bin`);
  const clearPackage = runCommand(`cd ${repoName} && del package.json`);
  const clearGithub = runCommand(`cd ${repoName} && rd /s /q .github`);
  const clearGit = runCommand(`cd ${repoName} && rd /s /q .git`);
  const clearCOC = runCommand(`cd ${repoName} && del CODE_OF_CONDUCT.md`);
  const clearC = runCommand(`cd ${repoName} && del CONTRIBUTING.md`);
  const clearL = runCommand(`cd ${repoName} && del LICENSE`);
  const readmeFix = runCommand(
    `cd ${repoName} && move "beautify.md" "README.md`
  );
  if (
    !clearBin &&
    !clearPackage &&
    !clearGithub &&
    !clearCOC &&
    !clearC &&
    !clearL &&
    !clearGit &&
    !readmeFix
  )
    process.exit(1);
}
// Linux/MacOS Commands
else {
  // Clearing out installation files and setting up README File
  console.log(
    "\x1b[34m%s\x1b[0m",
    `----- Clearing out Installation Directories`
  );
  const clearBin = runCommand(`cd ${repoName} && rm -rf bin`);
  const clearPackage = runCommand(`cd ${repoName} && rm -fv package.json`);
  const clearGithub = runCommand(`cd ${repoName} && rm -rf .github`);
  const clearGit = runCommand(`cd ${repoName} && rm -rf .git`);
  const clearCOC = runCommand(`cd ${repoName} && rm -fv CODE_OF_CONDUCT.md`);
  const clearC = runCommand(`cd ${repoName} && rm -fv CONTRIBUTING.md`);
  const clearL = runCommand(`cd ${repoName} && rm -fv LICENSE`);
  const readmeFix = runCommand(
    `cd ${repoName} && mv "beautify.md" "README.md"`
  );
  if (
    !clearBin &&
    !clearPackage &&
    !clearGithub &&
    !clearCOC &&
    !clearC &&
    !clearL &&
    !clearGit &&
    !readmeFix
  )
    process.exit(1);
}

//* Creating new Git
console.log("\x1b[34m%s\x1b[0m", `----- Initialising Git`);
const newGit = runCommand(`cd ${repoName} && git init`);
if (!newGit) process.exit(1);

//* Successfully Installed
console.log("\x1b[32m%s\x1b[0m", `------ Successfully Installed All!`);

//* Guide on how to proceed
console.log(`cd frontend && npm run dev`);

//* Sharing Love
console.log(
  "\x1b[31m%s\x1b[0m",
  `--<3- Made by Love with Startertemp and LearnWeb3DAO`
);
