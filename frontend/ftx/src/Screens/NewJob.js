import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { GoChevronRight, GoClippy } from "react-icons/go";
import { Card, Button } from "react-bootstrap";
import { BiPowerOff } from "react-icons/bi";
import { RiArrowGoBackFill } from "react-icons/ri";
import SignUp from "./SignUp";
import Home from "./Home.js";

class NewJob extends Component {
  constructor() {
    super();
    this.state = { logout: false, goBack: false };
  }

  submitJob = () => {
    var title = document.getElementById("task").value;
    var amount = document.getElementById("price").value;
    var location = document.getElementById("location").value;
    //var contact = document.getElementById("contact").value;
    var category = document.getElementById("category").value;
    var description = document.getElementById("description").value;
    // e.preventDefault();
    // console.log("The link was clicked.");

    // let title = document.getElementById("title").value;
    // let amount = document.getElementById("amount").value;
    // let location = document.getElementById("location").value;
    // let category = document.getElementById("category").value;
    // let desc = document.getElementById("desc").value;
    let self = this;
    fetch("https://sleepy-wildwood-72790.herokuapp.com/jobs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("session_info"),
      },
      body: JSON.stringify({
        title: title,
        amount: amount,
        location: location,
        category: category,
        desc: description,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        window.location.href = "/success"
        // self.setState({ ...self.state, goBack: true });
      });
  };

  logOut = (e) => {
    localStorage.removeItem("session_info");
    this.setState({ ...this.state, logout: true });
  };

  goBack = (e) => {
    this.setState({ ...this.state, goBack: true });
  };
  render() {
    if (!localStorage.getItem("session_info") || this.state.logout) {
      return <SignUp></SignUp>;
    }

    if (this.state.goBack) {
      return <Home></Home>;
    }
    if (this.state.loading) {
      return (
        <img
          style={{
            width: "150px",
            marginTop: "50%",
            marginLeft: "calc(50% - 75px)",
          }}
          src={
            "https://thumbs.gfycat.com/GrippingReflectingBasenji-size_restricted.gif"
          }
        />
      );
    }
    return (
      <div style={{ paddingBottom: "40px" }} className="newjob">
        <div style={{ background: "black" }}>
          <div
            style={{
              background: "black",
              color: "white",
              padding: "60px 40px 20px 40px",
              fontSize: "22px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <RiArrowGoBackFill
              style={{
                color: "white",
                fontSize: "20px",
                position: "absolute",
                top: "20px",
                left: "20px",
              }}
              onClick={this.goBack}
            />
            <BiPowerOff
              style={{
                color: "white",
                fontSize: "20px",
                position: "absolute",
                top: "20px",
                right: "20px",
              }}
              onClick={this.logOut}
            />
            <GoClippy
              style={{
                color: "white",
                fontSize: "30px",
                position: "relative",
                top: "7px",
                left: "-10px",
              }}
            />
            Create a New Job
          </div>
          <div
            style={{
              fontSize: "10px",
              borderRadius: "50px 50px 0px 0px",
              background: "white",
              paddingTop: "50px",
            }}
          ></div>
        </div>
        <div className="container" style={{ width: "90%", marginLeft: "5%" }}>
          <form>
            <div class="form-group">
              <label for="task">Task:</label>
              <input
                type="text"
                class="form-control"
                id="task"
                placeholder="Enter Task"
                name="task"
                required
              />
            </div>
            <div class="form-group">
              <label for="price">Price:</label>
              <input
                type="text"
                class="form-control"
                id="price"
                placeholder="Enter Price"
                name="price"
                required
              />
            </div>
            <div class="form-group">
              <label for="location">Location:</label>
              <input
                type="text"
                class="form-control"
                id="location"
                placeholder="Enter location"
                name="location"
              />
            </div>

            <div class="form-group">
              <label for="task">Contact Details:</label>
              <input
                type="text"
                class="form-control"
                id="contact"
                placeholder="Enter Contact Detail"
                name="contact"
                required
              />
            </div>
            <div class="form-group">
              <label for="category">Category:</label>
              <input
                type="text"
                class="form-control"
                id="category"
                placeholder="Enter Category"
                name="category"
                required
              />
            </div>
            <div class="form-group">
              <label for="description">Description:</label>
              <input
                type="text"
                class="form-control"
                id="description"
                placeholder="Enter Description"
                name="description"
              />
            </div>
            {/* <div class="form-group">
              <label for="time">Time for completion:</label>
              <input
                type="text"
                class="form-control"
                id="time"
                placeholder="Enter Time for completion"
                name="time"
              />
            </div> */}

            <div
              style={{
                display: "inline-block",
                marginLeft: "50%",
                marginTop: "10px",
                width: "50%",
                textAlign: "right",
              }}
            >
              <Button
                onClick={() => this.submitJob()}
                variant="primary"
                style={{
                  border: "0px",
                  background: "black",
                  color: "white",
                  width: "100%",
                  borderRadius: "100px",
                  padding: "10px 20px",
                  fontSize: "12px",
                }}
              >
                Submit &nbsp;
                <GoChevronRight
                  style={{ position: "relative", top: "2px", color: "white" }}
                />
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewJob;
