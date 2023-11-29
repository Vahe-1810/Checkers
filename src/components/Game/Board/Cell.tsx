import { ICell } from "types/interfaces";
import Piece from "./Piece";

const Cell = ({ color, piece }: ICell) => {
  return (
    <div className="cell" style={{ background: color === "BLACK" ? "#d18b47" : "#ffce9e" }}>
      {piece && <Piece src={piece} />}
    </div>
  );
};

export default Cell;
