import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { Monster, Position, TileType } from '../types';

interface GridMapProps {
  grid: TileType[][];
  playerPos: Position;
  monsters: Monster[];
}

export const GridMap: React.FC<GridMapProps> = ({ grid, playerPos, monsters }) => {
  const { width } = useWindowDimensions();
  
  // Tamaño óptimo de celda para ajustarse al ancho de pantalla
  const maxMapWidth = Math.min(width - 32, 380);
  const cellSize = Math.floor(maxMapWidth / grid.length);

  const getTileStyle = (type: TileType) => {
    switch (type) {
      case 1:
        return styles.wallTile;
      case 2:
        return styles.waterTile;
      case 0:
      default:
        return styles.grassTile;
    }
  };

  const getTileBackgroundIcon = (type: TileType) => {
    switch (type) {
      case 1:
        return '🌲';
      case 2:
        return '🌊';
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { width: cellSize * grid.length }]}>
      {grid.map((row, y) => (
        <View key={`row-${y}`} style={styles.row}>
          {row.map((tileType, x) => {
            const isPlayerHere = playerPos.x === x && playerPos.y === y;
            const monsterHere = monsters.find((m) => !m.capturado && m.pos.x === x && m.pos.y === y);
            const tileIcon = getTileBackgroundIcon(tileType);

            return (
              <View
                key={`cell-${x}-${y}`}
                style={[
                  styles.cell,
                  getTileStyle(tileType),
                  { width: cellSize, height: cellSize },
                ]}
              >
                {/* Ícono de fondo para obstáculos (árboles / agua) */}
                {tileIcon && !isPlayerHere && !monsterHere && (
                  <Text style={[styles.tileIcon, { fontSize: cellSize * 0.45 }]}>
                    {tileIcon}
                  </Text>
                )}

                {/* Monstruo si está en esta celda y no fue capturado */}
                {monsterHere && !isPlayerHere && (
                  <Text style={[styles.sprite, { fontSize: cellSize * 0.55 }]}>
                    {monsterHere.emoji}
                  </Text>
                )}

                {/* Jugador */}
                {isPlayerHere && (
                  <View style={styles.playerWrapper}>
                    <Text style={[styles.sprite, { fontSize: cellSize * 0.6 }]}>
                      🧑‍🌾
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: '#334155',
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#86efac',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  grassTile: {
    backgroundColor: '#86efac', // Verde pasto
  },
  wallTile: {
    backgroundColor: '#15803d', // Verde oscuro árbol/bosque
  },
  waterTile: {
    backgroundColor: '#38bdf8', // Azul agua
  },
  tileIcon: {
    opacity: 0.7,
  },
  sprite: {
    textAlign: 'center',
  },
  playerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
