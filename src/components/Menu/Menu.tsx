import { useEffect, useState } from "react";
import "./menu.css";
import { MenuProps } from "src/types/menu-types";

const Menu = ({ setIsGame }: MenuProps) => {
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMenu(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const displayIs = {
    transform: isMenu ? "translateY(0px)" : "",
  };

  return (
    <div className="menu">
      <div style={displayIs} className="menu-container">
        <div className="menu-title">Checkers</div>
        <button className="menu-start" onClick={() => setIsGame(true)}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Menu;
