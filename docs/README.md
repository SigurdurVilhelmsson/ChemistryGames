# ChemistryGames Documentation

Welcome to the ChemistryGames documentation hub. This directory organizes all project documentation for easy navigation.

---

## 📚 Active Documentation

### 🎯 Roadmap & Planning (PRIMARY)

Our development is guided by research-based improvement plans:

- **[GAME-IMPROVEMENT-RECOMMENDATIONS.md](../GAME-IMPROVEMENT-RECOMMENDATIONS.md)** - Comprehensive evaluation with 108 improvements based on 2024-2025 educational games research
- **[GAME-IMPROVEMENT-CHECKLIST.md](../GAME-IMPROVEMENT-CHECKLIST.md)** - Implementation tracker with status for all improvements
- **[GAME-REVIEW-PROMPT.md](../GAME-REVIEW-PROMPT.md)** - Three-level pedagogical framework for game reviews

### Core Documentation
- **[Main README](../README.md)** - Repository overview, architecture, and quick start guide
- **[LICENSE](../LICENSE)** - MIT License (Copyright 2025 Sigurður E. Vilhelmsson)

### Technical Reference
- **[API Reference](API-REFERENCE.md)** - Complete API documentation for the shared library (hooks, utilities, types)
- **[Architecture](ARCHITECTURE.md)** - System architecture, diagrams, data flow, and design decisions
- **[Developer Guide](DEVELOPER-GUIDE.md)** - Comprehensive guide for developers (setup, patterns, best practices)

### Development Guides
- **[DEVELOPMENT.md](../DEVELOPMENT.md)** - Development workflow, available scripts, and code quality tools
- **[DEBUGGING.md](../DEBUGGING.md)** - Comprehensive debugging guide (VSCode, React DevTools, browser tools)

### Deployment & Infrastructure
- **[DEPLOYMENT.md](../DEPLOYMENT.md)** - Deployment guide to kvenno.app production server
- **[KVENNO-STRUCTURE.md](../KVENNO-STRUCTURE.md)** - Site-wide structure, design system, authentication, and backend API

---

## 🗂️ Additional Documentation

### Game-Specific Documentation
Each game has its own README with specific implementation details:
- [`games/1-ar/dimensional-analysis/README.md`](../games/1-ar/dimensional-analysis/)
- [`games/1-ar/molmassi/README.md`](../games/1-ar/molmassi/)
- [`games/1-ar/nafnakerfid/README.md`](../games/1-ar/nafnakerfid/)
- [`games/1-ar/lausnir/README.md`](../games/1-ar/lausnir/)
- [`games/1-ar/takmarkandi/README.md`](../games/1-ar/takmarkandi/)
- [`games/3-ar/ph-titration-practice/README.md`](../games/3-ar/ph-titration-practice/)
- [`games/3-ar/ph-titration-master/README.md`](../games/3-ar/ph-titration-master/)
- [`games/3-ar/gas-law-challenge/README.md`](../games/3-ar/gas-law-challenge/)
- [`games/3-ar/equilibrium-shifter/README.md`](../games/3-ar/equilibrium-shifter/)
- [`games/3-ar/thermodynamics-predictor/README.md`](../games/3-ar/thermodynamics-predictor/)
- [`games/3-ar/buffer-recipe-creator/README.md`](../games/3-ar/buffer-recipe-creator/)

### Shared Library Documentation
- **[shared/README.md](../shared/README.md)** - Shared component library API and usage guide

### Development Tools
- **[tools/game-template/README.md](../tools/game-template/README.md)** - Game template documentation

---

## 📦 Archived Documentation

Historical documentation from completed project phases:

### Archived Documents

**Completed Migrations (Phase 2 - 2024/2025):**
- **[MIGRATION-PLAN.md](archive/completed-migrations/MIGRATION-PLAN.md)** - Migration status tracking (✅ All 12 games migrated)
- **[MIGRATION-GUIDE.md](archive/completed-migrations/MIGRATION-GUIDE.md)** - Detailed guide for migrating legacy games to monorepo
- **[EININGAGREINING-UPDATES.md](archive/completed-migrations/EININGAGREINING-UPDATES.md)** - Specific updates to dimensional analysis game (Nov 2025)

**Consolidated Documents:**
- **[IMPROVEMENTS.md](archive/IMPROVEMENTS.md)** - Original improvements tracker (consolidated into GAME-IMPROVEMENT-CHECKLIST.md)

> **Note:** These documents are kept for historical reference. All games have been successfully migrated to the monorepo architecture. New games should use the game template (`tools/create-game.sh`).

---

## 🚀 Quick Links

### For New Contributors
1. Start with [Main README](../README.md) for project overview
2. Review [GAME-IMPROVEMENT-CHECKLIST.md](../GAME-IMPROVEMENT-CHECKLIST.md) to see current progress
3. Read [Developer Guide](DEVELOPER-GUIDE.md) for setup and patterns
4. Review [API Reference](API-REFERENCE.md) for shared library usage

### For Game Improvements
1. Check [GAME-IMPROVEMENT-RECOMMENDATIONS.md](../GAME-IMPROVEMENT-RECOMMENDATIONS.md) for the improvement roadmap
2. Track progress in [GAME-IMPROVEMENT-CHECKLIST.md](../GAME-IMPROVEMENT-CHECKLIST.md)
3. Follow [GAME-REVIEW-PROMPT.md](../GAME-REVIEW-PROMPT.md) for quality guidelines

### For Game Development
1. Use `tools/create-game.sh` to create a new game from template
2. Follow patterns in [Developer Guide](DEVELOPER-GUIDE.md)
3. Use the [API Reference](API-REFERENCE.md) for hooks and utilities

### For Understanding the Codebase
1. Read [Architecture](ARCHITECTURE.md) for system design and data flow
2. Review diagrams for component relationships
3. Check game-specific READMEs for implementation details

### For Deployment
1. Follow [DEPLOYMENT.md](../DEPLOYMENT.md) for production deployment
2. Ensure alignment with [KVENNO-STRUCTURE.md](../KVENNO-STRUCTURE.md)

---

## 📝 Documentation Standards

When creating or updating documentation:

- **Use clear headings** - Follow markdown best practices
- **Keep it current** - Update docs when code changes
- **Be concise** - Developers want quick answers
- **Include examples** - Show, don't just tell
- **Link between docs** - Help readers navigate

### Updating This Index

When adding new documentation:
1. Add it to the appropriate section above
2. Include a brief description
3. Link to the file location
4. Update the Quick Links if it's a common reference

---

## 📞 Getting Help

- **Issues:** Open a GitHub issue for bugs or questions
- **Documentation Issues:** PR fixes to documentation directly
- **Contact:** Sigurður E. Vilhelmsson, Kvennaskólinn í Reykjavík

---

**Last Updated:** 2025-12-29
