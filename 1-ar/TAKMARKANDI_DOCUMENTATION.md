# Takmarkandi Hvarfefni - Comprehensive Documentation

## Overview
This document details all improvements made to the limiting reactant educational game (`takmarkandi_refined.html`), including the critical bug fix, new features, data models, and testing guidelines.

---

## 🔴 CRITICAL BUG FIX

### Products Data Model Restructure

**Problem:** The original code treated multi-product reactions incorrectly by combining multiple products into a single object with coefficient 1.

**Example of the bug:**
```javascript
// OLD (BROKEN) - Reaction #4
{
    equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    product: { formula: 'CO₂ + H₂O', coeff: 1, color: '#8b5cf6' }
}
// This calculated: 1 × timesReactionRuns = WRONG for H₂O (should be 2 × timesReactionRuns)
```

**Solution:** Changed from single `product` object to `products` array.

```javascript
// NEW (CORRECT) - Reaction #5
{
    equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    products: [
        { formula: 'CO₂', coeff: 1, color: '#6b7280' },
        { formula: 'H₂O', coeff: 2, color: '#8b5cf6' }
    ]
}
```

### Implementation Changes

1. **Data Structure:** All reactions now use `products: []` array
2. **Calculation Logic:** Updated `calculateCorrectAnswer()` to iterate through products array
3. **UI Updates:** Modified to display each product separately with individual input fields
4. **Validation:** Each product amount is validated independently

### Affected Functions
- `calculateCorrectAnswer()` - Now calculates each product separately
- `handleSubmit()` - Validates all product inputs
- `generateNewProblem()` - Initializes productsFormed object for all products
- Render logic - Shows input field for each product

---

## 📚 NEW REACTION LIBRARY

### Total Reactions: 20 (was 6)

#### Easy Level (7 reactions)
1. `2H₂ + O₂ → 2H₂O` - Water formation
2. `2Mg + O₂ → 2MgO` - Magnesium oxide
3. `C + O₂ → CO₂` - Carbon dioxide
4. `2Na + Cl₂ → 2NaCl` - Sodium chloride
5. `2K + Cl₂ → 2KCl` - Potassium chloride
6. `Ca + S → CaS` - Calcium sulfide
7. `Zn + S → ZnS` - Zinc sulfide
8. `2Cu + O₂ → 2CuO` - Copper oxide

#### Medium Level (6 reactions)
1. `N₂ + 3H₂ → 2NH₃` - Ammonia synthesis
2. `4Al + 3O₂ → 2Al₂O₃` - Aluminum oxide
3. `3Ca + N₂ → Ca₃N₂` - Calcium nitride
4. `2C + O₂ → 2CO` - Carbon monoxide
5. `3Mg + N₂ → Mg₃N₂` - Magnesium nitride
6. `CH₄ + 2O₂ → CO₂ + 2H₂O` - Methane combustion (MULTI-PRODUCT)

#### Hard Level (6 reactions)
1. `4Fe + 3O₂ → 2Fe₂O₃` - Iron(III) oxide
2. `3Fe + 2O₂ → Fe₃O₄` - Iron(II,III) oxide
3. `P₄ + 5O₂ → 2P₂O₅` - Phosphorus pentoxide
4. `S₈ + 12O₂ → 8SO₃` - Sulfur trioxide
5. `2Al + 3CuO → Al₂O₃ + 3Cu` - Thermite reaction (MULTI-PRODUCT)
6. `4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂` - Pyrite roasting (MULTI-PRODUCT)

### Multi-Product Reactions
Three reactions have multiple products and demonstrate the fixed data model:
- Reaction #5: CH₄ combustion (CO₂ + H₂O)
- Reaction #19: Thermite reaction (Al₂O₃ + Cu)
- Reaction #20: Pyrite roasting (Fe₂O₃ + SO₂)

---

## 🎮 NEW FEATURES

### 1. Practice Mode vs Competition Mode
- **Practice Mode** (📚 Æfingastilling):
  - No scoring
  - "Sýna lausn" available immediately
  - Calculations shown after every answer
  - Can skip questions
  - Green color scheme

- **Competition Mode** (🏆 Keppnisstilling):
  - Scored gameplay
  - Points: Easy (10), Medium (15), Hard (20)
  - Timer bonuses available
  - Streak bonuses
  - Blue/indigo color scheme

### 2. Input Validation
- Only accepts positive integers
- No decimals, no negatives
- Red border on invalid input with error message: "Sláðu inn heila jákvæða tölu"
- Green border on valid input
- Submit button disabled until all fields valid
- Uses `inputmode="numeric"` for mobile keyboards

### 3. Visual Reaction Animation
- Molecules animate with `moleculePop` keyframe
- Hover effect with scale and brightness
- Reaction animation shows step-by-step consumption
- Product molecules fade in with glow effect
- Excess molecules shown with reduced opacity

### 4. Enhanced Step-by-Step Explanation
Four-step teaching sequence:
1. **Skref 1:** Calculate moles per unit
2. **Skref 2:** Find lowest value (limiting reactant)
3. **Skref 3:** Calculate products formed
4. **Skref 4:** Calculate excess remaining

### 5. Interactive Calculation Helper (🧮 Reiknihjálp)
- Toggle with Space bar or button
- Shows division calculations in real-time
- Green highlighting for limiting reactant
- Updates dynamically
- Costs 5 points in competition mode (free in practice)

### 6. Show Solution Feature
- Available after 2 incorrect attempts
- Always available in practice mode
- Shows complete worked solution
- Animates reaction visually
- Awards 5 points for attempting (competition mode)

### 7. Streak & Achievement System
- Tracks consecutive correct answers
- Flame emoji 🔥 displays current streak
- Bonus points:
  - 3-streak: +5 points
  - 5-streak: +10 points
  - 10-streak: +15 points
- Celebration animation on milestones
- Best streak tracked in localStorage
- Visual celebration with sound effect

### 8. Progressive Difficulty (🧠 Snjallval)
- "Smart" mode adapts to performance
- Prioritizes unmastered reactions
- Tracks mastery (3+ correct on same reaction)
- Alternative: Random mode (🎲 Handahóf)

### 9. Timer Challenge Mode (⏱️ Tímamót)
- 2 minutes (120 seconds) per question
- Visual countdown progress bar
- Warning pulse when <30 seconds
- Speed bonuses:
  - >90s remaining: +10 points
  - >60s remaining: +5 points
- Can be toggled on/off

### 10. Detailed Contextual Feedback
Based on which parts are wrong:
- **Limiting reactant only wrong:** "Athugaðu deiliútreikninginn aftur. Hver hefur lægra gildi?"
- **Products only wrong:** "Rétt takmarkandi! En athugaðu margföldunina: [times] × [coeff]"
- **Excess only wrong:** "Gott! En gleymdirðu að draga notað magn frá?"
- **All correct:** Success messages based on streak level

### 11. Reaction Equation Balancer (⚖️)
- Info button next to equation
- Explains conservation of mass
- Educational tooltip
- Helps students understand balanced equations

### 12. Sound Effects (Toggle-able)
Synthesized audio using Web Audio API:
- **Correct answer:** High C note (523.25 Hz)
- **Incorrect answer:** Low A note (220 Hz)
- **Streak milestone:** Ascending fanfare
- **Molecule pop:** Quick high note (880 Hz)
- Mute toggle with speaker icon
- Preference stored in localStorage

### 13. Keyboard Shortcuts
- `Enter` - Submit answer / Next question
- `Space` - Toggle calculation helper
- `1` - Select first reactant as limiting
- `2` - Select second reactant as limiting
- `N` - Next question (after answering)
- `R` - Reset game
- `H` or `?` - Show/hide keyboard help
- Help popup shows all shortcuts

### 14. Progress Tracking (📊 Þróun)
Full statistics page showing:
- Total correct / total attempts
- Overall accuracy percentage
- Best streak
- Current streak
- Reactions mastered count
- Accuracy by difficulty level (with progress bars)
- Common mistakes breakdown:
  - Limiting reactant errors
  - Products calculation errors
  - Excess remaining errors

### 15. Mobile Optimization
- Responsive breakpoint at 768px
- Molecule size: 60px desktop, 40px mobile
- Vertical stacking on mobile
- Touch targets minimum 48px
- Sticky header on scroll
- `inputmode="numeric"` for number inputs
- Optimized layout for 320px, 375px, 414px, 768px, 1024px

### 16. Accessibility Improvements
- Screen reader support with Icelandic aria-labels
- Full keyboard navigation
- Skip to main content link
- Focus visible indicators (3px orange outline)
- High contrast mode toggle option
- Semantic HTML structure
- ARIA attributes on interactive elements

### 17. Visual Molecule Improvements
- Size: 60px on desktop (was 48px)
- Size: 40px on mobile
- Glow effect on hover
- Animation on appearance (pop effect)
- Particle effects during reactions
- Color-coded by element type
- Shadow effects for depth

---

## 💾 LOCALSTORAGE SCHEMA

### Keys and Data Structures

```javascript
// User Preferences
localStorage.setItem('practiceMode', boolean)
localStorage.setItem('smartDifficulty', boolean)
localStorage.setItem('timerMode', boolean)
localStorage.setItem('soundEnabled', boolean)
localStorage.setItem('highContrast', boolean)
localStorage.setItem('bestStreak', number)

// Progress Tracking
localStorage.setItem('progress', {
    totalGames: number,              // Total questions attempted
    totalCorrect: number,            // Total correct answers
    bestStreak: number,              // Best consecutive correct streak
    reactionsMastered: string[],     // Array of reaction IDs with 3+ correct
    accuracyByDifficulty: {
        easy: number[],              // Array of 1s (correct) and 0s (incorrect)
        medium: number[],
        hard: number[]
    },
    commonMistakes: {
        limitingReactant: number,    // Count of limiting reactant errors
        products: number,            // Count of product calculation errors
        excess: number               // Count of excess calculation errors
    },
    timeSpentMinutes: number         // Total time spent (future feature)
})
```

### Safety Features
- All localStorage access wrapped in try-catch blocks
- Default values provided for all get operations
- Silent failure if localStorage unavailable
- No game-breaking errors if storage fails

---

## 🧪 TEST CASES FOR MULTI-PRODUCT REACTIONS

### Test Case 1: Methane Combustion (Reaction #5)
```
Equation: CH₄ + 2O₂ → CO₂ + 2H₂O
Given: 5 CH₄, 12 O₂

Expected Calculations:
- CH₄: 5 ÷ 1 = 5.0 moles
- O₂: 12 ÷ 2 = 6.0 moles
- Limiting: CH₄ (5.0 < 6.0)
- Reaction runs: 5 times
- CO₂ formed: 5 × 1 = 5
- H₂O formed: 5 × 2 = 10
- O₂ used: 5 × 2 = 10
- O₂ remaining: 12 - 10 = 2

Test:
✓ System correctly identifies CH₄ as limiting
✓ System calculates 5 CO₂ (not combined with H₂O)
✓ System calculates 10 H₂O separately
✓ UI shows two input fields for products
✓ Each product validated independently
```

### Test Case 2: Thermite Reaction (Reaction #19)
```
Equation: 2Al + 3CuO → Al₂O₃ + 3Cu
Given: 10 Al, 12 CuO

Expected Calculations:
- Al: 10 ÷ 2 = 5.0 moles
- CuO: 12 ÷ 3 = 4.0 moles
- Limiting: CuO (4.0 < 5.0)
- Reaction runs: 4 times
- Al₂O₃ formed: 4 × 1 = 4
- Cu formed: 4 × 3 = 12
- Al used: 4 × 2 = 8
- Al remaining: 10 - 8 = 2

Test:
✓ System correctly identifies CuO as limiting
✓ System calculates 4 Al₂O₃
✓ System calculates 12 Cu separately
✓ UI shows two input fields
✓ Contextual feedback works for each product
```

### Test Case 3: Pyrite Roasting (Reaction #20)
```
Equation: 4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂
Given: 8 FeS₂, 20 O₂

Expected Calculations:
- FeS₂: 8 ÷ 4 = 2.0 moles
- O₂: 20 ÷ 11 = 1.818... moles
- Limiting: O₂ (1.818 < 2.0)
- Reaction runs: 1 time (floor of 1.818)
- Fe₂O₃ formed: 1 × 2 = 2
- SO₂ formed: 1 × 8 = 8
- FeS₂ used: 1 × 4 = 4
- FeS₂ remaining: 8 - 4 = 4

Test:
✓ System correctly identifies O₂ as limiting
✓ System uses floor() for partial moles
✓ System calculates 2 Fe₂O₃
✓ System calculates 8 SO₂ separately
✓ Large coefficients handled correctly
```

### Test Case 4: Single Product (Baseline)
```
Equation: 2H₂ + O₂ → 2H₂O
Given: 6 H₂, 4 O₂

Expected Calculations:
- H₂: 6 ÷ 2 = 3.0 moles
- O₂: 4 ÷ 1 = 4.0 moles
- Limiting: H₂ (3.0 < 4.0)
- Reaction runs: 3 times
- H₂O formed: 3 × 2 = 6
- O₂ used: 3 × 1 = 3
- O₂ remaining: 4 - 3 = 1

Test:
✓ Single product still works correctly
✓ Only one input field shown
✓ Backward compatible with original behavior
```

---

## 🎨 USER INTERFACE CHANGES

### Language: 100% Icelandic
All English translations removed from user-facing text. Only Icelandic remains.

**Before:**
```html
<label>1. Hvaða hvarfefni er takmörkuð? / Which is the limiting reactant?</label>
<button>Byrja að spila / Start Playing! 🚀</button>
```

**After:**
```html
<label>1. Hvaða hvarfefni er takmarkandi?</label>
<button>Byrja að spila! 🚀</button>
```

### Title Change
- **Before:** "Limiting Reactant Factory"
- **After:** "Takmarkandi Hvarfefni"

### All Icelandic Terms:
- Takmarkandi hvarfefni = Limiting reactant
- Afurðir = Products
- Umframhvarfefni = Excess reactant
- Æfingastilling = Practice mode
- Keppnisstilling = Competition mode
- Snjallval = Smart selection
- Handahóf = Random
- Tímamót = Timer challenge
- Reiknihjálp = Calculation helper
- Þróun = Progress
- Flýtilyklar = Keyboard shortcuts

---

## 🔧 TECHNICAL IMPLEMENTATION NOTES

### React Hooks Used
- `useState` - Game state, UI state, mode settings, streak tracking
- `useEffect` - Initialize game, keyboard shortcuts, localStorage sync, timer cleanup
- `useRef` - Timer interval reference

### Performance Optimizations
- Animations use CSS keyframes (hardware accelerated)
- localStorage reads cached in state
- Sound synthesis reuses AudioContext
- Event listeners cleaned up on unmount

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ support
- Web Audio API for sounds
- localStorage API
- CSS Grid and Flexbox

### File Structure
- Single HTML file (self-contained)
- External CDN dependencies:
  - React 18
  - ReactDOM 18
  - Babel Standalone
  - TailwindCSS

---

## 📱 RESPONSIVE BREAKPOINTS

### Desktop (≥768px)
- Two-column reactant layout
- Molecule size: 60px
- Full header with all statistics
- Side-by-side buttons

### Tablet (768px - 1024px)
- Maintains desktop layout
- Adjusted spacing
- Flexible molecule grids

### Mobile (<768px)
- Single-column stacking
- Molecule size: 40px
- Vertical button layout
- Sticky header
- Touch-optimized targets (48px minimum)
- Optimized for:
  - 320px (iPhone SE)
  - 375px (iPhone standard)
  - 414px (iPhone Plus)

---

## 🎯 LEARNING OBJECTIVES ADDRESSED

1. **Identify limiting reactants** - Core mechanic with step-by-step guidance
2. **Calculate product formation** - Now correctly handles single and multiple products
3. **Determine excess reactants** - Clear calculation shown
4. **Apply stoichiometry** - Coefficient-based calculations
5. **Understand conservation of mass** - Balance checker feature
6. **Practice mental math** - Calculation helper is optional
7. **Build confidence** - Practice mode removes pressure
8. **Track improvement** - Progress tracking shows growth

---

## 🐛 BUG FIXES SUMMARY

### Critical
1. **Multi-product calculation** - Fixed products array implementation
2. **Product coefficient handling** - Each product calculated with correct coefficient

### Minor
1. Input validation now prevents submission of invalid data
2. Timer properly clears on component unmount
3. Sound effects don't crash on browsers without audio support
4. localStorage errors handled gracefully
5. Keyboard shortcuts don't trigger on input fields

---

## 🚀 FUTURE ENHANCEMENTS (Not Implemented)

1. **Backend Integration** - Save progress to server
2. **Multiplayer Mode** - Compete with classmates
3. **Custom Reactions** - Teacher-created problems
4. **Hints System** - Progressive hints with point deduction
5. **Achievements** - Badges for milestones
6. **Leaderboard** - School-wide or class-wide rankings
7. **Organic Molecules** - Structural formulas for complex reactions
8. **3D Molecule Visualization** - WebGL rendering
9. **Audio Narration** - Read explanations aloud
10. **Export Progress** - PDF reports for teachers

---

## 📝 CODE COMMENTS

All complex logic includes English comments for maintainability:
- Products array structure explained
- Calculation logic documented
- Animation sequences commented
- LocalStorage schema documented
- Event handler purposes clarified

---

## ✅ TESTING CHECKLIST

### Functionality
- [ ] Single-product reactions calculate correctly
- [ ] Multi-product reactions calculate each product separately
- [ ] Input validation rejects decimals and negatives
- [ ] Timer counts down and triggers timeout
- [ ] Streak increments on correct, resets on incorrect
- [ ] Progress tracking saves to localStorage
- [ ] Sound effects toggle works
- [ ] Keyboard shortcuts function properly
- [ ] Practice mode disables scoring
- [ ] Smart difficulty prioritizes unmastered reactions

### UI/UX
- [ ] All text is in Icelandic only
- [ ] Molecules animate smoothly
- [ ] Responsive layout works on mobile
- [ ] Touch targets are ≥48px on mobile
- [ ] High contrast mode increases visibility
- [ ] Focus indicators visible for keyboard nav
- [ ] Skip link works for screen readers
- [ ] Buttons have hover states

### Accessibility
- [ ] Can complete game with keyboard only
- [ ] Screen reader announces state changes
- [ ] Color is not only means of conveying information
- [ ] Focus order is logical
- [ ] ARIA labels present and accurate

### Performance
- [ ] Page loads quickly
- [ ] Animations are smooth (60fps)
- [ ] No memory leaks from timers
- [ ] localStorage doesn't cause errors when full
- [ ] Sound doesn't cause lag

---

## 📚 REACTION ID REFERENCE

```
Easy:
1 - 2H₂ + O₂ → 2H₂O
2 - 2Mg + O₂ → 2MgO
3 - C + O₂ → CO₂
7 - 2Na + Cl₂ → 2NaCl
8 - 2K + Cl₂ → 2KCl
9 - Ca + S → CaS
10 - Zn + S → ZnS
11 - 2Cu + O₂ → 2CuO

Medium:
4 - N₂ + 3H₂ → 2NH₃
5 - CH₄ + 2O₂ → CO₂ + 2H₂O (multi-product)
12 - 4Al + 3O₂ → 2Al₂O₃
13 - 3Ca + N₂ → Ca₃N₂
14 - 2C + O₂ → 2CO
15 - 3Mg + N₂ → Mg₃N₂

Hard:
6 - 4Fe + 3O₂ → 2Fe₂O₃
16 - 3Fe + 2O₂ → Fe₃O₄
17 - P₄ + 5O₂ → 2P₂O₅
18 - S₈ + 12O₂ → 8SO₃
19 - 2Al + 3CuO → Al₂O₃ + 3Cu (multi-product)
20 - 4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂ (multi-product)
```

---

## 🎓 EDUCATIONAL VALUE

This game teaches:
1. **Stoichiometry** - Core chemistry concept
2. **Limiting reactants** - Critical for lab work
3. **Mathematical reasoning** - Division and multiplication
4. **Chemical equations** - Reading and interpreting
5. **Conservation principles** - Mass is conserved
6. **Problem-solving strategies** - Step-by-step approach
7. **Self-assessment** - Immediate feedback
8. **Perseverance** - Practice mode encourages learning

Suitable for: Icelandic secondary school chemistry students (ages 15-18), aligned with curriculum standards for 1. ár (first year chemistry).

---

**End of Documentation**

Version: 2.0
Date: 2025-11-22
Author: Claude Code
Platform: Kvenno Efnafræði
