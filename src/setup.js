// Module for setting up Podman on MacOS and Windows

// ********************
// CONSTANTS & MODULES
// ********************
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const os = require('os');


// ********************
// MACOS FUNCTIONS
// ********************
async function isBrewInstalled() {
    const { error, stdout, stderr } = await exec('brew --version');
    return !error;
}

async function installBrew() {
    const command = '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"';
    try {
        if (await isBrewInstalled()) {
            console.log('Brew is already installed');
            return true;
        }
        await exec(command);
        console.log('Brew installed successfully:');
        return true;
    } catch (error) {
        console.error('Failed to install Brew:', error);
        return false;
    }
}

async function installPodmanMac() {
    // Check if Brew is installed
    const brew = await installBrew()
    if (!brew) {
        console.error('Failed to install Brew');
        return false;
    }
    // Check if Podman is installed
    const podman = await isPodmanInstalled();
    if (podman) {
        console.log('Podman is already installed');
        return true;
    }
    // Install Podman using brew
    const command = 'brew install podman';
    try {
        await exec(command);
        console.log('Podman installed successfully');
        return true;
    } catch (error) {
        console.error('Failed to install Podman:', error);
        return false;
    }
}

// ********************
// WINDOWS FUNCTIONS
// ********************
function installPodmanWin(callback) {}

// ********************
// HELPER FUNCTIONS
// ********************
async function isPodmanInstalled() {
    const { error, stdout, stderr } = await exec('podman --version')
    return !error;
}

// ********************
// ENTRY FUNCTION
// ********************
async function setupPodman() {
    // MacOS Setup
    if (os.platform() === 'darwin') {
        await installPodmanMac();
        const result = await isPodmanInstalled();
        console.log('Podman installed:', result);
    // Windows Setup
    } else if (os.platform() === 'win32') {
        return await installPodmanWin();
    // Unsupported Platform
    } else {
        console.error('Unsupported platform:', os.platform());
        return false;
    }
}

module.exports = {setupPodman};


/* 
I will need to setup a podman machine and podman compose

MacOS:
podman machine init
podman machine start

// install podman-compose
brew install podman-compose

Using this I can run docker compose files with podman

Podman deletion: https://github.com/containers/podman/issues/11319
*/