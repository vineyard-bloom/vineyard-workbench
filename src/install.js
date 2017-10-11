"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
var fs = require("fs");
var shell = require("shelljs");
var projects = [
    'bitcoin',
    'cellar',
    'cron',
    'error-logging',
    'ethereum',
    'ground',
    'lawn',
    'logging',
    'schema',
    'server-template',
    'users',
    'village'
];
function shellCommand(command) {
    console.log('shell', command);
    if (process.platform === 'win32') {
        shell.exec('powershell "' + command + '"');
    }
    else {
        shell.exec(command);
    }
}
function installProject(projectName) {
    shellCommand("git clone git@github.com:vineyard-bloom/" + projectName + ".git");
    shell.cd(projectName);
    shellCommand("yarn unlink");
    shellCommand("yarn link");
    shell.cd('..');
}
exports.installProject = installProject;
function crossLink(projectName) {
    shell.cd(projectName);
    var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    var dependencies = packageJson.dependencies;
    for (var dependencyName in dependencies) {
        if (dependencyName.match(/^vineyard-/)) {
            shellCommand("yarn link " + dependencyName);
        }
    }
    shellCommand("yarn");
    shell.cd('..');
}
exports.crossLink = crossLink;
function initializeFolder(path) {
    shell.cd(path);
    for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
        var project = projects_1[_i];
        installProject('vineyard-' + project);
    }
    for (var _a = 0, projects_2 = projects; _a < projects_2.length; _a++) {
        var project = projects_2[_a];
        crossLink('vineyard-' + project);
    }
}
exports.initializeFolder = initializeFolder;
//# sourceMappingURL=install.js.map