---
name: tk-quick-check
description: >
  Decide whether a change qualifies for the quick lane, from facts and from a
  short written plan rather than a file count. Before coding it investigates
  and writes the QUICK PLAN — each change and its kind, who depends on it, the
  five fact checks, what to verify, the questions — and judges the plan's
  impact. After coding it compares the actual diff with that plan. Use from
  /tk-new-story, /tk-plan-spec and /tk-quick-change. Read-only.
user-invocable: false
---

<!-- tk-harness:stub delivery -->

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt skill-quick-check
```

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this skill. Follow them as written.
