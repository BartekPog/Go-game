function sumTwoSquareBoolArrays(arr1, arr2){
  return arr1.map((row, rowId)=>row.map((elem, colId)=> (elem || arr2[rowId][colId])));
}

function opponent(player){
  if(player==="none")
    return "none";
  return (player === "black" ? "white" : "black");
};

function getGroupSurroundings(rowId, colId, checkedBoard, boardSize, boardArray){
  let currentColor=boardArray[rowId][colId];
  let surroundings=[];

  let newCheckedBoard = JSON.parse(JSON.stringify(checkedBoard));
  newCheckedBoard[rowId][colId] = true;

  //let newCheckedBoard=newBoard;

  if(((rowId+1)<boardSize) && (rowId+1>=0) && (newCheckedBoard[rowId+1][colId]===false)){
    let checking = boardArray[rowId+1][colId];
    if(checking===currentColor){
      let newIteration = getGroupSurroundings(rowId+1, colId, newCheckedBoard, boardSize, boardArray);

      newCheckedBoard = newIteration.checkedBoard;
      surroundings.push(...newIteration.surroundings);
    }
    else{
      surroundings.push(checking);
    }
  }

  if(((rowId-1)<boardSize) && (rowId-1>=0) && (newCheckedBoard[rowId-1][colId]===false)){
    let checking = boardArray[rowId-1][colId];
    if(checking===currentColor){
      let newIteration = getGroupSurroundings(rowId-1, colId, newCheckedBoard, boardSize, boardArray);

      newCheckedBoard = newIteration.checkedBoard;
      surroundings.push(...newIteration.surroundings);
    }
    else{
      surroundings.push(checking);
    }
  }

  if(((colId+1)<boardSize) && (colId+1>=0) && (newCheckedBoard[rowId][colId+1]===false)){
    let checking = boardArray[rowId][colId+1];
    if(checking===currentColor){
      let newIteration = getGroupSurroundings(rowId, colId+1, newCheckedBoard, boardSize, boardArray);

      newCheckedBoard = newIteration.checkedBoard;
      surroundings.push(...newIteration.surroundings);
    }
    else
      surroundings.push(checking);
  }

  if(((colId-1)<boardSize) && (colId-1>=0) && (newCheckedBoard[rowId][colId-1]===false)){
    let checking = boardArray[rowId][colId-1];
    if(checking===currentColor){
        let newIteration = getGroupSurroundings(rowId, colId-1, newCheckedBoard, boardSize, boardArray);

        newCheckedBoard = newIteration.checkedBoard;
        surroundings.push(...newIteration.surroundings);
    }
    else
      surroundings.push(checking);
  }
  surroundings=Array.from(new Set(surroundings));

  return {
    surroundings: surroundings,
    checkedBoard: newCheckedBoard
  };
};

function getCapturedOnes(rowId, colId, boardSize, boardArray, playerColor){
  let emptyCheckBoard = Array(boardSize).fill(Array(boardSize).fill(false));
  let capturedBoard = Array(boardSize).fill(Array(boardSize).fill(false));

  let isCapture = false;

  let board = JSON.parse(JSON.stringify(boardArray));

  board[rowId][colId]=playerColor;

  //down
  if((rowId+1<boardSize)
  && (board[rowId+1][colId]===opponent(playerColor))){
    let groupSurroundingsPack = getGroupSurroundings(rowId+1, colId, emptyCheckBoard, boardSize, board);

    let groupSurroundings=groupSurroundingsPack.surroundings;
    let localCheckedBoard = groupSurroundingsPack.checkedBoard;

    if (groupSurroundings.includes("none")===false){
      isCapture=true;
      capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
    }
  }

  //up
  if((rowId-1>=0)
  && (board[rowId-1][colId]===opponent(playerColor))){
    let groupSurroundingsPack = getGroupSurroundings(rowId-1, colId, emptyCheckBoard, boardSize, board);

    let groupSurroundings=groupSurroundingsPack.surroundings;
    let localCheckedBoard = groupSurroundingsPack.checkedBoard;

    if (groupSurroundings.includes("none")===false){
      isCapture=true;
      capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
    }
  }

  //right
  if((colId+1<boardSize)
  && (board[rowId][colId+1]===opponent(playerColor))){
    let groupSurroundingsPack = getGroupSurroundings(rowId, colId+1, emptyCheckBoard, boardSize, board);

    let groupSurroundings=groupSurroundingsPack.surroundings;
    let localCheckedBoard = groupSurroundingsPack.checkedBoard;

    if (groupSurroundings.includes("none")===false){
      isCapture=true;
      capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
    }
  }

  //left
  if((colId-1>=0)
  && (board[rowId][colId-1]===opponent(playerColor))){
    let groupSurroundingsPack = getGroupSurroundings(rowId, colId-1, emptyCheckBoard, boardSize, board);

    let groupSurroundings=groupSurroundingsPack.surroundings;
    let localCheckedBoard = groupSurroundingsPack.checkedBoard;

    if (groupSurroundings.includes("none")===false){
      isCapture=true;
      capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
    }
  }

  return({
    isCapture: isCapture,
    capturedBoard: capturedBoard
  });
};

function isKoValid(rowId, colId, boardArray, boardHistory, playerColor){
  let boardSize = boardArray.length;
  let newBoard = JSON.parse(JSON.stringify(boardArray));
  let history = JSON.parse(JSON.stringify(boardHistory));

  newBoard[rowId][colId] = playerColor;

  let capturedObj = getCapturedOnes(rowId, colId, boardSize, newBoard, playerColor);

  if (capturedObj.isCapture){
    capturedObj.capturedBoard.forEach((row, captRowId) => row.forEach((elem, captColId)=>{
      if(elem)
        newBoard[captRowId][captColId]="none";
    }))

    return !(history.some( (histBoard) => ( JSON.stringify(histBoard)===JSON.stringify(newBoard) )));
  }

  return true;
};

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

function isMovePossible(rowId, colId, boardArray, boardHistory, playerColor){
  return (
    (isNotSuicidal(rowId, colId, boardArray, playerColor))
    && (isKoValid(rowId, colId, boardArray, boardHistory, playerColor))
  );

};

function countPoints(boardArray){
  let board = JSON.parse(JSON.stringify(boardArray));

  let boardSize = board.length;
  let blackPoints = 0;
  let whitePoints = 0;

  let checkedBoard = Array(boardSize).fill(Array(boardSize).fill(false));
  let emptyCheckBoard = Array(boardSize).fill(Array(boardSize).fill(false));

  board.forEach((row, rowId) => row.forEach((elem, colId) => {
    if(elem === "black")
      blackPoints++;
    if(elem === "white")
      whitePoints++;
    else{
      if(checkedBoard[rowId][colId] === false){
        let groupSurroundingPack = getGroupSurroundings(rowId, colId, emptyCheckBoard, boardSize, board);

        let localSurroundings = groupSurroundingPack.surroundings;
        let localCheckedBoard = groupSurroundingPack.checkedBoard;

        checkedBoard = sumTwoSquareBoolArrays(checkedBoard, localCheckedBoard);

        //alert(JSON.stringify(groupSurroundingPack));

        if (localSurroundings.length === 1){
          // let groupPoints = localCheckedBoard.reduce((superSum, row) =>{
          //   return superSum + row.reduce((sum, elem) =>{
          //     return sum + (elem ? 1 : 0 );
          //   })
          // });

          let groupPoints = 0;
          for(let row = 0; row < boardSize; row++)
            for(let col = 0; col < boardSize; col++)
              groupPoints += (localCheckedBoard[row][col] ? 1 : 0);


          //alert(groupPoints);

          if(localSurroundings.includes("black"))
            blackPoints += groupPoints;
          else
            whitePoints += groupPoints;
        }
      }
    }
  }));

  return({
    white: whitePoints,
    black: blackPoints
  });
};

export {sumTwoSquareBoolArrays, getGroupSurroundings, opponent, isMovePossible, getCapturedOnes, countPoints};
