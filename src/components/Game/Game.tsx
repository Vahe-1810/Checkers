import { Color, ColorType } from "types/interfaces";
import Board from "./Board/Board";
import "./game.css";
import { useState, createContext, Dispatch, SetStateAction } from "react";

export const TurnContext = createContext<{ turn: ColorType; setTurn: Dispatch<SetStateAction<Color>> } | undefined>(
  undefined
);

const Game = () => {
  const [turn, setTurn] = useState(Color.WHITE);

  // const move = () => {
  //   if (turn === Color.WHITE) setTurn(Color.BLACK);
  //   else setTurn(Color.WHITE);
  // };

  return (
    <div className="game">
      <TurnContext.Provider value={{ turn, setTurn }}>
        <Board />
      </TurnContext.Provider>
    </div>
  );
};

export default Game;
