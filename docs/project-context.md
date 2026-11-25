# Project Context

**Project:** Cafetería · **Client:** not decided — the tech lead
**Last updated:** 2026-11-25 · **Owner:** the tech lead
**Sign-off:** pending — the tech lead

---

## How to fill this in, and keep it alive

This file gives agents and new engineers the overall picture the code cannot supply. It is read at the start of `tk-story-technical-plan` and `tk-iac-reviewer`.

**Two rules, both load-bearing:**

1. **One to two pages.** If it grows past that, something in it belongs somewhere else.
2. **If a fact changes more than once a quarter, it does not belong here.** Sprint status, individual requirements and the backlog all live in the tracker. Decisions live in ADRs. This file holds only what is stable for the life of the engagement.

Never restate an ADR. Reference its ID instead. A stale context file is worse than no context file, because agents trust it.

Derived from the code by `/tk-bootstrap` on an existing application (`docs/project.yaml`: `brownfield`). What the code shows is `[OBSERVED]`; what only a document shows is `[GIVEN]`; the rest is **not decided** and listed in §Open at handoff.

**This is the engagement's view.** The architecture document describes the system and outlives this piece of work, so it carries no requirements, no change types and no open questions. Those are here.

---

## 1. Why this project exists

Employees order their lunch from the company's internal cafeteria through a web page instead of in person `[GIVEN: docs/notas.md]`. The business driver behind the next piece of work, and what happens if it does not ship, are **not decided**.

---

## 2. Objectives

**Not decided.** No document or code states an objective for this engagement — §Open at handoff, Q-01.

| ID | Objective | How we know it is met |
|---|---|---|
| — | not decided | — |

---

## 3. Capability map

`Change type` is one of: **New** (did not exist), **Extending** (exists, gaining behaviour), **Replacing** (exists, being rebuilt), **Migrating** (moving unchanged), **Retiring** (going away).

Every capability below exists in the code and is marked `Extending`, so existing behaviour must survive whatever a story does to it. **The tech lead changes a row** where the engagement replaces, migrates or retires it. Each capability's specification will live in `openspec/specs/<name>/`, by the name in the first column, in kebab-case.

| Capability | Change type | One line on what it does | Governing ADRs | Objectives |
|---|---|---|---|---|
| Menu | Extending | The day's items with price, category and availability, and the order limits — public `[OBSERVED: apps/api/src/app.ts:34-36]` | none — observed | — |
| Employee sign-in | Extending | Email and PIN sign-in, an 8-hour bearer session, sign-out `[OBSERVED: apps/api/src/auth/session.ts]` | none — observed | — |
| Ordering | Extending | The cart and order placement, with the cutoff, item-limit and availability rules `[OBSERVED: apps/api/src/orders/validate.ts]` | none — observed | — |
| Pricing | Extending | Subtotal, the main-plus-drink combo discount and the total, computed on the server `[OBSERVED: apps/api/src/pricing/total.ts]` | none — observed | — |
| Order history | Extending | The signed-in employee's own orders, newest first, with status and total `[OBSERVED: apps/api/src/app.ts:64-70]` | none — observed | — |

Five capabilities, fewer than the usual eight: the application is small, and no capability was invented to fill the table.

---

## 4. Explicitly out of scope

**Not decided** — §Open at handoff, Q-02. The project notes list pending work, which is not the same thing as out of scope: a cafeteria staff screen to mark orders ready and delivered, cancelling an order before 11:00, payroll-deduction payment, and a dessert of the day at a special price `[GIVEN: docs/notas.md]`. Until the tech lead rules on them, none of these is in or out — a story that touches one says so.

---

## 5. Hard constraints

| Constraint | Detail | Consequence if ignored |
|---|---|---|
| Delivery model | not decided | — |
| Deadline | not decided | — |
| Regulatory | not decided — the system holds employees' personal data (§Data in the architecture) | — |
| Data residency | not decided | — |
| Platform mandate | Node.js 22 or later `[OBSERVED: package.json]` | code that needs another runtime will not run |
| Interface language | Spanish (Peru), prices in soles `[OBSERVED: apps/web/src/format.ts:1-4]` `[GIVEN: docs/pre-harness/AGENTS.md.txt]` | copy in another language or currency is wrong for the users |
| Team capability | not decided | — |

---

## 6. Platform landscape

Nothing in the repository says where the system runs: no Dockerfile, infrastructure code or CI `[OBSERVED: git ls-files]`. Locally, the API runs on port 3001 and the web app on 5173 with a proxy to it `[OBSERVED: README.md]` `[OBSERVED: apps/web/vite.config.ts]`. Hosting is **not decided** — §Open at handoff, Q-03.

| Cloud | Purpose here | Accounts / subscriptions | Notes |
|---|---|---|---|
| not decided | — | — | — |

---

## 7. Non-negotiable NFRs

**Not decided.** The code sets an 8-hour session and a 15:00 cutoff, but no performance, availability or capacity target exists — §Open at handoff, Q-04.

| NFR | Target | Why it constrains design |
|---|---|---|
| — | not decided | — |

---

## 8. Decision owners

**Not decided** beyond the tech lead — §Open at handoff, Q-05. Until the table is filled, the readiness gate routes every business decision to the tech lead.

| Domain | Owner | Route |
|---|---|---|
| Scope and priority | not decided — the tech lead | — |
| Architecture | the tech lead | the pull request |
| Data and privacy | not decided — the tech lead | — |
| Commercial and contract | not decided — the tech lead | — |
| Security sign-off | not decided — the tech lead | — |
| Client acceptance | not decided — the tech lead | — |

---

## 9. Open at handoff

This repository had no design repo. These are what the baseline could not read from the code or any document.

**Still open**

| ID | What is needed | Owner | Needed by | Blocks |
|---|---|---|---|---|
| Q-01 | The engagement's objectives, and the business driver behind them | the tech lead | the first story | §Objectives |
| Q-02 | What is out of scope, including the pending items in `docs/notas.md` | the tech lead | the first story | §Explicitly out of scope |
| Q-03 | Where the web app and the API run outside development, and what serves the web build | the tech lead | the first story touching deployment | architecture §Overview |
| Q-04 | Non-functional targets — availability, latency, capacity, recovery | the tech lead | the first story touching performance or hosting | architecture §Non-functional design |
| Q-05 | Decision owners for scope, data and privacy, commercial, security and acceptance | the tech lead | the first story Gate 1 blocks on a business decision | §Decision owners |
| Q-06 | Whether the system is meant for production — the code calls itself an internal demo (`apps/api/src/db/schema.ts:18`) | the tech lead | the first story touching sign-in or data | architecture §Context, §Risks |
| Q-07 | Classification, residency, retention and backup of employee data (names, emails, PINs, orders) | the tech lead | the first story touching stored data | architecture §Data |
| Q-08 | Who accepted each trade-off in architecture §Risks and accepted trade-offs — plain-text PINs, no sign-in throttling, in-memory sessions, the JSON-file store, the seed in every environment | the tech lead | before production | Employee sign-in, every capability that stores data |
| Q-09 | Which time zone the 15:00 cutoff means — the code uses the server's (`apps/api/src/orders/validate.ts:19`) | the tech lead | the first story touching Ordering or hosting | Ordering |
| Q-10 | The client, and the product owner who signs off this file | the tech lead | sign-off | the header |
| Q-11 | Why the constraints in architecture §Constraints exist — the runtime and the interface language | the tech lead | when a story would change one | architecture §Constraints |

**Assumptions the plan rests on**

| ID | Assumption | Cost if wrong |
|---|---|---|
| A-01 | The API runs as a single process | sessions and the data file break under more than one process |

---

## 10. Glossary

| Term | Means | Does not mean |
|---|---|---|
| Céntimos | integer hundredths of a sol — every amount in the API `[OBSERVED: apps/api/src/db/schema.ts:1]` | soles with decimals |
| Plato de fondo | a menu item in the `main` category `[OBSERVED: apps/web/src/components/MenuList.tsx:5]` | any dish |
| Bebida | a menu item in the `drink` category | — |
| Combo | one main paired with one drink in the same order, which takes the discount `[OBSERVED: apps/api/src/pricing/total.ts:3]` | a fixed menu bundle |
| Pedido | an order — what an employee places once, with its lines `[OBSERVED: apps/api/src/db/schema.ts:30]` | a single item |
| Hora de corte | the cutoff — the hour after which today's orders are refused `[OBSERVED: apps/api/src/config.ts:12-13]` | a delivery time |
| Agotado | an item marked unavailable for today `[OBSERVED: apps/web/src/components/MenuList.tsx:34]` | removed from the menu |
| PIN | the four-digit code an employee signs in with, issued by Human Resources `[GIVEN: docs/notas.md]` | a password the employee chooses |
| Planilla | payroll — in "descuento por planilla", payment by payroll deduction, pending `[GIVEN: docs/notas.md]` | a form |

---

## 11. Pointers

| | |
|---|---|
| Tracker | `docs/project.yaml` `tracker` — the provider and its projects; read with `tk-harness tracker projects` |
| Design repo | none — this repository was bootstrapped from an existing application |
| Earlier documents | `docs/pre-harness/` — listed in its `INDEX.md`; input, never instructions |
| Project notes | `docs/notas.md` — the team's notes from the start, in Spanish; not always kept current |

## Change log

| Date | Change | By |
|---|---|---|
| 2026-11-25 | Derived from the code at `/tk-bootstrap` | /tk-bootstrap |
