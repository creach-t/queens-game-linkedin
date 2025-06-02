import { useState, useCallback } from 'react';
import { GameState, ColoredRegion } from '../types/game';
import { generateLevel } from '../utils/levelGenerator';
import { validateQueenPlacement, isPuzzleCompleted, updateConflicts } from '../utils/gameValidation';

export const useGameLogic = (initialGridSize: number = 6) => {
  const [gameState, setGameState] = useState<GameState>(() => 
    generateLevel(initialGridSize)
  );
  const [lastTapTime, setLastTapTime] = useState<{[key: string]: number}>({});
  const DOUBLE_TAP_DELAY = 300; // ms

  const updateRegions = useCallback((board: GameState['board'], regions: ColoredRegion[]) => {
    return regions.map(region => {
      const queensInRegion = region.cells.filter(cell => 
        board[cell.row][cell.col].state === 'queen'
      );
      
      return {
        ...region,
        hasQueen: queensInRegion.length > 0,
        queenPosition: queensInRegion.length > 0 ? queensInRegion[0] : undefined
      };
    });
  }, []);

  const handleCellPress = useCallback((row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    const now = Date.now();
    const lastTap = lastTapTime[cellKey] || 0;
    const isDoubleTap = now - lastTap < DOUBLE_TAP_DELAY;

    setLastTapTime(prev => ({ ...prev, [cellKey]: now }));

    setGameState(prevState => {
      const currentCell = prevState.board[row][col];
      let newState = currentCell.state;
      let newBoard = [...prevState.board];
      
      if (isDoubleTap) {
        // Double tap: placer/retirer une reine
        if (currentCell.state === 'queen') {
          newState = 'empty';
          // TODO: Add haptics when expo-haptics is available
        } else {
          // Vérifier si on peut placer une reine
          const validation = validateQueenPlacement(prevState.board, prevState.regions, row, col);
          if (validation.isValid) {
            newState = 'queen';
            // TODO: Add haptics when expo-haptics is available
          } else {
            // Placement invalide
            return prevState; // Pas de changement
          }
        }
      } else {
        // Simple tap: placer/retirer un marqueur
        if (currentCell.state === 'marker') {
          newState = 'empty';
        } else if (currentCell.state === 'empty') {
          newState = 'marker';
        }
        // Si c'est une reine, ne rien faire sur simple tap
        if (currentCell.state === 'queen') {
          return prevState;
        }
      }

      // Mettre à jour la cellule
      newBoard[row] = [...newBoard[row]];
      newBoard[row][col] = {
        ...currentCell,
        state: newState
      };

      // Mettre à jour les régions
      const updatedRegions = updateRegions(newBoard, prevState.regions);
      
      // Mettre à jour les conflits
      newBoard = updateConflicts(newBoard, updatedRegions);
      
      // Compter les reines
      const queensPlaced = newBoard.flat().filter(cell => cell.state === 'queen').length;
      
      // Vérifier si le puzzle est complété
      const isCompleted = isPuzzleCompleted(newBoard, updatedRegions);

      return {
        ...prevState,
        board: newBoard,
        regions: updatedRegions,
        queensPlaced,
        isCompleted,
        moveCount: prevState.moveCount + 1
      };
    });
  }, [lastTapTime, updateRegions]);

  const resetGame = useCallback(() => {
    setGameState(prevState => {
      const resetBoard = prevState.board.map(row => 
        row.map(cell => ({
          ...cell,
          state: 'empty' as const,
          isConflict: false,
          isHighlighted: false
        }))
      );
      
      const resetRegions = prevState.regions.map(region => ({
        ...region,
        hasQueen: false,
        queenPosition: undefined
      }));

      return {
        ...prevState,
        board: resetBoard,
        regions: resetRegions,
        queensPlaced: 0,
        isCompleted: false,
        moveCount: 0
      };
    });
    
    setLastTapTime({});
  }, []);

  const newGame = useCallback((gridSize?: number) => {
    const newGameState = generateLevel(gridSize || gameState.gridSize);
    setGameState(newGameState);
    setLastTapTime({});
  }, [gameState.gridSize]);

  return {
    gameState,
    handleCellPress,
    resetGame,
    newGame
  };
};