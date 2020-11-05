import React, { Component } from "react";
import "./App.css";
import { TextField, Snackbar, Button, Tooltip } from "@material-ui/core";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      snack: false,
    };
  }
  update = async (event) => {
    let type = event.target.id;
    if (type === "undefined") {
      return;
    } else {
      let value = event.target.value;
      await this.setState({
        [type]: value,
      });
    }
  };
  async checker() {
    let data = await axios.get("http://localhost:4328/bios");
    let username = { ...this.state.name };
    let nodata = false;
    if (data.data[0]) {
      nodata = true;
    } else {
      nodata = false;
    }
    return this.setState({
      data: data.data,
    });
  }

  closeModal = async () => {
    let timeout = 5000;
    await this.setState({
      showPopup: null,
      snack: true,
    });
    await setTimeout(() => {
      this.setState({
        snack: false,
      });
    }, timeout);
    return;
  };

  delDatafromDB = async () => {
    if (window.confirm("Are you sure you want to delete All Info ?")) {
      await axios.delete("http://localhost:4328/empty", {});
      this.closeModal();
      return;
    } else {
      this.closeModal();
      return;
    }
  };

  render() {
    return (
      <div className="App">
        <Button
          variant="contained"
          onClick={this.delDatafromDB}
          style={{ marginLeft: "4%" }}
          size="small"
          position="end"
          color="secondary"
          name="delete all"
          id="empty"
        >
          Empty ALL
        </Button>
        <br />
        <br />
        <TextField
          required
          id="name"
          label="Required"
          value={this.state.name}
          onChange={this.update}
        />
        <Tooltip title="search username">
          <Button
            variant="contained"
            onClick={this.checker}
            style={{ marginLeft: "4%" }}
            size="medium"
            position="end"
            color="primary"
            name="editmode"
            id="editmode"
          >
            Check Username
          </Button>
        </Tooltip>
        {this.state.snack ? (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={this.state.snack}
            autoHideDuration={6600}
            message="Saved!"
          ></Snackbar>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default App;
