export interface ICell {
  x: number;
  y: number;
  color: ColorType;
  piece?: IPiece;
  canMove: boolean;
}

export type ColorType = "WHITE" | "BLACK";

export interface IPiece {
  x: number;
  y: number;
  src: string;
  color: ColorType;
}

export type IBoard = ICell[];

export enum Color {
  WHITE = "WHITE",
  BLACK = "BLACK",
}

export interface BoardHookActions {
  currentBoard: IBoard;
  getMoves: (piece: Required<IPiece>) => void;
  makeMove: (cell: ICell) => void;
}
