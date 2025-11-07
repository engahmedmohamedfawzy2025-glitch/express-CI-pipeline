# express-CI-pipeline
Minimal Node.js/Express app with automated CI pipeline using GitHub Actions, Jest, ESLint, and Prettier.

Part 1 — Theory (What, Why, How)
1) CI vs. CD (and where our project fits)

Continuous Integration (CI): every code change is integrated into the main branch frequently. A pipeline automatically runs to install dependencies, lint the code, run tests, and report results. The goal is to detect issues early and keep main always healthy.

Continuous Delivery (CD): artifacts are always in a deployable state and released to staging/production with a human approval step.

Continuous Deployment (CDp): like Delivery but releases go to production automatically once CI passes.

In this starter, we focus on CI only: build/lint/test/coverage on each push/PR. (No Docker, no deploy.)

2) Core CI building blocks

Triggers: events that start the pipeline (e.g., push on main, pull_request).

Jobs & Steps: a job runs on a machine (runner). Inside it, steps execute commands (checkout, install, test...).

Runners: the compute that executes the job (GitHub-hosted ubuntu-latest or self-hosted).

Caching: reusing downloaded dependencies to speed up builds (actions/setup-node with cache: npm).

Artifacts: files produced by the pipeline for later download (e.g., coverage report). Useful as evidence.

Logs & Annotations: CI output that pinpoints failing tests, lint errors, etc.

Secrets: encrypted variables (tokens, API keys) available to jobs. (We won’t need any for this minimal CI.)

3) Quality gates you typically enforce in CI

Install succeeds (dependency graph is valid).

Static checks (ESLint) — code style and basic correctness.

Unit/Integration tests (Jest + Supertest) — fast feedback on behavior.

Coverage — collect a coverage summary to track test depth (optional threshold later).

Status checks on Pull Requests — block merges if CI fails (via branch protection).

4) How GitHub Actions interprets the workflow

A push or pull_request event fires.

The workflow YAML is parsed; jobs are scheduled on runners.

Steps run top-to-bottom: checkout → setup Node → cache/npm ci → lint → test → upload artifact.

Results surface in the Actions tab and as a PR status check.


Part 2 — Hands‑On (Minimal Express + CI)
Repository structure

express-ci-starter/
│
├── src/
│ ├── app.js
│ ├── server.js
│ └── routes/
│ └── health.js
│
├── tests/
│ └── app.test.js
│
├── .github/
│ └── workflows/
│ └── ci.yml
│
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── jest.config.js
├── package.json
└── README.md



