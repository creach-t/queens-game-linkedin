import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import GameCell from './GameCell';
import { GameState } from '../types/game';
import { Colors } from '../constants/Colors';

interface GameBoardProps {
  gameState: GameState;
  onCellPress: (row: number, col: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, onCellPress }) => {
  const screenWidth = Dimensions.get('window').width;
  const boardPadding = 20;
  const maxBoardSize = screenWidth - (boardPadding * 2);
  
  // Calcul plus précis pour avoir une grille parfaitement carrée
  const cellSize = Math.floor((maxBoardSize - 16) / gameState.gridSize); // -16 pour le padding du conteneur
  const actualBoardSize = cellSize * gameState.gridSize;

  const getRegionBorderColor = (regionId: number): string => {
    return Colors.regionBorders[regionId % Colors.regionBorders.length];
  };

  // Debug: vérifier les dimensions
  console.log(`🔍 Debug GameBoard: gridSize=${gameState.gridSize}, board dimensions=${gameState.board.length}x${gameState.board[0]?.length}`);

  return (
    <View style={styles.container}>
      <View style={[
        styles.board, 
        { 
          width: actualBoardSize, 
          height: actualBoardSize 
        }
      ]}>
        {/* Rendu rangée par rangée pour éviter les problèmes de flexWrap */}
        {gameState.board.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((cell, colIndex) => (
              <GameCell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                cellSize={cellSize}
                onPress={onCellPress}
                regionBorderColor={getRegionBorderColor(cell.regionId)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  board: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: Colors.cardBackground,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
  },
});

export default GameBoard;