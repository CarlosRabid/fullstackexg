import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {List, ListItem, Divider, ListItemText } from '@material-ui/core';
import {ListItemAvatar, Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function Openingspopulation (props) {
  const classes = useStyles();

  const [state /*, setState*/] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    jobs: props.jobs,
  });


  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={"Compensation "+state.jobs[0].compensation.data.currency+"  _  "+state.jobs[0].compensation.data.maxAmount}
          secondary={
            <React.Fragment>
              <Typography
                // component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {state.jobs[0].locations}
              </Typography>
              {state.jobs[0].objective}
              <br/>
              Status: {state.jobs[0].status}
              <br/>
              Type: {state.jobs[0].type}
            </React.Fragment>
          }
        />
      </ListItem>
      {/* <Divider variant="inset" 
      component="li" 
      /> */}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={"Compensation "+state.jobs[1].compensation.data.currency+"  _  "+state.jobs[1].compensation.data.maxAmount}
          secondary={
            <React.Fragment>
              <Typography
                // component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {state.jobs[1].locations}
              </Typography>
              {state.jobs[1].objective}
              <br/>
              Status: {state.jobs[1].status}
              <br/>
              Type: {state.jobs[1].type}
            </React.Fragment>
          }
        />
      </ListItem>
      {/* <Divider variant="inset" component="li" /> */}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={"Compensation "+state.jobs[2].compensation.data.currency+"  _  "+state.jobs[2].compensation.data.maxAmount}
          secondary={
            <React.Fragment>
              <Typography
                // component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {state.jobs[2].locations}
              </Typography>
              {state.jobs[2].objective}
              <br/>
              Status: {state.jobs[2].status}
              <br/>
              Type: {state.jobs[2].type}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

Openingspopulation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Openingspopulation);