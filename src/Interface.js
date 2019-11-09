import React, { Fragment } from "react";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Game from "./Game";
import Media from "react-media";
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
    // let mainComponent = <Menu handleChoice={this.handleChoice.bind(this)} />;
    let mainComponent = (
      <Media
        queries={{
          small: "(max-width: 599px)",
          medium: "(min-width: 600px) and (max-width: 1299px)",
          large: "(min-width: 1300px)"
        }}
      >
        {matches => (
          <Fragment>
            {matches.small && (
              <MenuMobile handleChoice={this.handleChoice.bind(this)} />
            )}
            {matches.medium && (
              <MenuMobile handleChoice={this.handleChoice.bind(this)} />
            )}
            {matches.large && (
              <Menu handleChoice={this.handleChoice.bind(this)} />
            )}
          </Fragment>
        )}
      </Media>
    );

    if (this.state.interfaceType === "game")
      mainComponent = <Game boardSize={this.state.boardSize} />;

    // if(this.state.interfaceType === "about")
    //     mainComponent = <About/>;

    return <div className="Interface">{mainComponent}</div>;
  }
}

export default Interface;
