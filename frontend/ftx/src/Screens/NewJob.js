import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { GoChevronRight, GoClippy } from "react-icons/go";
import { Card, Button } from "react-bootstrap";
import { BiPowerOff } from "react-icons/bi";
import { GoListUnordered } from "react-icons/go";

class NewJob extends Component {
  submitJob = () => {
    var task = document.getElementById("task").value;
    var price = document.getElementById("price").value;
    var location = document.getElementById("location").value;
    var contact = document.getElementById("contact").value;
    var category = document.getElementById("category").value;
    var description = document.getElementById("description").value;

    console.log(
      "submitted Job id" + task + price + location + category + description
    );
  };
  render() {
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
            <GoListUnordered
              style={{
                color: "white",
                fontSize: "20px",
                position: "absolute",
                top: "20px",
                left: "20px",
              }}
            />
            <BiPowerOff
              style={{
                color: "white",
                fontSize: "20px",
                position: "absolute",
                top: "20px",
                right: "20px",
              }}
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
