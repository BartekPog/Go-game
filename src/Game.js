import React from 'react';
import Board from "./Board";
import {isMovePossible, getCapturedOnes} from "./gameMechanics";

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

  makeMove(rowId, colId){
    if((this.state.board[rowId][colId]==="none")
    && (isMovePossible(rowId, colId, this.state.board, this.state.boardHistory, this.state.player))){

      let stoneType = this.state.player;
      let newBoard=JSON.parse(JSON.stringify(this.state.board));
      newBoard[rowId][colId]=stoneType;

      let capturedObj = getCapturedOnes(rowId, colId, newBoard.length, newBoard, stoneType);

      if(capturedObj.isCapture)
        newBoard = newBoard.map((row, rowId) => row.map((elem, colId) =>
          (capturedObj.capturedBoard[rowId][colId]? "none":elem)
        ));

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
