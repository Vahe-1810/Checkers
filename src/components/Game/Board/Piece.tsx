import { IPiece } from "types/interfaces";
import { useContext } from "react";
import { TurnContext } from "../Game";
import { MovesContext } from "./Board";

const Piece = (piece: Required<IPiece>) => {
  const { color, src } = piece;
  const getMoves = useContext(MovesContext)!.getMoves;
  const turnState = useContext(TurnContext);
  const canMove = turnState?.turn === color;

  const showMoves = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!canMove) return;
    getMoves(piece);
  };

  return <div className="piece" onClick={showMoves} style={{ backgroundImage: `url(${src})` }} />;
};

export default Piece;
