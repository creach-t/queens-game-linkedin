import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface GameControlsProps {
  onReset: () => void;
  onNewGame: () => void;
  onHint: () => void;
  queensPlaced: number;
  queensRequired: number;
  moveCount: number;
  isCompleted: boolean;
  hasHint: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onReset,
  onNewGame,
  onHint,
  queensPlaced,
  queensRequired,
  moveCount,
  isCompleted,
  hasHint
}) => {
  return (
    <View style={styles.container}>
      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Reines</Text>
          <Text style={styles.statValue}>{queensPlaced}/{queensRequired}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Mouvements</Text>
          <Text style={styles.statValue}>{moveCount}</Text>
        </View>
      </View>

      {/* Status */}
      {isCompleted && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>🎉 Puzzle Résolu ! 🎉</Text>
        </View>
      )}

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={onReset}>
          <Text style={styles.buttonText}>🔄 Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, hasHint ? styles.hintButton : styles.disabledButton]} 
          onPress={hasHint ? onHint : undefined}
          disabled={!hasHint || isCompleted}
        >
          <Text style={[styles.buttonText, hasHint ? styles.hintButtonText : styles.disabledButtonText]}>
            💡 Indice
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={onNewGame}
        >
          <Text style={[styles.buttonText, styles.primaryButtonText]}>🎯 Nouveau</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionText}>• Tap simple: marqueur ✗</Text>
        <Text style={styles.instructionText}>• Double-tap: reine 👑</Text>
        <Text style={styles.instructionText}>• Une reine par rangée, colonne et région colorée</Text>
        <Text style={styles.instructionText}>• Les reines ne peuvent pas se toucher</Text>
        <Text style={styles.instructionText}>• Indice: révèle une position de reine valide</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  successContainer: {
    backgroundColor: Colors.success,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  successText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.linkedinBlue,
    flex: 0.3,
  },
  primaryButton: {
    backgroundColor: Colors.linkedinBlue,
  },
  hintButton: {
    backgroundColor: '#FFA500', // Orange pour les hints
    borderColor: '#FF8C00',
  },
  disabledButton: {
    backgroundColor: '#F0F0F0',
    borderColor: '#CCCCCC',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: Colors.linkedinBlue,
  },
  primaryButtonText: {
    color: 'white',
  },
  hintButtonText: {
    color: 'white',
  },
  disabledButtonText: {
    color: '#999999',
  },
  instructionsContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 15,
  },
  instructionText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 3,
  },
});

export default GameControls;