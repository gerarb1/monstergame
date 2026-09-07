import { Monster, Position, TileType } from '../types';

// Tamaño del grid: 10 x 10
export const GRID_SIZE = 10;

// 0 = pasto, 1 = pared/árbol, 2 = agua
export const MAP_GRID: TileType[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 2, 2, 0, 1],
  [1, 0, 1, 0, 0, 0, 2, 2, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 2, 2, 0, 0, 0, 0, 0, 1],
  [1, 0, 2, 2, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const INITIAL_PLAYER_POS: Position = { x: 1, y: 1 };

export const INITIAL_MONSTERS: Monster[] = [
  { id: 1, nombre: 'Slime', emoji: '👾', pos: { x: 3, y: 1 }, capturado: false },
  { id: 2, nombre: 'Fantasmita', emoji: '👻', pos: { x: 7, y: 1 }, capturado: false },
  { id: 3, nombre: 'Murciélago', emoji: '🦇', pos: { x: 4, y: 4 }, capturado: false },
  { id: 4, nombre: 'Zorrito', emoji: '🦊', pos: { x: 1, y: 6 }, capturado: false },
  { id: 5, nombre: 'Dragón', emoji: '🐲', pos: { x: 8, y: 7 }, capturado: false },
  { id: 6, nombre: 'Unicornio', emoji: '🦄', pos: { x: 3, y: 8 }, capturado: false },
];
