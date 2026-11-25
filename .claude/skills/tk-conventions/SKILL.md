---
name: tk-conventions
description: >
  Write docs/conventions.md from the ecosystem templates, keyed to the
  deployables table in the architecture document. Resolves each template's
  variants from the ADRs, asks when nothing decides one, records the per-app
  commands and the git hook policy, and logs every choice with its source.
  Decides and documents; writes no config. Use at stage 1 of /tk-bootstrap —
  in observe mode on an existing-application repository, where it records the
  conventions the code already follows. Produces a starting point a tech lead
  reviews — not a standard they are held to.
user-invocable: false
---

<!-- tk-harness:stub delivery -->

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt skill-conventions
```

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this skill. Follow them as written.
