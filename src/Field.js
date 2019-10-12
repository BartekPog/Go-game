import React from "react";
import "./Field.css";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possible: false
    };
  }

  getPossible() {
    if (this.props.fieldType === "none")
      this.setState({
        possible: this.props.handleHover()
      });
  }

  render() {
    let extraClasses = "";
    if (this.props.fieldType === "black")
      extraClasses += " Field-black Field-taken";
    else if (this.props.fieldType === "white")
      extraClasses += " Field-white Field-taken";
    else if (this.state.possible) extraClasses += " Field-possible";

    return (
      <div
        className={"Field" + extraClasses}
        onClick={this.props.handleClick}
        onMouseOver={this.getPossible.bind(this)}
      ></div>
    );
  }
}

export default Field;
