require('source-map-support').install()
import * as fs from 'fs'
import * as shell from 'shelljs'

const projects = [
  'bitcoin',
  'cron',
  'ethereum',
  'ground',
  'lawn',
  'minotaur',
  'server-template',
  'users'
]

function shellCommand(command: string) {
  console.log('shell', command)
  if (process.platform === 'win32') {
    shell.exec('powershell "' + command + '"')
  }
  else {
    shell.exec(command)
  }
}

export function installProject(projectName: string) {
  shellCommand("git clone git@github.com:vineyard-bloom/" + projectName + ".git")
  shell.cd(projectName)
  shellCommand("yarn unlink")
  shellCommand("yarn link")
  shell.cd('..')
}

export function crossLink(projectName: string) {
  console.log('Downloading/linking dependencies for', projectName)
  shell.cd(projectName)

  // Ideally yarn would be run after linking but currently a bug in yarn
  // causes all of the links to be overwritten.
  shellCommand("yarn")
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const dependencies = packageJson.dependencies
  for (let dependencyName in dependencies) {
    if (dependencyName.match(/^vineyard-/)) {
      shellCommand("yarn link " + dependencyName)
    }
  }
  shell.cd('..')
}

export function initializeFolder(path: string) {
  shell.cd(path)
  for (let project of projects) {
    installProject('vineyard-' + project)
  }

  for (let project of projects) {
    crossLink('vineyard-' + project)
  }

}