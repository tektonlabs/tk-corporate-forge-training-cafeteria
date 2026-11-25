# Conventions

## How this file was generated

2026-11-25 · **observe mode**, on an existing application (`docs/project.yaml`: `brownfield`) · the testing policy from the harness; the `react` template read for `apps/web`; no template exists for Express, so `apps/api` is observed only · reviewed by: ________

| Choice | Resolved to | From |
|---|---|---|
| Layout | npm workspaces, `apps/api` and `apps/web` | observed: `package.json` |
| Package manager | npm, one lockfile at the root | observed: `package-lock.json` |
| Runtime | Node.js 22 or later | observed: `.nvmrc`, `package.json` `engines` |
| Language | TypeScript, `strict`, `noEmit`, both apps | observed: `apps/*/tsconfig.json` |
| Formatter | none | observed: no formatter config in the repository |
| Linter | none | observed: no lint config, no `lint` script |
| Test runner | Vitest, both apps | observed: `apps/*/package.json` |
| Web meta-framework | Vite SPA, no router | observed: `apps/web/vite.config.ts`, `apps/web/src/App.tsx` |
| Web styling | one global stylesheet with CSS custom properties | observed: `apps/web/src/styles.css` |
| Web global state | none — `useState` in `App`, passed down | observed: `apps/web/src/App.tsx` |
| Web data fetching | plain `fetch` through one client module | observed: `apps/web/src/api.ts` |
| Web forms | native | observed: `apps/web/src/components/LoginForm.tsx` |
| Web component and end-to-end tests | none | observed: `apps/web/test/` |
| API framework | Express 4, run with `tsx`, no build step | observed: `apps/api/package.json` |
| API HTTP tests | supertest against `createApp`, in-memory store, injected clock | observed: `apps/api/test/orders.test.ts` |
| Hook runner | **none** | observed: no `.husky/`, `lefthook.yml` or `.pre-commit-config.yaml`; no `core.hooksPath` |
| CI | **none** | observed: no `.github/` |
| Commit convention | Conventional Commits with the app as scope; the harness adds the story key | observed: `git log` (10 commits) + the harness's key rule |
| Branch naming | `feature/<KEY>-<short-slug>` | template — nothing observed: the history holds one squash-merged pull request |
| Seam between web and api | a hand-kept copy of the API's types in the web app; nothing checks it | observed: `apps/web/src/api.ts:1-26` — **not decided**, see *Deviations* |
| Testing policy for new tests | the harness's, below | template |

**Deviations from the template:**

- **`apps/web` is layer-first, not feature-first** — `src/components/`, one `src/api.ts`, one `src/format.ts` — and has no `@/` alias, no Tailwind, no RHF + Zod, no TanStack Query, no Testing Library. The observed layout wins here; new code follows it.
- **Tests live in a parallel `test/` folder** in both apps, not beside their subjects. New tests follow the observed layout.
- **No linter**, so the template's two harness lint rules — no cross-feature imports, no `vi.mock` of an internal module — are not enforced. The mocking rule is checked by `tk-code-reviewer` instead. The existing suite mocks nothing, so it already complies.
- **npm, not pnpm.** Observed; the lockfile stays.
- **No git hooks and no CI.** Nothing checks a commit or a pull request mechanically.
- **The web–api seam is unverified** — the web app re-declares the API's types by hand, and the project's earlier agent rules said to update `apps/web/src/api.ts` whenever the API changes (`docs/pre-harness/AGENTS.md.txt`). Whether that stays, becomes a shared contract package, or gets contract tests is **not decided**, and a shared package would be an ADR.

Edit anything below. This file is yours from now on — the template is a starting point, not a standard you are held to. Every story is written and implemented against this file, so an edit here changes what the next story builds.

## Repository

**Layout.** One repository, npm workspaces, two apps under `apps/` `[observed: package.json]`. No shared package: each app owns its types. Root scripts fan out to the workspaces — `npm test`, `npm run typecheck`, `npm run build` — and `npm run dev` starts both apps with `concurrently`.

**Language of the code and of the product.** Identifiers, comments, commit messages and file names are English; every user-facing string is Spanish (Peru), and amounts are shown in soles `[observed: apps/web/src/**]`. Domain terms follow `docs/project-context.md` §Glossary — the code says `order`, `menu`, `employee`, `main`, `drink`, and the interface says *pedido*, *menú*, *plato de fondo*, *bebida*.

**Money.** A review rule, not a convention: `docs/code-review.md` RR-1.

**Branch naming.** `feature/<KEY>-<short-slug>` — for example `feature/CAF-12-cancel-order`. The story key sits in the branch as its `ref`, which `tk-harness tracker key <KEY>` prints; for a Jira key like `CAF-12` that is the key itself. *Template — nothing observed; change it if the team has its own.*

**Commit convention.** Conventional Commits, scoped by app, in English, as the history shows: `feat(api): …`, `feat(web): …`, `test(web): …`, `docs: …`, `chore: …` `[observed: git log]`. A commit that belongs to a story starts with its key and a colon, as the harness requires: `CAF-12: feat(api): cancel an order before 11:00`. A pull request's title starts with `CAF-12: `, which a squash merge keeps as the commit subject. Small commits `[observed: docs/pre-harness/AGENTS.md.txt]`.

**Git hooks.** **None.** No hook runner is installed, so nothing runs at pre-commit or pre-push, and every command that commits — `/tk-plan-spec`, `/tk-implement-spec`, `/tk-close-spec`, `/tk-quick-change`, `/tk-pr-feedback` — does so with nothing checking it. *To add one, name the runner here and what each stage runs; `/tk-bootstrap` installs it additively.*

| Stage | Runs |
|---|---|
| pre-commit | nothing — no runner |
| pre-push | nothing — no runner |

**CI.** None `[observed: no .github/]`. **CODEOWNERS:** none.

**`spikes/`** sits outside both apps. Nothing builds, tests or imports it.

### Testing

**This is the rule for new tests.** The existing suites are recorded as they are in each `App:` section, and are never rewritten to match it.

**The question every test must answer:** would this fail if the feature broke in a way a user would notice? If no, it should not exist.

**Level.** Each scenario in a change's delta spec gets one test at the use-case boundary, through real collaborators. In `apps/api` that boundary is HTTP: supertest against `createApp`, with the in-memory store and an injected clock — the pattern `apps/api/test/orders.test.ts` already uses. Unit tests only where isolated logic exists — a validator, a pricing rule, a date calculation — as `apps/api/test/pricing.test.ts` does. Not one per function.

**Mocking.** Mock only across a deployable boundary or a true external: the other app, email, the clock. Never mock a module inside the same app. **Not enforced by lint here** — the repository has no linter — so `tk-code-reviewer` checks it. The clock is injected, not mocked: `createApp(store, clock)` and the `now` parameters exist for this.

**Naming.** A scenario test is named for its scenario, verbatim. Gate 3 counts scenarios against tests, so the name is the trace.

**Decision tests.** An ADR's constraint gets its own test, separate from any story — the architecture made executable. There are no ADRs yet; the first goes in `apps/<app>/test/decisions/`. *Template.*

### What not to write

- **Snapshot tests.** They assert the output is what it currently is. A diff is not a specification.
- **Assertions that a mock was called.** That tests wiring you just wrote.
- **Tests for getters, setters, constructors, pass-through methods.**
- **`toBeDefined()` or `not.toThrow()` as the only assertion.**
- **Tests that re-prove the type system.**
- **One test per method, as a pattern.** Tests map to behaviours, not functions.

**No coverage target.** Not 80%, not any number. A threshold is the most reliable way to generate tests that assert nothing: the lines left uncovered are the ones nobody could name a reason to test, which is information, and a target destroys it by making them look like debt. None is configured today.

## Ecosystem: TypeScript / Node

Apps: apps/api, apps/web

*Industry-standard — skim.*

- **Package manager: npm**, workspaces, one `package-lock.json` at the root `[observed]`. Install from the lockfile with `npm ci`; add a dependency with `npm install <pkg> -w @cafeteria/<app>` — never edit a version by hand. **No new dependency without asking** `[observed: docs/pre-harness/AGENTS.md.txt]`.
- **Runtime: Node.js 22+** — `.nvmrc` says `22` `[observed]`.
- **TypeScript 5.7**, `strict: true`, `noEmit: true`, `moduleResolution: "Bundler"`, ES modules (`"type": "module"`) in both apps `[observed: apps/*/tsconfig.json, apps/*/package.json]`. Typecheck covers `src` and `test`.
- **Formatter: none.** The code is two-space indented, double-quoted, with semicolons and trailing commas — match it `[observed: apps/**/src/**]`.
- **Linter: none.**
- **Test runner: Vitest 2**, both apps.

## App: apps/web

React 18 single-page app on Vite 5 `[observed: apps/web/package.json]`. *No template row beyond what is observed applies — see Deviations.*

**Structure** `[observed]`:

```
apps/web/
  index.html            lang="es"
  vite.config.ts        dev server on 5173, proxies /api to localhost:3001
  src/
    main.tsx            mounts <App /> in StrictMode
    App.tsx             top-level state — sign-in, menu, cart, current tab — and layout
    api.ts              the only module that calls the API: its types, fetch wrapper, ApiError, token
    format.ts           display helpers — prices, status labels, refusal messages
    components/         one PascalCase component per file: Cart, LoginForm, MenuList, MyOrders
    styles.css          the one global stylesheet; design tokens as CSS custom properties on :root
  test/                 Vitest tests, <subject>.test.ts
```

- **Every API call goes through `src/api.ts`** — components never call `fetch` `[observed: apps/web/src/components/**]`. A refused request surfaces as an `ApiError` carrying the API's `error` code.
- **User-facing messages for API codes live in `format.ts`** `refusalMessage`, in Spanish `[observed: apps/web/src/format.ts:17-33]`.
- **No router.** Screens are switched with state in `App` `[observed: apps/web/src/App.tsx:8,15]`.
- **The session token and the employee's name live in `sessionStorage`** `[observed: apps/web/src/api.ts:34,55-56]`.
- **Naming:** components PascalCase (`Cart.tsx`), other modules lowercase (`api.ts`, `format.ts`); imports without file extensions.
- **Styling:** class names in the global stylesheet, colours from the `:root` custom properties. No CSS modules, no utility framework.

**Tests** `[observed]`: Vitest in its default Node environment — no jsdom, no Testing Library — so only pure helpers are tested today (`test/format.test.ts`). No component or end-to-end test exists. A scenario that needs the interface covered is a question for the plan: adding Testing Library and jsdom is a new dependency, asked first.

**Commands** — run from the repository root:

| | Command |
|---|---|
| install | `npm ci` (root — installs both apps) |
| dev | `npm run dev -w @cafeteria/web` — or `npm run dev` for both apps |
| test | `npm test -w @cafeteria/web -- --reporter=dot` |
| lint | none — no linter |
| typecheck | `npm run typecheck -w @cafeteria/web` |
| build | `npm run build -w @cafeteria/web` |

## App: apps/api

Express 4 JSON API in TypeScript, run directly with `tsx` — there is no build step `[observed: apps/api/package.json]`. *No template exists for Express; everything here is observed.*

**Structure** `[observed]`:

```
apps/api/
  src/
    index.ts            entry point: builds the app on the file store and listens
    app.ts              createApp(store, clock) — every route, in one file
    config.ts           operational settings: env (PORT, DATA_FILE) and business constants
    auth/session.ts     sign-in, sessions, requireAuth middleware
    db/schema.ts        the shape of everything stored
    db/store.ts         Store interface — fileStore (JSON file) and memoryStore (tests)
    db/seed.ts          the data a new file starts with
    orders/validate.ts  why an order is refused — refuse() returns a Refusal or null
    pricing/total.ts    computeTotals — subtotal, combo discount, total
  test/                 Vitest tests, <area>.test.ts
```

- **Routes are defined in `app.ts`**, inside `createApp`; business rules live in their own module folder (`orders/`, `pricing/`, `auth/`) as plain functions that the route calls `[observed: apps/api/src/app.ts]`.
- **Dependencies are passed in, not imported as singletons, where a test needs to replace them:** the store and the clock go to `createApp` `[observed: apps/api/src/app.ts:10]`; time-dependent functions take a `now` parameter with a default `[observed: apps/api/src/auth/session.ts:14, apps/api/src/orders/validate.ts:18]`.
- **Routes that read or write an employee's data use `requireAuth`**, and take the employee from `req.employeeId` `[observed: apps/api/src/auth/session.ts:41-52]`.
- **Errors are JSON `{ error: "<snake_case_code>" }`** with any detail as extra fields; 401 for auth, 422 for a refused order `[observed: apps/api/src/app.ts:22,43, apps/api/src/orders/validate.ts:9-15]`. A refusal is a value returned by a function, not a thrown exception.
- **Business constants** are named in `config.ts` (limits, hours) or beside the rule they belong to (`COMBO_DISCOUNT_PERCENT` in `pricing/`) — never a bare number in a route `[observed]`.
- **Relative imports carry the `.js` extension** (`./auth/session.js`) `[observed]`.
- **Paths are `/api/<resource>`**, kebab-case (`/api/auth/sign-in`, `/api/orders/mine`) `[observed]`.
- **When what the API accepts or returns changes, `apps/web/src/api.ts` changes with it** — a review rule: `docs/code-review.md` RR-2.

**Tests** `[observed]`: Vitest. HTTP behaviour through supertest on `createApp(memoryStore(), clock)` — the use-case boundary — with a fixed clock for time rules (`test/orders.test.ts`); isolated rules called directly (`test/pricing.test.ts`, `test/auth.test.ts`). The seed is the fixture. Nothing is mocked.

**Commands** — run from the repository root:

| | Command |
|---|---|
| install | `npm ci` (root — installs both apps) |
| dev | `npm run dev -w @cafeteria/api` — or `npm run dev` for both apps |
| start | `npm start -w @cafeteria/api` |
| test | `npm test -w @cafeteria/api -- --reporter=dot` |
| lint | none — no linter |
| typecheck | `npm run typecheck -w @cafeteria/api` |
| build | none — `tsx` runs the source |
