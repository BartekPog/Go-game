import React from "react";

function Menu(props) {
  return (
    <div className="Menu">
      <h1 className="Menu-header">GO</h1>
      <div className="Menu-board-box">
        <h1>Select board type:</h1>
        <button
          className="Menu-board-type"
          onClick={() => {
            props.handleChoice(9);
          }}
        >
          9 x 9
        </button>
        <button
          className="Menu-board-type"
          onClick={() => {
            props.handleChoice(13);
          }}
        >
          13 x 13
        </button>
        <button
          className="Menu-board-type"
          onClick={() => {
            props.handleChoice(19);
          }}
        >
          19 x 19
        </button>
      </div>
    </div>
  );
}

export default Menu;
