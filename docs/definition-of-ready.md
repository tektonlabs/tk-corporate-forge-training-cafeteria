# Definition of Ready

**Version:** 1.0 · **Owner:** the tech lead · **Last updated:** 2026-11-25

---

## What this file is

The story template defines **shape**. This file defines **sufficiency**. A story can have every section populated and still be unimplementable — acceptance criteria describing intentions rather than testable outcomes, a context section of three empty sentences, a blast radius filled in with "TBD". The template says the section exists. This says whether what is in it is good enough.

Written from the harness's standard at `/tk-bootstrap`. This repository has no design repo, so its tech lead owns this file and edits it here.

**Read by:**

| Consumer | Repo | Reads |
|---|---|---|
| `tk-fixed-time-backlog` | design | `design/definition-of-ready.md` |
| `tk-story-readiness-reviewer` | code | `docs/definition-of-ready.md` |
| `tk-story-refinement` | code | `docs/definition-of-ready.md` |
| `tk-story-intake` | code | `docs/definition-of-ready.md` |

One file, four consumers, two paths. **That is the point:** the standard that produces work and the standard that admits work are the same standard, so a backlog cannot fail its own project's gate.

## How to read a clause

Every clause has a **prose equivalent**, because two populations of story reach the readiness gate, Gate 1:

- **Structured** — from `tk-fixed-time-backlog` or `tk-story-intake`, with template sections
- **Unstructured** — filed directly in the tracker mid-sprint, with none of that

The clause is what must be true. The prose equivalent is how to check it when there is no section to look in. **The same standard applies to both.** A ticket does not get an easier bar for having skipped the template.

## Two kinds of conditional clause

Every conditional clause states its trigger. **How it is satisfied when the trigger is not met depends on whether an outside reader can tell.**

**Kind A — silence fails. The trigger is invisible from outside.**
Data impact, ADR references, binding NFRs. You cannot tell from a story that it does not change the schema; only the author knows. So the story says "no schema change" and passes. Omitting it fails.

*That is what stops a migration being discovered in hour six on a story that never mentioned one.*

**Kind B — the trigger is observable. Silence is fine.**
Context, scope boundary, unhappy path, existing behaviour. Whether these apply is visible in the story itself. "Change the accept button on the checkout page from grey to `#0066cc`" plainly has no unhappy path, nothing adjacent to exclude, and needs no paragraph of background. Demanding "no unhappy path applies" on it is ceremony, and ceremony is what teaches people the gate is not serious.

**The reviewer decides Kind B from the story, not from a claim.** There is nothing to assert and nothing to over-claim — the trigger is either evident or it is not.

## What a short story still has to satisfy

A one-line change is a legitimate story. It fails the gate for the right reasons or not at all.

"Change the accept button colour" **should fail** on:
- **DoR-3.1** — which page, which button
- **DoR-2.3** — which colour
- **DoR-2.1** — criteria that assert something checkable

It **should not fail** on context, scope boundary, unhappy path or blast radius. Those exist to remove ambiguity, and once the three above are satisfied there is none left to remove.

## Failing

Cite the clause number. `DoR-2.3` is actionable; "the acceptance criteria need work" is not.

---

# Part A — Company baseline

Applies to every engagement. Changing this is a firm-level decision, not a project one.

## 1. Intent

**DoR-1.1 — The outcome is stated, not the activity.** *(always)*
The story says what will be true afterwards, not what someone will do. "Users can export invoices as CSV" passes. "Add export functionality" does not.
*Prose equivalent:* the title or body names a changed capability, not a task.

**DoR-1.2 — The beneficiary is named.** *(always)*
A specific role, system or integration. "Users" alone fails when the system has several kinds of user.
*Prose equivalent:* someone or something identifiable is better off, and it is clear which.

**DoR-1.3 — Context explains why now.** *(Kind B — when a reader could not tell why the story exists)*
Two to five sentences covering what currently happens, what changes, and why it matters. Enough that a reviewer can judge the scope without opening the source documents.
*Fails if:* it restates the title in longer form, or describes the solution instead of the situation.
*Does not apply when:* the story's own statement makes the reason evident. A named button changing colour needs no background.

**DoR-1.4 — The scope boundary is explicit.** *(Kind B — when something adjacent exists that a reasonable engineer might assume was included)*
At least one thing this story is **not**, chosen from those adjacent things.
*Prose equivalent:* an "out of scope" line, or a boundary stated in the body.
*Fails if:* the exclusions are trivial ("not building a mobile app" on a database story). The boundary must be plausible enough to be worth excluding.
*Does not apply when:* nothing plausible is adjacent. There is nothing next to a colour.

**DoR-1.5 — The story is a deliverable vertical slice.** *(always)*
It delivers observable behaviour end to end, not one layer of it. "The endpoint returns the export" is not a story; "a user can export invoices as CSV" is.
*Fails if:* the story is a layer — a schema change, an endpoint, a component — with no user-observable outcome of its own. Those are subtasks of a slice.
*Why:* DoR-2.1 requires observable acceptance criteria, and a horizontal slice cannot have them. Splitting by layer multiplies the plan / implement / test / close loop without reducing the work.

*This clause is about shape, not size.* A slice may cover several variations — "a user can export data", with CSV and XLSX as subtasks, is one story. A larger slice may be delivered in **phases**: ordered vertical slices inside one story, at most four, each ending in observable behaviour. Split into separate stories only when phases cannot hold it — more than four, one pull request no reviewer could read with care, or a part that is blocked or ships separately — and then by variation, never by layer.

## 2. Acceptance criteria

**DoR-2.1 — Every scenario is observable.** *(always)*
The `Then` asserts something a test can check — a value, a state, a response, a visible result. Not a state of mind.
*Fails on:* "the user understands", "the data is correct", "performance is acceptable", "it works as expected".

**DoR-2.2 — One action per scenario.** *(always)*
A single `When`. Two actions in one scenario means two rules being specified at once, and a failure will not say which broke.

**DoR-2.3 — Concrete values, not placeholders.** *(always)*
Real numbers, real strings, real states. `Then the retention period is 90 days`, not `Then the retention period is set correctly`.
*Fails on:* `<value>`, `TBD`, `appropriate`, `valid`, `some`.

**DoR-2.4 — The unhappy path is covered.** *(Kind B — when the change can fail, be rejected, or receive invalid input)*
At least one scenario for invalid input, a permission failure, a state conflict or a dependency failure — whichever apply.
*Fails if:* only the happy path is specified on a story that plainly has failure modes. A story with one scenario is almost always incomplete.
*Does not apply when:* there is nothing to fail. A colour cannot be rejected.

**DoR-2.5 — Technical work has a contract instead.** *(when the story has no user-observable behaviour)*
An interface, the invariants it must hold, and a done-when condition. Gherkin is not forced onto work that has no actor.

## 3. Technical addressability

The gate checks these are **present and specific**. Designing the solution is not this gate's job.

**DoR-3.1 — The affected area is named.** *(always)*
A component, service, module or system area — specific enough that someone could find the code.
*Fails on:* "the backend", "the platform", "various services".

**DoR-3.2 — Governing decisions are referenced.** *(Kind A — when the affected capability has ADRs)*
The ADR IDs that constrain this work, from the capability map in `project-context.md`.
*Prose equivalent:* the ticket names the constraint, or names the ADR.
*Satisfied by:* an explicit "no ADRs govern this capability".

**DoR-3.3 — The binding NFR is named.** *(Kind A — when the story touches a capability with one)*
The specific NFR and its target, not a general commitment to quality.
*Fails on:* "must be performant". Passes on: "p95 under 200ms, per ADR-011".

**DoR-3.4 — Data and schema impact is stated.** *(Kind A — when the story changes what is stored or how it is shaped)*
What changes, and whether a migration is needed. Rollback if one is.
*Satisfied by:* an explicit "no data or schema change".

**DoR-3.5 — Existing behaviour is described from evidence.** *(Kind B — when the story changes the behaviour of existing code)*
What the system does today, cited to a file and line. Not what the documentation claims, unless the two agree — and if they disagree, the conflict is logged as an open question.
*Fails if:* current behaviour is inferred or assumed. If nobody could read the code, the story needs a spike rather than a guess.

**DoR-3.6 — Blast radius is assessed.** *(Kind B — when the story changes the behaviour of existing code)*
Callers, shared state, and what must not break. An empty section means nobody looked, which is a fail, not a pass.
*Satisfied by:* a stated assessment concluding the change is isolated, with the basis for that conclusion.
*Does not apply when:* the change alters appearance or configuration without altering behaviour. The trigger is behaviour, not the fact that a file already existed.

## 4. Dependencies and blockers

**DoR-4.1 — Dependencies are stated with a reason.** *(always)*
Each one names what it blocks and why. A bare ID is not a dependency, it is a cross-reference.
*Satisfied by:* an explicit "no dependencies".

**DoR-4.2 — External needs are named.** *(Kind A — when the work requires anything outside the team)*
Credentials, environments, third-party services, sample data, sign-offs.

**DoR-4.3 — Each blocker has an owner.** *(when the story carries a blocker)*
A named person or role, resolvable from the decision-owners table in `project-context.md`. "The client" is not an owner.

**DoR-4.4 — Assumptions are marked as assumptions.** *(Kind A — when the story rests on something unverified)*
Stated plainly, with the consequence if wrong. An unmarked assumption presented as fact is a fail even when the assumption is reasonable.

## 5. Blockers and state claims

**DoR-5.1 — A readiness claim is evidence-checked, not trusted.** *(when the story carries a readiness or status field)*
Content is assessed first, on its own. Any state field is resolved afterwards. A `ready` flag, a status, or a label satisfies no clause in this document. Fields go stale; the story text is the evidence.

**DoR-5.2 — A linked blocker is resolved by its live status, not by asking.** *(when the story has blocking issue links)*
A blocking link carries a status maintained by whoever closes it. Closed means cleared, and the blocker is dropped without a question. Open means still blocking, and the owner is that issue's assignee.
*Rationale:* asking a developer whether a linked issue is closed, when its status is already in hand, wastes their time and teaches them the gate does not read what it was given.

**DoR-5.3 — A blocker named only in prose gets one specific question.** *(when the description names a blocker with no corresponding link)*
Referencing what the story now says, so the answer is a comparison rather than a memory test. This is the only case where reconciliation asks anything.
*Better practice:* track clarifications, inputs and spikes as real issues linked to the story. A linked issue has a live status and an assignee; a prose reference has neither, and goes stale the moment someone resolves it elsewhere.

**DoR-5.4 — A blocker is never created by reconciliation.** *(always)*
If content assessment passes, the developer is asked about existing blockers only. They are not invited to introduce a new reason to stop.

---

# Part B — Project addendum

Clauses this engagement adds. Empty is a valid state. Number them `DoR-P.n` so they never collide with the baseline.

**DoR-P.1 — `<clause>`** *(always | when …)*
`<What must be true.>`
*Prose equivalent:* `<how to check it on an unstructured ticket>`

> Examples of what belongs here: a data classification on every story touching customer records; a named security reviewer for anything touching authentication; a residency statement for a client regulated in two jurisdictions.

---

## Maintenance

- **Owner:** the person named at the top. One owner, not a committee.
- **Changes to Part A** are firm-level and reviewed like code.
- **Part B** is set at the start of an engagement and changes only when the client's constraints do.
- **A Kind B clause failing on a short story means its trigger is wrong**, not that the story is bad. Fix the trigger.
- **A clause that is routinely waived should be deleted or fixed.** A waived clause teaches everyone the gate is negotiable, which costs more than the clause was worth.
- **A clause that never fails is either universally satisfied or unenforceable.** Check which before keeping it.

## Change log

| Date | Clause | Change | By |
|---|---|---|---|
| | | | |
