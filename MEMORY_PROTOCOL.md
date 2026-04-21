# Memory Protocol: DFTI

## Purpose
Ensures project continuity across agent turns or resets by enforcing state persistence in files.

## Mandatory Actions
1. **At Start of Turn**: Read all `.md` files in this set.
2. **During Turn**: Update `TASKS.md` (Doing) and `CHANGELOG.md`.
3. **At End of Turn**: Update `TASKS.md` (Done), `CHANGELOG.md`, and `DECISIONS.md`.

## Conflict Resolution
- Files take precedence over conversation history.
- Never change core data structures without recording in `DECISIONS.md`.
