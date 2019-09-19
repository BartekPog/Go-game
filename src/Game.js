import React from 'react';
import Board from "./Board";

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state={
      stage: 1,
      player: "black",
      boardSize: 9,
      board: Array(9).fill(Array(9).fill("none"))
    };
  };

  render() {
    console.log(this.state.board);
    return (
      <div className="Game">
        <h1>current player incidator</h1>
        <h1>game board</h1>
        <Board board ={this.state.board} boardSize={this.state.boardSize}/>
        <h1>pass buttons</h1>
      </div>
    );
  };
};


export default Game;
