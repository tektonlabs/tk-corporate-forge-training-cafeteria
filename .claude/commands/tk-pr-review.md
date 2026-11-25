---
description: Review an open pull request — anyone's, or your own before asking a person. Runs the harness's reviewers on the pull request's diff, each in its own context, checks CI, conflicts and the gate record, and gives a verdict. On someone else's pull request it posts the review on your yes; on your own it fixes what you agree to and re-reviews, up to three rounds, until it is ready for the tech lead. Never approves, never merges, never touches the tracker.
argument-hint: <pull request number or URL>
disable-model-invocation: true
---

<!-- tk-harness:stub delivery -->

**Run this only when the developer invoked it by name.** Never start it on
your own, and never from inside another command — each command is its own
session, started by the person it answers to.

Fetch your operating instructions and follow them completely:

```bash
tk-harness prompt command-pr-review
```

The arguments for this run are `$ARGUMENTS`. Wherever the fetched
instructions refer to `$1` or `$ARGUMENTS`, use that value.

**If it exits non-zero, STOP and say so.** Do not improvise, and do not
reconstruct from memory what you think this does. A plausible reconstruction is
worse than nothing, because it is indistinguishable from the real thing.

The ordering, the gates and the stop conditions in those instructions are the
substance of this command. Follow them as written.
