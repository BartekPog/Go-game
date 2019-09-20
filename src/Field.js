import React from 'react';
import "./Field.css";

function Field(props){
  let extraClasses="";
  if (props.fieldType==="black")
    extraClasses+=" Field-black Field-taken";
  else if (props.fieldType==="white")
    extraClasses+=" Field-white Field-taken";
  else
    extraClasses+=" Field-possible";




  return(
    <div className={"Field"+extraClasses} onClick={props.handleClick}></div>
  )

}

export default Field;
