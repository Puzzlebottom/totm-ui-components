# Documentation Guide

## For AI Assistants Developing This Library

**Start here:** `/.cursorrules`
- Comprehensive, self-contained rules and patterns
- Complete code examples
- Quality standards and validation steps
- Communication guidelines

**Then reference:**
- `component-checklist.md` - Quick checklist while working
- `architecture.md` - Deep context on "why" behind decisions
- `writing-usage-guidance.md` - Guide for writing consumer-focused JSDoc

## For Human Developers

**Start here:** `/CONTRIBUTING.md`
- Concise workflow guide
- Points to detailed docs in `.ai/` folder

**Then reference:**
- `.ai/component-checklist.md` - Complete checklist
- `.ai/architecture.md` - Technical deep dive
- `.ai/writing-usage-guidance.md` - JSDoc best practices

## For Library Consumers (Humans & AI)

**Start here:** `/README.md`
- Installation instructions
- Basic usage examples
- Development setup

**Then reference:**
- **JSDoc in components** - Comprehensive guidance on when/how to use each component (ships with package!)
- IDE IntelliSense will show JSDoc when using components

## Documentation Structure

```
/
├── README.md                           # Consumer guide (installation, usage)
├── CONTRIBUTING.md                     # Developer workflow (concise, references .ai/)
├── .cursorrules                        # AI assistant rules (comprehensive)
└── .ai/
    ├── README.md                       # This file - documentation map
    ├── component-checklist.md          # Quick reference checklist
    ├── architecture.md                 # Technical deep dive
    └── writing-usage-guidance.md       # JSDoc writing guide
```

## Single Source of Truth

To avoid redundancy:

| Topic | Primary Source | References It |
|-------|---------------|---------------|
| **Complete patterns** | `.cursorrules` | `CONTRIBUTING.md` |
| **Architecture rationale** | `.ai/architecture.md` | `.cursorrules`, `CONTRIBUTING.md` |
| **JSDoc guidance** | `.ai/writing-usage-guidance.md` | `.cursorrules`, checklist |
| **Workflow steps** | `.ai/component-checklist.md` | All docs |
| **Consumer guide** | `README.md` + JSDoc | - |

## Why This Structure?

**Eliminates redundancy:** Patterns defined once in `.cursorrules`, referenced elsewhere  
**Audience-optimized:** AI gets comprehensive rules, humans get concise workflow  
**Single source of truth:** Each topic has one authoritative source  
**JSDoc is primary:** It ships with the package - consumers see it in their IDE

## Quick Reference by Task

**"I want to create a new component"**
- AI: Follow `.cursorrules` + `component-checklist.md`
- Human: Follow `CONTRIBUTING.md` + `component-checklist.md`

**"I want to understand why we do X"**
- Read `architecture.md`

**"I want to write better JSDoc"**
- Read `writing-usage-guidance.md`

**"I want to use a component"**
- Read JSDoc in the component file (shows in IDE)
- Check `/README.md` for setup

**"I want to verify documentation is accurate"**
- See "Documentation Maintenance" in `.cursorrules`
- Check all docs when changing patterns

