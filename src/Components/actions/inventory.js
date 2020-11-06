import React, { Component } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Tooltip } from "@material-ui/core";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snack: "",
      expanded: false,
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

      return (
      <>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                {this.getInitials(this.props.data.name)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={"User " + this.props.data.name + " Stats Overview"}
            subheader={today.toString()}
          />
          <CardMedia
            style={{ width: "3vw", padding: "8vh", marginLeft: "44%" }}
            image={this.props.data.picture}
            title="Stats Briefing"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" >
              Awards: {this.props.stats.awards}
              <br/>
              Education: {this.props.stats.education}
              <br/>
              Interests: {this.props.stats.interests}
              <br/>
              Publications: {this.props.stats.publications}
              <br/>
              Strenghts: {this.props.stats.strenghts}
              
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default Inventory;
