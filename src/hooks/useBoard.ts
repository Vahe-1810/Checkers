import { Color, IBoard } from "types/interfaces";
import blackPiece from "assets/black-piece.png";
import whitePiece from "assets/white-piece.png";

export const useBoard = (board?: IBoard): IBoard => {
  const matrix: IBoard = [];

  if (!board) {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const color = (x + y) % 2 ? Color.BLACK : Color.WHITE;
        const canBeWhitePiece = x > 4 && color === Color.BLACK && whitePiece;
        const canBeBlackPiece = x < 3 && color === Color.BLACK && blackPiece;

        const piece = canBeWhitePiece || canBeBlackPiece || undefined;

        matrix.push({ x, y, color, piece });
      }
    }
  }

  return matrix;
};
