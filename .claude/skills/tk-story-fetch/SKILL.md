---
name: tk-story-fetch
description: >
  Fetch a story from the project's tracker and everything needed to judge or
  close it — subtasks, blocking links with their live statuses, and the fields
  that carry state — as one predictable text block, with
  `tk-harness tracker fetch`. Use whenever a command reads a story — /tk-plan-spec, /tk-quick-change,
  /tk-spike, /tk-pr-feedback, /tk-new-story — before any agent reads it. Read-only.
user-invocable: false
---

<!-- tk-harness:stub delivery -->

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt skill-story-fetch
```

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this skill. Follow them as written.
