import React, { Component } from "react";
import {BottomNavigation, BottomNavigationAction, Button, TextField} from "@material-ui/core/";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

class Navmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        navigation: "",
        input: "Job Openings"
    }
  }
  handleMenu = (event) => {
    let input = { ...this.state.input }
    input = event.currentTarget.id
    // input === "Singular" ? (this.setState({input, card: true})) : (this.setState({input, card: false}))
    this.props.handleMenu(input)
    this.setState({ input })

};
  render() {
    return <>
        <BottomNavigation
      value={this.state.input}
      onChange={this.handleMenu}
      showLabels
      style={{marginTop: '18vh'}}
    >

      <BottomNavigationAction id="Singular" value="Singular" label="Singular" icon={<RestoreIcon />} />
      <BottomNavigationAction id="Job Openings" value="Job Openings" label="Job Openings" icon={<FavoriteIcon />} />
      <BottomNavigationAction id="Inventory" value="Inventory" label="Inventory" icon={<LocationOnIcon />} />
    </BottomNavigation>
    </>;
  }
}

export default Navmenu;
