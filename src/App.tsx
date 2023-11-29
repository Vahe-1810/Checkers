import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import Game from "./components/Game";

function App() {
  const [isGame, setIsGame] = useState(false);
  return <div className="app">{isGame ? <Game /> : <Menu setIsGame={setIsGame} />}</div>;
}

export default App;
