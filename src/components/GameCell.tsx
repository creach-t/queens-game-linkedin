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
    borderWidth: 2, // Augmenté de 1 à 2 pour plus de visibilité
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  cellContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  queenText: {
    fontSize: 18, 
    textAlign: 'center',
  },
  markerText: {
    fontSize: 14,
    color: Colors.marker,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlighted: {
    backgroundColor: Colors.highlight,
    borderWidth: 3, // Bordure encore plus épaisse pour le highlight
  },
  conflict: {
    backgroundColor: Colors.conflict,
    opacity: 0.8,
  },
});

export default GameCell;