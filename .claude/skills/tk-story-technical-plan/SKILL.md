---
name: tk-story-technical-plan
description: >
  Load the harness context a spec toolchain cannot know, check the story has not
  been overtaken by work already delivered, then hand off to opsx:propose to
  produce the plan, specification and task breakdown. Finally write a technical
  summary back to the story in the tracker. Use after the readiness gate passes, in the
  planning session. Does not design the solution itself.
user-invocable: false
---

<!-- tk-harness:stub delivery -->

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt skill-story-technical-plan
```

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this skill. Follow them as written.
