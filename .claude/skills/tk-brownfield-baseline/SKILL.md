---
name: tk-brownfield-baseline
description: >
  Derive the delivery repo's baseline from an existing application:
  docs/architecture.md, docs/project-context.md and docs/conventions.md, each
  statement tagged with the code it was read from, plus the Definition of Ready
  from the harness's standard. The code wins over any older document; what
  neither shows is "not decided". Writes no ADRs and changes no code. Use at
  stage 1 of /tk-bootstrap on an existing-application repository.
user-invocable: false
---

<!-- tk-harness:stub delivery -->

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt skill-brownfield-baseline
```

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this skill. Follow them as written.
