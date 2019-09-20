import React from 'react';
import "./Field.css";

function Field(props){
  let extraClasses="";
  if (props.fieldType==="black")
    extraClasses+=" Field-black";
  else if (props.fieldType==="white")
    extraClasses+=" Field-white";





  return(
    <div className={"Field Field-possible"+extraClasses} onClick={props.handleClick}></div>
  )

}

export default Field;
