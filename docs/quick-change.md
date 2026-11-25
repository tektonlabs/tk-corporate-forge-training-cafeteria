# Quick change — what never takes the quick lane

**Owner:** the tech lead · **Read by:** `tk-quick-check` — on the quick plan before coding and on the diff after — wherever it runs: `/tk-quick-change`, `/tk-plan-spec`, `/tk-new-story`, `/tk-pr-feedback`

The quick lane already refuses a change to behaviour a spec states, to data, to a decision, or to a critical control in `docs/architecture.md` §Cross-cutting concerns. Some code is sensitive in ways none of those name — what a customer pays, tax, a feature-flag configuration — and only this project knows which. List it here, and every change to it goes through `/tk-plan-spec`, however small.

## How this file works

- **Stricter only.** An entry keeps a change out of the quick lane; nothing here lets one in or relaxes a check.
- **One entry, one line:** a glob over the repository's paths, and the reason a developer can repeat.
- **Matched twice.** A file in the quick plan, or a path in the diff, under an entry → not a quick change, and the reason names the entry.
- **Read as merged, changed in a pull request of its own.** The quick lane reads this file from `origin`'s default branch, so an edit only counts once it is merged; an edit inside a quick change is reverted.
- **Entries go below the comment.** Anything inside `<!-- … -->` is ignored, the example included. Keep the `## Never quick` heading as it is: without it the list cannot be read, and the quick lane stops until the heading is restored.

## Never quick

<!-- An example, not an entry: write real entries below this comment, in the same shape.

- `apps/api/src/pricing/**` — what a customer pays is a business rule; every change to it is specified first.
-->
