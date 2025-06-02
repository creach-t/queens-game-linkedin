import React from 'react';
import { ScrollView, View, StyleSheet, Text, SafeAreaView } from 'react-native';
import GameBoard from '../components/GameBoard';
import GameControls from '../components/GameControls';
import { useGameLogic } from '../hooks/useGameLogic';
import { Colors } from '../constants/Colors';
import { GridSizes, GridDifficulty } from '../constants/GridSizes';

const GameScreen: React.FC = () => {
  const { gameState, handleCellPress, resetGame, newGame } = useGameLogic(GridSizes.BEGINNER);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Queens Game</Text>
          <Text style={styles.subtitle}>
            {GridDifficulty[gameState.gridSize as keyof typeof GridDifficulty]} • {gameState.gridSize}×{gameState.gridSize}
          </Text>
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
          queensPlaced={gameState.queensPlaced}
          queensRequired={gameState.queensRequired}
          moveCount={gameState.moveCount}
          isCompleted={gameState.isCompleted}
        />
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
});

export default GameScreen;