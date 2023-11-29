import { useBoard } from "hooks/useBoard";
import "./board.css";
import Cell from "./Cell";

const Board = () => {
  const board = useBoard();

  return (
    <div className="board">
      {board.map(({ color, x, y, piece }) => (
        <Cell color={color} x={x} y={y} key={`${x}${y}`} piece={piece} />
      ))}
    </div>
  );
};

export default Board;
