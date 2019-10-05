import React from "react";
import "./Menu.css";

function Menu(props) {
  return (
    <div className="Menu">
      <div className="Menu-GO Menu-G Menu-grid-elem">
        <h1 className="Menu-logo-text">G</h1>
      </div>

      <div className="Menu-GO Menu-O Menu-grid-elem">
        <h1 className="Menu-logo-text">O</h1>
      </div>

      <div className="Menu-label1 Menu-grid-elem">Select Board</div>
      <div className="Menu-label2 Menu-grid-elem">Size</div>
      <button
        className="Menu-board-type Menu-btn-1 Menu-grid-elem"
        onClick={() => {
          props.handleChoice(9);
        }}
      >
        9
      </button>
      <button
        className="Menu-board-type Menu-btn-2 Menu-grid-elem"
        onClick={() => {
          props.handleChoice(13);
        }}
      >
        13
      </button>
      <button
        className="Menu-board-type Menu-btn-3 Menu-grid-elem"
        onClick={() => {
          props.handleChoice(19);
        }}
      >
        19
      </button>
    </div>
  );
}

export default Menu;
