import React from "react";
import Menu from "./Menu";
import Game from "./Game";
import "./interface.css";

class Interface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interfaceType: "menu",
      boardSize: 9
    };
  }

  handleChoice(size) {
    this.setState({
      boardSize: size,
      interfaceType: "game"
    });
  }

  render() {
    let mainComponent = <Menu handleChoice={this.handleChoice.bind(this)} />;

    if (this.state.interfaceType === "game")
      mainComponent = <Game boardSize={this.state.boardSize} />;

    // if(this.state.interfaceType === "about")
    //     mainComponent = <About/>;

    return <div className="Interface">{mainComponent}</div>;
  }
}

export default Interface;
