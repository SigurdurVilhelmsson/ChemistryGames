# Thermodynamics Predictor - Development Instructions for Claude Code

## Project Overview
Create an educational chemistry game for 3rd year students (ages 17-18) at Kvennaskólinn í Reykjavík. The game teaches chemical thermodynamics through calculating Gibbs free energy (ΔG) from enthalpy (ΔH) and entropy (ΔS), predicting reaction spontaneity, and understanding temperature-dependent processes.

## Technical Stack
- **Frontend**: React 18 with Babel (standalone, in-browser JSX transformation)
- **Styling**: Tailwind CSS (CDN)
- **Deployment**: Single HTML file for Linode Ubuntu server
- **No build process required** - everything runs in the browser

## File Structure
Create a single file: `thermodynamics-predictor.html`

## Educational Context
Students are learning from "Chemistry, the Central Science" by Brown et al., Chapter 19 (Chemical Thermodynamics). They understand:
- Gibbs free energy equation: ΔG = ΔH - TΔS
- Spontaneity criteria (ΔG < 0 = spontaneous)
- Enthalpy (ΔH) - heat of reaction
- Entropy (ΔS) - disorder/randomness
- Temperature dependence of spontaneity
- Standard conditions (ΔG°, ΔH°, ΔS°)

## Kvenno Brand Guidelines
- Primary color: `--kvenno-orange: #f36b22`
- Dark variant: `--kvenno-orange-dark: #d95a1a`
- Use these colors for buttons, accents, and the logo
- White background for main content areas
- Gray (#f9fafb) for page background

## Core Game Mechanics

### 1. Thermodynamics Challenge Structure

**Given to Student:**
- Chemical reaction equation
- ΔH° (enthalpy change) in kJ/mol
- ΔS° (entropy change) in J/(mol·K)
- Temperature in Kelvin (or Celsius)

**Student Must:**
1. Convert ΔS° to kJ/(mol·K) if needed
2. Convert temperature to Kelvin if needed
3. Calculate ΔG° using ΔG° = ΔH° - TΔS°
4. Predict spontaneity:
   - ΔG° < 0: Spontaneous (product-favored)
   - ΔG° > 0: Non-spontaneous (reactant-favored)
   - ΔG° ≈ 0: At equilibrium
5. Explain temperature effects

### 2. Four Thermodynamic Scenarios

**Scenario 1: ΔH < 0, ΔS > 0** (Exothermic, entropy increases)
```
Example: 2H₂O₂(l) → 2H₂O(l) + O₂(g)
ΔH° = -196 kJ/mol
ΔS° = +126 J/(mol·K)

Analysis:
ΔG° = ΔH° - TΔS°
ΔG° = (-196) - T(+0.126)
ΔG° always negative (both terms favorable)

Result: SPONTANEOUS AT ALL TEMPERATURES ✓
```

**Scenario 2: ΔH > 0, ΔS < 0** (Endothermic, entropy decreases)
```
Example: 3O₂(g) → 2O₃(g)
ΔH° = +285 kJ/mol
ΔS° = -137 J/(mol·K)

Analysis:
ΔG° = ΔH° - TΔS°
ΔG° = (+285) - T(-0.137)
ΔG° always positive (both terms unfavorable)

Result: NON-SPONTANEOUS AT ALL TEMPERATURES ✗
```

**Scenario 3: ΔH < 0, ΔS < 0** (Exothermic, entropy decreases)
```
Example: N₂(g) + 3H₂(g) → 2NH₃(g)
ΔH° = -92 kJ/mol
ΔS° = -199 J/(mol·K)

Analysis:
ΔG° = ΔH° - TΔS°
ΔG° = (-92) - T(-0.199)
Low T: ΔG° negative (enthalpy term dominates)
High T: ΔG° positive (entropy term dominates)

Result: SPONTANEOUS AT LOW T, NON-SPONTANEOUS AT HIGH T
Crossover temperature: T = ΔH°/ΔS° = 92/0.199 = 462 K
```

**Scenario 4: ΔH > 0, ΔS > 0** (Endothermic, entropy increases)
```
Example: CaCO₃(s) → CaO(s) + CO₂(g)
ΔH° = +178 kJ/mol
ΔS° = +161 J/(mol·K)

Analysis:
ΔG° = ΔH° - TΔS°
ΔG° = (+178) - T(+0.161)
Low T: ΔG° positive (enthalpy term dominates)
High T: ΔG° negative (entropy term dominates)

Result: NON-SPONTANEOUS AT LOW T, SPONTANEOUS AT HIGH T
Crossover temperature: T = ΔH°/ΔS° = 178/0.161 = 1106 K (833°C)
```

### 3. Visual Entropy Representation

**Order → Disorder Animations:**

**Low Entropy (Ordered):**
```
Solid: [■][■][■][■]
       [■][■][■][■]  ← Organized, low S
       [■][■][■][■]
```

**Medium Entropy (Liquid):**
```
Liquid: [■] [■]
      [■]   [■] [■]  ← Some movement, medium S
        [■] [■]
```

**High Entropy (Gas):**
```
Gas:  [■]        [■]
           [■]
      [■]      [■]    ← Random, high S
```

**Entropy-Increasing Reactions:**
- More gas molecules produced
- Phase change: solid → liquid → gas
- Dissolution: solid → aqueous ions
- Breaking bonds: large molecule → smaller pieces

**Entropy-Decreasing Reactions:**
- Fewer gas molecules produced
- Phase change: gas → liquid → solid
- Precipitation: ions → solid
- Bond formation: smaller molecules → larger

### 4. Temperature Slider & Predictions

**Interactive Temperature Control:**
```
┌────────────────────────────────┐
│  Temperature: [====○====] 500 K│
│  (0 K)              (1000 K)   │
└────────────────────────────────┘

At current temperature (500 K):
ΔG° = (+178) - (500)(+0.161)
ΔG° = +178 - 80.5
ΔG° = +97.5 kJ/mol

Prediction: NON-SPONTANEOUS ✗
```

**Real-Time Updates:**
- Drag slider to change temperature
- ΔG° recalculates instantly
- Spontaneity indicator updates
- Graph shows ΔG vs T line

### 5. ΔG vs Temperature Graph

**Visual Plot:**
```
ΔG (kJ/mol)
    │
+200│     ╱
    │    ╱
+100│   ╱
    │  ╱
  0 │─╱──────────── Crossover T
    │╱│
-100│ │
    │ │
    └─┴──────────────── T (K)
      T_cross
```

**Features:**
- Y-axis: ΔG° (kJ/mol)
- X-axis: Temperature (K)
- Line: ΔG° = ΔH° - TΔS°
- Slope: -ΔS°
- Y-intercept: ΔH°
- Zero-crossing: Crossover temperature
- Color zones:
  - Green (ΔG < 0): Spontaneous
  - Red (ΔG > 0): Non-spontaneous
  - Yellow (ΔG ≈ 0): Equilibrium

### 6. Game Modes

**Learning Mode:**
- See all values (ΔH°, ΔS°, T)
- Interactive temperature slider
- Real-time ΔG° calculation shown
- Visual entropy demonstrations
- Step-by-step explanations
- No time pressure
- Unlimited hints

**Challenge Mode:**
- Given ΔH°, ΔS°, T
- Must calculate ΔG° mentally or with calculator
- Predict spontaneity
- 90 seconds per question
- Score based on accuracy
- No hints available

**Expert Mode:**
- Determine crossover temperature
- Predict spontaneity at multiple temperatures
- Explain entropy changes
- Identify scenario type (1-4)
- Calculate equilibrium constant from ΔG°
- Advanced applications

### 7. 30+ Thermodynamics Problems

**Beginner (10):**
1. **Combustion of methane**
   - CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)
   - ΔH° = -802 kJ/mol, ΔS° = -5 J/(mol·K)
   - T = 298 K
   - Scenario 1: Spontaneous at all T

2. **Water freezing**
   - H₂O(l) → H₂O(s)
   - ΔH° = -6.0 kJ/mol, ΔS° = -22 J/(mol·K)
   - T = 273 K (0°C)
   - Scenario 3: Spontaneous below 0°C

3-10: Simple reactions, clear scenarios

**Intermediate (12):**
11. **Haber process**
    - N₂(g) + 3H₂(g) → 2NH₃(g)
    - ΔH° = -92 kJ/mol, ΔS° = -199 J/(mol·K)
    - Calculate T_crossover
    - Scenario 3

12. **Calcium carbonate decomposition**
    - CaCO₃(s) → CaO(s) + CO₂(g)
    - ΔH° = +178 kJ/mol, ΔS° = +161 J/(mol·K)
    - T_crossover = 1106 K
    - Scenario 4

13. **Photosynthesis**
    - 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂
    - Calculate spontaneity

14-22: Varied reactions, different temperatures

**Advanced (8):**
23. **ΔG° to K conversion**
    - Given ΔG°, calculate K using ΔG° = -RT ln K

24. **Temperature-dependent K**
    - Calculate K at different temperatures

25. **Coupled reactions**
    - Non-spontaneous + spontaneous = overall?

26. **Phase diagrams**
    - Predict phase based on T and P

27. **Biochemical reactions**
    - ATP hydrolysis, protein folding

28. **Industrial optimization**
    - Maximize spontaneity for production

29. **Electrochemistry connection**
    - ΔG° = -nFE°

30. **Multi-step reactions**
    - Calculate overall ΔG° from steps

### 8. Entropy Visualization Puzzles

**Predict Entropy Change:**
```
Reaction: 2NH₃(g) → N₂(g) + 3H₂(g)

Before:        After:
[NH₃] [NH₃]   [N₂] [H₂] [H₂] [H₂]

Gas moles: 2  →  4 (increases)
ΔS° = POSITIVE (entropy increases) ✓

Visual cue: Particles spread out more
```

**Common Patterns:**
- Dissolving: ΔS° > 0 (solid → ions in solution)
- Crystallization: ΔS° < 0 (ions → ordered solid)
- Evaporation: ΔS° > 0 (liquid → gas)
- Condensation: ΔS° < 0 (gas → liquid)
- Gas-producing: ΔS° > 0 (more gas moles)
- Gas-consuming: ΔS° < 0 (fewer gas moles)

### 9. Scoring System

**Base Points:**
- Correct ΔG° calculation (±5 kJ/mol): 50 pts
- Correct spontaneity prediction: 50 pts
- Identify scenario type (1-4): 30 pts
- Explain entropy change: 20 pts
- Calculate crossover T (±10 K): 40 pts

**Bonuses:**
- Perfect calculation (±1 kJ/mol): +20 pts
- Fast answer (<60s): +15 pts
- Correct reasoning explanation: +25 pts
- All correct in streak: +5, +10, +15... pts

**Penalties:**
- Wrong spontaneity: -20 pts
- Calculation error: -10 pts
- Unit error: -5 pts

### 10. Calculation Display

**Step-by-Step Solution:**
```
Problem: Calculate ΔG° for the Haber process at 500 K

Given:
N₂(g) + 3H₂(g) → 2NH₃(g)
ΔH° = -92 kJ/mol
ΔS° = -199 J/(mol·K)
T = 500 K

Step 1: Convert ΔS° to kJ/(mol·K)
ΔS° = -199 J/(mol·K) × (1 kJ / 1000 J)
ΔS° = -0.199 kJ/(mol·K)

Step 2: Apply Gibbs equation
ΔG° = ΔH° - TΔS°
ΔG° = (-92 kJ/mol) - (500 K)(-0.199 kJ/(mol·K))

Step 3: Calculate
ΔG° = -92 - (500)(-0.199)
ΔG° = -92 + 99.5
ΔG° = +7.5 kJ/mol

Step 4: Interpret
ΔG° > 0 → NON-SPONTANEOUS at 500 K ✗

Step 5: Find crossover temperature
At equilibrium: ΔG° = 0
0 = ΔH° - T_crossΔS°
T_cross = ΔH° / ΔS°
T_cross = -92 / -0.199
T_cross = 462 K (189°C)

Conclusion:
- Spontaneous below 462 K ✓
- Non-spontaneous above 462 K ✗
- This is Scenario 3 (ΔH<0, ΔS<0)
```

### 11. Visual Design

**Thermodynamics Dashboard:**
```
┌─────────────────────────────────────┐
│ Reaction: N₂ + 3H₂ → 2NH₃          │
│                                     │
│ ΔH° = -92 kJ/mol     🔥 Exothermic │
│ ΔS° = -199 J/(mol·K) ↓ Entropy ↓   │
│                                     │
│ Temperature: [===○===] 500 K       │
│                                     │
│ ΔG° = +7.5 kJ/mol                  │
│                                     │
│ Spontaneity: NON-SPONTANEOUS ✗     │
└─────────────────────────────────────┘

[Graph: ΔG vs T]
[Entropy Animation]
[Calculate] [Check Answer]
```

**Color Coding:**
- ΔH < 0 (Exothermic): 🔥 Red/Orange
- ΔH > 0 (Endothermic): ❄️ Blue
- ΔS > 0 (Entropy ↑): 🎲 Green (disorder)
- ΔS < 0 (Entropy ↓): 📦 Purple (order)
- ΔG < 0 (Spontaneous): ✓ Green
- ΔG > 0 (Non-spontaneous): ✗ Red

### 12. Icelandic Translation

**UI Text:**
- "Varmafræði" / Thermodynamics
- "Sjálfviljugheit" / Spontaneity
- "Entalpía (ΔH)" / Enthalpy
- "Óreiða (ΔS)" / Entropy (Disorder)
- "Gibbs orka (ΔG)" / Gibbs Free Energy
- "Hitastig" / Temperature
- "Varmalosandi" / Exothermic
- "Varmabindandi" / Endothermic
- "Sjálfviljugt" / Spontaneous
- "Ekki sjálfviljugt" / Non-spontaneous

**Keep English:**
- ΔG, ΔH, ΔS (universal notation)
- Chemical formulas
- Unit abbreviations (kJ/mol, K)

## Implementation Checklist

- [ ] Gibbs equation calculator (ΔG = ΔH - TΔS)
- [ ] 30+ thermodynamics problems
- [ ] Four scenario identification system
- [ ] Temperature slider with real-time updates
- [ ] ΔG vs T graph plotting
- [ ] Entropy visualization (order → disorder)
- [ ] Spontaneity prediction logic
- [ ] Crossover temperature calculations
- [ ] Step-by-step solution display
- [ ] Three game modes (Learning, Challenge, Expert)
- [ ] Scoring system
- [ ] Visual thermodynamics dashboard
- [ ] Color-coded indicators
- [ ] Responsive design
- [ ] Icelandic translations
- [ ] Advanced features (ΔG to K, etc.)

## Success Criteria

The game succeeds if:
- Students understand ΔG = ΔH - TΔS intuitively
- Temperature effects on spontaneity are clear
- Entropy concept becomes visual and concrete
- Students can predict without memorizing
- Four scenarios are recognized easily
- Real-world applications are understood
- Teachers use for demonstrations

## Deployment

**File:** `thermodynamics-predictor.html`

```bash
scp thermodynamics-predictor.html user@linode:/var/www/kvenno.app/games/
chmod 644 thermodynamics-predictor.html
```

---

**Ready for Claude Code to implement!** 🌡️⚡
