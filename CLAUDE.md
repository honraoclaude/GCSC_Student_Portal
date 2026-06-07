# GCSC Student Hub — Coding Principles

These guidelines are derived from [Andrej Karpathy's coding observations](https://x.com/karpathy/status/2015883857489522876) and adapted for this project.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- **State assumptions explicitly** — If uncertain about tech stack, data structure, or API response format, ask.
- **Present multiple approaches** — If streaming vs non-streaming, client vs server-side, don't pick silently.
- **Push back on complexity** — If a simple solution exists, say so. Don't overcomplicate "just in case."
- **Stop when confused** — Name what's unclear. Don't guess and waste time on wrong approaches.

**Example (bad):** Implement streaming agents without testing the Anthropic API response format first.
**Example (good):** Test basic JSON response first, verify API works, then add streaming.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- ❌ No features beyond what was asked (e.g., don't add leaderboards if not requested)
- ❌ No abstractions for single-use code (e.g., custom hooks for one component)
- ❌ No "flexibility" that wasn't requested (e.g., making a dashboard generic when only students use it)
- ❌ No error handling for impossible scenarios (trust Clerk, Prisma, API contracts)
- ❌ If 200 lines could be 50, rewrite it

**Test:** Would a senior engineer say this is overcomplicated? If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting
- Don't refactor things that aren't broken
- Match existing style, even if you'd do it differently
- If you notice unrelated dead code, mention it — don't delete it

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused
- Don't remove pre-existing dead code unless asked

**Test:** Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria before starting. Loop until verified.**

Transform vague tasks into verifiable goals:
| Instead of... | Transform to... |
|---|---|
| "Add agents" | "Implement basic JSON chat endpoint, test it works, then add streaming" |
| "Fix agents" | "Verify Anthropic API key is valid, test model name exists, then debug streaming" |
| "Redesign dashboard" | "Update components to modern design, deploy, screenshot before/after" |

For multi-step tasks, state a brief plan **first**:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let work proceed efficiently. Weak criteria ("make it work") waste time on wrong approaches.

---

## Project Context

- **Tech:** Next.js 15, TypeScript, Tailwind, Prisma, Neon, Clerk, Anthropic Claude
- **Deployment:** Vercel (no local testing required per user preference)
- **User:** UK GCSE students aged 13-18
- **Key constraint:** When debugging agent issues, test the API first (JSON) before adding complexity (streaming)

---

## Recent Lessons Learned

1. **Agent streaming** — Overcomplicated the implementation without testing basic JSON response first
2. **Model names** — Didn't verify `claude-3-5-sonnet-20241022` exists before using it
3. **Surgical changes** — Some refactors touched more code than necessary

**Going forward:** Think first, test simple approaches, then add complexity.
