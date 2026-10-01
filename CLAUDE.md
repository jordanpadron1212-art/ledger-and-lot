# Ledger & Lot — instructions for Claude sessions

This project is worked on from several places (PC desktop app, phone, claude.ai/code cloud sessions). The repo is the single source of truth.

## Session open
1. `node qa/docs-check.js` — if it FAILS, reconcile docs before anything else.
2. Read `HANDOFF.md` completely. It says where the project is and what's next.
3. Before building: read `docs/DESIGN.md` (layout + V1 scope) and search `docs/DECISIONS.md` before proposing anything that feels new.
4. Open the artifact before changing it; never rebuild from memory.

## Skills
Use the `front-office` skill for the game itself (architecture, books, grid, QA gate) and the `project-folder` skill for docs/session discipline, if available in this environment.

## Session close (every session, including phone sessions)
- Patch `HANDOFF.md` (don't rewrite it); append decisions to `docs/DECISIONS.md` as `**Dnn · YYYY-MM-DD · rule.**` + Rejected/Measured.
- Commit with a clear message and **push to `origin/main`** so the other device sees the work.
- **One branch only: `main`.** This includes cloud sandboxes. Never create a session or feature branch and never open a PR. If a sandbox starts you on another branch, switch to `main` before committing (user, 2026-10-01).
- Record anything you could not verify.

## Notes
- Layout reference is the user's own published game: https://jordanpadron1212-art.github.io/rodeogenetics-sim/ (a local copy at `docs/reference/` is git-ignored and exists only on the PC).
- The PC clone lives at `C:\Users\jorda\Projects\ledger-and-lot` — NOT under Documents (Windows Controlled Folder Access blocks git there).
- Capitalism Lab is a design reference only; never ship its data rows or art (D08).
