# Vineyard Workbench

This project clones and symlinks the main Vineyard projects, creating an environment to efficiently work on multiple vineyard projects at once.

## Background

Workbench is designed to make it easier to work on vineyard modules that your app may be using without having to fully merge any changes you may have made. This is done by using `yarn link` to symlink a local copy of a vineyard module into your app's `node_modules` directory.

(Workbench is still under development, so the process for symlinking your local vineyard packages is as follows: 
1. Go to your desired local vineyard package root directory.
2. Run `yarn link`.
3. Navigate to your app's `node_modules` directory.
4. Run `yarn link [name-of-package]` (e.g. `yarn link vineyard-ethereum`).
5. You should now be able to edit your local vineyard module and see the changes in your app's `node_modules`.

## Usage

1. In your terminal, navigate to the directory you want to fill with Vineyard libraries.
2. Run `node path-to-vineyard-workbench`

Example:

```
cd dev
mkdir vineyard
git clone git@github.com:vineyard-bloom/vineyard-workbench.git
cd vineyard-workbench
yarn
cd ../vineyard
node ../vineyard-workbench
```  

Vineyard Workbench can be re-run to update the directory of vineyard libraries.
