import React from 'react';
import Board from "./Board";

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

function sumTwoSquareBoolArrays(arr1, arr2){
  return arr1.map((row, rowId)=>row.map((elem, colId)=> (elem || arr2[rowId][colId])));
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state={
      stage: 1,
      player: "black",
      boardSize: 9,
      board: Array(9).fill(Array(9).fill("none")),
      lastMove:{
        rowId: -1,
        colId: -1
      }
    };
  };

  componentDidUpdate(){
    this.captureIfPossible(this.state.lastMove.rowId, this.state.lastMove.colId);
  }

  removeGroup(groupArray){
    this.setState({
      board: this.state.board.map( (row, rowId) =>
        row.map((field, colId) =>
          (groupArray[rowId][colId] ? "none" : field)
        )
      )
    })
  };

  captureIfPossible(moveRowId, moveColId){
    let emptyCheckBoard = Array(this.state.boardSize).fill(Array(this.state.boardSize).fill(false));
    let capturedBoard = Array(this.state.boardSize).fill(Array(this.state.boardSize).fill(false));
    let isCapture = false;

    //down
    if((moveRowId+1<this.state.boardSize) && (this.state.board[moveRowId+1][moveColId]!=="none")){
      let groupSurroundingsPack = getGroupSurroundings(moveRowId+1, moveColId, emptyCheckBoard, this.state.boardSize, this.state.board);

      let groupSurroundings=groupSurroundingsPack.surroundings;
      let localCheckedBoard = groupSurroundingsPack.checkedBoard;

      if (groupSurroundings.includes("none")===false){
        isCapture=true;
        capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
      }
    }

    //up
    if((moveRowId-1>=0) && (this.state.board[moveRowId-1][moveColId]!=="none")){
      let groupSurroundingsPack = getGroupSurroundings(moveRowId-1, moveColId, emptyCheckBoard, this.state.boardSize, this.state.board);

      let groupSurroundings=groupSurroundingsPack.surroundings;
      let localCheckedBoard = groupSurroundingsPack.checkedBoard;

      if (groupSurroundings.includes("none")===false){
        isCapture=true;
        capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
      }
    }

    //right
    if((moveColId+1<this.state.boardSize) && (this.state.board[moveRowId][moveColId+1]!=="none")){
      let groupSurroundingsPack = getGroupSurroundings(moveRowId, moveColId+1, emptyCheckBoard, this.state.boardSize, this.state.board);

      let groupSurroundings=groupSurroundingsPack.surroundings;
      let localCheckedBoard = groupSurroundingsPack.checkedBoard;

      if (groupSurroundings.includes("none")===false){
        isCapture=true;
        capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
      }
    }

    //left
    if((moveColId-1>=0) && (this.state.board[moveRowId][moveColId-1]!=="none")){
      let groupSurroundingsPack = getGroupSurroundings(moveRowId, moveColId-1, emptyCheckBoard, this.state.boardSize, this.state.board);

      let groupSurroundings=groupSurroundingsPack.surroundings;
      let localCheckedBoard = groupSurroundingsPack.checkedBoard;

      if (groupSurroundings.includes("none")===false){
        isCapture=true;
        capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
      }
    }

    if(isCapture)
      this.removeGroup(capturedBoard);

  };

  makeMove(rowId, colId){
    if(this.state.board[rowId][colId]==="none"){
      let stoneType = this.state.player;
      let newBoard=JSON.parse(JSON.stringify(this.state.board));
      newBoard[rowId][colId]=stoneType;
      let newLastMove = this.state.lastMove;

      if(stoneType!=="none"){
        newLastMove={
          rowId: rowId,
          colId: colId
        }
      }
      let newPlayer="none";
      if(this.state.player==="white") newPlayer="black";
      if(this.state.player==="black") newPlayer="white";

      this.setState({
        board: newBoard,
        lastMove: newLastMove,
        player: newPlayer
      });
    }
  }

  render() {
    return (
      <div className="Game">
        <h1>current player incidator</h1>
        <h1>game board</h1>
        <Board
          board ={this.state.board}
          boardSize={this.state.boardSize}
          handleClick={this.makeMove.bind(this)}
        />
        <h1>pass buttons</h1>
      </div>
    );
  };
};


export default Game;