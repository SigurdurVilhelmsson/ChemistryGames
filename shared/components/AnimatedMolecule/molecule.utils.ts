/**
 * Utility functions for molecule visualization
 */

import type {
  Position2D,
  Position3D,
  Molecule,
  MoleculeAtom,
  MolecularGeometry,
  ElementVisual,
} from '@shared/types';

import {
  ELEMENT_VISUALS,
  DEFAULT_ELEMENT_VISUAL,
  GEOMETRY_COORDS,
  SIZE_CONFIG,
} from './molecule.constants';

/**
 * Get element visual properties, with fallback to default
 */
export function getElementVisual(symbol: string): ElementVisual {
  return ELEMENT_VISUALS[symbol] || DEFAULT_ELEMENT_VISUAL;
}

/**
 * Project 3D coordinates to 2D using simple isometric projection
 * @param point - 3D point to project
 * @param scale - Scale factor for the projection
 * @param centerX - X center offset
 * @param centerY - Y center offset
 */
export function project3Dto2D(
  point: Position3D,
  scale: number,
  centerX: number = 0,
  centerY: number = 0
): Position2D {
  // Simple isometric projection
  // X shifts right with positive z
  // Y shifts up with negative z (screen coordinates)
  return {
    x: centerX + (point.x + point.z * 0.3) * scale,
    y: centerY + (point.y - point.z * 0.3) * scale,
  };
}

/**
 * Get depth-based styling for 3D effect
 * @param z - Z coordinate (-1 to 1 range)
 * @returns opacity and scale multipliers
 */
export function getDepthStyle(z: number): { opacity: number; scale: number } {
  // z ranges from -1 (back) to 1 (front)
  const normalizedZ = (z + 1) / 2; // 0 to 1
  return {
    opacity: 0.6 + normalizedZ * 0.4, // 0.6 to 1.0
    scale: 0.8 + normalizedZ * 0.2,   // 0.8 to 1.0
  };
}

/**
 * Calculate positions for atoms based on VSEPR geometry
 */
export function calculateGeometryPositions(
  geometry: MolecularGeometry,
  centerX: number,
  centerY: number,
  scale: number
): Position2D[] {
  const coords3D = GEOMETRY_COORDS[geometry];
  if (!coords3D) return [];

  return coords3D.map(point => project3Dto2D(point, scale, centerX, centerY));
}

/**
 * Calculate atom positions for a molecule
 * Handles various cases: explicit positions, geometry-based, or simple layout
 */
export function calculateAtomPositions(
  molecule: Molecule,
  width: number,
  height: number,
  atomRadius: number
): Map<string, Position2D> {
  const positions = new Map<string, Position2D>();
  const centerX = width / 2;
  const centerY = height / 2;

  // If atoms have explicit positions, use them (scaled to container)
  const hasExplicitPositions = molecule.atoms.some(a => a.position);
  if (hasExplicitPositions) {
    for (const atom of molecule.atoms) {
      if (atom.position) {
        positions.set(atom.id, {
          x: atom.position.x * (width / 2) + centerX,
          y: atom.position.y * (height / 2) + centerY,
        });
      }
    }
    return positions;
  }

  // If geometry is specified, use VSEPR positions
  if (molecule.geometry && molecule.atoms.length > 1) {
    const scale = Math.min(width, height) / 3;
    const geometryPositions = calculateGeometryPositions(
      molecule.geometry,
      centerX,
      centerY,
      scale
    );

    // First atom is typically central
    positions.set(molecule.atoms[0].id, { x: centerX, y: centerY });

    // Remaining atoms get geometry positions
    for (let i = 1; i < molecule.atoms.length && i <= geometryPositions.length; i++) {
      positions.set(molecule.atoms[i].id, geometryPositions[i - 1]);
    }
    return positions;
  }

  // Simple layout: arrange atoms in a line or cluster
  const atomCount = molecule.atoms.length;

  if (atomCount === 1) {
    // Single atom at center
    positions.set(molecule.atoms[0].id, { x: centerX, y: centerY });
  } else if (atomCount === 2) {
    // Two atoms side by side
    const spacing = atomRadius * 3;
    positions.set(molecule.atoms[0].id, { x: centerX - spacing, y: centerY });
    positions.set(molecule.atoms[1].id, { x: centerX + spacing, y: centerY });
  } else {
    // Linear arrangement for more atoms
    const totalWidth = (atomCount - 1) * atomRadius * 2.5;
    const startX = centerX - totalWidth / 2;

    for (let i = 0; i < atomCount; i++) {
      positions.set(molecule.atoms[i].id, {
        x: startX + i * atomRadius * 2.5,
        y: centerY,
      });
    }
  }

  return positions;
}

/**
 * Calculate bond line endpoints, accounting for atom radii
 */
export function calculateBondEndpoints(
  fromPos: Position2D,
  toPos: Position2D,
  fromRadius: number,
  toRadius: number
): { start: Position2D; end: Position2D } {
  const dx = toPos.x - fromPos.x;
  const dy = toPos.y - fromPos.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  if (length === 0) {
    return { start: fromPos, end: toPos };
  }

  // Normalize direction
  const nx = dx / length;
  const ny = dy / length;

  // Start just outside the from atom's radius
  const start: Position2D = {
    x: fromPos.x + nx * fromRadius,
    y: fromPos.y + ny * fromRadius,
  };

  // End just outside the to atom's radius
  const end: Position2D = {
    x: toPos.x - nx * toRadius,
    y: toPos.y - ny * toRadius,
  };

  return { start, end };
}

/**
 * Calculate angle between two points in degrees
 */
export function calculateAngle(from: Position2D, to: Position2D): number {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

/**
 * Calculate position at a given angle and distance from a center point
 */
export function positionAtAngle(
  center: Position2D,
  angleDegrees: number,
  distance: number
): Position2D {
  const angleRadians = angleDegrees * (Math.PI / 180);
  return {
    x: center.x + Math.cos(angleRadians) * distance,
    y: center.y + Math.sin(angleRadians) * distance,
  };
}

/**
 * Get size configuration for a given size variant
 */
export function getSizeConfig(size: keyof typeof SIZE_CONFIG) {
  return SIZE_CONFIG[size];
}

/**
 * Calculate text color based on background color (for atom symbols)
 * Returns white or dark text depending on background brightness
 */
export function getContrastTextColor(backgroundColor: string): string {
  // Simple luminance check
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#1F2937' : '#FFFFFF';
}

/**
 * Generate unique IDs for atoms if not provided
 */
export function ensureAtomIds(atoms: MoleculeAtom[]): MoleculeAtom[] {
  return atoms.map((atom, index) => ({
    ...atom,
    id: atom.id || `atom-${index}`,
  }));
}

/**
 * Calculate lone pair positions around an atom
 * @param atomPosition - Position of the atom
 * @param lonePairs - Number of lone pairs (1-3)
 * @param bondAngles - Angles of existing bonds (to avoid overlap)
 * @param distance - Distance from atom center
 */
export function calculateLonePairPositions(
  atomPosition: Position2D,
  lonePairs: number,
  bondAngles: number[],
  distance: number
): Position2D[][] {
  const positions: Position2D[][] = [];

  if (lonePairs === 0) return positions;

  // Find available angles (opposite to bonds)
  const usedAngles = new Set(bondAngles.map(a => Math.round(a / 45) * 45));
  const availableAngles: number[] = [];

  for (let angle = 0; angle < 360; angle += 45) {
    if (!usedAngles.has(angle) && !usedAngles.has((angle + 180) % 360)) {
      availableAngles.push(angle);
    }
  }

  // Default angles if no bonds
  if (availableAngles.length === 0) {
    availableAngles.push(90, 180, 270, 0);
  }

  // Place lone pairs at available angles
  for (let i = 0; i < lonePairs && i < availableAngles.length; i++) {
    const angle = availableAngles[i];
    // Each lone pair is represented by two dots
    const dot1 = positionAtAngle(atomPosition, angle - 10, distance);
    const dot2 = positionAtAngle(atomPosition, angle + 10, distance);
    positions.push([dot1, dot2]);
  }

  return positions;
}

/**
 * Determine if a point is inside an SVG element bounds
 */
export function isPointInBounds(
  point: Position2D,
  bounds: { x: number; y: number; width: number; height: number }
): boolean {
  return (
    point.x >= bounds.x &&
    point.x <= bounds.x + bounds.width &&
    point.y >= bounds.y &&
    point.y <= bounds.y + bounds.height
  );
}
