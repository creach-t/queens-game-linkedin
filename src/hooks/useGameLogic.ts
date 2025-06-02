import { useState, useCallback } from 'react';
import { GameState, ColoredRegion } from '../types/game';
import { generateLevel } from '../utils/levelGenerator';
import { validateQueenPlacement, isPuzzleCompleted, updateConflicts } from '../utils/gameValidation';
import * as Haptics from 'expo-haptics';

export const useGameLogic = (initialGridSize: number = 6) => {
  const [gameState, setGameState] = useState<GameState>(() => 
    generateLevel(initialGridSize)
  );
  const [lastTapTime, setLastTapTime] = useState<{[key: string]: number}>({});
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const DOUBLE_TAP_DELAY = 300; // ms
  const MAX_HINTS = 3; // Limite d'indices par puzzle

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
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
          // Vérifier si on peut placer une reine
          const validation = validateQueenPlacement(prevState.board, prevState.regions, row, col);
          if (validation.isValid) {
            newState = 'queen';
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          } else {
            // Placement invalide, vibration d'erreur
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
      
      if (isCompleted) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

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

  const handleHint = useCallback(() => {
    if (hintsUsed >= MAX_HINTS || !gameState.solution || gameState.isCompleted) {
      return;
    }

    setGameState(prevState => {
      // Trouver une position de la solution qui n'a pas encore de reine
      const availableHints = prevState.solution?.filter(solutionPos => {
        const cell = prevState.board[solutionPos.row][solutionPos.col];
        return cell.state !== 'queen';
      }) || [];

      if (availableHints.length === 0) {
        return prevState; // Pas d'indice disponible
      }

      // Choisir un indice aléatoire parmi les disponibles
      const hintIndex = Math.floor(Math.random() * availableHints.length);
      const hintPos = availableHints[hintIndex];

      // Mettre en évidence la cellule pendant 3 secondes
      const newBoard = prevState.board.map(row => 
        row.map(cell => ({
          ...cell,
          isHighlighted: cell.row === hintPos.row && cell.col === hintPos.col
        }))
      );

      // Retirer le highlight après 3 secondes
      setTimeout(() => {
        setGameState(currentState => ({
          ...currentState,
          board: currentState.board.map(row => 
            row.map(cell => ({ ...cell, isHighlighted: false }))
          )
        }));
      }, 3000);

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      return {
        ...prevState,
        board: newBoard
      };
    });

    setHintsUsed(prev => prev + 1);
  }, [gameState.solution, gameState.isCompleted, hintsUsed]);

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
    setHintsUsed(0); // Reset hints counter
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const newGame = useCallback((gridSize?: number) => {
    console.log(`🎯 Generating new game with size ${gridSize || gameState.gridSize}`);
    const newGameState = generateLevel(gridSize || gameState.gridSize);
    setGameState(newGameState);
    setLastTapTime({});
    setHintsUsed(0); // Reset hints for new game
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [gameState.gridSize]);

  const hasHintAvailable = hintsUsed < MAX_HINTS && gameState.solution && !gameState.isCompleted;

  return {
    gameState,
    handleCellPress,
    handleHint,
    resetGame,
    newGame,
    hasHintAvailable,
    hintsUsed,
    maxHints: MAX_HINTS
  };
};