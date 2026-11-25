---
description: Turn an idea — a client request, meeting notes, a bug report — into a story in the project's tracker that the readiness gate will pass. Reads the repository first, interviews you one question at a time, checks the draft with the readiness reviewer, and writes to the tracker only on your yes. Decides what and why; /tk-plan-spec decides how.
argument-hint: <the idea, or a path to the notes>
disable-model-invocation: true
---

<!-- tk-harness:stub delivery -->

**Run this only when the developer invoked it by name.** Never start it on
your own, and never from inside another command — each command is its own
session, started by the person it answers to.

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt command-new-story
```

The arguments for this run are `$ARGUMENTS`. Wherever the fetched
instructions refer to `$1` or `$ARGUMENTS`, use that value.

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this command. Follow them as written.
