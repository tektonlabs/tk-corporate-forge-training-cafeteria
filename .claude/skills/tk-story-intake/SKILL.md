---
name: tk-story-intake
description: >
  Shape a raw idea — a client request, meeting notes, a bug report, a sentence
  from the developer — into a story the readiness gate will pass. Reads the
  repository before asking anything, says whether the idea is already specified,
  already built, out of scope or blocked on someone else's decision, then
  interviews the developer one question at a time against the Definition of
  Ready and drafts the story from their answers. Decides what and why, never how.
  Use from /tk-new-story. Writes nothing; the command writes to the tracker.
user-invocable: false
---

<!-- tk-harness:stub delivery -->

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt skill-story-intake
```

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this skill. Follow them as written.
