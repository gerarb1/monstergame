import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { Monster } from '../types';

interface CatchButtonProps {
  targetMonster: Monster | null;
  onCatch: () => void;
}

export const CatchButton: React.FC<CatchButtonProps> = ({
  targetMonster,
  onCatch,
}) => {
  if (!targetMonster) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>
          Ponte al lado de un monstruo para atraparlo
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onCatch}
      >
        <Text style={styles.buttonText}>
          🎯 ¡Atrapar a {targetMonster.nombre} {targetMonster.emoji}!
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  placeholderContainer: {
    paddingHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#64748b',
    fontSize: 13,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#e11d48',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#be123c',
    elevation: 4,
    shadowColor: '#e11d48',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttonPressed: {
    backgroundColor: '#be123c',
    transform: [{ scale: 0.96 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
});
