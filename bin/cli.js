#!/usr/bin/env node

// Dependacy
const { execSync } = require("child_process");

// Get Folder name
const repoName = process.argv[2] || "my-app";

//flag to switch the terminal when CMD is found
let switchToCMD = false;

// Run command and pass true to return with error
const runCommand = (command, error = true) => {
  let initialCommand = command;

  if(switchToCMD && secondaryCommand !== undefined) initialCommand = secondaryCommand;


  try {
    execSync(`${initialCommand}`, { stdio: "inherit" });
    return true;
  } catch (e) {
    if (error) {
      console.error("\x1b[31m%s\x1b[0m", `Failed to execute ${initialCommand} : ${e}`);
    } if( secondaryCommand === undefined){
      return false;
    }
    console.log("Trying secondary command");
    switchToCMD = true;
    // return false;
  }

  try {
    execSync(`${secondaryCommand}`, { stdio: "inherit" });
  } catch (e) {
    if (error) {
      console.error("\x1b[31m%s\x1b[0m", `Failed to execute ${command} : ${e}`);
    }
    return false;
  }
  return true;
};

// Git Clone Link
const gitCheckoutCommand = `git clone --dept 1 https://github.com/startertemp/nextjs-hardhat ${repoName}`;

//* INSTALLATION PROCEDURE
// Cloning Project
console.log(
  "\x1b[34m%s\x1b[0m",
  `----- Downloading project template to ${repoName}`
);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(1);

// Installing the Front-end dependacies
console.log("\x1b[34m%s\x1b[0m", `----- Installing Frontend dependancies`);
const installFDeps = runCommand(`cd ${repoName}/frontend && npm i`);
if (!installFDeps) process.exit(1);

// Installing backend dependancies
console.log("\x1b[34m%s\x1b[0m", `----- Installing Backend dependancies`);
const installBDeps = runCommand(`cd ${repoName}/backend && npm i`);
if (!installBDeps) process.exit(1);

// Clearing out installation files and setting up README File
console.log("\x1b[34m%s\x1b[0m", `----- Clearing out Installation Directories`);
//added secondary commands for failover situations
const clearBin = runCommand(`cd ${repoName} && rm -rf bin`, `cd ${repoName} && rd /s /q bin`);
const clearPackage = runCommand(`cd ${repoName} && rm -fv package.json`, `cd ${repoName} && del package.json`);
const clearGithub = runCommand(`cd ${repoName} && rm -rf .github`, `cd ${repoName} && rd /s /q .github`);
const clearGit = runCommand(`cd ${repoName} && rm -rf .git`, `cd ${repoName} && rd /s /q .git`);
const clearCOC = runCommand(`cd ${repoName} && rm -fv CODE_OF_CONDUCT.md`, `cd ${repoName} && del CODE_OF_CONDUCT.md`);
const clearC = runCommand(`cd ${repoName} && rm -fv CONTRIBUTING.md`, `cd ${repoName} && del CONTRIBUTING.md`);
const clearL = runCommand(`cd ${repoName} && rm -fv LICENSE`, `cd ${repoName} && del LICENSE`);
const readmeFix = runCommand(`cd ${repoName} && mv "beautify.md" "README.md"`, `cd ${repoName} && move "beautify.md" "README.md"`);
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

// Creating new Git
console.log("\x1b[34m%s\x1b[0m", `----- Creating a new Git`);
const newGit = runCommand(`cd ${repoName} && git init`);
if (!newGit) process.exit(1);

// Successfully Installed
console.log("\x1b[32m%s\x1b[0m", `------ Successfully Installed All!`);

// Guide on how to proceed
console.log(`cd frontend && npm run dev`);

// Sharing Love
// Starter Comment
console.log(
  "\x1b[31m%s\x1b[0m",
  `----- Made by Love with Startertemp and LearnWeb3DAO`
);
