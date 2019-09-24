import React from 'react';
import Board from "./Board";
import {getGroupSurroundings, sumTwoSquareBoolArrays, isMovePossible} from "./gameMechanics";

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
      },
      boardHistory: []
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
    if((moveRowId+1<this.state.boardSize)
    && (this.state.board[moveRowId+1][moveColId]===this.state.player)){
      let groupSurroundingsPack = getGroupSurroundings(moveRowId+1, moveColId, emptyCheckBoard, this.state.boardSize, this.state.board);

      let groupSurroundings=groupSurroundingsPack.surroundings;
      let localCheckedBoard = groupSurroundingsPack.checkedBoard;

      if (groupSurroundings.includes("none")===false){
        isCapture=true;
        capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
      }
    }

    //up
    if((moveRowId-1>=0)
    && (this.state.board[moveRowId-1][moveColId]===this.state.player)){
      let groupSurroundingsPack = getGroupSurroundings(moveRowId-1, moveColId, emptyCheckBoard, this.state.boardSize, this.state.board);

      let groupSurroundings=groupSurroundingsPack.surroundings;
      let localCheckedBoard = groupSurroundingsPack.checkedBoard;

      if (groupSurroundings.includes("none")===false){
        isCapture=true;
        capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
      }
    }

    //right
    if((moveColId+1<this.state.boardSize)
    && (this.state.board[moveRowId][moveColId+1]===this.state.player)){
      let groupSurroundingsPack = getGroupSurroundings(moveRowId, moveColId+1, emptyCheckBoard, this.state.boardSize, this.state.board);

      let groupSurroundings=groupSurroundingsPack.surroundings;
      let localCheckedBoard = groupSurroundingsPack.checkedBoard;

      if (groupSurroundings.includes("none")===false){
        isCapture=true;
        capturedBoard=sumTwoSquareBoolArrays(capturedBoard, localCheckedBoard);
      }
    }

    //left
    if((moveColId-1>=0)
    && (this.state.board[moveRowId][moveColId-1]===this.state.player)){
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
    if((this.state.board[rowId][colId]==="none")
    && (isMovePossible(rowId, colId, this.state.board, this.state.boardHistory, this.state.player))){
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
        boardHistory: [...this.state.boardHistory, this.state.board],
        board: newBoard,
        lastMove: newLastMove,
        player: newPlayer
      });
    }
  }

  render() {
    return (
      <div className="Game">
        <h1>current player incidator: {this.state.player}</h1>
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
