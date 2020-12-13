import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { GoChevronRight, GoClippy } from "react-icons/go";
import { Card, Button } from "react-bootstrap";
import { TiTick } from "react-icons/ti";
import Home from "./Home.js";

class Status extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{ textAlign: "center", fontSize: "20px" }}>
        <TiTick style={{ fontSize: "70px", marginTop: "40%" }} />
        <br />
        <br />
        Payment Successfull.
        <br />
        <span style={{ fontSize: "12px" }}>Redirecting You Please Wait...</span>
        <br />
        <img
          style={{
            width: "150px",
            marginTop: "5%",
          }}
          src={
            "https://thumbs.gfycat.com/GrippingReflectingBasenji-size_restricted.gif"
          }
        />
      </div>
    );
  }
}

export default Status;
