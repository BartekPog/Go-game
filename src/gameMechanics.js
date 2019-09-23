function sumTwoSquareBoolArrays(arr1, arr2){
  return arr1.map((row, rowId)=>row.map((elem, colId)=> (elem || arr2[rowId][colId])));
}

function opponent(player){
  return (player === "black" ? "white" : "black");
};

function getGroupSurroundings(rowId, colId, checkedBoard, boardSize, boardArray){
  let currentColor=boardArray[rowId][colId];
  let surroundings=[];

  let newBoard = JSON.parse(JSON.stringify(checkedBoard));
  newBoard[rowId][colId]= true;

  checkedBoard=newBoard;

  if(((rowId+1)<boardSize) && (rowId+1>=0) && (checkedBoard[rowId+1][colId]===false)){
    let checking = boardArray[rowId+1][colId];
    if(checking===currentColor){
      let newIteration = getGroupSurroundings(rowId+1, colId, checkedBoard, boardSize, boardArray);

      checkedBoard = newIteration.checkedBoard;
      surroundings.push(...newIteration.surroundings);
    }
    else{
      surroundings.push(checking);
    }
  }

  if(((rowId-1)<boardSize) && (rowId-1>=0) && (checkedBoard[rowId-1][colId]===false)){
    let checking = boardArray[rowId-1][colId];
    if(checking===currentColor){
      let newIteration = getGroupSurroundings(rowId-1, colId, checkedBoard, boardSize, boardArray);

      checkedBoard = newIteration.checkedBoard;
      surroundings.push(...newIteration.surroundings);
    }
    else{
      surroundings.push(checking);
    }
  }

  if(((colId+1)<boardSize) && (colId+1>=0) && (checkedBoard[rowId][colId+1]===false)){
    let checking = boardArray[rowId][colId+1];
    if(checking===currentColor){
      let newIteration = getGroupSurroundings(rowId, colId+1, checkedBoard, boardSize, boardArray);

      checkedBoard = newIteration.checkedBoard;
      surroundings.push(...newIteration.surroundings);
    }
    else
      surroundings.push(checking);
  }

  if(((colId-1)<boardSize) && (colId-1>=0) && (checkedBoard[rowId][colId-1]===false)){
    let checking = boardArray[rowId][colId-1];
    if(checking===currentColor){
        let newIteration = getGroupSurroundings(rowId, colId-1, checkedBoard, boardSize, boardArray);

        checkedBoard = newIteration.checkedBoard;
        surroundings.push(...newIteration.surroundings);
    }
    else
      surroundings.push(checking);
  }
  surroundings=Array.from(new Set(surroundings));

  return {
    surroundings: surroundings,
    checkedBoard: checkedBoard
  };
};

//function isKoValid

function isNotSuicidal(rowId, colId, boardArray, playerColor){
  let boardSize = boardArray.length;
  let board = JSON.parse(JSON.stringify(boardArray));

  board[rowId][colId] = playerColor;

  let emptyCheckBoard= Array(boardSize).fill(Array(boardSize).fill(false));
  let moveGroupSurroundings = getGroupSurroundings(rowId, colId, emptyCheckBoard, boardSize, board).surroundings;

  if(moveGroupSurroundings.includes("none")===false){

    //down
    if((rowId+1<boardSize)
    && (board[rowId+1][colId]===opponent(playerColor))){
      let groupSurroundingsPack = getGroupSurroundings(rowId+1, colId, emptyCheckBoard, boardSize, board);

      let groupSurroundings=groupSurroundingsPack.surroundings;

      if (groupSurroundings.includes("none")===false)
        return true;
    }

    //up
    if((rowId-1>=0)
    && (board[rowId-1][colId]===opponent(playerColor))){
      let groupSurroundingsPack = getGroupSurroundings(rowId-1, colId, emptyCheckBoard, boardSize, board);

      let groupSurroundings=groupSurroundingsPack.surroundings;

      if (groupSurroundings.includes("none")===false)
        return true;
    }

    //right
    if((colId+1<boardSize)
    && (board[rowId][colId+1]===opponent(playerColor))){
      let groupSurroundingsPack = getGroupSurroundings(rowId, colId+1, emptyCheckBoard, boardSize, board);

      let groupSurroundings=groupSurroundingsPack.surroundings;

      if (groupSurroundings.includes("none")===false)
        return true;
    }

    //left
    if((colId-1>=0)
    && (board[rowId][colId-1]===opponent(playerColor))){
      let groupSurroundingsPack = getGroupSurroundings(rowId, colId-1, emptyCheckBoard, boardSize, board);

      let groupSurroundings=groupSurroundingsPack.surroundings;

      if (groupSurroundings.includes("none")===false)
        return true;
    }
    return false;
  }

  return true;
};

function isMovePossible(rowId, colId, boardArray, playerColor){ //pastBoardArray
  return isNotSuicidal(rowId, colId, boardArray, playerColor);
};

export {sumTwoSquareBoolArrays, getGroupSurroundings, opponent, isMovePossible};
