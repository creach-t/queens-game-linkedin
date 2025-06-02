import { ColoredRegion, GameCell } from '../types/game';
import { Colors } from '../constants/Colors';

/**
 * Générateur de puzzles Queens avec backtracking
 * Crée des régions variées et trouve automatiquement une solution
 */

interface Position {
  row: number;
  col: number;
}

/**
 * Génère des régions de formes variées et intéressantes
 */
export function generateAdvancedRegions(gridSize: number): ColoredRegion[] {
  console.log(`🎲 Generating advanced regions for ${gridSize}×${gridSize} grid`);
  
  const regions: ColoredRegion[] = [];
  const usedCells = new Set<string>();
  const targetCellsPerRegion = gridSize; // Chaque région doit avoir exactement gridSize cellules
  
  // Formes de régions possibles
  const regionShapes = [
    'L_SHAPE',
    'RECTANGLE', 
    'DIAGONAL',
    'SPIRAL',
    'CROSS',
    'ZIGZAG'
  ];
  
  for (let regionId = 0; regionId < gridSize; regionId++) {
    const region: ColoredRegion = {
      id: regionId,
      color: Colors.regions[regionId % Colors.regions.length],
      cells: [],
      hasQueen: false
    };
    
    // Choisir une forme aléatoire pour cette région
    const shapeType = regionShapes[Math.floor(Math.random() * regionShapes.length)];
    const cells = generateRegionShape(gridSize, targetCellsPerRegion, usedCells, shapeType);
    
    region.cells = cells;
    cells.forEach(cell => usedCells.add(`${cell.row}-${cell.col}`));
    
    regions.push(region);
    console.log(`✅ Created region ${regionId} (${shapeType}) with ${cells.length} cells`);
  }
  
  // Si certaines cellules ne sont pas assignées, les ajouter à la dernière région
  const totalAssigned = regions.reduce((sum, region) => sum + region.cells.length, 0);
  const totalCells = gridSize * gridSize;
  
  if (totalAssigned < totalCells) {
    console.log(`🔧 Assigning remaining ${totalCells - totalAssigned} cells...`);
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cellKey = `${row}-${col}`;
        if (!usedCells.has(cellKey)) {
          regions[regions.length - 1].cells.push({ row, col });
        }
      }
    }
  }
  
  console.log(`🏁 Generated ${regions.length} regions with varied shapes`);
  return regions;
}

/**
 * Génère une forme de région spécifique
 */
function generateRegionShape(
  gridSize: number, 
  targetSize: number, 
  usedCells: Set<string>, 
  shapeType: string
): Position[] {
  const cells: Position[] = [];
  let attempts = 0;
  const maxAttempts = 100;
  
  while (cells.length < targetSize && attempts < maxAttempts) {
    attempts++;
    
    // Trouver une position de départ libre
    const startRow = Math.floor(Math.random() * gridSize);
    const startCol = Math.floor(Math.random() * gridSize);
    const startKey = `${startRow}-${startCol}`;
    
    if (usedCells.has(startKey)) continue;
    
    const shapeCells = generateShapeCells(startRow, startCol, gridSize, targetSize, shapeType, usedCells);
    
    if (shapeCells.length >= Math.min(targetSize, gridSize)) {
      return shapeCells.slice(0, targetSize);
    }
  }
  
  // Fallback: générer une forme simple si la forme complexe échoue
  return generateSimpleFallback(gridSize, targetSize, usedCells);
}

/**
 * Génère les cellules pour une forme spécifique
 */
function generateShapeCells(
  startRow: number, 
  startCol: number, 
  gridSize: number, 
  maxSize: number, 
  shapeType: string,
  usedCells: Set<string>
): Position[] {
  const cells: Position[] = [];
  const visited = new Set<string>();
  
  switch (shapeType) {
    case 'L_SHAPE':
      // Forme en L
      for (let i = 0; i < Math.min(maxSize, 4); i++) {
        addCellIfValid(cells, startRow, startCol + i, gridSize, usedCells, visited);
      }
      for (let i = 1; i < Math.min(maxSize - cells.length, 3); i++) {
        addCellIfValid(cells, startRow + i, startCol, gridSize, usedCells, visited);
      }
      break;
      
    case 'RECTANGLE':
      // Rectangle compact
      const width = Math.min(3, Math.ceil(Math.sqrt(maxSize)));
      const height = Math.ceil(maxSize / width);
      for (let r = 0; r < height && cells.length < maxSize; r++) {
        for (let c = 0; c < width && cells.length < maxSize; c++) {
          addCellIfValid(cells, startRow + r, startCol + c, gridSize, usedCells, visited);
        }
      }
      break;
      
    case 'DIAGONAL':
      // Ligne diagonale
      for (let i = 0; i < maxSize; i++) {
        addCellIfValid(cells, startRow + i, startCol + i, gridSize, usedCells, visited);
        if (cells.length >= maxSize) break;
        addCellIfValid(cells, startRow + i, startCol - i, gridSize, usedCells, visited);
      }
      break;
      
    case 'SPIRAL':
      // Spirale
      let dir = 0; // 0=right, 1=down, 2=left, 3=up
      let r = startRow, c = startCol;
      const directions = [[0,1], [1,0], [0,-1], [-1,0]];
      
      for (let i = 0; i < maxSize; i++) {
        addCellIfValid(cells, r, c, gridSize, usedCells, visited);
        
        const [dr, dc] = directions[dir];
        const nextR = r + dr;
        const nextC = c + dc;
        
        if (nextR < 0 || nextR >= gridSize || nextC < 0 || nextC >= gridSize || 
            visited.has(`${nextR}-${nextC}`)) {
          dir = (dir + 1) % 4;
        }
        
        const [newDr, newDc] = directions[dir];
        r += newDr;
        c += newDc;
      }
      break;
      
    default:
      // Forme simple par défaut
      return generateSimpleFallback(gridSize, maxSize, usedCells);
  }
  
  return cells;
}

/**
 * Ajoute une cellule si elle est valide
 */
function addCellIfValid(
  cells: Position[], 
  row: number, 
  col: number, 
  gridSize: number, 
  usedCells: Set<string>,
  visited: Set<string>
): boolean {
  if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
    const key = `${row}-${col}`;
    if (!usedCells.has(key) && !visited.has(key)) {
      cells.push({ row, col });
      visited.add(key);
      return true;
    }
  }
  return false;
}

/**
 * Générateur de fallback simple
 */
function generateSimpleFallback(gridSize: number, targetSize: number, usedCells: Set<string>): Position[] {
  const cells: Position[] = [];
  
  for (let row = 0; row < gridSize && cells.length < targetSize; row++) {
    for (let col = 0; col < gridSize && cells.length < targetSize; col++) {
      const key = `${row}-${col}`;
      if (!usedCells.has(key)) {
        cells.push({ row, col });
      }
    }
  }
  
  return cells;
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
  
  // Essayer de générer un puzzle avec des régions avancées
  while (attempts < maxAttempts && !solution) {
    attempts++;
    console.log(`🔄 Attempt ${attempts}/${maxAttempts}`);
    
    if (attempts <= 7) {
      // Essayer des régions avancées
      regions = generateAdvancedRegions(gridSize);
    } else {
      // Fallback vers des régions simples
      console.log(`🔧 Using fallback simple regions`);
      regions = generateColoredRegions(gridSize);
    }
    
    solution = solvePuzzle(regions, gridSize);
    
    if (solution) {
      console.log(`🎉 Generated solvable puzzle in ${attempts} attempts!`);
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
  
  // Stocker la solution pour référence (utile pour les hints futures)
  const gameState = {
    board,
    regions,
    gridSize,
    queensPlaced: 0,
    queensRequired: gridSize,
    isCompleted: false,
    moveCount: 0,
    solution: solution || [] // Ajouter la solution au game state
  };
  
  console.log(`📊 Level generated: ${regions.length} regions, solvable: ${solution ? 'YES' : 'NO'}`);
  
  return gameState;
}