import { Color } from "types/interfaces";
import Board from "./Board/Board";
import "./game.css";
import { useState } from "react";

const Game = () => {
  const [turn, setTurn] = useState(Color.WHITE);

  const move = () => {
    if (turn === Color.WHITE) setTurn(Color.BLACK);
    else setTurn(Color.WHITE);
  };

  return (
    <div className="game">
      <Board />
    </div>
  );
};

export default Game;
