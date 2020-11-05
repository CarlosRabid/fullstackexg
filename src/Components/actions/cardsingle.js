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

class Cardsingle extends Component {
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
    let languages = []
    let lang = this.props.data.languages
    lang.map(l => languages.push(" "+l.language+", ") )
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
            title={"User " + this.props.data.name + " Information Briefing"}
            subheader={today.toString()}
          />
          <CardMedia
            style={{ width: "3vw", padding: "8vh", marginLeft: "44%" }}
            image={this.props.data.picture}
            title="General Overview"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.data.name}, {this.props.data.headline} with{" "}
              {this.props.data.lastexperience}. Currently located in{" "}
              {this.props.data.location}. Recently updated studies in{" "}
              {this.props.data.eduPdate}' as {this.props.data.eduName}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          <Tooltip title="Add to Watchlist">
            <IconButton aria-label="add to watchlist">
              <FavoriteIcon />
            </IconButton>
              </Tooltip>
              <Tooltip title="Share profile">
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Detailed briefing">
            <IconButton
              // className={clsx(classes.expand, {
              //   [classes.expandOpen]: expanded,
              // })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            </Tooltip>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Briefing:</Typography>
              <Typography paragraph>
                {this.props.data.name} is a {this.props.data.headline} with
                {this.props.data.lastexperience} as his last experience.
                Currently lives in in {this.props.data.location}.
              </Typography>
              <Typography paragraph>
                Personal Culture Genome Results show highly developed
                proficiencies, where {this.props.data.pcg} are shown as mainly
                predominant.
              </Typography>
              <Typography>
                {languages} are {this.getInitials(this.props.data.name)}'s languages.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </>
    );
  }
}

export default Cardsingle;
