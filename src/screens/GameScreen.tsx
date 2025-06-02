import React from 'react';
import { ScrollView, View, StyleSheet, Text, SafeAreaView } from 'react-native';
import GameBoard from '../components/GameBoard';
import GameControls from '../components/GameControls';
import { useGameLogic } from '../hooks/useGameLogic';
import { Colors } from '../constants/Colors';
import { GridSizes, GridDifficulty } from '../constants/GridSizes';

const GameScreen: React.FC = () => {
  const { 
    gameState, 
    handleCellPress, 
    handleHint,
    resetGame, 
    newGame,
    hasHintAvailable,
    hintsUsed,
    maxHints
  } = useGameLogic(GridSizes.BEGINNER);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Queens Game</Text>
          <Text style={styles.subtitle}>
            {GridDifficulty[gameState.gridSize as keyof typeof GridDifficulty]} • {gameState.gridSize}×{gameState.gridSize}
          </Text>
          {gameState.solution && (
            <Text style={styles.hintInfo}>
              💡 Indices: {hintsUsed}/{maxHints} utilisés
            </Text>
          )}
        </View>

        {/* Game Board */}
        <GameBoard 
          gameState={gameState} 
          onCellPress={handleCellPress} 
        />

        {/* Game Controls */}
        <GameControls
          onReset={resetGame}
          onNewGame={() => newGame()}
          onHint={handleHint}
          queensPlaced={gameState.queensPlaced}
          queensRequired={gameState.queensRequired}
          moveCount={gameState.moveCount}
          isCompleted={gameState.isCompleted}
          hasHint={hasHintAvailable}
        />

        {/* Debug Info (temporaire)
        {__DEV__ && gameState.solution && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugTitle}>🔍 Debug - Solution:</Text>
            <Text style={styles.debugText}>
              {gameState.solution.map(pos => `(${pos.row},${pos.col})`).join(' | ')}
            </Text>
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: Colors.linkedinBlue,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  hintInfo: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    marginTop: 5,
  },
  debugContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FFE4E1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 5,
  },
  debugText: {
    fontSize: 12,
    color: '#D32F2F',
    fontFamily: 'monospace',
  },
});

export default GameScreen;