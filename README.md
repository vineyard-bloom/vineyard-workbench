# Vineyard Workbench

This project clones and symlinks the main Vineyard projects, creating an environment to efficiently work on multiple vineyard projects at once.

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