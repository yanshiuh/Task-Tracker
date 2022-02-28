import React from "react";
import { useLocation } from "react-router-dom";
import { useStateValue } from "../Context/GlobalState";
import Button from "./Button";
import "./Header.css";

function Header() {
  const [{ addTask }, dispatch] = useStateValue();
  const location = useLocation();

  function clickAdd(e) {
    e.preventDefault();

    dispatch({
      type: "SHOW_ADD_TASK",
    });
  }

  return (
    <div className="header">
      <h1>Task Tracker</h1>
      {location.pathname === "/" && (
        <Button
          text={addTask ? "Close" : "Add"}
          color={addTask ? "red" : "lightgreen"}
          onClick={clickAdd}
        />
      )}
    </div>
  );
}

export default Header;
