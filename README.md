# MindMatch — PS09 Adaptive Memory Matching Game

Cerevyn Chitkara University, Round One technical assessment. **Candidate:** [YOUR NAME] · **Roll number:** [YOUR ROLL NUMBER] · **Branch:** [YOUR BRANCH] · **Problem ID:** PS09.

> This project was generated with AI assistance. Review, test, understand, customize, and accurately disclose your own contribution and AI use before submission.

## Run locally (Windows PowerShell)
Install Node.js 20 or newer. No Python is needed.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://127.0.0.1:5173). To run checks:

```powershell
npm test
npm run build
```

The first `npm install` creates `package-lock.json`; commit it for reproducible installs. The included GitHub Actions workflow installs dependencies, tests and builds.

## Features and rules
- Explorer begins with **4×4 cards / eight pairs**; Expert has **4×5 cards / ten pairs**.
- Seeded Mulberry32 shuffle: initial seed `42`; subsequent rounds increment it. The seed is deterministic for test sessions, not cryptographically secure.
- A click reveals a card; two identical symbols remain open. Different symbols turn face-down after 850 ms. A third click, repeated click, or click on a matched card is ignored.
- Moves count each completed two-card attempt. Timer begins with the first valid click, counts active elapsed seconds, and stops on win.
- Explorer advances to Expert if moves ≤14 **and** seconds ≤90. Expert returns to Explorer if moves >28 **or** seconds >180. Otherwise difficulty stays unchanged. The completion screen explains why.
- Restart clears pending mismatch timers, resets counters, and starts a new shuffled round. An epoch guard prevents an old timeout changing the new game.
- Last 20 completed anonymous sessions are stored in browser localStorage (not transmitted).

## Project structure
- `src/game.ts`: seeded shuffle, selection guards, adaptation rules, local session persistence.
- `src/main.tsx`: React game, timer, card interaction, completion and restart UI.
- `src/style.css`: responsive interface.
- `tests/game.test.ts`: eight automated scenarios.
- `sample_data/expected-scenarios.json`: documented expected outputs.
- `docs/azure-plan.md`: Azure architecture, deployment, identity, monitoring and cost controls.
- `.github/workflows/ci.yml`: automated install, test and build on push/PR/manual run.

## Demo guide (3–5 minutes)
1. Show 4×4 Explorer board, moves, timer, progress, and instructions.
2. Flip a matching pair and a mismatched pair; rapidly click a third card during mismatch delay to demonstrate lock.
3. Click an already open or matched card; show it is ignored.
4. Restart while a mismatch is pending; verify the new board remains unchanged after 850 ms.
5. Complete the board; show the performance summary, adaptation reason, next round and recent anonymous history.
6. Show `npm test`, `npm run build`, GitHub Actions and Azure plan. For a fast repeatable demo, explain seeded tests rather than claiming a manually played perfect run.

## Limitations
- Session data lives only in the current browser; clearing storage erases history.
- Timer displays whole seconds and relies on browser scheduling; this is not precision reaction-time software.
- No live Azure deployment is included; follow `docs/azure-plan.md` if required.
- The game is educational and makes no clinical claims.

## Submission checklist
Update candidate details, disclose reused code/AI assistance and your own contribution, run the project/tests, capture a 3–5 minute demo and screenshots, push source (not just build output) to GitHub, verify CI, and submit repository URL plus final commit hash. Include actual CI run link and demo link in this README before submission.
