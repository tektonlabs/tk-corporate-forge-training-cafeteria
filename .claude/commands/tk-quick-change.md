---
description: The quick lane — one session for a change with no behaviour in the specs, no data, no decision, no critical control and nothing the project lists as never quick, in one app — a copy change, a new look, a config tweak, a contained logic change. It investigates and shows you a short plan before coding, asks what is unclear, holds the diff to that plan, runs the code reviewer and opens the pull request. A plan decides, not a file count. Gate 1 on the story; a change that needs the spec, Gate 2 or a migration goes to /tk-plan-spec, keeping its code. Takes a story's key, or a sentence it shapes into a story first.
argument-hint: <STORY-KEY or a one-sentence change>
disable-model-invocation: true
---

<!-- tk-harness:stub delivery -->

**Run this only when the developer invoked it by name.** Never start it on
your own, and never from inside another command — each command is its own
session, started by the person it answers to.

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt command-quick-change
```

The arguments for this run are `$ARGUMENTS`. Wherever the fetched
instructions refer to `$1` or `$ARGUMENTS`, use that value.

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this command. Follow them as written.
