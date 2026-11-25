---
name: tk-story-closeout
description: >
  Write the honest record of a completed change back to the story in the tracker: what
  was built, what deviated from the specification, which ADRs it wrote,
  and what verification did and did not cover. Use as the last step of
  /tk-close-spec, after the archive and the pull request. Do not use to verify
  anything — Gate 3 ran in /tk-implement-spec and its verdicts are in
  implementation.md.
user-invocable: false
---

<!-- tk-harness:stub delivery -->

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt skill-story-closeout
```

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this skill. Follow them as written.
