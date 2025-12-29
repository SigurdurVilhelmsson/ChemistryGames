import type { TitrationTypeConfig, WeakAcid, WeakBase } from '../types';

export const TITRATION_TYPES: Record<string, TitrationTypeConfig> = {
  'strong-acid-strong-base': {
    id: 'strong-acid-strong-base',
    name: 'Sterk sýra + Sterkur basi',
    example: 'HCl + NaOH',
    description: 'Klassísk títrun með skörpum jafngildispunkti við pH 7',
    icon: '📊',
    analyteLabel: 'Sterk sýra',
    titrantLabel: 'Sterkur basi',
    defaultAnalyte: { formula: 'HCl', name: 'Saltssýra' },
    defaultTitrant: { formula: 'NaOH', name: 'Natríumhýdroxíð' },
    expectedEquivPH: 7.0
  },
  'weak-acid-strong-base': {
    id: 'weak-acid-strong-base',
    name: 'Veik sýra + Sterkur basi',
    example: 'CH₃COOH + NaOH',
    description: 'Sýnir buffer svæði og jafngildispunkt yfir pH 7',
    icon: '📈',
    analyteLabel: 'Veik sýra',
    titrantLabel: 'Sterkur basi',
    defaultAnalyte: { formula: 'CH₃COOH', name: 'Ediksýra' },
    defaultTitrant: { formula: 'NaOH', name: 'Natríumhýdroxíð' },
    defaultKa: 1.8e-5,
    expectedEquivPH: 8.72
  },
  'strong-base-strong-acid': {
    id: 'strong-base-strong-acid',
    name: 'Sterkur basi + Sterk sýra',
    example: 'NaOH + HCl',
    description: 'Byrjar með hátt pH og lækkar niður að pH 7',
    icon: '📉',
    analyteLabel: 'Sterkur basi',
    titrantLabel: 'Sterk sýra',
    defaultAnalyte: { formula: 'NaOH', name: 'Natríumhýdroxíð' },
    defaultTitrant: { formula: 'HCl', name: 'Saltssýra' },
    expectedEquivPH: 7.0
  },
  'weak-base-strong-acid': {
    id: 'weak-base-strong-acid',
    name: 'Veikur basi + Sterk sýra',
    example: 'NH₃ + HCl',
    description: 'Sýnir buffer svæði og jafngildispunkt undir pH 7',
    icon: '📊',
    analyteLabel: 'Veikur basi',
    titrantLabel: 'Sterk sýra',
    defaultAnalyte: { formula: 'NH₃', name: 'Ammoníak' },
    defaultTitrant: { formula: 'HCl', name: 'Saltssýra' },
    defaultKb: 1.8e-5,
    expectedEquivPH: 5.28
  }
};

export const WEAK_ACIDS: WeakAcid[] = [
  { name: 'Ediksýra (CH₃COOH)', Ka: 1.8e-5, pKa: 4.74 },
  { name: 'Flússýra (HF)', Ka: 6.8e-4, pKa: 3.17 },
  { name: 'Maurasýra (HCOOH)', Ka: 1.8e-4, pKa: 3.75 },
  { name: 'Salicylsýra', Ka: 1.0e-3, pKa: 3.0 },
  { name: 'Benzoesýra', Ka: 6.3e-5, pKa: 4.2 }
];

export const WEAK_BASES: WeakBase[] = [
  { name: 'Ammoníak (NH₃)', Kb: 1.8e-5, pKb: 4.74 },
  { name: 'Metýlamín (CH₃NH₂)', Kb: 4.4e-4, pKb: 3.36 },
  { name: 'Anílin (C₆H₅NH₂)', Kb: 4.3e-10, pKb: 9.37 },
  { name: 'Pýridín (C₅H₅N)', Kb: 1.7e-9, pKb: 8.77 }
];
