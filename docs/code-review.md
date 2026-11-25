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

### RR-1 — Money is held as integer céntimos, named `…Cents`, never as a float or in soles
Scope: apps/**/src/**
Severity: blocking
Why: what an employee pays must not drift by rounding. Every amount in the API is integer céntimos [OBSERVED: apps/api/src/db/schema.ts:1, apps/api/src/db/schema.ts:10,25,34-36], a percentage is rounded back to a whole céntimo [OBSERVED: apps/api/src/pricing/total.ts:33], and soles appear only when `formatPrice` displays them [OBSERVED: apps/web/src/format.ts:1-4] — the team's earlier rule as well [docs/pre-harness/AGENTS.md.txt].

### RR-2 — A change to what the API accepts or returns changes `apps/web/src/api.ts` in the same diff
Scope: apps/api/src/app.ts, apps/api/src/db/schema.ts, apps/api/src/orders/validate.ts, apps/api/src/pricing/total.ts, apps/web/src/api.ts
Severity: blocking
Why: the web app re-declares the API's types by hand [OBSERVED: apps/web/src/api.ts:1-26, mirroring apps/api/src/db/schema.ts:3-39] and nothing compiles one against the other, so a renamed or reshaped field breaks the deployed web app silently. The team's earlier rule [docs/pre-harness/AGENTS.md.txt]. Retire this rule if the seam gets a shared contract.

### RR-3 — The web app shows the limits the API sends; it never hard-codes a business rule
Scope: apps/web/src/**
Severity: should-fix
Why: the order rules live on the server [OBSERVED: apps/api/src/config.ts:9-16], and the web app reads them from the menu response and from a refusal's body rather than repeating them [OBSERVED: apps/web/src/components/Cart.tsx:69, apps/web/src/format.ts:21,23]. A number copied into the interface disagrees with the server the day either changes.
