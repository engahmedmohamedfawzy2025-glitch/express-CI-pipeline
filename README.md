# 🚀 Express CI Pipeline

**Minimal Node.js/Express app with an automated CI pipeline using GitHub Actions, Jest, ESLint, and Prettier.**

---

## 📖 Part 1 — Theory (What, Why, How)

### 🔹 CI vs. CD (and where this project fits)

- **Continuous Integration (CI):**  
  Every code change is integrated into the main branch frequently.  
  A pipeline automatically runs to install dependencies, lint the code, run tests, and report results.  
  The goal is to detect issues early and keep the main branch always healthy.

- **Continuous Delivery (CD):**  
  Builds and artifacts are always in a deployable state and can be released to staging or production **after manual approval**.

- **Continuous Deployment (CDp):**  
  Similar to CD, but deployments to production are **fully automated** once CI passes successfully.

> 🧩 In this starter, we focus only on **CI** — build, lint, test, and collect coverage on every push or pull request.  
> (No Docker, no deployment.)

---

### ⚙️ Core CI Building Blocks

| Component | Description |
|------------|-------------|
| **Triggers** | Events that start the pipeline (e.g., `push` on `main`, or `pull_request`). |
| **Jobs & Steps** | A job runs on a virtual machine (runner). Each step executes a command (checkout, install, test, etc.). |
| **Runners** | The compute environment that executes the job (e.g., GitHub-hosted `ubuntu-latest`). |
| **Caching** | Reusing downloaded dependencies to speed up builds (`actions/setup-node` with `cache: npm`). |
| **Artifacts** | Files produced by the pipeline for later download (e.g., coverage reports). Useful as **evidence**. |
| **Logs & Annotations** | CI output that highlights lint/test failures in detail. |
| **Secrets** | Encrypted environment variables (like API tokens) accessible to jobs. (Not used in this minimal CI.) |

---

### 🧠 Quality Gates Enforced by CI

- ✅ **Dependencies installed successfully** (no broken graph).  
- ✅ **Static checks (ESLint)** ensure consistent style and correctness.  
- ✅ **Unit/Integration tests (Jest + Supertest)** verify API behavior.  
- ✅ **Coverage report** shows test depth (enforced later if desired).  
- ✅ **Status checks on Pull Requests** block merges if CI fails (via Branch Protection).

---

### 🔄 How GitHub Actions Interprets the Workflow

1. A `push` or `pull_request` event triggers the workflow.
2. The workflow YAML file is parsed, and jobs are scheduled on a runner.
3. Steps run top-to-bottom:
checkout → setup Node → npm ci (with cache) → lint → test → upload artifact

yaml
Copy code
4. Results appear in:
- The **Actions** tab (per run details)
- As **PR status checks** (Required Checks must pass)

---

## 💻 Part 2 — Hands-On (Minimal Express + CI)

### 🗂 Repository Structure
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
├── jest.config.cjs
├── package.json
└── README.md

yaml
Copy code

---

### 🧩 Tech Stack

| Purpose | Tool |
|----------|------|
| Server Framework | **Express.js** |
| Testing | **Jest + Supertest** |
| Linting | **ESLint** |
| Code Formatting | **Prettier** |
| Continuous Integration | **GitHub Actions** |

---

### ⚡️ CI Workflow Overview

**File:** `.github/workflows/ci.yml`

```yaml
name: CI — Lint & Test
on:
  push:
    branches: [ "main" ]
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci || npm install
      - run: npm run lint
      - run: npm run test:ci
      - uses: actions/upload-artifact@v4
        if: success()
        with:
          name: coverage-report
          path: coverage/
✅ Workflow behavior:

Automatically triggers on every push or pull request to main.

Installs dependencies, runs linting, executes tests, and uploads coverage.

Reports results inside GitHub Actions and on Pull Requests.

🧪 Example Tests (Jest + Supertest)
js
Copy code
import request from 'supertest';
import app from '../src/app.js';

describe('App basic endpoints', () => {
  it('GET / should return hello message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('GET /health should be ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
🧰 Local Setup
bash
Copy code
# 1️⃣ Install dependencies
npm install

# 2️⃣ Start local server
npm run dev
# http://localhost:3000

# 3️⃣ Run tests
npm test

# 4️⃣ Run CI test suite (with coverage)
npm run test:ci
📊 Output Evidence (for Managers)
Add your screenshots under docs/screenshots/ and link them here 👇

Evidence	Description
✅ Passing GitHub Actions run
✅ Required PR checks passed
📈 Coverage report summary
🔒 Branch protection rules applied

🧱 Governance and Best Practices
Branch Protection — main requires passing checks before merging.

Commit Convention — Use feat:, test:, chore: prefixes for clean history.

Evidence Folder (docs/) — Store theory & screenshots for audits or learning proof.

No Docker/Deployment — This repo focuses purely on CI fundamentals.

📚 Learning Outcomes
From this project, you’ll have demonstrated that you:

Understand the principles of Continuous Integration.

Can set up a CI pipeline from scratch using GitHub Actions.

Can write, test, and lint an Express app professionally.

Know how to enforce quality gates and produce tangible evidence (coverage, PR checks).

🏁 Summary
CI is not just automation—it’s about building trust in every code change.
This repository demonstrates how even a small Node.js app can follow enterprise-grade CI principles.
