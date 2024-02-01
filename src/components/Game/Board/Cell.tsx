import { ICell } from "types/interfaces";
import Piece from "./Piece";
import { useContext } from "react";
import { MovesContext } from "./Board";

const Cell = (cell: ICell) => {
  const { color, piece, x, y, canMove } = cell;
  const makeMove = useContext(MovesContext)!.makeMove;

  const move = () => {
    makeMove(cell);
  };

  return (
    <div
      className="cell"
      style={{ background: canMove ? "green" : color === "BLACK" ? "#d18b47" : "#ffce9e" }}
      onClick={move}
    >
      {piece && <Piece src={piece.src} x={x} y={y} color={piece.color} />}
    </div>
  );
};

export default Cell;
