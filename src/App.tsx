import { useState } from "react";
import "./App.css";
import Game from "./components/Game/Game";
import Menu from "./components/Menu/Menu";

function App() {
  const [isGame, setIsGame] = useState(true);
  return <div className="app">{isGame ? <Game /> : <Menu setIsGame={setIsGame} />}</div>;
}

export default App;
