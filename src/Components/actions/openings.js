import React, { Component } from "react";
import Openingspopulation from "./openingspopulation";

class Openings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snack: "",
      expanded: false,
      jobs: this.props.jobs
    };
  }
  handleMenu = (event) => {
    let input = { ...this.state.input };
    input = event.currentTarget.id;
    this.props.handleMenu(input);
    this.setState({ input });
  };

  handleExpandClick = (event) => {
    let prevExpanded = this.state.expanded;
    this.props.handleExpandClick(!prevExpanded);
    this.setState({ expanded: !prevExpanded });
  };

  getInitials = function (string) {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  render() {
    let today = new Date();
    let jobOpenings = []
      return (
      <>
      <Openingspopulation jobs={this.props.jobs} />
      </>
    );
  }
}

export default Openings;
