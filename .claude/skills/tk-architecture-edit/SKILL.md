---
name: tk-architecture-edit
description: >
  Edit the system's architecture document in the delivery repo, in the same
  pull request as the change that made it wrong — correct a statement, add
  where new behaviour landed, add an optional section whose criterion is now
  met. Cites the ADR that changed a decision. Never regenerates the document,
  never renames a section, and never builds a section on a decision nobody
  ruled on. Use in /tk-implement-spec when the change alters the architecture,
  at Gate 2 in /tk-plan-spec after an amendment, in /tk-pr-feedback after a
  decision change, after /tk-archive-adrs reports drift, and in /tk-new-engagement
  after a decision the engagement records — there marking each statement as
  planned until the story that builds it removes the marker.
user-invocable: false
---

<!-- tk-harness:stub delivery -->

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt skill-architecture-edit
```

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this skill. Follow them as written.
