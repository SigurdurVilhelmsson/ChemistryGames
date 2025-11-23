# Equilibrium Shifter - Followup Development Prompt

## Current Status

✅ **Basic Functional Game Complete** - Version 1.0

The basic game has been built and deployed for user testing with the following features:

### What's Working (v1.0):
- ✅ Core Le Chatelier's principle logic engine (100% accurate)
- ✅ 5 equilibrium systems (Haber, NO₂, Contact Process, HI, Methanol)
- ✅ Learning mode (unlimited time, detailed explanations)
- ✅ Visual equilibrium display with molecule icons
- ✅ Animated shift feedback (left/right/no shift)
- ✅ Stress application (add/remove reactants/products, temperature, pressure, catalyst)
- ✅ Prediction system with immediate feedback
- ✅ Icelandic/English bilingual explanations
- ✅ Mobile-responsive design
- ✅ Kvenno brand styling

### File Locations:
- **Game:** `/3-ar/equilibrium-shifter/build/equilibrium-shifter.html`
- **Specifications:** `/3-ar/equilibrium-shifter/`
  - Complete specification: `equilibrium-shifter-instructions.md`
  - Quick reference: `equilibrium-shifter-quick-reference.md`
  - 30 equilibrium bank: `EQUILIBRIUM-BANK-30-COMPLETE.md`
  - Build instructions: `README-FOR-CLAUDE-CODE-EQUILIBRIUM.md`
  - Starter template: `equilibrium-shifter-starter-template.html`

---

## Phase 2: Continuing Development After User Testing

### Priority 1: Add Remaining Equilibrium Systems

**Task:** Expand from 5 to 30 equilibrium systems

**Instructions:**
1. Open `EQUILIBRIUM-BANK-30-COMPLETE.md` and copy all 30 equilibria
2. Convert each equilibrium to the JavaScript format used in the game
3. Organize by difficulty: Beginner (10), Intermediate (12), Advanced (8)
4. Test each equilibrium with all applicable stresses

**Example conversion:**
```javascript
{
    id: 6,
    equation: 'Fe³⁺(aq) + SCN⁻(aq) ⇌ FeSCN²⁺(aq)',
    name: 'Iron Thiocyanate Complex',
    nameIs: 'Járnþíósýanatkomplexinn',
    difficulty: 'beginner',

    reactants: [
        { formula: 'Fe³⁺', coefficient: 1, phase: 'aq', display: '🟡⁺' },
        { formula: 'SCN⁻', coefficient: 1, phase: 'aq', display: '⚪⁻' }
    ],

    products: [
        { formula: 'FeSCN²⁺', coefficient: 1, phase: 'aq', display: '🔴' }
    ],

    deltaH: -20,

    totalGasMoles: {
        reactants: 0,  // aqueous
        products: 0
    },

    description: 'Blood-red complex ion, used in chemistry demonstrations.',
    descriptionIs: 'Blóðrauður komplexjón, notaður í efnafræðisýningum.',

    possibleStresses: [
        { type: 'add-reactant', target: 'Fe³⁺' },
        { type: 'add-reactant', target: 'SCN⁻' },
        { type: 'add-product', target: 'FeSCN²⁺' },
        { type: 'increase-temp', target: null },
        { type: 'decrease-temp', target: null },
        // Note: No pressure changes for aqueous equilibria
    ]
}
```

**Testing checklist for each equilibrium:**
- [ ] All concentration changes work correctly
- [ ] Temperature changes follow thermodynamics (ΔH)
- [ ] Pressure changes only for gas equilibria
- [ ] Equal gas moles show "no shift" for pressure
- [ ] Catalyst always shows "no shift"
- [ ] Aqueous equilibria don't have pressure options
- [ ] Visual display is clear
- [ ] Explanations are accurate

---

### Priority 2: Implement Challenge Mode

**Task:** Add timed, competitive game mode

**Features to implement:**
1. **Timer System**
   - 20-second countdown per question
   - Visual timer display
   - Auto-advance when time expires

2. **Scoring System**
   - Points per correct answer: Beginner (10), Intermediate (20), Advanced (30)
   - Speed bonus: +5 if answered in <10 seconds
   - Streak system: +5, +10, +15, +20, +25 (max)
   - Wrong answer: -5 points
   - Timeout: 0 points, reset streak

3. **Game Flow**
   - 10 questions per round
   - Random equilibria selection
   - Random stress application
   - Brief explanation after each answer
   - Results screen at end with stats

4. **Results Screen**
   - Total score
   - Correct/incorrect breakdown
   - Average time per question
   - Best streak achieved
   - Option to play again or return to menu

**Implementation notes:**
- Use existing timer logic from starter template
- Random selection: `EQUILIBRIUM_BANK[Math.floor(Math.random() * EQUILIBRIUM_BANK.length)]`
- Random stress: `eq.possibleStresses[Math.floor(Math.random() * eq.possibleStresses.length)]`

---

### Priority 3: Enhanced Visual Feedback

**Task:** Improve animations and visual clarity

**Enhancements:**
1. **Molecule Count Animations**
   - Show molecules increasing/decreasing during shifts
   - Add particle flow animations
   - Visual Q vs K comparison

2. **Better Stress Indicators**
   - Highlight the stressed component
   - Show before/after states
   - Animation when stress is applied

3. **Sound Effects (Optional, Toggleable)**
   - Correct prediction: pleasant sound
   - Incorrect: gentle error sound
   - Shift animation: subtle whoosh
   - Button to mute/unmute

4. **Enhanced Thermodynamics Display**
   - More prominent ΔH indicator
   - Visual heat/cold representations
   - Energy diagram option

---

### Priority 4: ICE Table Practice Mode

**Task:** Add ICE table calculation practice

**Features:**
1. **Display Format**
   - Show ICE table structure
   - Given: initial concentrations, K value
   - Student input: x value and equilibrium concentrations

2. **Step-by-Step Solutions**
   - Show algebraic steps
   - Highlight common mistakes
   - Verify student calculations

3. **Problem Types**
   - Simple equilibria (quadratic not needed)
   - Quadratic required problems
   - Small K approximation problems

**Example implementation:**
```javascript
const iceTableProblem = {
    equilibrium: EQUILIBRIUM_BANK[3], // H₂ + I₂ ⇌ 2HI
    K: 54.0,
    temperature: 700,
    initial: { H2: 1.0, I2: 1.0, HI: 0 },
    solution: {
        x: 0.788,
        equilibrium: { H2: 0.212, I2: 0.212, HI: 1.576 },
        steps: [/* calculation steps */]
    }
};
```

---

### Priority 5: Quality of Life Improvements

**Task:** Polish and enhance user experience

**Features:**
1. **Difficulty Selection**
   - Let user choose: Beginner/Intermediate/Advanced
   - Filter equilibria by difficulty
   - Progressive unlocking option

2. **Progress Tracking**
   - LocalStorage for high scores
   - Track equilibria completed
   - Mastery indicators

3. **Hint System**
   - Progressive hints (3 levels)
   - Hint 1: Identify stress type
   - Hint 2: State Le Chatelier principle
   - Hint 3: Show direction

4. **Instructions Modal**
   - Better in-game instructions
   - Le Chatelier rules reference
   - Example walkthroughs

5. **Keyboard Shortcuts**
   - Arrow keys for predictions (← Left, → Right, ↑ No shift)
   - Number keys for stress selection
   - Space for next question

---

### Priority 6: Advanced Features (Optional)

**Task:** Add sophisticated educational features

**Features:**
1. **Q vs K Explanations**
   - Show reaction quotient calculation
   - Visual Q < K, Q > K, Q = K
   - Predict shift direction from Q/K comparison

2. **Multiple Stresses**
   - Apply two stresses simultaneously
   - Determine net shift direction
   - More advanced problem solving

3. **Industrial Optimization**
   - Real-world scenarios (Haber, Contact)
   - Trade-off analysis (yield vs rate vs cost)
   - Temperature/pressure optimization

4. **Coupled Equilibria**
   - Multiple equilibria systems
   - Buffer systems with multiple equilibria
   - Le Chatelier in biological systems

---

## Testing Checklist (Before Final Deployment)

### Educational Accuracy
- [ ] All Le Chatelier predictions are correct
- [ ] Thermodynamics logic is accurate (ΔH effects)
- [ ] Pressure effects only for gas equilibria
- [ ] Equal moles handled correctly
- [ ] Catalyst logic correct (no K change)
- [ ] Explanations are clear and educational
- [ ] Icelandic translations accurate

### Functionality
- [ ] All equilibria load correctly
- [ ] All stress types work
- [ ] Predictions register correctly
- [ ] Animations are smooth
- [ ] Timer counts down properly (Challenge)
- [ ] Scoring calculates correctly
- [ ] Streak tracking works
- [ ] Next/back navigation works
- [ ] No console errors

### Visual/UX
- [ ] Mobile responsive (test on phone)
- [ ] Tablet layout works
- [ ] Desktop optimal
- [ ] Colors are meaningful
- [ ] Text is readable
- [ ] Buttons are clear
- [ ] Animations enhance learning
- [ ] No visual glitches

### Browser Compatibility
- [ ] Chrome (desktop & mobile)
- [ ] Firefox
- [ ] Safari (iOS & macOS)
- [ ] Edge

---

## Quick Reference: Le Chatelier Logic

### Concentration
```javascript
Add reactant → RIGHT
Add product → LEFT
Remove reactant → LEFT
Remove product → RIGHT
```

### Temperature
```javascript
Exothermic (ΔH < 0): Heat is PRODUCT
  Increase T → LEFT
  Decrease T → RIGHT

Endothermic (ΔH > 0): Heat is REACTANT
  Increase T → RIGHT
  Decrease T → LEFT
```

### Pressure (Gas Only)
```javascript
Increase P → Toward FEWER moles
Decrease P → Toward MORE moles
Equal moles → NO SHIFT
```

### Catalyst
```javascript
Add catalyst → ALWAYS NO SHIFT
(Speeds both directions, K unchanged)
```

---

## Prompt for Claude Code (Phase 2)

**To continue development, use this prompt:**

```
Continue development of the Equilibrium Shifter game (Game 2).

Current status: Basic functional version (v1.0) is complete and has been user tested.

Next phase tasks:
1. Add all 30 equilibrium systems from EQUILIBRIUM-BANK-30-COMPLETE.md
2. Implement Challenge Mode with timer, scoring, and streaks
3. Enhance visual feedback and animations
4. Add ICE table practice mode
5. Implement quality-of-life improvements (hints, difficulty selection, progress tracking)

File location: /3-ar/equilibrium-shifter/build/equilibrium-shifter.html
Specifications: /3-ar/equilibrium-shifter/

Please follow the detailed instructions in FOLLOWUP-DEVELOPMENT-PROMPT.md for each priority.
Start with Priority 1 (adding remaining equilibrium systems), test thoroughly, then proceed to Priority 2.

Maintain the existing code structure and Kvenno branding. Ensure all Le Chatelier logic remains 100% accurate.
```

---

## Notes for Developers

### Code Structure
The game uses:
- **React 18** (in-browser with Babel)
- **Tailwind CSS** (CDN)
- **Single HTML file** (no build process)
- **Functional components** with hooks

### Key Functions
- `calculateShift(equilibrium, stressType, stressTarget)` - Core Le Chatelier logic
- `applyStress()` - Handles stress selection
- `makePrediction()` - Processes user prediction
- `EQUILIBRIUM_BANK` - Array of all equilibria

### State Management
Simple useState for:
- Current screen (menu/playing/results)
- Game mode (learning/challenge)
- Current equilibrium
- Applied stress
- User prediction
- Animation state
- Feedback class

### Adding New Equilibria
1. Copy from EQUILIBRIUM-BANK-30-COMPLETE.md
2. Convert to JavaScript object format
3. Add to EQUILIBRIUM_BANK array
4. Test all possible stresses
5. Verify visual display
6. Check explanations

### Common Issues to Avoid
- ❌ Don't forget to set totalGasMoles to 0 for aqueous equilibria
- ❌ Don't add pressure stresses for aqueous reactions
- ❌ Don't reverse thermodynamics logic (endo vs exo)
- ❌ Don't make catalyst shift the equilibrium
- ❌ Don't forget to test equal gas moles case

---

## Success Criteria

The complete game (v2.0+) succeeds when:
- ✅ All 30 equilibria work correctly
- ✅ Both game modes are functional and fun
- ✅ Le Chatelier logic is 100% accurate
- ✅ Visual feedback enhances understanding
- ✅ Students can predict shifts intuitively
- ✅ Teachers use it for demonstrations
- ✅ Students practice voluntarily outside class
- ✅ "Now I get it!" moments happen frequently

---

**Good luck with Phase 2 development! The foundation is solid and ready to expand.** 🚀⚖️
