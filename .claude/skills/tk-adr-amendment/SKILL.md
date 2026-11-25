---
name: tk-adr-amendment
description: >
  Write an ADR in the delivery repo — either a new decision the code turned up,
  or a superseding one when an accepted decision turns out to be wrong. Writes
  it as accepted on the branch; the pull request that carries it is the gate,
  alongside the code and the architecture correction. Use at Gate 2 in
  /tk-plan-spec, when the conformance reviewer finds a wrong decision rather than a
  wrong proposal, during /tk-implement-spec when a decision does not survive
  contact with the code, and in /tk-new-engagement once the decider has chosen
  an option. Never blocks the story.
user-invocable: false
---

<!-- tk-harness:stub delivery -->

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt skill-adr-amendment
```

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this skill. Follow them as written.
