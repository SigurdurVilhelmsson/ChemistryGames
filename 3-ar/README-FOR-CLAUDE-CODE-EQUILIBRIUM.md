# Equilibrium Shifter - Complete Build Instructions

## 📦 What You've Been Given

You have **five essential files** to build the Equilibrium Shifter game:

1. **`equilibrium-shifter-instructions.md`** - Comprehensive specification
   - Complete game mechanics
   - Le Chatelier's principle implementation
   - Visual design specifications
   - All features in detail

2. **`equilibrium-shifter-quick-reference.md`** - Executive summary
   - Must-have features at a glance
   - Le Chatelier rules quick lookup
   - Key requirements

3. **`equilibrium-shifter-starter-template.html`** - Working foundation
   - Pre-configured structure
   - Kvenno branding applied
   - Visual equilibrium display skeleton
   - React + Tailwind setup complete

4. **`EQUILIBRIUM-BANK-30-COMPLETE.md`** - Ready-to-use equilibria
   - 30 complete equilibrium systems
   - 10 beginner, 12 intermediate, 8 advanced
   - All with thermodynamics, contexts, and shift predictions
   - Ready to copy directly into code

5. **`DEVELOPMENT-CHECKLIST.md`** (if needed) - Progress tracker

## 🎯 Your Mission

Build a **polished, educational chemistry game** for 17-18 year old students that teaches Le Chatelier's principle through interactive equilibrium manipulation with real-time visual feedback.

## 🏗️ Build Approach

### Phase 1: Foundation (Use Starter Template)
The starter template provides:
- ✅ HTML structure with CDN links
- ✅ Kvenno brand styling
- ✅ Header and navigation
- ✅ Basic React component structure
- ✅ Visual equilibrium display
- ✅ Molecule containers with animations
- ✅ Stress and prediction buttons

**Start here** and expand upon it!

### Phase 2: Core Mechanics (Le Chatelier Logic)

**Priority 1: Le Chatelier Engine**
```javascript
// This is the MOST CRITICAL function
// Must be 100% accurate for educational value
const calculateShift = (equilibrium, stressType, stressTarget) => {
  // Implement these rules correctly:
  
  // CONCENTRATION:
  // Add reactant → Right
  // Add product → Left
  // Remove reactant → Left  
  // Remove product → Right
  
  // TEMPERATURE:
  // Exothermic (ΔH < 0): Heat is PRODUCT
  //   Increase T → Left
  //   Decrease T → Right
  // Endothermic (ΔH > 0): Heat is REACTANT
  //   Increase T → Right
  //   Decrease T → Left
  
  // PRESSURE (gas only):
  // Increase P → Toward fewer moles
  // Decrease P → Toward more moles
  // Equal moles → No shift
  
  // CATALYST:
  // Always → No shift (K unchanged, rate increased)
  
  return { shift, explanation };
};
```

**Priority 2: Equilibrium Bank Integration**
```javascript
// Copy the 30 equilibria from EQUILIBRIUM-BANK-30-COMPLETE.md
const equilibriumBank = [
  // Each equilibrium has:
  // - equation
  // - deltaH (thermodynamics)
  // - totalGasMoles (for pressure effects)
  // - visual molecule displays
  // - context (Icelandic + English)
  // - difficulty level
];
```

**Priority 3: Visual Feedback System**
```javascript
// Make shifts OBVIOUS to students
const animateShift = (direction) => {
  if (direction === 'right') {
    // Grow right arrow
    // Move molecules toward products
    // Glow products side green
    // Increase product count visually
  } else if (direction === 'left') {
    // Grow left arrow
    // Move molecules toward reactants
    // Glow reactants side green
    // Increase reactant count visually
  } else {
    // No shift (catalyst)
    // Shake/pulse equilibrium arrows
    // Yellow indicator
    // Show "K unchanged" message
  }
};
```

### Phase 3: Game Modes

**Learning Mode Features:**
- No timer
- Unlimited attempts
- Detailed explanations after each prediction
- Hint system available
- Focus on understanding WHY shifts occur
- Step-by-step Le Chatelier reasoning

**Challenge Mode Features:**
- 20-second timer per prediction
- Score tracking
- Streak bonuses
- Random stress application
- 10 questions per round
- Fast-paced, competitive

### Phase 4: Visual Equilibrium Display

**Key Visual Elements:**

1. **Chemical Equation** (top, centered, large)
   ```
   N₂(g) + 3H₂(g) ⇌ 2NH₃(g)
   ```

2. **Thermodynamics Indicator**
   ```
   🔥 ΔH = -92 kJ (Varmalosandi / Exothermic)
   ```

3. **Molecule Display**
   ```
   [Reactants]    ⇌    [Products]
   🔵🔵 ⚪⚪⚪   ⇌   🔷🔷
   ```

4. **Shift Animation**
   - Balanced: Equal arrows ⇌
   - Shift Right: Large right arrow →
   - Shift Left: Large left arrow ←
   - No Shift: Pulsing/shaking ⇌

5. **Glow Effects**
   - Favored side glows green
   - Active stress highlighted yellow
   - Prediction buttons colorful

### Phase 5: Explanation System

**Must Show After Each Prediction:**

1. **What stress was applied**
   - "You added N₂ (a reactant)"

2. **Le Chatelier statement**
   - "When a stress is applied to a system at equilibrium, the system shifts to relieve that stress."

3. **Direction and reasoning**
   - "The system shifted RIGHT to consume the added N₂ and produce more NH₃."

4. **Molecular interpretation**
   - "More N₂ molecules → More collisions with H₂ → Increased forward reaction rate."

5. **Important concepts**
   - "K does NOT change (only T changes K)"
   - "Q initially decreased, system shifted until Q = K again"

### Phase 6: ICE Table Practice Mode (Bonus Feature)

**Structure:**
```
        A    +    B    ⇌    C    +    D
I     [A]₀      [B]₀        0         0
C      -x        -x        +x        +x
E    [A]₀-x    [B]₀-x      x         x

K = [C][D] / [A][B] = 4.5

Solve for x: [student input]
```

**Features:**
- Given: Initial concentrations and K
- Student calculates: x (change)
- Show: Step-by-step algebraic solution
- Verify: Student's answer within tolerance

## 📋 Implementation Checklist

### Essential Features (Must Have)
- [x] Starter template provided
- [ ] 30 equilibrium bank copied
- [ ] Le Chatelier logic engine (100% accurate)
- [ ] Visual equilibrium display
- [ ] Molecule animations
- [ ] Shift animations (left/right/none)
- [ ] Stress selection interface
- [ ] Prediction buttons (Left/None/Right)
- [ ] Feedback system (correct/incorrect)
- [ ] Explanation display
- [ ] Learning mode implemented
- [ ] Challenge mode implemented
- [ ] Scoring system
- [ ] Streak tracking
- [ ] Timer for Challenge mode
- [ ] Mobile responsive design

### Enhanced Features (Should Have)
- [ ] Progressive difficulty
- [ ] Hint system
- [ ] Sound effects (toggleable)
- [ ] Instructions modal
- [ ] Thermodynamics indicators (color-coded)
- [ ] Gas mole comparison display
- [ ] Keyboard shortcuts
- [ ] ICE table practice mode

### Optional Features (Nice to Have)
- [ ] LocalStorage for high scores
- [ ] Leaderboard system
- [ ] Share results
- [ ] Export summary
- [ ] Dark mode
- [ ] Multiple language support
- [ ] Accessibility enhancements

## 🎨 Design Requirements

**Must Match Kvenno Brand:**
- Orange primary: `#f36b22`
- Orange hover: `#d95a1a`
- Clean, modern interface
- Consistent with existing games

**Color Coding:**
- **Exothermic**: Red/warm colors 🔥 (ΔH < 0)
- **Endothermic**: Blue/cool colors ❄️ (ΔH > 0)
- **Shift Right**: Green glow on products →
- **Shift Left**: Green glow on reactants ←
- **No Shift**: Yellow indicator (catalyst) ⇌

**Typography:**
- Chemical equations: Large, bold (2rem+)
- ΔH values: Clear, color-coded
- Explanations: Readable, structured
- Button text: Bold, clear

**Animations:**
- Smooth transitions (0.3-0.5s)
- Molecule floating (subtle 2s loop)
- Shift animations (obvious, 1-2s)
- Glow effects (0.5s fade in)
- Success/error feedback (pulse/shake)

## 🧪 Critical Le Chatelier Rules

### Test These Extensively:

**Concentration:**
- ✓ Add N₂ (reactant) → Shift RIGHT
- ✓ Add NH₃ (product) → Shift LEFT
- ✓ Remove H₂ (reactant) → Shift LEFT
- ✓ Remove NH₃ (product) → Shift RIGHT

**Temperature (Exothermic, ΔH = -92 kJ):**
- ✓ Heat (increase T) → Shift LEFT (away from heat)
- ✓ Cool (decrease T) → Shift RIGHT (toward heat)

**Temperature (Endothermic, ΔH = +58 kJ):**
- ✓ Heat (increase T) → Shift RIGHT (consume heat)
- ✓ Cool (decrease T) → Shift LEFT (release heat)

**Pressure (N₂ + 3H₂ ⇌ 2NH₃):**
- ✓ Increase P → Shift RIGHT (4 moles → 2 moles)
- ✓ Decrease P → Shift LEFT (toward more moles)

**Pressure (H₂ + I₂ ⇌ 2HI):**
- ✓ Increase P → NO SHIFT (2 moles → 2 moles)
- ✓ Decrease P → NO SHIFT (equal moles)

**Catalyst:**
- ✓ Add catalyst → ALWAYS NO SHIFT
- ✓ Important: Rate increases, K unchanged
- ✓ Visual: Yellow indicator, shake animation

## 📱 Responsive Design

### Mobile (<768px)
- Stacked layout (equation, then molecules, then buttons)
- Larger touch targets (min 44x44px)
- Simplified stress menu (dropdown or accordion)
- Clear text, no tiny fonts

### Tablet (768-1024px)
- Side-by-side molecules (reactants | products)
- Full button display
- Comfortable spacing

### Desktop (>1024px)
- Optimal visual experience
- All elements visible without scrolling
- Max-width: 1200px container

## 🌐 Icelandic UI Text

### Key Translations (Already in Template)
```javascript
const TRANSLATIONS = {
  learningMode: "Lærdómshamur",
  challengeMode: "Keppnishamur",
  equilibrium: "Jafnvægi",
  stress: "Álag",
  predict: "Forspá",
  shiftLeft: "Hliðrun til vinstri",
  shiftRight: "Hliðrun til hægri",
  noShift: "Engin hliðrun",
  // ... more in template
};
```

### Keep English:
- Chemical formulas (N₂, H₂, NH₃)
- Thermodynamic notation (ΔH, K, Q)
- "Le Chatelier's Principle" (in explanations)

## 🎯 Success Criteria

The game is **complete** when:

1. **Educational Requirements:**
   - Le Chatelier logic is 100% accurate
   - Students can predict shifts correctly
   - Explanations teach the principle clearly
   - Visual feedback enhances understanding
   - Molecular view connects to macroscopic behavior

2. **Functional Requirements:**
   - All 30 equilibria work correctly
   - Both game modes function properly
   - Animations are smooth and clear
   - Scoring/streak tracking is accurate
   - Timer counts down correctly
   - Mobile responsive

3. **Technical Requirements:**
   - No console errors
   - Works on all modern browsers
   - Loads quickly (<2 seconds)
   - Clean, commented code
   - Follows React best practices

4. **Design Requirements:**
   - Matches Kvenno brand
   - Consistent with existing games
   - Professional appearance
   - Intuitive interface
   - Clear visual hierarchy

## 🧪 Testing Checklist

### Le Chatelier Logic Tests:
- [ ] Test all concentration changes (add/remove × reactant/product)
- [ ] Test temperature with exothermic reactions
- [ ] Test temperature with endothermic reactions
- [ ] Test pressure with unequal gas moles
- [ ] Test pressure with equal gas moles
- [ ] Test catalyst (always no shift)
- [ ] Test aqueous equilibria (no pressure effects)
- [ ] Test heterogeneous equilibria (solids don't affect Q)

### Visual Tests:
- [ ] Shift animations are obvious
- [ ] Molecule displays are clear
- [ ] Colors are meaningful
- [ ] Glow effects work
- [ ] Thermodynamics indicators correct
- [ ] Mobile layout stacks properly
- [ ] Touch targets are adequate

### Game Flow Tests:
- [ ] Menu → Learning mode works
- [ ] Menu → Challenge mode works
- [ ] Question progression logical
- [ ] Correct prediction → Next question
- [ ] Incorrect prediction → Try again (Learning)
- [ ] Timer timeout → Next question (Challenge)
- [ ] Results screen displays stats

### Browser Tests:
- [ ] Chrome (desktop & mobile)
- [ ] Firefox
- [ ] Safari (iOS & macOS)
- [ ] Edge

## 💡 Pro Tips for Claude Code

1. **Le Chatelier logic is CRITICAL** - Test extensively with real chemistry examples
2. **Visual feedback must be OBVIOUS** - Students need to immediately see what happened
3. **Explanations must TEACH** - Not just "correct/wrong", explain WHY
4. **Start with template** - Everything is already set up
5. **Copy equilibria directly** - All 30 are ready in the bank
6. **Test edge cases** - Equal moles, catalysts, heterogeneous
7. **Make it beautiful** - Visual appeal enhances learning
8. **Mobile first** - Many students use phones
9. **Keep it simple** - Core features before polish
10. **Think like a student** - What would confuse them? What would help?

## 🚀 Deployment

**File to Create:** `equilibrium-shifter.html`

**Upload to Server:**
```bash
scp equilibrium-shifter.html user@linode:/var/www/kvenno.app/games/
chmod 644 equilibrium-shifter.html
```

**Link from Main Site:**
Add to games list at `kvenno.app/games`

## 📞 Key Context

- Student age: 17-18 years old
- School: Kvennaskólinn í Reykjavík
- Textbook: Chemistry, the Central Science (Brown et al.)
- Chapter: 15 (Chemical Equilibrium)
- Website: kvenno.app

---

## 🎓 Educational Philosophy

**This game succeeds if:**
- Students develop **intuition** for Le Chatelier's principle
- Molecular view helps them **visualize** equilibrium shifts
- They can **predict** shifts without memorizing rules
- They **understand** why shifts occur (not just what happens)
- Teachers can use it to **demonstrate** concepts
- Students want to **practice** outside class

---

## 📊 Example Game Flow

### Learning Mode:
1. **Display equilibrium:** N₂ + 3H₂ ⇌ 2NH₃ (ΔH = -92 kJ)
2. **Student explores:** Click "Add N₂"
3. **System applies stress:** N₂ is added (yellow highlight)
4. **Student predicts:** Clicks "Shift Right →"
5. **Animation:** Molecules move right, products glow green
6. **Explanation:** "Adding N₂ increases reactant concentration. By Le Chatelier's principle, the system shifts RIGHT to consume the added N₂ and produce more NH₃. K is unchanged."
7. **Student tries more:** Different stresses, explores system
8. **Next equilibrium:** When ready

### Challenge Mode:
1. **Display equilibrium:** SO₂ + O₂ ⇌ SO₃ (ΔH = -198 kJ)
2. **Random stress:** "Temperature increased" (shows 5s)
3. **Timer:** 20 seconds counting down
4. **Student predicts:** Clicks "Shift Left ←"
5. **Feedback:** "✓ Correct! Exothermic reaction shifts LEFT when heated. +20 points, streak: 3"
6. **Brief explanation:** Shows key reasoning
7. **Next question:** Automatically loads
8. **10 questions total** → Results screen

---

**Ready for Claude Code to implement!** 🚀⚖️

This specification provides everything needed to create a polished, educational equilibrium game that helps students master Le Chatelier's principle intuitively.
