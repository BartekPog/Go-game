function sumTwoSquareBoolArrays(arr1, arr2) {
  return arr1.map((row, rowId) =>
    row.map((elem, colId) => elem || arr2[rowId][colId])
  );
}

function opponent(player) {
  if (player === "none") {
    return "none";
  }
  return player === "black" ? "white" : "black";
}

function getGroupSurroundings(
  rowId,
  colId,
  checkedBoard,
  boardSize,
  boardArray
) {
  const currentColor = boardArray[rowId][colId];
  let surroundings = [];

  let newCheckedBoard = JSON.parse(JSON.stringify(checkedBoard));
  newCheckedBoard[rowId][colId] = true;

  if (
    rowId + 1 < boardSize &&
    rowId + 1 >= 0 &&
    newCheckedBoard[rowId + 1][colId] === false
  ) {
    const checking = boardArray[rowId + 1][colId];
    if (checking === currentColor) {
      const newIteration = getGroupSurroundings(
        rowId + 1,
        colId,
        newCheckedBoard,
        boardSize,
        boardArray
      );

      newCheckedBoard = newIteration.checkedBoard;
      surroundings.push(...newIteration.surroundings);
    } else {
      surroundings.push(checking);
    }
  }

  if (
    rowId - 1 < boardSize &&
    rowId - 1 >= 0 &&
    newCheckedBoard[rowId - 1][colId] === false
  ) {
    const checking = boardArray[rowId - 1][colId];
    if (checking === currentColor) {
      const newIteration = getGroupSurroundings(
        rowId - 1,
        colId,
        newCheckedBoard,
        boardSize,
        boardArray
      );

      newCheckedBoard = newIteration.checkedBoard;
      surroundings.push(...newIteration.surroundings);
    } else {
      surroundings.push(checking);
    }
  }

  if (
    colId + 1 < boardSize &&
    colId + 1 >= 0 &&
    newCheckedBoard[rowId][colId + 1] === false
  ) {
    const checking = boardArray[rowId][colId + 1];
    if (checking === currentColor) {
      const newIteration = getGroupSurroundings(
        rowId,
        colId + 1,
        newCheckedBoard,
        boardSize,
        boardArray
      );

      newCheckedBoard = newIteration.checkedBoard;
      surroundings.push(...newIteration.surroundings);
    } else {
      surroundings.push(checking);
    }
  }

  if (
    colId - 1 < boardSize &&
    colId - 1 >= 0 &&
    newCheckedBoard[rowId][colId - 1] === false
  ) {
    const checking = boardArray[rowId][colId - 1];
    if (checking === currentColor) {
      const newIteration = getGroupSurroundings(
        rowId,
        colId - 1,
        newCheckedBoard,
        boardSize,
        boardArray
      );

      newCheckedBoard = newIteration.checkedBoard;
      surroundings.push(...newIteration.surroundings);
    } else {
      surroundings.push(checking);
    }
  }
  surroundings = Array.from(new Set(surroundings));

  return {
    surroundings,
    checkedBoard: newCheckedBoard
  };
}

function getCapturedOnes(rowId, colId, boardSize, boardArray, playerColor) {
  const emptyCheckBoard = Array(boardSize).fill(Array(boardSize).fill(false));
  let capturedBoard = Array(boardSize).fill(Array(boardSize).fill(false));

  let isCapture = false;

  const board = JSON.parse(JSON.stringify(boardArray));

  board[rowId][colId] = playerColor;

  // down
  if (
    rowId + 1 < boardSize &&
    board[rowId + 1][colId] === opponent(playerColor)
  ) {
    const groupSurroundingsPack = getGroupSurroundings(
      rowId + 1,
      colId,
      emptyCheckBoard,
      boardSize,
      board
    );

    const groupSurroundings = groupSurroundingsPack.surroundings;
    const localCheckedBoard = groupSurroundingsPack.checkedBoard;

    if (groupSurroundings.includes("none") === false) {
      isCapture = true;
      capturedBoard = sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
    }
  }

  // up
  if (rowId - 1 >= 0 && board[rowId - 1][colId] === opponent(playerColor)) {
    const groupSurroundingsPack = getGroupSurroundings(
      rowId - 1,
      colId,
      emptyCheckBoard,
      boardSize,
      board
    );

    const groupSurroundings = groupSurroundingsPack.surroundings;
    const localCheckedBoard = groupSurroundingsPack.checkedBoard;

    if (groupSurroundings.includes("none") === false) {
      isCapture = true;
      capturedBoard = sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
    }
  }

  // right
  if (
    colId + 1 < boardSize &&
    board[rowId][colId + 1] === opponent(playerColor)
  ) {
    const groupSurroundingsPack = getGroupSurroundings(
      rowId,
      colId + 1,
      emptyCheckBoard,
      boardSize,
      board
    );

    const groupSurroundings = groupSurroundingsPack.surroundings;
    const localCheckedBoard = groupSurroundingsPack.checkedBoard;

    if (groupSurroundings.includes("none") === false) {
      isCapture = true;
      capturedBoard = sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
    }
  }

  // left
  if (colId - 1 >= 0 && board[rowId][colId - 1] === opponent(playerColor)) {
    const groupSurroundingsPack = getGroupSurroundings(
      rowId,
      colId - 1,
      emptyCheckBoard,
      boardSize,
      board
    );

    const groupSurroundings = groupSurroundingsPack.surroundings;
    const localCheckedBoard = groupSurroundingsPack.checkedBoard;

    if (groupSurroundings.includes("none") === false) {
      isCapture = true;
      capturedBoard = sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
    }
  }

  return {
    isCapture,
    capturedBoard
  };
}

function isKoValid(rowId, colId, boardArray, boardHistory, playerColor) {
  const boardSize = boardArray.length;
  const newBoard = JSON.parse(JSON.stringify(boardArray));
  const history = JSON.parse(JSON.stringify(boardHistory));

  newBoard[rowId][colId] = playerColor;

  const capturedObj = getCapturedOnes(
    rowId,
    colId,
    boardSize,
    newBoard,
    playerColor
  );

  if (capturedObj.isCapture) {
    capturedObj.capturedBoard.forEach((row, captRowId) =>
      row.forEach((elem, captColId) => {
        if (elem) {
          newBoard[captRowId][captColId] = "none";
        }
      })
    );

    return !history.some(
      histBoard => JSON.stringify(histBoard) === JSON.stringify(newBoard)
    );
  }

  return true;
}

function isNotSuicidal(rowId, colId, boardArray, playerColor) {
  const boardSize = boardArray.length;
  const board = JSON.parse(JSON.stringify(boardArray));

  board[rowId][colId] = playerColor;

  const emptyCheckBoard = Array(boardSize).fill(Array(boardSize).fill(false));
  const moveGroupSurroundings = getGroupSurroundings(
    rowId,
    colId,
    emptyCheckBoard,
    boardSize,
    board
  ).surroundings;

  if (moveGroupSurroundings.includes("none") === false) {
    // down
    if (
      rowId + 1 < boardSize &&
      board[rowId + 1][colId] === opponent(playerColor)
    ) {
      const groupSurroundingsPack = getGroupSurroundings(
        rowId + 1,
        colId,
        emptyCheckBoard,
        boardSize,
        board
      );

      const groupSurroundings = groupSurroundingsPack.surroundings;

      if (groupSurroundings.includes("none") === false) {
        return true;
      }
    }

    // up
    if (rowId - 1 >= 0 && board[rowId - 1][colId] === opponent(playerColor)) {
      const groupSurroundingsPack = getGroupSurroundings(
        rowId - 1,
        colId,
        emptyCheckBoard,
        boardSize,
        board
      );

      const groupSurroundings = groupSurroundingsPack.surroundings;

      if (groupSurroundings.includes("none") === false) {
        return true;
      }
    }

    // right
    if (
      colId + 1 < boardSize &&
      board[rowId][colId + 1] === opponent(playerColor)
    ) {
      const groupSurroundingsPack = getGroupSurroundings(
        rowId,
        colId + 1,
        emptyCheckBoard,
        boardSize,
        board
      );

      const groupSurroundings = groupSurroundingsPack.surroundings;

      if (groupSurroundings.includes("none") === false) {
        return true;
      }
    }

    // left
    if (colId - 1 >= 0 && board[rowId][colId - 1] === opponent(playerColor)) {
      const groupSurroundingsPack = getGroupSurroundings(
        rowId,
        colId - 1,
        emptyCheckBoard,
        boardSize,
        board
      );

      const groupSurroundings = groupSurroundingsPack.surroundings;

      if (groupSurroundings.includes("none") === false) {
        return true;
      }
    }
    return false;
  }

  return true;
}

function isMovePossible(rowId, colId, boardArray, boardHistory, playerColor) {
  return (
    isNotSuicidal(rowId, colId, boardArray, playerColor) &&
    isKoValid(rowId, colId, boardArray, boardHistory, playerColor)
  );
}

function countPoints(boardArray) {
  let handicap = 7.5;
  const board = JSON.parse(JSON.stringify(boardArray));

  const boardSize = board.length;
  let blackPoints = 0;
  let whitePoints = 0;

  let checkedBoard = Array(boardSize).fill(Array(boardSize).fill(false));
  const emptyCheckBoard = Array(boardSize).fill(Array(boardSize).fill(false));

  board.forEach((row, rowId) =>
    row.forEach((elem, colId) => {
      if (elem === "black") {
        blackPoints += 1;
      }
      if (elem === "white") {
        whitePoints += 1;
      } else if (checkedBoard[rowId][colId] === false) {
        const groupSurroundingPack = getGroupSurroundings(
          rowId,
          colId,
          emptyCheckBoard,
          boardSize,
          board
        );

        const localSurroundings = groupSurroundingPack.surroundings;
        const localCheckedBoard = groupSurroundingPack.checkedBoard;

        checkedBoard = sumTwoSquareBoolArrays(checkedBoard, localCheckedBoard);

        if (localSurroundings.length === 1) {
          let groupPoints = 0;
          for (let r = 0; r < boardSize; r += 1) {
            for (let c = 0; c < boardSize; c += 1) {
              groupPoints += localCheckedBoard[r][c] ? 1 : 0;
            }
          }

          if (localSurroundings.includes("black")) {
            blackPoints += groupPoints;
          } else if (localSurroundings.includes("white")) {
            whitePoints += groupPoints;
          }
        }
      }
    })
  );

  return {
    white: whitePoints + handicap,
    black: blackPoints
  };
}

export {
  sumTwoSquareBoolArrays,
  getGroupSurroundings,
  opponent,
  isMovePossible,
  getCapturedOnes,
  countPoints
};
