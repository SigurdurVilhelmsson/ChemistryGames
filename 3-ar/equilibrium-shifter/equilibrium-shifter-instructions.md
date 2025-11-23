# Equilibrium Shifter - Development Instructions for Claude Code

## Project Overview
Create an educational chemistry game for 3rd year students (ages 17-18) at Kvennaskólinn í Reykjavík. The game teaches Le Chatelier's principle through interactive manipulation of chemical equilibria, with visual feedback showing shifts in reaction direction.

## Technical Stack
- **Frontend**: React 18 with Babel (standalone, in-browser JSX transformation)
- **Styling**: Tailwind CSS (CDN)
- **Deployment**: Single HTML file for Linode Ubuntu server
- **No build process required** - everything runs in the browser

## File Structure
Create a single file: `equilibrium-shifter.html`

## Educational Context
Students are learning from "Chemistry, the Central Science" by Brown et al., Chapter 15 (Chemical Equilibrium). They understand:
- Equilibrium constant expressions (Kc, Kp)
- Le Chatelier's principle (stress responses)
- Effect of concentration changes
- Effect of temperature changes (endothermic vs exothermic)
- Effect of pressure changes (gas moles)
- ICE tables (Initial, Change, Equilibrium)
- Q vs K predictions

## Kvenno Brand Guidelines
- Primary color: `--kvenno-orange: #f36b22`
- Dark variant: `--kvenno-orange-dark: #d95a1a`
- Use these colors for buttons, accents, and the logo
- White background for main content areas
- Gray (#f9fafb) for page background

## Core Game Mechanics

### 1. Equilibrium System Display

Each equilibrium shows:
- **Chemical equation** with equilibrium arrows (⇌)
- **Reaction type** (endothermic ΔH > 0, or exothermic ΔH < 0)
- **Phase information** (g, l, s, aq)
- **Current state** (reactants vs products balance)
- **Visual representation** using molecule/ion icons

**Example Display:**
```
N₂(g) + 3H₂(g) ⇌ 2NH₃(g)     ΔH = -92 kJ

Reactants                Products
[N₂] [H₂] [H₂] [H₂]  ⇌  [NH₃] [NH₃]

Current State: Balanced ⚖️
```

### 2. Available Stresses

Players can apply different stresses to the system:

**Concentration Changes:**
- Add reactant
- Remove reactant  
- Add product
- Remove product

**Temperature Changes:**
- Increase temperature (heat system)
- Decrease temperature (cool system)

**Pressure Changes** (for gas equilibria):
- Increase pressure (decrease volume)
- Decrease pressure (increase volume)

**Catalyst Addition:**
- Add catalyst (special: doesn't shift equilibrium, but affects rate)

### 3. Visual Feedback System

**Before Stress:**
- System shows balanced equilibrium
- Molecules/particles in equilibrium ratio
- Equilibrium arrows (⇌) of equal size
- Neutral color scheme (blue/gray)

**Applying Stress:**
- Selected stress highlights in yellow
- Brief pause for prediction

**Prediction Phase:**
- Student selects: "Shift Left" / "Shift Right" / "No Shift"
- Timer counts down (optional in Challenge mode)

**After Stress - Visual Shift:**
- **Shift Right (→)**: 
  - Right arrow grows larger
  - More product molecules appear
  - Products side glows green
  - Animated particles move right
  
- **Shift Left (←)**:
  - Left arrow grows larger
  - More reactant molecules appear
  - Reactants side glows green
  - Animated particles move left
  
- **No Shift**:
  - Equilibrium arrows stay balanced
  - Special indicator for catalyst
  - Molecules stay in same ratio

### 4. Le Chatelier's Principle Rules

The game implements these rules:

**Concentration:**
- Add reactant → Shift right (toward products)
- Add product → Shift left (toward reactants)
- Remove reactant → Shift left
- Remove product → Shift right

**Temperature:**
- Exothermic (ΔH < 0):
  - Heat = Product
  - Increase T → Shift left (away from heat)
  - Decrease T → Shift right (toward heat)
  
- Endothermic (ΔH > 0):
  - Heat = Reactant
  - Increase T → Shift right (away from heat)
  - Decrease T → Shift left (toward heat)

**Pressure (gas only):**
- Increase P → Shift toward fewer gas moles
- Decrease P → Shift toward more gas moles
- Equal moles → No shift

**Catalyst:**
- ALWAYS → No shift (speeds up both directions equally)

### 5. ICE Table Practice Mode

Special mode for practicing ICE table calculations:

**Given:**
- Initial concentrations [A]₀, [B]₀
- Equilibrium constant K
- Chemical equation

**Student calculates:**
- Change in concentration (x)
- Equilibrium concentrations
- Direction of shift

**ICE Table Display:**
```
        A    +    B    ⇌    C    +    D
I     [A]₀      [B]₀        0         0
C      -x        -x        +x        +x
E    [A]₀-x    [B]₀-x      x         x

K = [C][D] / [A][B] = 4.5

Solve for x...
```

## Game Features

### 1. Two Game Modes

**Learning Mode:**
- Detailed explanations for each stress
- Show why the shift occurs
- No time pressure
- Unlimited attempts
- Step-by-step Le Chatelier reasoning
- Visual guides and hints
- Focus: Understanding concepts

**Challenge Mode:**
- Rapid-fire equilibria
- 20 seconds per prediction
- Score tracking
- Streak bonuses
- Progressive difficulty
- Leaderboard integration
- Focus: Speed and accuracy

### 2. Three Difficulty Levels

**Beginner:**
- Simple equilibria (A + B ⇌ C)
- One type of stress at a time
- Clear molecule labels
- Obvious shifts

**Intermediate:**
- Complex equilibria (multiple products/reactants)
- Combined stresses
- Mixed endothermic/exothermic
- Gas vs aqueous equilibria

**Advanced:**
- Multi-step equilibria
- Coupled reactions
- Complex stoichiometry
- Real industrial processes (Haber, Contact)

### 3. Equilibrium Categories

**Gas Phase Equilibria:**
- N₂ + 3H₂ ⇌ 2NH₃ (Haber process)
- 2SO₂ + O₂ ⇌ 2SO₃ (Contact process)
- N₂O₄ ⇌ 2NO₂ (dinitrogen tetroxide)
- CO + 2H₂ ⇌ CH₃OH (methanol synthesis)

**Aqueous Equilibria:**
- Weak acid dissociation
- Buffer systems
- Solubility equilibria
- Complex ion formation

**Acid-Base Equilibria:**
- HA ⇌ H⁺ + A⁻
- NH₃ + H₂O ⇌ NH₄⁺ + OH⁻
- Buffer systems with Henderson-Hasselbalch

**Phase Equilibria:**
- Dissolution/precipitation
- Liquid-vapor equilibria

### 4. Visual Molecule System

**Representation Strategy:**
Each chemical species gets a unique visual:

**Simple Molecules:**
- N₂: Two blue circles connected
- H₂: Two small white circles
- NH₃: Pyramid shape (1 blue + 3 white)
- O₂: Two red circles
- H₂O: Bent shape (1 red + 2 white)
- CO₂: Linear (1 gray + 2 red)

**Ions in Solution:**
- H⁺: Small red circle with +
- OH⁻: Small blue circle with -
- Na⁺: Purple circle with +
- Cl⁻: Green circle with -

**Complex Molecules:**
- Use emoji or SVG representations
- Color-coded by element
- Labeled when needed

**Animation Effects:**
- Molecules "dance" slightly (vibration)
- During shift: molecules move toward favored side
- Collision animations when reacting
- Fade in/out when appearing/disappearing

### 5. Scoring System

**Points Awarded:**
- Correct prediction: 10 points (Beginner), 20 (Intermediate), 30 (Advanced)
- Fast prediction (<10s): +5 points
- Streak bonus: +5 per consecutive correct (max +25)
- Perfect explanation: +10 points (if explaining why)

**Penalties:**
- Wrong prediction: -5 points
- Timeout (Challenge mode): 0 points, streak resets
- Multiple attempts (Learning mode): No penalty

**Bonus Challenges:**
- "Explain why" bonus questions: +15 points
- ICE table completion: +20 points
- Predict equilibrium constant change: +10 points

### 6. Hint System

**Progressive Hints:**

**Hint 1:** Identify the stress type
- "You're adding a reactant. What does Le Chatelier say about this?"

**Hint 2:** State the principle
- "Adding a reactant causes the equilibrium to shift away from the added substance, toward the products."

**Hint 3:** Show the direction
- "The system will shift RIGHT (→) to consume the added reactant."

**Hint 4:** Explain molecularly (Learning mode)
- "More N₂ molecules mean more collisions, increasing the forward reaction rate until equilibrium re-establishes."

### 7. Explanation Display

After each prediction, show:

1. **What stress was applied**
2. **Le Chatelier's principle statement**
3. **Direction of shift and why**
4. **Molecular interpretation**
5. **Effect on K (none) and Q**
6. **New equilibrium position**

**Example Explanation:**
```
✓ Correct!

Stress Applied: Added N₂ (reactant)

Le Chatelier's Principle:
When a stress is applied to a system at equilibrium, 
the system shifts to relieve that stress.

What Happened:
Adding N₂ increased the concentration of reactant.
The system shifted RIGHT to consume the added N₂
and produce more NH₃ (product).

Molecular View:
More N₂ molecules → More collisions with H₂
→ Increased forward reaction rate
→ Equilibrium shifts toward products

Important Note:
- K (equilibrium constant) does NOT change
- Q (reaction quotient) initially decreased
- System shifted until Q = K again
```

## UI Components

### Header
```
- Kvenno logo (top-left, links to kvenno.app)
- Game title: "Equilibrium Shifter - Le Chatelier"
- Navigation buttons:
  - Back to games
  - Instructions
  - Mode selector (Learning/Challenge)
```

### Main Game Layout
```
┌─────────────────────────────────────────────┐
│  [Score] [Streak] [Timer] [Question #/10]  │
├─────────────────────────────────────────────┤
│                                             │
│     Chemical Equation with ΔH              │
│     N₂ + 3H₂ ⇌ 2NH₃  ΔH = -92 kJ          │
│                                             │
├──────────────┬──────────────────────────────┤
│              │                              │
│  Reactants   │   Products                   │
│              │                              │
│  [Molecules] │   [Molecules]                │
│     🔵🔵     │      🔷🔷                    │
│              │                              │
│      ⇌       │                              │
│              │                              │
├──────────────┴──────────────────────────────┤
│                                             │
│  Stress to Apply:                           │
│  [+] Add N₂    [-] Remove H₂                │
│  [🔥] Heat     [❄️] Cool                   │
│  [⚗️] Catalyst [⬆️] Increase P             │
│                                             │
│  Predict the Shift:                         │
│  [← Left] [⚖️ No Shift] [Right →]          │
│                                             │
└─────────────────────────────────────────────┘
```

### ICE Table Mode Layout
```
┌─────────────────────────────────────────────┐
│          ICE Table Practice Mode            │
├─────────────────────────────────────────────┤
│                                             │
│     H₂(g) + I₂(g) ⇌ 2HI(g)                 │
│                                             │
│     K = 54.0 at 700 K                       │
│                                             │
│          H₂    I₂    HI                     │
│    I    1.0   1.0    0                      │
│    C    -x    -x    +2x                     │
│    E   1.0-x  1.0-x  2x                     │
│                                             │
│    K = [HI]² / [H₂][I₂] = 54.0             │
│                                             │
│    Solve for x: [____]                      │
│                                             │
│    [Show Steps] [Check Answer]              │
│                                             │
└─────────────────────────────────────────────┘
```

## Responsive Design

### Mobile (<768px)
- Stacked layout: equation on top, molecules below
- Larger touch buttons for predictions
- Simplified molecule display
- Stress buttons as dropdown menu

### Tablet (768px - 1024px)
- Side-by-side: reactants | products
- Full stress button display
- Equation prominent at top

### Desktop (>1024px)
- Optimal spacing for all elements
- Larger molecule visualizations
- Detailed explanations visible
- Max-width: 1200px

## Icelandic Translation

### UI Text (Icelandic / English)
- "Lærdómshamur" / Learning Mode
- "Keppnishamur" / Challenge Mode
- "Jafnvægi" / Equilibrium
- "Álag" / Stress
- "Hliðrun til vinstri" / Shift Left
- "Hliðrun til hægri" / Shift Right
- "Engin hliðrun" / No Shift
- "Bæta við" / Add
- "Fjarlægja" / Remove
- "Hita" / Heat
- "Kæla" / Cool
- "Auka þrýsting" / Increase Pressure
- "Minnka þrýsting" / Decrease Pressure
- "Hvati" / Catalyst
- "Forspá" / Predict
- "Útskýring" / Explanation

### Keep English:
- Chemical formulas (N₂, H₂, NH₃)
- Thermodynamic terms (ΔH, K, Q)
- Le Chatelier's Principle (in explanation)

## Implementation Details

### State Management

```javascript
const [gameState, setGameState] = useState({
  screen: 'menu', // 'menu', 'playing', 'ice-table', 'results'
  mode: null, // 'learning' or 'challenge'
  difficulty: 'beginner',
  currentEquilibrium: null,
  appliedStress: null,
  userPrediction: null,
  correctShift: null,
  score: 0,
  streak: 0,
  questionNumber: 0,
  totalQuestions: 10,
  timeRemaining: 20,
  showExplanation: false,
  showHint: false,
  moleculeAnimation: 'balanced', // 'balanced', 'shifting-left', 'shifting-right'
  answeredQuestions: []
});
```

### Equilibrium Object Structure

```javascript
const equilibrium = {
  id: 1,
  equation: {
    reactants: [
      { formula: 'N₂', coefficient: 1, phase: 'g', display: '🔵🔵' },
      { formula: 'H₂', coefficient: 3, phase: 'g', display: '⚪⚪' }
    ],
    products: [
      { formula: 'NH₃', coefficient: 2, phase: 'g', display: '🔷' }
    ]
  },
  thermodynamics: {
    deltaH: -92, // kJ/mol (negative = exothermic)
    description: 'Exothermic'
  },
  context: {
    name: "Haber Process",
    nameIs: "Haber-aðferð",
    description: "Industrial ammonia synthesis",
    descriptionIs: "Iðnaðarframleiðsla á ammóníaki"
  },
  difficulty: 'intermediate',
  totalGasMoles: {
    reactants: 4, // 1 + 3
    products: 2   // 2
  }
};
```

### Stress Application Logic

```javascript
const applyStress = (equilibrium, stressType, stressTarget) => {
  let shift = 'none';
  
  switch(stressType) {
    case 'add-reactant':
      shift = 'right';
      break;
    case 'add-product':
      shift = 'left';
      break;
    case 'remove-reactant':
      shift = 'left';
      break;
    case 'remove-product':
      shift = 'right';
      break;
    case 'increase-temp':
      shift = equilibrium.thermodynamics.deltaH > 0 ? 'right' : 'left';
      break;
    case 'decrease-temp':
      shift = equilibrium.thermodynamics.deltaH > 0 ? 'left' : 'right';
      break;
    case 'increase-pressure':
      if (equilibrium.totalGasMoles.reactants > equilibrium.totalGasMoles.products) {
        shift = 'right';
      } else if (equilibrium.totalGasMoles.reactants < equilibrium.totalGasMoles.products) {
        shift = 'left';
      } else {
        shift = 'none';
      }
      break;
    case 'decrease-pressure':
      if (equilibrium.totalGasMoles.reactants < equilibrium.totalGasMoles.products) {
        shift = 'right';
      } else if (equilibrium.totalGasMoles.reactants > equilibrium.totalGasMoles.products) {
        shift = 'left';
      } else {
        shift = 'none';
      }
      break;
    case 'add-catalyst':
      shift = 'none'; // Catalyst never shifts equilibrium
      break;
  }
  
  return shift;
};
```

### Visual Shift Animation

```javascript
const animateShift = (direction) => {
  // direction: 'left', 'right', or 'none'
  
  if (direction === 'right') {
    // Animate molecules moving right
    // Grow right arrow
    // Increase product count
    // Glow products green
    setGameState(prev => ({
      ...prev,
      moleculeAnimation: 'shifting-right'
    }));
    
    setTimeout(() => {
      // Show new equilibrium
      setGameState(prev => ({
        ...prev,
        moleculeAnimation: 'balanced'
      }));
    }, 2000);
  } else if (direction === 'left') {
    // Animate molecules moving left
    // Grow left arrow  
    // Increase reactant count
    // Glow reactants green
    setGameState(prev => ({
      ...prev,
      moleculeAnimation: 'shifting-left'
    }));
    
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        moleculeAnimation: 'balanced'
      }));
    }, 2000);
  } else {
    // No shift - special animation
    // Shake equilibrium arrows
    // Show "K unchanged" indicator
  }
};
```

### Explanation Generator

```javascript
const generateExplanation = (equilibrium, stress, shift) => {
  const explanations = {
    'add-reactant': {
      principle: "Adding a reactant causes the system to shift toward products to consume the added substance.",
      principlIs: "Þegar við bætum hvarfefni við, hliðrast kerfið í átt að afurðum til að neyta hvarfefnisins.",
      molecular: "More reactant molecules increase collision frequency, speeding up the forward reaction."
    },
    'increase-temp-exothermic': {
      principle: "For exothermic reactions, heat is a product. Increasing temperature shifts toward reactants.",
      principleIs: "Í varmalosandi hvarfi er varmi afurð. Hitun hliðrar jafnvæginu í átt að hvarfefnum.",
      molecular: "Added energy favors the endothermic (reverse) direction."
    },
    // ... more explanations
  };
  
  return explanations[stress] || {};
};
```

## Equilibrium Bank

### Create 30+ equilibria across three difficulty levels:

**Beginner (10):**
1. N₂O₄(g) ⇌ 2NO₂(g) - Simple dimerization
2. H₂(g) + I₂(g) ⇌ 2HI(g) - Simple synthesis
3. PCl₅(g) ⇌ PCl₃(g) + Cl₂(g) - Decomposition
4. CO(g) + 2H₂(g) ⇌ CH₃OH(g) - Methanol synthesis
5. CaCO₃(s) ⇌ CaO(s) + CO₂(g) - Thermal decomposition
6. Fe³⁺(aq) + SCN⁻(aq) ⇌ FeSCN²⁺(aq) - Blood red complex
7. H₂O(l) ⇌ H⁺(aq) + OH⁻(aq) - Water autoionization
8. CH₃COOH(aq) ⇌ CH₃COO⁻(aq) + H⁺(aq) - Acetic acid
9. NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq) - Ammonia base
10. AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq) - Precipitation

**Intermediate (12):**
1. N₂(g) + 3H₂(g) ⇌ 2NH₃(g) - Haber process
2. 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) - Contact process
3. 4NH₃(g) + 5O₂(g) ⇌ 4NO(g) + 6H₂O(g) - Ostwald process
4. CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g) - Water gas shift
5. 2NO(g) + O₂(g) ⇌ 2NO₂(g) - Nitrogen oxide oxidation
6. C(s) + CO₂(g) ⇌ 2CO(g) - Boudouard reaction
7. CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g) - Steam reforming
8. H₂(g) + CO₂(g) ⇌ H₂O(g) + CO(g) - Reverse water gas
9. N₂(g) + O₂(g) ⇌ 2NO(g) - Nitrogen fixation
10. 2H₂S(g) + 3O₂(g) ⇌ 2H₂O(g) + 2SO₂(g) - Oxidation
11. H₂CO₃(aq) ⇌ H⁺(aq) + HCO₃⁻(aq) - Carbonic acid
12. Cu(NH₃)₄²⁺(aq) ⇌ Cu²⁺(aq) + 4NH₃(aq) - Complex ion

**Advanced (8):**
1. 2C(s) + O₂(g) ⇌ 2CO(g) (coupled with) CO + ½O₂ ⇌ CO₂ - Multi-step
2. Multiple equilibria in buffer systems
3. Coupled acid-base equilibria
4. Temperature-dependent K calculations
5. Pressure-dependent industrial processes
6. Simultaneous equilibria
7. Heterogeneous catalysis effects
8. Real industrial optimization scenarios

## Testing Scenarios

### Functionality Tests:
1. All stress types apply correctly
2. Le Chatelier predictions accurate
3. Visual animations smooth
4. Score/streak calculations correct
5. Timer countdown works
6. ICE table mode functional
7. Explanations display properly
8. Hints progress logically

### Educational Tests:
1. Students understand why shifts occur
2. Molecular view aids understanding
3. Explanations are clear
4. Difficulty progression appropriate
5. ICE tables teach methodology

### Visual Tests:
1. Molecule displays are clear
2. Shift animations are obvious
3. Color coding is meaningful
4. Mobile layout works
5. No visual glitches

## Success Criteria

The game succeeds if:
- Students can predict equilibrium shifts accurately
- Visual feedback enhances understanding
- Le Chatelier's principle becomes intuitive
- ICE table practice builds calculation skills
- Teachers use it to demonstrate concepts
- Students say "now I get it!"

## Deployment

**File to Create:** `equilibrium-shifter.html`

**Upload to Server:**
```bash
scp equilibrium-shifter.html user@linode:/var/www/kvenno.app/games/
chmod 644 equilibrium-shifter.html
```

---

## Implementation Checklist for Claude Code

- [ ] Set up HTML structure with React and Tailwind
- [ ] Create Kvenno-branded header
- [ ] Implement game state management
- [ ] Build equilibrium data structures
- [ ] Create 30+ equilibrium scenarios
- [ ] Implement Le Chatelier logic engine
- [ ] Build visual molecule display system
- [ ] Create shift animation system
- [ ] Implement stress selection interface
- [ ] Add prediction buttons (Left/None/Right)
- [ ] Build feedback and explanation system
- [ ] Create hint system with progressive help
- [ ] Implement scoring and streak tracking
- [ ] Add timer for Challenge mode
- [ ] Design responsive layout
- [ ] Add Icelandic translations
- [ ] Create ICE table practice mode
- [ ] Implement K vs Q explanations
- [ ] Add instructions/help modal
- [ ] Polish animations and transitions
- [ ] Test all equilibrium predictions
- [ ] Verify educational accuracy
- [ ] Test on multiple devices
- [ ] Add accessibility features
- [ ] Final QA and bug fixes

---

**Ready for Claude Code to implement!** 🚀⚖️

This specification provides everything needed to create an engaging, educational equilibrium game that helps students master Le Chatelier's principle.
