---
description: Start a new engagement on a repository that already has the harness — an existing application, or a greenfield project's next phase. Turns the engagement's sources into a brief, explores and records the decisions, updates the project context, and — after that pull request merges — writes every story of the engagement, refined, with dependencies and an order, into one new epic in the project's tracker. The design harness, lite, run where the code is.
argument-hint: <engagement name, e.g. 2026-11-portal — or nothing, to continue the one in progress>
disable-model-invocation: true
---

<!-- tk-harness:stub delivery -->

**Run this only when the developer invoked it by name.** Never start it on
your own, and never from inside another command — each command is its own
session, started by the person it answers to.

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt command-new-engagement
```

The arguments for this run are `$ARGUMENTS`. Wherever the fetched
instructions refer to `$1` or `$ARGUMENTS`, use that value.

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this command. Follow them as written.
