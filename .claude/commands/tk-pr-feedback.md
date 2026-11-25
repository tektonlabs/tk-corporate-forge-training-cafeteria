---
description: Answer the review on an open pull request — verify each comment against the code, sort it by what it changes, agree the plan with you, fix what is a fix, re-review the fixes, push, and reply in each thread. Never resolves a thread, approves or merges. Use after /tk-close-spec, when a reviewer — a person or a bot — has commented.
argument-hint: <pull request number or URL>
disable-model-invocation: true
---

<!-- tk-harness:stub delivery -->

**Run this only when the developer invoked it by name.** Never start it on
your own, and never from inside another command — each command is its own
session, started by the person it answers to.

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt command-pr-feedback
```

The arguments for this run are `$ARGUMENTS`. Wherever the fetched
instructions refer to `$1` or `$ARGUMENTS`, use that value.

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this command. Follow them as written.
