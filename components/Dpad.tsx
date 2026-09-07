import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

interface DpadProps {
  onMove: (dx: number, dy: number) => void;
  disabled?: boolean;
}

export const Dpad: React.FC<DpadProps> = ({ onMove, disabled = false }) => {
  return (
    <View style={styles.dpadContainer}>
      {/* Fila Superior */}
      <View style={styles.row}>
        <View style={styles.emptySlot} />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            disabled && styles.buttonDisabled,
          ]}
          onPress={() => onMove(0, -1)}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>▲</Text>
        </Pressable>
        <View style={styles.emptySlot} />
      </View>

      {/* Fila Central */}
      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            disabled && styles.buttonDisabled,
          ]}
          onPress={() => onMove(-1, 0)}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>◀</Text>
        </Pressable>
        <View style={styles.centerSlot}>
          <Text style={styles.centerDot}>•</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            disabled && styles.buttonDisabled,
          ]}
          onPress={() => onMove(1, 0)}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>▶</Text>
        </Pressable>
      </View>

      {/* Fila Inferior */}
      <View style={styles.row}>
        <View style={styles.emptySlot} />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            disabled && styles.buttonDisabled,
          ]}
          onPress={() => onMove(0, 1)}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>▼</Text>
        </Pressable>
        <View style={styles.emptySlot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dpadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 54,
    height: 54,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    margin: 4,
    borderWidth: 2,
    borderColor: '#1e293b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: '#475569',
    transform: [{ scale: 0.94 }],
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: 'bold',
  },
  emptySlot: {
    width: 54,
    height: 54,
    margin: 4,
  },
  centerSlot: {
    width: 54,
    height: 54,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerDot: {
    color: '#94a3b8',
    fontSize: 18,
  },
});
