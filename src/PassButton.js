import React from "react";
import "./PassButton.css";

function Passbutton(props) {
  let classNames = "PassButton";
  let isActive = false;

  if (props.color === "black") classNames += " PassButton-black";
  if (props.color === "white") classNames += " PassButton-white";
  if (props.color === props.player) {
    classNames += " PassButton-active";
    isActive = true;
  }

  return (
    <button
      className={classNames}
      onClick={() => {
        if (isActive) props.handleClick();
      }}
    >
      <div className="PassButton-pass-content">Pass</div>
    </button>
  );
}

export default Passbutton;
