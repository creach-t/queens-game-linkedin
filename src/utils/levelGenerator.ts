import { ColoredRegion, GameCell } from '../types/game';
import { Colors } from '../constants/Colors';

/**
 * Générateur de puzzles Queens avec régions CONNEXES
 * Crée des régions où chaque cellule est adjacente orthogonalement à au moins une autre
 */

interface Position {
  row: number;
  col: number;
}

/**
 * Vérifie si deux positions sont adjacentes orthogonalement (pas diagonale)
 */
function areOrthogonallyAdjacent(pos1: Position, pos2: Position): boolean {
  const rowDiff = Math.abs(pos1.row - pos2.row);
  const colDiff = Math.abs(pos1.col - pos2.col);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

/**
 * Vérifie si une région est connexe
 */
function isRegionConnected(cells: Position[]): boolean {
  if (cells.length <= 1) return true;
  
  const visited = new Set<string>();
  const queue = [cells[0]];
  visited.add(`${cells[0].row}-${cells[0].col}`);
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    
    // Chercher tous les voisins orthogonaux dans la région
    for (const cell of cells) {
      const key = `${cell.row}-${cell.col}`;
      if (!visited.has(key) && areOrthogonallyAdjacent(current, cell)) {
        visited.add(key);
        queue.push(cell);
      }
    }
  }
  
  return visited.size === cells.length;
}

/**
 * Génère une région connexe à partir d'une position de départ
 */
function generateConnectedRegion(
  startRow: number,
  startCol: number,
  targetSize: number,
  gridSize: number,
  usedCells: Set<string>
): Position[] {
  const region: Position[] = [];
  const queue: Position[] = [{ row: startRow, col: startCol }];
  const regionSet = new Set<string>();
  
  // Directions orthogonales : haut, bas, gauche, droite
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  
  while (queue.length > 0 && region.length < targetSize) {
    // Choisir aléatoirement dans la queue pour plus de variété
    const randomIndex = Math.floor(Math.random() * queue.length);
    const current = queue.splice(randomIndex, 1)[0];
    
    const key = `${current.row}-${current.col}`;
    
    if (usedCells.has(key) || regionSet.has(key)) {
      continue;
    }
    
    // Ajouter la cellule à la région
    region.push(current);
    regionSet.add(key);
    
    // Ajouter les voisins valides à la queue
    for (const [dr, dc] of directions) {
      const newRow = current.row + dr;
      const newCol = current.col + dc;
      const newKey = `${newRow}-${newCol}`;
      
      if (
        newRow >= 0 && newRow < gridSize &&
        newCol >= 0 && newCol < gridSize &&
        !usedCells.has(newKey) &&
        !regionSet.has(newKey)
      ) {
        // Éviter d'ajouter si déjà dans la queue
        const alreadyInQueue = queue.some(pos => pos.row === newRow && pos.col === newCol);
        if (!alreadyInQueue) {
          queue.push({ row: newRow, col: newCol });
        }
      }
    }
  }
  
  return region;
}

/**
 * Génère des régions connexes avec limitation des lignes complètes
 */
export function generateConnectedRegions(gridSize: number): ColoredRegion[] {
  console.log(`🎲 Generating connected regions for ${gridSize}×${gridSize} grid`);
  
  const regions: ColoredRegion[] = [];
  const usedCells = new Set<string>();
  const targetCellsPerRegion = gridSize;
  let fullLinesUsed = 0;
  const maxFullLines = 1; // Limiter à 1 ligne complète maximum
  
  for (let regionId = 0; regionId < gridSize; regionId++) {
    let regionCells: Position[] = [];
    let attempts = 0;
    const maxAttempts = 50;
    
    while (regionCells.length === 0 && attempts < maxAttempts) {
      attempts++;
      
      // Choisir une stratégie
      const useFullLine = fullLinesUsed < maxFullLines && Math.random() < 0.3; // 30% chance pour ligne complète
      
      if (useFullLine) {
        // Essayer de créer une ligne complète (horizontale ou verticale)
        const isHorizontal = Math.random() < 0.5;
        
        if (isHorizontal) {
          // Ligne horizontale
          for (let row = 0; row < gridSize; row++) {
            const lineCells: Position[] = [];
            let lineAvailable = true;
            
            for (let col = 0; col < gridSize; col++) {
              const key = `${row}-${col}`;
              if (usedCells.has(key)) {
                lineAvailable = false;
                break;
              }
              lineCells.push({ row, col });
            }
            
            if (lineAvailable) {
              regionCells = lineCells;
              fullLinesUsed++;
              console.log(`✅ Created horizontal line region ${regionId}`);
              break;
            }
          }
        } else {
          // Ligne verticale
          for (let col = 0; col < gridSize; col++) {
            const lineCells: Position[] = [];
            let lineAvailable = true;
            
            for (let row = 0; row < gridSize; row++) {
              const key = `${row}-${col}`;
              if (usedCells.has(key)) {
                lineAvailable = false;
                break;
              }
              lineCells.push({ row, col });
            }
            
            if (lineAvailable) {
              regionCells = lineCells;
              fullLinesUsed++;
              console.log(`✅ Created vertical line region ${regionId}`);
              break;
            }
          }
        }
      }
      
      // Si pas de ligne complète ou échec, créer une région connexe
      if (regionCells.length === 0) {
        // Trouver une cellule libre pour commencer
        let startRow = Math.floor(Math.random() * gridSize);
        let startCol = Math.floor(Math.random() * gridSize);
        
        // Chercher une cellule libre
        let foundStart = false;
        for (let attempts = 0; attempts < gridSize * gridSize; attempts++) {
          const key = `${startRow}-${startCol}`;
          if (!usedCells.has(key)) {
            foundStart = true;
            break;
          }
          startCol++;
          if (startCol >= gridSize) {
            startCol = 0;
            startRow++;
            if (startRow >= gridSize) {
              startRow = 0;
            }
          }
        }
        
        if (foundStart) {
          regionCells = generateConnectedRegion(startRow, startCol, targetCellsPerRegion, gridSize, usedCells);
          
          // Vérifier que la région est bien connexe
          if (regionCells.length > 0 && isRegionConnected(regionCells)) {
            console.log(`✅ Created connected region ${regionId} with ${regionCells.length} cells`);
          } else if (regionCells.length > 0) {
            console.log(`⚠️ Region ${regionId} not connected, retrying...`);
            regionCells = []; // Retry
          }
        }
      }
    }
    
    // Si on n'arrive pas à créer une région, remplir avec les cellules restantes
    if (regionCells.length === 0) {
      console.log(`🔧 Filling remaining cells for region ${regionId}`);
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const key = `${row}-${col}`;
          if (!usedCells.has(key) && regionCells.length < targetCellsPerRegion) {
            regionCells.push({ row, col });
          }
        }
      }
    }
    
    if (regionCells.length > 0) {
      const region: ColoredRegion = {
        id: regionId,
        color: Colors.regions[regionId % Colors.regions.length],
        cells: regionCells,
        hasQueen: false
      };
      
      regions.push(region);
      regionCells.forEach(cell => usedCells.add(`${cell.row}-${cell.col}`));
    }
  }
  
  console.log(`🏁 Generated ${regions.length} connected regions (${fullLinesUsed} full lines)`);
  return regions;
}

/**
 * Génère des régions colorées simples (fallback)
 */
export function generateColoredRegions(gridSize: number): ColoredRegion[] {
  console.log(`🎯 Generating fallback regions for ${gridSize}×${gridSize} grid`);
  
  const regions: ColoredRegion[] = [];
  
  // Chaque région est une rangée horizontale (solution simple qui marche toujours)
  for (let row = 0; row < gridSize; row++) {
    const region: ColoredRegion = {
      id: row,
      color: Colors.regions[row % Colors.regions.length],
      cells: [],
      hasQueen: false
    };
    
    for (let col = 0; col < gridSize; col++) {
      region.cells.push({ row, col });
    }
    
    regions.push(region);
  }
  
  return regions;
}

/**
 * Génère des régions avancées (utilise maintenant les régions connexes)
 */
export function generateAdvancedRegions(gridSize: number): ColoredRegion[] {
  return generateConnectedRegions(gridSize);
}

/**
 * Résolveur de puzzle avec backtracking
 */
export function solvePuzzle(regions: ColoredRegion[], gridSize: number): Position[] | null {
  console.log(`🧠 Solving puzzle with backtracking...`);
  
  const solution: Position[] = [];
  const usedRows = new Set<number>();
  const usedCols = new Set<number>();
  
  function isValidPlacement(pos: Position): boolean {
    // Vérifier rangée et colonne
    if (usedRows.has(pos.row) || usedCols.has(pos.col)) {
      return false;
    }
    
    // Vérifier qu'aucune reine n'est adjacente
    for (const placedPos of solution) {
      const rowDiff = Math.abs(pos.row - placedPos.row);
      const colDiff = Math.abs(pos.col - placedPos.col);
      if (rowDiff <= 1 && colDiff <= 1) {
        return false;
      }
    }
    
    return true;
  }
  
  function backtrack(regionIndex: number): boolean {
    if (regionIndex >= regions.length) {
      return true; // Solution trouvée
    }
    
    const region = regions[regionIndex];
    
    // Essayer chaque cellule de cette région
    for (const cell of region.cells) {
      if (isValidPlacement(cell)) {
        // Placer la reine
        solution.push(cell);
        usedRows.add(cell.row);
        usedCols.add(cell.col);
        
        // Continuer avec la région suivante
        if (backtrack(regionIndex + 1)) {
          return true;
        }
        
        // Backtrack
        solution.pop();
        usedRows.delete(cell.row);
        usedCols.delete(cell.col);
      }
    }
    
    return false;
  }
  
  const solved = backtrack(0);
  
  if (solved) {
    console.log(`✅ Puzzle solved! Solution found with ${solution.length} queens`);
    return solution;
  } else {
    console.log(`❌ No solution found for this configuration`);
    return null;
  }
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
 * Génère un niveau complet avec solution garantie
 */
export function generateLevel(gridSize: number) {
  console.log(`🎯 Generating solvable level for ${gridSize}×${gridSize} grid`);
  
  let regions: ColoredRegion[];
  let solution: Position[] | null = null;
  let attempts = 0;
  const maxAttempts = 10;
  
  // Essayer de générer un puzzle avec des régions connexes
  while (attempts < maxAttempts && !solution) {
    attempts++;
    console.log(`🔄 Attempt ${attempts}/${maxAttempts}`);
    
    if (attempts <= 7) {
      // Essayer des régions connexes
      regions = generateConnectedRegions(gridSize);
    } else {
      // Fallback vers des régions simples
      console.log(`🔧 Using fallback simple regions`);
      regions = generateColoredRegions(gridSize);
    }
    
    solution = solvePuzzle(regions, gridSize);
    
    if (solution) {
      console.log(`🎉 Generated solvable connected puzzle in ${attempts} attempts!`);
      break;
    }
  }
  
  // Si aucune solution n'est trouvée, utiliser les régions simples
  if (!solution) {
    console.log(`⚠️ Falling back to simple regions`);
    regions = generateColoredRegions(gridSize);
    solution = solvePuzzle(regions, gridSize);
  }
  
  const board = initializeBoard(gridSize, regions);
  
  // Stocker la solution pour référence
  const gameState = {
    board,
    regions,
    gridSize,
    queensPlaced: 0,
    queensRequired: gridSize,
    isCompleted: false,
    moveCount: 0,
    solution: solution || []
  };
  
  console.log(`📊 Level generated: ${regions.length} connected regions, solvable: ${solution ? 'YES' : 'NO'}`);
  
  return gameState;
}