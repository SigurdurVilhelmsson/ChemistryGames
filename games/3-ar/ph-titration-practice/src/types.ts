export type TitrationType =
  | 'strong-acid-strong-base'
  | 'weak-acid-strong-base'
  | 'strong-base-strong-acid'
  | 'weak-base-strong-acid';

export interface TitrationTypeConfig {
  id: TitrationType;
  name: string;
  example: string;
  description: string;
  icon: string;
  analyteLabel: string;
  titrantLabel: string;
  defaultAnalyte: {
    formula: string;
    name: string;
  };
  defaultTitrant: {
    formula: string;
    name: string;
  };
  defaultKa?: number;
  defaultKb?: number;
  expectedEquivPH: number;
}

export interface TitrationConfig {
  type: TitrationType;
  typeName: string;
  analyteVolume: number;
  analyteMolarity: number;
  titrantMolarity: number;
  analyteFormula: string;
  analyteName: string;
  titrantFormula: string;
  titrantName: string;
  kaKb: number | null;
  expectedEquivPH: number;
}

export interface DataPoint {
  volume: number;
  pH: number;
}

export interface WeakAcid {
  name: string;
  Ka: number;
  pKa: number;
}

export interface WeakBase {
  name: string;
  Kb: number;
  pKb: number;
}
