# Differential serving example.

This repo is a step-by-step demonstration of how to implement differential serving on a toy app. Each step is represented with the following git tags:

- `step-0`: Start.
- `step-1`: Update babel config to add `legacy` and `modern` environments.
- `step-2`: Create a common config object.
- `step-3`: Fork configurations to `legacy` and `modern` (this is the big part).
- `step-4`: Add `module`/`nomodule` code in `src/server/index.js`.
