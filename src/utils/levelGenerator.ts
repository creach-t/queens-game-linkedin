import { ColoredRegion, GameCell } from '../types/game';
import { Colors } from '../constants/Colors';

/**
 * Génère des régions colorées pour un plateau de taille donnée
 * Cette implémentation crée des régions simples pour le POC
 */
export function generateColoredRegions(gridSize: number): ColoredRegion[] {
  const regions: ColoredRegion[] = [];
  
  console.log(`🎲 Generating regions for ${gridSize}x${gridSize} grid`);
  
  // Pour le POC, chaque région est une rangée horizontale
  // Cela garantit exactement gridSize régions pour une grille gridSize×gridSize
  for (let row = 0; row < gridSize; row++) {
    const region: ColoredRegion = {
      id: row,
      color: Colors.regions[row % Colors.regions.length],
      cells: [],
      hasQueen: false
    };
    
    // Ajouter toutes les cellules de cette rangée à la région
    for (let col = 0; col < gridSize; col++) {
      region.cells.push({ row, col });
    }
    
    regions.push(region);
    console.log(`✅ Created region ${row} with ${region.cells.length} cells`);
  }
  
  console.log(`🏁 Generated ${regions.length} regions total`);
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
  
  // Initialiser le plateau - EXACTEMENT gridSize × gridSize
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
  
  // Vérification de sécurité
  console.log(`🔍 Board created: ${board.length} rows × ${board[0]?.length} cols`);
  if (board.length !== gridSize || board[0]?.length !== gridSize) {
    console.error(`❌ ERREUR: Board size incorrect! Expected ${gridSize}×${gridSize}, got ${board.length}×${board[0]?.length}`);
  }
  
  return board;
}

/**
 * Génère un niveau complet avec solution
 */
export function generateLevel(gridSize: number) {
  console.log(`🎯 Generating level for ${gridSize}×${gridSize} grid`);
  
  const regions = generateColoredRegions(gridSize);
  const board = initializeBoard(gridSize, regions);
  
  // Vérifications finales
  const totalCells = board.flat().length;
  const expectedCells = gridSize * gridSize;
  
  console.log(`📊 Level stats: ${regions.length} regions, ${totalCells} cells (expected: ${expectedCells})`);
  
  if (totalCells !== expectedCells) {
    console.error(`❌ ERREUR: Nombre de cellules incorrect!`);
  }
  
  if (regions.length !== gridSize) {
    console.error(`❌ ERREUR: Nombre de régions incorrect! Expected ${gridSize}, got ${regions.length}`);
  }
  
  return {
    board,
    regions,
    gridSize,
    queensPlaced: 0,
    queensRequired: gridSize, // Exactement gridSize reines nécessaires
    isCompleted: false,
    moveCount: 0
  };
}