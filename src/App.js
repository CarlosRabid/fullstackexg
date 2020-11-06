import React, { Component } from "react";
import "./App.css";
import { TextField, Snackbar, Button, Tooltip } from "@material-ui/core";
import axios from "axios";
import Navmenu from "./Components/actions/navmenu";
import Cardsingle from "./Components/actions/cardsingle";
import Openings from "./Components/actions/openings";
import Inventory from "./Components/actions/inventory";
import * as constant from './Components/actions/constant'
const dinamicRoute = window.location.host.includes("localhost") ? constant.LOCAL_GET : constant.PROD_GET

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      jobs: "",
      name: "",
      snack: false,
      card: false,
      expanded: false,
      openings: false,
      inventory: false,
      stats: ""
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
  checker = async () => {
    let data = await axios.get(`${dinamicRoute}/bios/${this.state.name}`);
    let nodata = false;
    if (data.data[0]) {
      nodata = true;
    } else {
      nodata = false;
      return this.setState({
        data: data.data,
        stats: data.data.stats,
        card: true,
      });
    }
    return;
  };

  jobChecker = async () => {
    let jobsarray = []
    let offset = 0;
    let size = 6;
    let aggregate = false;
    let response = await axios.post(`${dinamicRoute}/jobs`, {
      data: { offset, size, aggregate },
    });
    let nodata = false;
    response.data.results.map(el => jobsarray.push(el))
    // this.setState({ jobs: response.data.results, openings: true});
    console.log(jobsarray)
    await response.data.results[0] ? (
      this.setState({jobs: jobsarray, openings: true})) 
    :
    (this.setState({openings:false}))
    //   nodata = true;
    // } else {
    //   nodata = false;
    //   console.log(response.data);
    //   return this.setState({
    //     jobs: response.data.results,
    //     openings: true,
    
    return;
  };

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
      await axios.delete(`${dinamicRoute}/empty`, {});
      this.closeModal();
      return;
    } else {
      this.closeModal();
      return;
    }
  };

  handleMenu = async (input) => {
    await this.setState({ input });
  };

  handleExpandClick = async (prevExpanded) => {
    await this.setState({ expanded: !prevExpanded });
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
        {this.state.input === "Singular" ? (
          <div>
            {" "}
            <TextField
              required
              id="name"
              label="Required"
              value={this.state.name}
              onChange={this.update}
            />
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
          </div>
        ) : (
          <></>
        )}
        {this.state.card && this.state.input === "Singular" ? (
          <div>
            <Cardsingle
              expanded={this.state.expanded}
              data={this.state.data}
              handleExpandClick={this.handleExpandClick}
            />
          </div>
        ) : (
          <></>
        )}
        {this.state.input === "Job Openings" ? (
          <>
            {/* <TextField
                  required
                  id="Latest Software Development Offerings"
                  label="Required"
                  value={this.state.name}
                  onChange={this.update}
                /> */}
            <Button
              variant="contained"
              onClick={this.jobChecker}
              style={{ marginLeft: "4%" }}
              size="medium"
              position="end"
              color="primary"
              name="resultspp"
              id="resultspp"
            >
              Check Results
            </Button>
          </>
        ) : (
          <></>
        )}
        {this.state.openings && this.state.input=="Job Openings" ? (
          <Openings
            jobs={this.state.jobs}
            handleExpandClick={this.handleExpandClick}
          />
        ) : (
          <></>
        )}
        {this.state.input === "Inventory" ? (
          <Inventory
          data={this.state.data}
            stats={this.state.stats}
            handleExpandClick={this.handleExpandClick}
          />
        ) : (
          <></>
        )}
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
        <Navmenu handleMenu={this.handleMenu} />
      </div>
    );
  }
}

export default App;
