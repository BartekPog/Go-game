import React from "react";
import Board from "./Board";
import PassButton from "./PassButton";
import {
  isMovePossible,
  getCapturedOnes,
  countPoints,
  opponent
} from "./gameMechanics";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: "black",
      boardSize: this.props.boardSize,
      board: Array(this.props.boardSize).fill(
        Array(this.props.boardSize).fill("none")
      ),
      boardHistory: [],
      passCounter: 0,
      win: false
    };
  }

  makeMove(rowId, colId) {
    if (
      this.state.board[rowId][colId] === "none" &&
      isMovePossible(
        rowId,
        colId,
        this.state.board,
        this.state.boardHistory,
        this.state.player
      )
    ) {
      let stoneType = this.state.player;
      let newBoard = JSON.parse(JSON.stringify(this.state.board));
      newBoard[rowId][colId] = stoneType;

      let capturedObj = getCapturedOnes(
        rowId,
        colId,
        newBoard.length,
        newBoard,
        stoneType
      );

      if (capturedObj.isCapture)
        newBoard = newBoard.map((row, rowId) =>
          row.map((elem, colId) =>
            capturedObj.capturedBoard[rowId][colId] ? "none" : elem
          )
        );

      let newPlayer = "none";
      if (this.state.player === "white") newPlayer = "black";
      if (this.state.player === "black") newPlayer = "white";

      this.setState({
        boardHistory: [...this.state.boardHistory, this.state.board],
        board: newBoard,
        player: newPlayer,
        passCounter: 0
      });
    }
  }

  passMove() {
    let isWin = this.state.passCounter >= 1;
    this.setState({
      boardHistory: [...this.state.boardHistory, this.state.board],
      player: opponent(this.state.player),
      passCounter: this.state.passCounter + 1,
      isWin: isWin
    });
  }

  render() {
    let score = countPoints(this.state.board);
    let scoreLabel =
      "black: " +
      score.black.toString() +
      ", white: " +
      (score.white + 6.5).toString();

    return (
      <div className="Game">
        <h1>current player incidator: {this.state.player}</h1>
        <Board
          board={this.state.board}
          boardSize={this.state.boardSize}
          handleClick={this.makeMove.bind(this)}
        />

        <PassButton
          handleClick={this.passMove.bind(this)}
          player={this.state.player}
          color="black"
        />
        <PassButton
          handleClick={this.passMove.bind(this)}
          player={this.state.player}
          color="white"
        />
        <h1>
          {this.state.passCounter} {this.state.isWin ? "koniec gry" : ""}
        </h1>

        <div>{scoreLabel}</div>
      </div>
    );
  }
}

export default Game;
