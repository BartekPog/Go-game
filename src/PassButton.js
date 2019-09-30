import React from "react";

function Passbutton(props) {
  let classNames = "Pass-button";
  let isActive = false;

  if (props.color === "black") classNames += " Pass-button-black";
  if (props.color === "white") classNames += " Pass-button-white";
  if (props.color === props.player) {
    classNames += "Pass-button-active";
    isActive = true;
  }

  return (
    <button
      className={classNames}
      onClick={() => {
        if (isActive) props.handleClick();
      }}
    >
      Pass
    </button>
  );
}

export default Passbutton;
