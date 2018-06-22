"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
var fs = require("fs");
var shell = require("shelljs");
var projects = {
    'bitcoin': '1.3.0-beta',
    'blockchain': '1.0.0-beta',
    'cron': '1.x',
    'data': '1.0.0-beta',
    'docs': '1.0.0-beta',
    'ethereum': '1.0.0-beta',
    'ground': '1.x',
    'lawn': '1.x',
    'minotaur': '1.0.0-beta',
    'server-template': '1.0.0-beta',
    'users': '1.x'
};
function shellCommand(command) {
    console.log('shell', command);
    if (process.platform === 'win32') {
        shell.exec('powershell "' + command + '"');
    }
    else {
        shell.exec(command);
    }
}
function installProject(projectName, branch) {
    if (!fs.existsSync(projectName))
        shellCommand("git clone git@github.com:vineyard-bloom/" + projectName + ".git");
    shell.cd(projectName);
    shellCommand('git checkout ' + branch);
    shellCommand('git pull');
    shellCommand("yarn unlink");
    shellCommand("yarn link");
    shell.cd('..');
}
exports.installProject = installProject;
function linkDependencies(dependencies) {
    for (var dependencyName in dependencies) {
        if (dependencyName.match(/^vineyard-/)) {
            shellCommand("yarn link " + dependencyName);
        }
    }
}
exports.linkDependencies = linkDependencies;
function crossLink(projectName) {
    console.log('Downloading/linking dependencies for', projectName);
    shell.cd(projectName);
    // Ideally yarn would be run after linking but currently a bug in yarn
    // causes all of the links to be overwritten.
    shellCommand("yarn");
    var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    linkDependencies(packageJson.dependencies);
    if (packageJson.devDependencies)
        linkDependencies(packageJson.devDependencies);
    shell.cd('..');
}
exports.crossLink = crossLink;
function initializeFolder(path) {
    shell.cd(path);
    for (var name_1 in projects) {
        installProject('vineyard-' + name_1, projects[name_1]);
    }
    for (var name_2 in projects) {
        crossLink('vineyard-' + name_2);
    }
}
exports.initializeFolder = initializeFolder;
//# sourceMappingURL=install.js.map