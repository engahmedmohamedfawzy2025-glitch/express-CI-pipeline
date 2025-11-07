# 🚀 Express CI Pipeline

A minimal **Node.js / Express** app integrated with an automated **Continuous Integration (CI)** pipeline using **GitHub Actions**, **Jest**, **ESLint**, and **Prettier**.

![CI](https://github.com/USER/express-ci-pipeline/actions/workflows/ci.yml/badge.svg)

---

## 📖 Overview
- Linting and unit tests run automatically on each push or pull request.
- Coverage reports are generated and uploaded as build artifacts.
- Quality gates and branch protection ensure reliable merges.

> 🧩 Focus: **CI only** — build, lint, test, and coverage (no Docker, no deployment).

---

## ⚙️ CI/CD Concepts (Summary)

| Stage | Description |
|------|-------------|
| **Continuous Integration (CI)** | Automatically builds, lints, and tests code on every change to detect issues early. |
| **Continuous Delivery (CD)** | Keeps code deployable and ready for release (manual approval). |
| **Continuous Deployment (CDp)** | Fully automates deployment once CI passes. |

> This repository implements **Continuous Integration** only.

---

## 🧩 How CI Works Here
1. Developer **pushes** or opens a **pull request**.
2. GitHub Actions triggers the **CI pipeline**.
3. Steps run sequentially:  
   `checkout → setup Node → install deps → lint → test (coverage) → upload artifact`
4. Results appear in:
   - **Actions** tab (detailed logs & artifacts)
   - **Pull Request checks** (required before merge)

---

## 🧱 Workflow Configuration
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
          node-version: 20
          cache: npm
      - run: npm ci || npm install
      - run: npm run lint
      - run: npm run test:ci
      - uses: actions/upload-artifact@v4
        if: success()
        with:
          name: coverage-report
          path: coverage/




## 🧪 Testing Setup
**File:** `tests/app.test.js`

js
Copy code
import request from 'supertest';
import app from '../src/app.js';

describe('App basic endpoints', () => {
  it('GET / returns hello', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});




## 🧰 Run Locally
bash
Copy code
# install dependencies
npm install

# start development server
npm run dev
# → http://localhost:3000

# run tests
npm test

# run CI-style tests with coverage
npm run test:ci


📜 License

MIT © Ahmed Fawzy
📜 License
MIT © Ahmed Fawzy
