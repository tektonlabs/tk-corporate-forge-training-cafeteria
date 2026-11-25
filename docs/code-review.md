# Code review rules

**Owner:** the tech lead · **Read by:** `tk-code-reviewer` — at Gate 3 in `/tk-implement-spec`, in `/tk-quick-change`, on the fixes in `/tk-pr-feedback`, and on a whole pull request in `/tk-pr-review`

What a reviewer must check on every change **in this project**, on top of what the harness's reviewer already checks: reachable bugs, security and logic errors, swallowed failures, and the written rules in `docs/conventions.md`.

## How this file works

- **Additive only.** A rule here adds a check. It cannot switch off one of the reviewer's own — a project does not get to disable the security check with a sentence.
- **Each rule has a scope.** The reviewer applies a rule only when the diff touches a path its `Scope` matches, so a frontend rule never fires on a backend change, and the file can grow without making every review slower.
- **The reviewer cites the rule.** A finding names `RR-n` and quotes it, so it reads as the project's rule, not the agent's opinion.
- **If a machine can check it, it belongs in lint, not here.** Formatting, naming, import bans — the git hooks enforce those on every commit, more cheaply and more reliably. This file is for what needs judgement.
- **IDs are permanent.** Retire a rule by marking it `Retired: <date> — <why>`; never renumber, because review threads cite the ID.
- **Rules arrive from the project's decisions, then from real reviews.** `/tk-bootstrap` drafts the first few — each from an ADR, an architecture statement, or on an existing application what the code consistently does — for the tech lead to review. After that, when `/tk-pr-feedback` sees the same kind of review comment a second time, it drafts a rule here, in that pull request — so the review that approves the code approves the rule.

## Format

```markdown
### RR-<n> — <the rule, as one sentence>
Scope: <paths it applies to — globs over the apps' paths, e.g. apps/api/src/routes/**>
Severity: blocking | should-fix
Why: <the reason a reviewer can repeat — the ADR, the incident, the client requirement>
```

`blocking` — the change is not committed until it is fixed. `should-fix` — fixed, or dismissed with a reason the developer agrees to.

## Rules

<!-- No project rules yet. Two examples of the kind that belong here — delete them or
     make them real:

### RR-1 — Money is never held in a float
Scope: apps/**/src/**
Severity: blocking
Why: rounding errors in invoice totals; amounts are integer minor units (cents).

### RR-2 — A new runtime dependency is justified in the pull request description
Scope: apps/*/package.json, apps/*/pyproject.toml
Severity: should-fix
Why: every dependency is a supply-chain and upgrade cost the client carries after handover.
-->
