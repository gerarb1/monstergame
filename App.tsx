import React, { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { Monster, Position } from './types';
import {
  MAP_GRID,
  INITIAL_PLAYER_POS,
  INITIAL_MONSTERS,
} from './constants/gameData';
import { GridMap } from './components/GridMap';
import { Dpad } from './components/Dpad';
import { HUD } from './components/HUD';
import { CatchButton } from './components/CatchButton';
import { VictoryModal } from './components/VictoryModal';

export default function App() {
  const [playerPos, setPlayerPos] = useState<Position>(INITIAL_PLAYER_POS);
  const [monsters, setMonsters] = useState<Monster[]>(INITIAL_MONSTERS);

  // Cantidad de monstruos capturados
  const capturedCount = useMemo(
    () => monsters.filter((m) => m.capturado).length,
    [monsters]
  );

  // Comprobar condición de victoria (todos atrapados)
  const isGameWon = useMemo(
    () => monsters.length > 0 && monsters.every((m) => m.capturado),
    [monsters]
  );

  // Buscar si hay algún monstruo no capturado adyacente (Manhattan distance = 1)
  const adjacentMonster = useMemo(() => {
    return (
      monsters.find(
        (m) =>
          !m.capturado &&
          Math.abs(m.pos.x - playerPos.x) + Math.abs(m.pos.y - playerPos.y) === 1
      ) || null
    );
  }, [monsters, playerPos]);

  // Movimiento del jugador con validación de límites, paredes, agua y monstruos
  const handleMove = (dx: number, dy: number) => {
    const targetX = playerPos.x + dx;
    const targetY = playerPos.y + dy;

    // 1. Validar límites de la matriz
    if (
      targetY < 0 ||
      targetY >= MAP_GRID.length ||
      targetX < 0 ||
      targetX >= MAP_GRID[0].length
    ) {
      return;
    }

    // 2. Validar que no sea pared (1) ni agua (2)
    const targetTile = MAP_GRID[targetY][targetX];
    if (targetTile === 1 || targetTile === 2) {
      return;
    }

    // 3. Validar que la casilla no esté ocupada por un monstruo vivo
    const hasMonster = monsters.some(
      (m) => !m.capturado && m.pos.x === targetX && m.pos.y === targetY
    );
    if (hasMonster) {
      return;
    }

    // Movimiento válido
    setPlayerPos({ x: targetX, y: targetY });
  };

  // Capturar monstruo adyacente (éxito garantizado)
  const handleCatch = () => {
    if (!adjacentMonster) return;

    setMonsters((prevMonsters) =>
      prevMonsters.map((m) =>
        m.id === adjacentMonster.id ? { ...m, capturado: true } : m
      )
    );
  };

  // Reiniciar juego al estado inicial
  const handleRestart = () => {
    setPlayerPos(INITIAL_PLAYER_POS);
    setMonsters(INITIAL_MONSTERS);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          {/* HUD superior e inventario */}
          <HUD
            capturedCount={capturedCount}
            totalMonsters={monsters.length}
            monsters={monsters}
          />

          {/* Mapa central con grid estático */}
          <View style={styles.mapWrapper}>
            <GridMap
              grid={MAP_GRID}
              playerPos={playerPos}
              monsters={monsters}
            />
          </View>

          {/* Botón contextual de captura */}
          <CatchButton
            targetMonster={adjacentMonster}
            onCatch={handleCatch}
          />

          {/* Controles táctiles D-Pad */}
          <View style={styles.controlsWrapper}>
            <Dpad onMove={handleMove} disabled={isGameWon} />
          </View>

          {/* Pantalla / Modal de Victoria */}
          <VictoryModal
            visible={isGameWon}
            onRestart={handleRestart}
            totalMonsters={monsters.length}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  mapWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  controlsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
