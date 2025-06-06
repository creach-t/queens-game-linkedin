export interface GameCell {
  row: number;
  col: number;
  regionId: number;
  regionColor: string;
  state: 'empty' | 'queen' | 'marker';
  isHighlighted?: boolean;
  isConflict?: boolean;
}

export interface ColoredRegion {
  id: number;
  color: string;
  cells: {row: number, col: number}[];
  hasQueen: boolean;
  queenPosition?: {row: number, col: number};
}

export interface GameState {
  board: GameCell[][];
  regions: ColoredRegion[];
  gridSize: number;
  queensPlaced: number;
  queensRequired: number;
  isCompleted: boolean;
  moveCount: number;
  solution?: {row: number, col: number}[]; // Solution pour les hints
}

export interface GameMove {
  type: 'place_queen' | 'place_marker' | 'remove';
  row: number;
  col: number;
  previousState: 'empty' | 'queen' | 'marker';
}

export type CellState = 'empty' | 'queen' | 'marker';