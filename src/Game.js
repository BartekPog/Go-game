import React from "react";
import Board from "./Board";
import PassButton from "./PassButton";
import "./Game.css";

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
      isWin: false,
      winner: "none",
      blackScore: 0,
      whiteScore: 0
    };
  }

  makeMove(rowId, colId) {
    if (this.state.isWin === false) {
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
  }

  passMove() {
    if (this.state.isWin === false) {
      let isWin = this.state.passCounter >= 1;
      this.setState({
        boardHistory: [...this.state.boardHistory, this.state.board],
        player: isWin ? "none" : opponent(this.state.player),
        passCounter: this.state.passCounter + 1,
        isWin: isWin
      });
      if (isWin) {
        let score = countPoints(this.state.board);
        let winner = score.black - score.white > 0 ? "black" : "white";
        this.setState({
          winner: winner,
          whiteScore: score.white,
          blackScore: score.black
        });
      }
    }
  }

  render() {
    let gameClasses = "Game";
    if (this.state.isWin === true)
      gameClasses += " Game-" + this.state.winner + "-won";

    return (
      <div className={gameClasses}>
        <div className="Game-pass Game-pass-black">
          <PassButton
            handleClick={this.passMove.bind(this)}
            player={this.state.player}
            color="black"
            winner={this.state.winner}
            score={this.state.blackScore}
          />
        </div>
        <div className="Game-pass Game-pass-white">
          <PassButton
            handleClick={this.passMove.bind(this)}
            player={this.state.player}
            color="white"
            winner={this.state.winner}
            score={this.state.whiteScore}
          />
        </div>

        <div
          className={"Game-board" + (this.state.isWin ? " Game-board-win" : "")}
        >
          <Board
            board={this.state.board}
            boardSize={this.state.boardSize}
            handleClick={this.makeMove.bind(this)}
            handleFieldHover={(rowId, colId) => {
              return isMovePossible(
                rowId,
                colId,
                this.state.board,
                this.state.boardHistory,
                this.state.player
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default Game;
