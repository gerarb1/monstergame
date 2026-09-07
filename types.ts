export interface Position {
  x: number;
  y: number;
}

export type TileType = 0 | 1 | 2; // 0 = pasto, 1 = pared/árbol, 2 = agua

export interface Monster {
  id: number;
  nombre: string;
  emoji: string;
  pos: Position;
  capturado: boolean;
}

export interface PlayerState {
  pos: Position;
  monstruosAtrapados: Monster[];
}
