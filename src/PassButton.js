import React from "react";
import "./PassButton.css";

function Passbutton(props) {
  let classNames = "PassButton";
  let isActive = false;
  let isWin = props.winner !== "none";
  let content = "pass";

  if (props.color === "black") classNames += " PassButton-black";
  if (props.color === "white") classNames += " PassButton-white";
  if (isWin) {
    content = props.score;
    classNames += " PassButton-finished";
    if (props.winner === props.color) classNames += " PassButton-winner";
    else classNames += " PassButton-looser";
  } else {
    if (props.color === props.player) {
      classNames += " PassButton-active";
      isActive = true;
    }
  }

  return (
    <button
      className={classNames}
      onClick={() => {
        if (isActive) props.handleClick();
      }}
    >
      <div className="PassButton-content">{content}</div>
    </button>
  );
}

export default Passbutton;
