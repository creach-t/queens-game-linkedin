import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { GameCell as GameCellType } from '../types/game';
import { Colors } from '../constants/Colors';

interface GameCellProps {
  cell: GameCellType;
  cellSize: number;
  onPress: (row: number, col: number) => void;
  regionBorderColor: string;
}

const GameCell: React.FC<GameCellProps> = ({ 
  cell, 
  cellSize, 
  onPress, 
  regionBorderColor 
}) => {
  const handlePress = () => {
    onPress(cell.row, cell.col);
  };

  const getCellContent = () => {
    switch (cell.state) {
      case 'queen':
        return <Text style={styles.queenText}>👑</Text>;
      case 'marker':
        return <Text style={styles.markerText}>✕</Text>;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          width: cellSize,
          height: cellSize,
          backgroundColor: cell.regionColor,
          borderColor: regionBorderColor,
        },
        cell.isHighlighted && styles.highlighted,
        cell.isConflict && styles.conflict,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cellContent}>
        {getCellContent()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5,
  },
  cellContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  queenText: {
    fontSize: 20,
    textAlign: 'center',
  },
  markerText: {
    fontSize: 16,
    color: Colors.marker,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlighted: {
    backgroundColor: Colors.highlight,
  },
  conflict: {
    backgroundColor: Colors.conflict,
    opacity: 0.8,
  },
});

export default GameCell;