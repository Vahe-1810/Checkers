import { useBoard } from "hooks/useBoard";
import Cell from "./Cell";
import "./board.css";
import { createContext } from "react";
import { BoardHookActions } from "types/interfaces";

export const MovesContext = createContext<null | BoardHookActions>(null);

const Board = () => {
  const { currentBoard, getMoves, makeMove } = useBoard();

  return (
    <MovesContext.Provider value={{ getMoves, currentBoard, makeMove }}>
      <div className="board">
        {currentBoard.map(({ color, x, y, piece, canMove }) => (
          <Cell color={color} x={x} y={y} key={`${x}${y}`} piece={piece} canMove={canMove} />
        ))}
      </div>
    </MovesContext.Provider>
  );
};

export default Board;
