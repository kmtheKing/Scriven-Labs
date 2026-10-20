# Scriven Labs — Agentic Guidelines & Architecture

## 1. Core Ethos & Engineering Mindset
- **Quality Standard**: Ultra-premium execution tailored dynamically to the context of each product. Never build bland, standard, or toy MVPs.
- **Mindset**: Think around corners. Challenge assumptions directly. Avoid sycophancy. Focus on intent, edge cases, and durable outcomes.

---

## 2. Workspace Agent Skills (`.agents/skills/`)
All workspace engineering skills live in [`.agents/skills/`](file:///d:/Scriven%20Labs/.agents/skills). Antigravity discovers and reads these skills on demand.

### Workflow Pipeline
When taking an initiative from concept to ship, follow this lifecycle:

```
[Idea / Request]
       │
       ▼
1. Discovery & Stress-Testing
   ├─ grilling / grill-with-docs  ── Stress-test assumptions and record ADRs
   ├─ domain-modeling             ── Sharpen domain terms in GLOSSARY.md
   └─ loop-me                     ── Uncover workflows and delegate recurring loops
       │
       ▼
2. Specification & Task Decomposition
   ├─ to-spec                     ── Synthesize conversation into an actionable spec
   └─ to-tickets                  ── Break spec into tracer-bullet task graphs with blocking edges
       │
       ▼
3. Execution & Implementation
   ├─ chief-of-staff              ── Orchestrate subagents and multi-step initiatives
   ├─ implement / implement-spec  ── Implement tickets across integration branches
   └─ tdd                         ── Test-driven development at pre-agreed high seams
       │
       ▼
4. Architecture & Quality Control
   ├─ codebase-design             ── Deep modules, small surface interfaces, low coupling
   ├─ setup-ts-deep-modules       ── Enforce dependency boundaries in TypeScript
   ├─ improve-codebase-architecture ── Surface shallow modules and refactor deepening seams
   ├─ code-review                 ── Review against standards and originating spec
   └─ retro                       ── Session retrospective to harden the agent environment
```

### Skill Dispatch Mechanics in Antigravity
- Skills are modular runbooks in `.agents/skills/<skill-name>/SKILL.md`.
- To activate a skill, inspect its instructions using `view_file` on its `SKILL.md` before executing multi-step workflows.
- For modular architecture principles, refer to `codebase-design`.
- For vocabulary, refer to `GLOSSARY.md` in `.agents/reference/GLOSSARY.md`.
