export const GridSizes = {
  BEGINNER: 6,
  INTERMEDIATE: 7,
  ADVANCED: 8,
  EXPERT: 9,
} as const;

export type GridSize = typeof GridSizes[keyof typeof GridSizes];

export const GridDifficulty = {
  [GridSizes.BEGINNER]: 'Débutant',
  [GridSizes.INTERMEDIATE]: 'Intermédiaire', 
  [GridSizes.ADVANCED]: 'Avancé',
  [GridSizes.EXPERT]: 'Expert',
} as const;