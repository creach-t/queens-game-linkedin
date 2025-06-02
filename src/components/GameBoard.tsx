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
  const cellSize = Math.floor(maxBoardSize / gameState.gridSize) - 1;

  const getRegionBorderColor = (regionId: number): string => {
    return Colors.regionBorders[regionId % Colors.regionBorders.length];
  };

  return (
    <View style={styles.container}>
      <View style={[styles.board, { width: maxBoardSize, height: maxBoardSize }]}>
        {gameState.board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              cellSize={cellSize}
              onPress={onCellPress}
              regionBorderColor={getRegionBorderColor(cell.regionId)}
            />
          ))
        )}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default GameBoard;