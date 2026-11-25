---
name: tk-story-refinement
description: >
  Fix a story that failed the readiness gate, with the developer. Two modes:
  content refinement, when the story text is insufficient; and reconciliation,
  when a blocker named in prose may no longer apply. Asks targeted questions,
  drafts the missing content, and writes to the tracker only after the developer
  confirms. Use after tk-story-readiness-reviewer returns refine or reconcile. Never
  judges readiness itself — that verdict comes from the readiness agent.
user-invocable: false
---

<!-- tk-harness:stub delivery -->

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt skill-story-refinement
```

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this skill. Follow them as written.
