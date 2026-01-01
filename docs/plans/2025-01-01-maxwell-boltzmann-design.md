# Maxwell-Boltzmann Visualization Design

**Date:** 2025-01-01
**Status:** Approved
**Game:** Kinetics (2-ar)

---

## Overview

Add a Maxwell-Boltzmann energy distribution visualization to the Kinetics game that shows why higher temperatures lead to more successful collisions. The visualization syncs with the existing CollisionDemo component via shared temperature state.

## Architecture

### New Component

```
games/2-ar/kinetics/src/components/
├── CollisionDemo.tsx      (existing)
├── MaxwellBoltzmann.tsx   (new)
└── Level1.tsx             (modify)
```

### Component Interface

```tsx
interface MaxwellBoltzmannProps {
  temperature: number;           // Current T in Kelvin
  activationEnergy: number;      // Ea in kJ/mol
  compareTemperature?: number;   // Optional second curve
  className?: string;
}
```

### Shared State

Level1 manages shared state for both visualizations:

```tsx
const [temperature, setTemperature] = useState(350);
const [activationEnergy, setActivationEnergy] = useState(40);
```

---

## Mathematical Model

### Maxwell-Boltzmann Distribution

Simplified normalized form for kinetic energy distribution:

```tsx
function maxwellBoltzmann(E: number, T: number): number {
  const kB = 8.314e-3;  // kJ/(mol·K)
  const factor = Math.sqrt(E) * Math.exp(-E / (kB * T));
  return factor;
}
```

### Curve Generation

- X-axis: Energy (0 to ~150 kJ/mol)
- Y-axis: Relative number of molecules (normalized)
- 200 points for smooth curve
- Peak shifts right and flattens as T increases

### Percentage Calculation

Numerical integration using trapezoidal rule:

```tsx
function calculateFractionAboveEa(T: number, Ea: number): number {
  // Returns fraction (0-1) of molecules with E >= Ea
}
```

---

## Visual Layout

```
┌─────────────────────────────────────────────────┐
│  [Question Card]                                │
├─────────────────────────────────────────────────┤
│  ┌─── Temperature Control ───────────────────┐  │
│  │  Hitastig: [====●=====] 350 K             │  │
│  │  Ea:       [===●======] 40 kJ/mol         │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌─ Maxwell-Boltzmann ─┐  ┌─ CollisionDemo ──┐  │
│  │    curve + shaded   │  │   particles      │  │
│  │    area above Ea    │  │   colliding      │  │
│  │                     │  │                  │  │
│  │  12.4% ≥ Ea         │  │  Hvörf: 5        │  │
│  └─────────────────────┘  └──────────────────┘  │
│                                                 │
│  [Factor Cards]                                 │
└─────────────────────────────────────────────────┘
```

### Color Scheme

| Element | Color | Hex |
|---------|-------|-----|
| Low temp (250K) | Blue | `#3b82f6` |
| Medium temp (350K) | Orange | `#f97316` |
| High temp (500K) | Red | `#ef4444` |
| Ea threshold line | Dashed red | `#dc2626` |
| Shaded area (E ≥ Ea) | Green 30% | `#22c55e4d` |

### Responsive Behavior

- Side-by-side on desktop (md+)
- Stacked on mobile
- Graph maintains 16:10 aspect ratio

---

## Data Flow

### Real-time Updates

When temperature slider changes:
1. M-B curve recalculates and shifts
2. Shaded area (E ≥ Ea) updates
3. Percentage recalculates
4. CollisionDemo particles speed up/slow down
5. More/fewer successful collisions occur

### Educational Connection

Students see the direct relationship:
- Higher T → curve shifts right, flattens
- More area above Ea → higher percentage
- Faster particles → more successful collisions

---

## Implementation Steps

| Step | Task | Files |
|------|------|-------|
| 1 | Create MaxwellBoltzmann.tsx | New file |
| 2 | Add shaded region + percentage | MaxwellBoltzmann.tsx |
| 3 | Create slider controls | Level1.tsx |
| 4 | Update layout (responsive grid) | Level1.tsx |
| 5 | Connect shared state | Level1.tsx |
| 6 | Polish and add Icelandic labels | All |

---

## Icelandic Labels

- "Orkudreifing Maxwell-Boltzmann" (Maxwell-Boltzmann Energy Distribution)
- "Hitastig" (Temperature)
- "Virkjunarorka (Ea)" (Activation Energy)
- "X% sameinda með E ≥ Ea" (X% of molecules with E ≥ Ea)
- "Orka (kJ/mol)" (Energy)
- "Hlutfallslegur fjöldi sameinda" (Relative number of molecules)

---

## Dependencies

- Uses `InteractiveGraph` from `@shared/components` for curve rendering
- Pairs with existing `CollisionDemo` component
- No new external dependencies required
