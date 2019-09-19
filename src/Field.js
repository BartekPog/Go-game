import React from 'react';
import "./Field.css";

function Field(props){
  let extraClasses="";



  return(
    <div className="Field Field-possible" onClick={props.handleClick}></div>
  )

}

export default Field;
