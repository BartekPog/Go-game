import React from "react";
import "./Board.css";
import Field from "./Field";


function getFieldConnections(rowID, colID, boardSize){
  let fieldConnections={
    up:true,
    right: true,
    down: true,
    left: true
  }
  if(rowID===0) fieldConnections.up=false;
  if(colID===boardSize-1) fieldConnections.right=false;
  if(rowID===boardSize-1) fieldConnections.down=false;
  if(colID===0) fieldConnections.left=false;

  return fieldConnections;
};

function Board (props) {
  return(
    <div className = "Board">
      {props.board.map((row, rowId) =>(
          <div className="Board-row"> {row.map((element, colId)=>(<Field
            fieldType={element}
            key={props.boardSize*rowId+colId}
            fieldConnections={getFieldConnections(rowId, colId, props.boardSize)}
            handleClick={() => props.handleClick(rowId, colId)}
          />))}</div>
        )
      )}
    </div>
  );
};


export default Board;
