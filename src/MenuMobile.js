import React from "react";
import "./MenuMobile.css";

function MenuMobile(props) {
  return (
    <div className="MenuMobile">
      <h1 className="MenuMobile-GO-header">GO</h1>
      <div className="MenuMobile-board-types-box">
        <button
          className="MenuMobile-board-type"
          onClick={() => {
            props.handleChoice(9);
          }}
        >
          9
        </button>
        <button
          className="MenuMobile-board-type"
          onClick={() => {
            props.handleChoice(13);
          }}
        >
          13
        </button>
        <button
          className="MenuMobile-board-type"
          onClick={() => {
            props.handleChoice(19);
          }}
        >
          19
        </button>
      </div>
      <footer>© Bartłomiej Pogodziński 2019</footer>
    </div>
  );
}

export default MenuMobile;
