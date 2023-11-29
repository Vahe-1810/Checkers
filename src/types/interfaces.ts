export interface ICell {
  x: number;
  y: number;
  color: Color;
  piece?: string;
}

export type IBoard = ICell[];

export enum Color {
  WHITE = "WHITE",
  BLACK = "BLACK",
}
