# Equilibrium Shifter - Quick Reference for Claude Code

## 🎯 Core Mission
Build an interactive chemistry game teaching Le Chatelier's principle for 17-18 year old students using React + Tailwind in a single HTML file.

## 🔑 Critical Requirements

### Must-Have Features
1. **Visual Equilibrium Display**: 
   - Chemical equation with ⇌ arrows
   - Molecule icons for reactants and products
   - ΔH value (endothermic/exothermic indicator)
   - Animated shifts when stress applied

2. **Stress Application System**:
   - **Concentration**: Add/remove reactants or products
   - **Temperature**: Heat/cool the system
   - **Pressure**: Increase/decrease (for gases)
   - **Catalyst**: Special case (no shift)

3. **Prediction & Feedback**:
   - Student predicts: Left / No Shift / Right
   - Immediate visual feedback
   - Animated molecule movement
   - Detailed explanation of why shift occurred

4. **Two Game Modes**:
   - **Learning Mode**: Unlimited time, hints, explanations
   - **Challenge Mode**: Timed (20s), scoring, streaks

5. **ICE Table Practice**:
   - Separate mode for calculation practice
   - Initial, Change, Equilibrium rows
   - Solve for x given K
   - Step-by-step solutions

6. **30+ Equilibria**:
   - Beginner (10): Simple reactions, obvious shifts
   - Intermediate (12): Industrial processes, gas equilibria
   - Advanced (8): Complex systems, coupled equilibria

## 🎨 Visual Design

### Brand Colors
```css
--kvenno-orange: #f36b22;
--kvenno-orange-dark: #d95a1a;
```

### Layout Structure
```
Header: [Logo] [Title] [Mode] [Nav]
Game Area:
  - Chemical Equation (centered, large)
  - ΔH indicator (color-coded)
  - Visual molecules (reactants ⇌ products)
  - Stress buttons (organized by type)
  - Prediction buttons (Left / None / Right)
  - Explanation panel (after prediction)
```

### Color Coding
- **Exothermic** (ΔH < 0): Red/warm colors 🔥
- **Endothermic** (ΔH > 0): Blue/cool colors ❄️
- **Shift Right**: Green glow on products →
- **Shift Left**: Green glow on reactants ←
- **No Shift**: Yellow indicator (catalyst)

## ⚖️ Le Chatelier's Rules (Quick Reference)

### Concentration Changes
```
Add Reactant    → Shift RIGHT (→)
Add Product     → Shift LEFT (←)
Remove Reactant → Shift LEFT (←)
Remove Product  → Shift RIGHT (→)
```

### Temperature Changes
```
EXOTHERMIC (ΔH < 0): Heat is a PRODUCT
  Increase T → Shift LEFT (←)
  Decrease T → Shift RIGHT (→)

ENDOTHERMIC (ΔH > 0): Heat is a REACTANT
  Increase T → Shift RIGHT (→)
  Decrease T → Shift LEFT (←)
```

### Pressure Changes (Gas Only)
```
Increase P → Shift toward FEWER moles
Decrease P → Shift toward MORE moles
Equal moles → NO SHIFT

Example: N₂ + 3H₂ ⇌ 2NH₃
Reactants: 4 moles | Products: 2 moles
Increase P → RIGHT (fewer moles)
```

### Catalyst
```
Add Catalyst → NO SHIFT (speeds both directions equally)
Important: K unchanged, equilibrium reached faster
```

## 📊 Scoring System

### Points Awarded
- Correct prediction: 10 (Beginner), 20 (Intermediate), 30 (Advanced)
- Fast answer (<10s): +5 points
- Streak bonus: +5, +10, +15, +20, +25 (max)
- Explanation bonus: +10 points

### Penalties
- Wrong prediction: -5 points
- Timeout (Challenge): 0 points, streak resets

## 🎮 Game Flow

### Learning Mode
1. Display equilibrium system
2. Student selects stress to apply
3. System shows stress applied
4. Student predicts shift direction
5. Show animated result
6. Display detailed explanation
7. Option to try different stress
8. Next equilibrium when ready

### Challenge Mode
1. Display equilibrium (5s preview)
2. Show random stress applied
3. 20-second countdown
4. Student predicts shift
5. Immediate feedback (correct/wrong)
6. Brief explanation
7. Next question automatically
8. 10 questions per round

## 🧪 Example Equilibria

### Beginner: NO₂ Dimerization 🔴
```
N₂O₄(g) ⇌ 2NO₂(g)     ΔH = +58 kJ (endothermic)

Molecules: 
[N₂O₄: colorless] ⇌ [NO₂: brown]

Stress Examples:
- Add N₂O₄ → Shift RIGHT (more brown)
- Heat → Shift RIGHT (endo, heat is reactant)
- Increase P → Shift LEFT (fewer moles: 1 vs 2)
```

### Intermediate: Haber Process 🏭
```
N₂(g) + 3H₂(g) ⇌ 2NH₃(g)     ΔH = -92 kJ (exothermic)

Industrial context: Ammonia production

Moles: 4 (reactants) vs 2 (products)

Stress Examples:
- Add N₂ → Shift RIGHT (consume N₂)
- Heat → Shift LEFT (exo, heat is product)
- Increase P → Shift RIGHT (fewer moles)
- Add catalyst → NO SHIFT (but faster!)
```

### Advanced: Buffer System 🧪
```
CH₃COOH(aq) ⇌ CH₃COO⁻(aq) + H⁺(aq)

Buffer: CH₃COOH + CH₃COONa

Add H⁺ → Shift LEFT (consume H⁺)
Add OH⁻ → Shift RIGHT (OH⁻ removes H⁺)
```

## 🌐 Icelandic UI Text

### Essential Translations
```javascript
const translations = {
  // Modes
  learningMode: "Lærdómshamur",
  challengeMode: "Keppnishamur",
  
  // Game elements
  equilibrium: "Jafnvægi",
  stress: "Álag",
  predict: "Forspá",
  
  // Shift directions
  shiftLeft: "Hliðrun til vinstri",
  shiftRight: "Hliðrun til hægri",
  noShift: "Engin hliðrun",
  
  // Stresses
  addReactant: "Bæta við hvarfefni",
  addProduct: "Bæta við afurð",
  removeReactant: "Fjarlægja hvarfefni",
  removeProduct: "Fjarlægja afurð",
  heat: "Hita",
  cool: "Kæla",
  increasePressure: "Auka þrýsting",
  decreasePressure: "Minnka þrýsting",
  addCatalyst: "Bæta við hvata",
  
  // Feedback
  correct: "Rétt!",
  incorrect: "Rangt",
  explanation: "Útskýring",
  
  // Thermodynamics
  exothermic: "Varmalosandi",
  endothermic: "Varmabindandi"
};
```

## 💡 Visual Molecule System

### Simple Representations
```javascript
const moleculeDisplay = {
  // Diatomic gases
  'N₂': '🔵🔵',
  'H₂': '⚪⚪',
  'O₂': '🔴🔴',
  'Cl₂': '🟢🟢',
  
  // Simple compounds
  'NH₃': '🔷', // pyramid
  'H₂O': '💧',
  'CO₂': '⚫🔴🔴',
  'NO₂': '🟤', // brown
  
  // Ions
  'H⁺': '⊕',
  'OH⁻': '⊖',
  'NH₄⁺': '🔷⁺',
  
  // Complex
  'CH₃COOH': '🧪A',
  'FeSCN²⁺': '🔴' // blood red
};
```

### Animation States
```javascript
const animationStates = {
  balanced: {
    arrows: '⇌', // equal size
    motion: 'slight vibration',
    color: 'neutral gray'
  },
  
  shiftingRight: {
    arrows: '→', // right arrow larger
    motion: 'molecules moving right',
    color: 'products glow green',
    productCount: 'increase'
  },
  
  shiftingLeft: {
    arrows: '←', // left arrow larger
    motion: 'molecules moving left',
    color: 'reactants glow green',
    reactantCount: 'increase'
  },
  
  noShift: {
    arrows: '⇌', // shake/pulse
    motion: 'equilibrium shake',
    color: 'yellow indicator',
    note: 'K unchanged'
  }
};
```

## 🎯 ICE Table Structure

```javascript
const iceTableProblem = {
  equation: 'H₂(g) + I₂(g) ⇌ 2HI(g)',
  K: 54.0,
  temperature: 700, // K
  
  initial: {
    H2: 1.0,  // M
    I2: 1.0,  // M
    HI: 0     // M
  },
  
  // Student calculates change (x)
  change: {
    H2: '-x',
    I2: '-x',
    HI: '+2x'
  },
  
  // Student calculates equilibrium
  equilibrium: {
    H2: '1.0 - x',
    I2: '1.0 - x',
    HI: '2x'
  },
  
  // Solution
  solution: {
    x: 0.788,
    equilibrium: {
      H2: 0.212,
      I2: 0.212,
      HI: 1.576
    },
    steps: [
      'K = [HI]² / [H₂][I₂]',
      '54.0 = (2x)² / [(1.0-x)(1.0-x)]',
      '54.0 = 4x² / (1.0-x)²',
      'Take square root: 7.35 = 2x / (1.0-x)',
      '7.35(1.0-x) = 2x',
      '7.35 - 7.35x = 2x',
      '7.35 = 9.35x',
      'x = 0.788'
    ]
  }
};
```

## 📱 Technical Stack

### Required CDN Links
```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
```

### File Type
Single HTML file: `equilibrium-shifter.html`

## ✅ Pre-Launch Checklist

### Functionality
- [ ] All stress types work correctly
- [ ] Le Chatelier logic 100% accurate
- [ ] Shift animations smooth
- [ ] Explanations are educational
- [ ] ICE table mode functional
- [ ] Scoring/streak accurate
- [ ] Timer counts down correctly

### Educational Value
- [ ] Students understand WHY shifts occur
- [ ] Molecular view aids learning
- [ ] Difficulty progression appropriate
- [ ] Explanations are clear
- [ ] Common mistakes addressed

### Visual/UX
- [ ] Molecule displays clear
- [ ] Shift animations obvious
- [ ] Mobile responsive
- [ ] Kvenno branding consistent
- [ ] Icelandic text throughout

## 🚀 Key Implementation Tips

### 1. Le Chatelier Logic Function
```javascript
function calculateShift(equilibrium, stressType, stressTarget) {
  // This is the CORE function
  // Must be 100% accurate
  // Test with all stress types
  // Handle edge cases (equal moles, catalysts)
}
```

### 2. Visual Feedback Priority
- Make shifts OBVIOUS
- Use color, motion, and size changes
- Students should immediately understand what happened

### 3. Explanations Must Teach
- Not just "correct" or "wrong"
- Explain the principle
- Show molecular reasoning
- Connect to real-world applications

### 4. Mobile-First Design
- Large touch buttons
- Clear text at small sizes
- Stacked layout for small screens
- Test on actual phones

## 📞 Key Context
- Student age: 17-18 years old
- School: Kvennaskólinn í Reykjavík  
- Textbook: Chemistry, the Central Science (Brown et al.)
- Chapter: 15 (Chemical Equilibrium)
- Website: kvenno.app

---

**Remember**: Le Chatelier's principle should become INTUITIVE, not memorized!
