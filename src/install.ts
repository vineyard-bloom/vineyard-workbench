require('source-map-support').install()
import * as fs from 'fs'
import * as shell from 'shelljs'

export type StringMap = { [key: string]: string }

const projects: { [key: string]: string } = {
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
}

function shellCommand(command: string) {
  console.log('shell', command)
  if (process.platform === 'win32') {
    shell.exec('powershell "' + command + '"')
  }
  else {
    shell.exec(command)
  }
}

export function installProject(projectName: string, branch: string) {
  shellCommand("git clone git@github.com:vineyard-bloom/" + projectName + ".git")
  shell.cd(projectName)
  shellCommand('git checkout ' + branch)
  shellCommand("yarn unlink")
  shellCommand("yarn link")
  shell.cd('..')
}

export function linkDependencies(dependencies: StringMap) {
  for (let dependencyName in dependencies) {
    if (dependencyName.match(/^vineyard-/)) {
      shellCommand("yarn link " + dependencyName)
    }
  }
}

export function crossLink(projectName: string) {
  console.log('Downloading/linking dependencies for', projectName)
  shell.cd(projectName)

  // Ideally yarn would be run after linking but currently a bug in yarn
  // causes all of the links to be overwritten.
  shellCommand("yarn")
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  linkDependencies(packageJson.dependencies)
  if (packageJson.devDependencies)
    linkDependencies(packageJson.devDependencies)

  shell.cd('..')
}

export function initializeFolder(path: string) {
  shell.cd(path)
  for (let name in projects) {
    installProject('vineyard-' + name, projects[name])
  }

  for (let name in projects) {
    crossLink('vineyard-' + name)
  }

}