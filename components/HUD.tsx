import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Monster } from '../types';

interface HUDProps {
  capturedCount: number;
  totalMonsters: number;
  monsters: Monster[];
}

export const HUD: React.FC<HUDProps> = ({
  capturedCount,
  totalMonsters,
  monsters,
}) => {
  const capturedList = monsters.filter((m) => m.capturado);

  return (
    <View style={styles.container}>
      {/* Barra superior con contador */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Mini Monstruos 🗺️</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Atrapados: {capturedCount} / {totalMonsters}
          </Text>
        </View>
      </View>

      {/* Mini inventario de monstruos atrapados */}
      <View style={styles.inventoryContainer}>
        <Text style={styles.inventoryLabel}>Colección:</Text>
        {capturedList.length === 0 ? (
          <Text style={styles.emptyText}>Explora el mapa y acércate a una criatura</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {capturedList.map((monster) => (
              <View key={monster.id} style={styles.monsterChip}>
                <Text style={styles.chipEmoji}>{monster.emoji}</Text>
                <Text style={styles.chipName}>{monster.nombre}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  badge: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  inventoryContainer: {
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  inventoryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  monsterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginRight: 6,
  },
  chipEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  chipName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
});
