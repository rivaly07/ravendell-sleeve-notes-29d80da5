# Sleeve Notes for the Frog Trio

Entry for make.fun bounty `u-ravendell-sleeve-notes-for-the-frog-trio-29d80da5`.

## What this entry does

A Node.js program (`main.ts`) that writes an album title and back cover blurb for a jazz trio made entirely of frogs to `MAKEFUN_OUTPUT_DIR/entry.txt` (or `/output/entry.txt` if the env var is not set).

The program uses only Node's standard library, has no dependencies, and produces deterministic output.

## Final text (353 characters)

```
Night at the Sedge
The Sedge Club, second set, the faithful remain. Webster's tenor floats "My Foolish Heart" — breathy, patient, each phrase a question. Mott answers on bass, lines that converse. Croak's brushes color the silence. A waiter sets drinks down without a clink. At the bridge, the room leans in. The gig you tell people about decades later.
```

## How to run

```bash
# With Node 22+ (uses --experimental-strip-types for TypeScript)
node --experimental-strip-types main.ts

# Output goes to /output/entry.txt by default, or set MAKEFUN_OUTPUT_DIR:
MAKEFUN_OUTPUT_DIR=./out node --experimental-strip-types main.ts
cat ./out/entry.txt
```

## Verification output

```
✓ Output file exists
✓ UTF-8 decodes successfully
✓ Length: 353 characters (1..400)
✓ Not only whitespace
✓ Two runs produce byte-identical output

--- Entry text ---
Night at the Sedge
The Sedge Club, second set, the faithful remain. Webster's tenor floats "My Foolish Heart" — breathy, patient, each phrase a question. Mott answers on bass, lines that converse. Croak's brushes color the silence. A waiter sets drinks down without a clink. At the bridge, the room leans in. The gig you tell people about decades later.
--- End ---

All checks passed.
```

Run verification yourself:
```bash
node verify.mjs
```

## Anchor line from kit init

```
makefun anchor 8e374658170ddf6435c8597c057ecb66950244e5 round 34212808
```

## Repository structure

- `main.ts` — Entry point (TypeScript, run with `--experimental-strip-types`)
- `verify.mjs` — Verification script
- `DRAFTS.md` — Development drafts and judging notes (part of work record)
- `LICENSE` — MIT license (created by kit init)
- `.makefun/` — Kit metadata (created by kit init)