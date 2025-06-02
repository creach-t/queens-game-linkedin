import { ColoredRegion, GameCell } from '../types/game';
import { Colors } from '../constants/Colors';

/**
 * Génère des régions colorées pour un plateau de taille donnée
 * Cette implémentation crée des régions simples pour le POC
 */
export function generateColoredRegions(gridSize: number): ColoredRegion[] {
  const regions: ColoredRegion[] = [];
  const usedCells = new Set<string>();
  
  // Pour le POC, on crée des régions de formes simples
  let regionId = 0;
  
  // Stratégie simple : créer des régions en forme de blocs
  const regionSize = Math.floor((gridSize * gridSize) / gridSize);
  
  for (let startRow = 0; startRow < gridSize; startRow++) {
    for (let startCol = 0; startCol < gridSize; startCol++) {
      const cellKey = `${startRow}-${startCol}`;
      
      if (!usedCells.has(cellKey) && regionId < gridSize) {
        const region: ColoredRegion = {
          id: regionId,
          color: Colors.regions[regionId % Colors.regions.length],
          cells: [],
          hasQueen: false
        };
        
        // Pour le POC, chaque région est une rangée horizontale
        for (let col = 0; col < gridSize; col++) {
          const cellKey = `${startRow}-${col}`;
          if (!usedCells.has(cellKey)) {
            region.cells.push({ row: startRow, col });
            usedCells.add(cellKey);
          }
        }
        
        if (region.cells.length > 0) {
          regions.push(region);
          regionId++;
        }
        
        break; // Passer à la rangée suivante
      }
    }
  }
  
  return regions;
}

/**
 * Génère des régions plus complexes (pour versions futures)
 */
export function generateAdvancedRegions(gridSize: number): ColoredRegion[] {
  // TODO: Implémenter un algorithme plus sophistiqué pour créer
  // des régions de formes irrégulières mais équilibrées
  return generateColoredRegions(gridSize);
}

/**
 * Initialise un plateau vide avec les régions colorées
 */
export function initializeBoard(gridSize: number, regions: ColoredRegion[]): GameCell[][] {
  const board: GameCell[][] = [];
  
  // Créer un mapping rapide région -> couleur
  const regionMap = new Map<string, { id: number; color: string }>();
  regions.forEach(region => {
    region.cells.forEach(cell => {
      regionMap.set(`${cell.row}-${cell.col}`, {
        id: region.id,
        color: region.color
      });
    });
  });
  
  // Initialiser le plateau
  for (let row = 0; row < gridSize; row++) {
    board[row] = [];
    for (let col = 0; col < gridSize; col++) {
      const regionInfo = regionMap.get(`${row}-${col}`);
      
      board[row][col] = {
        row,
        col,
        regionId: regionInfo?.id ?? 0,
        regionColor: regionInfo?.color ?? Colors.regions[0],
        state: 'empty',
        isHighlighted: false,
        isConflict: false
      };
    }
  }
  
  return board;
}

/**
 * Génère un niveau complet avec solution
 */
export function generateLevel(gridSize: number) {
  const regions = generateColoredRegions(gridSize);
  const board = initializeBoard(gridSize, regions);
  
  return {
    board,
    regions,
    gridSize,
    queensPlaced: 0,
    queensRequired: gridSize,
    isCompleted: false,
    moveCount: 0
  };
}