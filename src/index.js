"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function initializeFolder(path) {
}
exports.initializeFolder = initializeFolder;
//# sourceMappingURL=index.js.map