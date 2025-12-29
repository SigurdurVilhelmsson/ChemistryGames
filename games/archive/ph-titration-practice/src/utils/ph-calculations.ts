// Universal indicator color function
export const getUniversalIndicatorColor = (pH: number): string => {
  if (pH < 3) return '#ff0000';      // Red
  if (pH < 4) return '#ff4500';      // Orange-red
  if (pH < 5) return '#ffa500';      // Orange
  if (pH < 6) return '#ffd700';      // Yellow-orange
  if (pH < 7) return '#ffff00';      // Yellow
  if (pH < 8) return '#9acd32';      // Yellow-green
  if (pH < 9) return '#32cd32';      // Green
  if (pH < 10) return '#20b2aa';     // Teal
  if (pH < 11) return '#4169e1';     // Blue
  if (pH < 12) return '#8a2be2';     // Blue-violet
  return '#9400d3';                   // Violet
};

// pH color for display
export const getPHDisplayColor = (pH: number): string => {
  if (pH < 3) return '#ef4444';
  if (pH < 5) return '#f97316';
  if (pH < 7) return '#eab308';
  if (pH < 9) return '#22c55e';
  if (pH < 11) return '#3b82f6';
  return '#a855f7';
};

// Strong acid + Strong base pH calculation
export const calculateStrongStrongPH = (
  volumeAcid: number,
  molarityAcid: number,
  volumeBase: number,
  molarityBase: number
): number => {
  const molesAcid = volumeAcid * molarityAcid / 1000;
  const molesBase = volumeBase * molarityBase / 1000;
  const totalVolume = (volumeAcid + volumeBase) / 1000;

  if (Math.abs(molesAcid - molesBase) < 1e-10) {
    return 7.00;
  } else if (molesAcid > molesBase) {
    const excessH = (molesAcid - molesBase) / totalVolume;
    return -Math.log10(excessH);
  } else {
    const excessOH = (molesBase - molesAcid) / totalVolume;
    const pOH = -Math.log10(excessOH);
    return 14 - pOH;
  }
};

// Weak acid + Strong base pH calculation
export const calculateWeakStrongPH = (
  volumeAcid: number,
  molarityAcid: number,
  Ka: number,
  volumeBase: number,
  molarityBase: number
): number => {
  const molesAcid = volumeAcid * molarityAcid / 1000;
  const molesBase = volumeBase * molarityBase / 1000;
  const totalVolume = (volumeAcid + volumeBase) / 1000;
  const pKa = -Math.log10(Ka);

  if (molesBase === 0) {
    // Initial pH (weak acid)
    const sqrtKaCa = Math.sqrt(Ka * molarityAcid);
    return -Math.log10(sqrtKaCa);
  } else if (molesBase < molesAcid - 1e-10) {
    // Buffer region (Henderson-Hasselbalch)
    const molesA = molesBase;
    const molesHA = molesAcid - molesBase;
    return pKa + Math.log10(molesA / molesHA);
  } else if (Math.abs(molesBase - molesAcid) < 1e-10) {
    // Equivalence point (weak base solution)
    const Cb = molesBase / totalVolume;
    const Kb = 1e-14 / Ka;
    const pOH = 0.5 * (-Math.log10(Kb) - Math.log10(Cb));
    return 14 - pOH;
  } else {
    // Excess strong base
    const excessOH = (molesBase - molesAcid) / totalVolume;
    return 14 + Math.log10(excessOH);
  }
};

// Strong base + Strong acid pH calculation
export const calculateStrongBaseStrongAcidPH = (
  volumeBase: number,
  molarityBase: number,
  volumeAcid: number,
  molarityAcid: number
): number => {
  const molesBase = volumeBase * molarityBase / 1000;
  const molesAcid = volumeAcid * molarityAcid / 1000;
  const totalVolume = (volumeBase + volumeAcid) / 1000;

  if (molesAcid === 0) {
    // Initial pH of strong base
    const pOH = -Math.log10(molarityBase);
    return 14 - pOH;
  } else if (Math.abs(molesBase - molesAcid) < 1e-10) {
    return 7.00;
  } else if (molesBase > molesAcid) {
    const excessOH = (molesBase - molesAcid) / totalVolume;
    const pOH = -Math.log10(excessOH);
    return 14 - pOH;
  } else {
    const excessH = (molesAcid - molesBase) / totalVolume;
    return -Math.log10(excessH);
  }
};

// Weak base + Strong acid pH calculation
export const calculateWeakBaseStrongAcidPH = (
  volumeBase: number,
  molarityBase: number,
  Kb: number,
  volumeAcid: number,
  molarityAcid: number
): number => {
  const molesBase = volumeBase * molarityBase / 1000;
  const molesAcid = volumeAcid * molarityAcid / 1000;
  const totalVolume = (volumeBase + volumeAcid) / 1000;
  const pKb = -Math.log10(Kb);

  if (molesAcid === 0) {
    // Initial pH (weak base)
    const pOH = 0.5 * (pKb - Math.log10(molarityBase));
    return 14 - pOH;
  } else if (molesAcid < molesBase - 1e-10) {
    // Buffer region
    const molesBH = molesAcid;
    const molesB = molesBase - molesAcid;
    const pOH = pKb + Math.log10(molesBH / molesB);
    return 14 - pOH;
  } else if (Math.abs(molesBase - molesAcid) < 1e-10) {
    // Equivalence point (weak acid solution)
    const Ca = molesAcid / totalVolume;
    const Ka = 1e-14 / Kb;
    const pH = 0.5 * (-Math.log10(Ka) - Math.log10(Ca));
    return pH;
  } else {
    // Excess strong acid
    const excessH = (molesAcid - molesBase) / totalVolume;
    return -Math.log10(excessH);
  }
};
