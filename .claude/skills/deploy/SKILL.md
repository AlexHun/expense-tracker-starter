---
name: deploy
description: Deploy the finance-tracker app to staging. Use when the user asks to "deploy", "ship", "push to staging", or run a release. Runs tests, builds the production bundle, then runs `npm run deploy:staging` to publish to the staging environment.
---

# Deploy to staging

Run these steps in order. If any step fails, STOP and report the failure to the user — do not proceed to later steps.

## 1. Run all tests

```bash
npm test
```

If the repo has no `test` script defined in `package.json`, tell the user that tests are not configured and ask whether to proceed without them. Do not silently skip.

## 2. Build the production bundle

```bash
npm run build
```

Confirm the `dist/` directory was produced and the build exited 0.

## 3. Deploy to staging

Run the project's staging deploy script:

```bash
npm run deploy:staging
```

## Reporting

After a successful deploy, report:
- The commit SHA that was pushed (`git rev-parse HEAD`)
- The build size summary from step 2
- The remote URL of the staging branch

If the working tree is dirty before starting, warn the user and ask whether to commit, stash, or abort — do not deploy uncommitted changes.
