---
description: Run a spike — a timeboxed investigation whose output is an answer, not production code. Sharpens the question until it is decidable, compares approaches, probes within the timebox, writes the verdict with its evidence into spikes/<ref>/, and puts the findings into each waiting story's description so planning sees them. Use for a spike from the design backlog or from /tk-plan-spec.
argument-hint: <the spike's key>
disable-model-invocation: true
---

<!-- tk-harness:stub delivery -->

**Run this only when the developer invoked it by name.** Never start it on
your own, and never from inside another command — each command is its own
session, started by the person it answers to.

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt command-spike
```

The arguments for this run are `$ARGUMENTS`. Wherever the fetched
instructions refer to `$1` or `$ARGUMENTS`, use that value.

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this command. Follow them as written.
