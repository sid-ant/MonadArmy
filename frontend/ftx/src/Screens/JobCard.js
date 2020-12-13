// import logo from './logo.svg';
import "../App.css";
import { Card, Button } from "react-bootstrap";
import { Component } from "react";
import { GoCheck } from "react-icons/go";
import { HiCurrencyRupee } from "react-icons/hi";
import { AiOutlineTool } from "react-icons/ai";
import OtpInput from "react-otp-input";

class JobCard extends Component {
  constructor() {
    super();
    this.state = { show_otp: false, otp: "" };
  }

  completeJob = () => {
    console.log("completed Job id" + this.props.job_id);
    this.setState({ ...this.state, show_otp: true });
  };
  handleChange = (otp) => this.setState({ ...this.state, otp });
  acceptJob = () => {
    fetch("https://sleepy-wildwood-72790.herokuapp.com/jobs/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("session_info"),
      },
      body: JSON.stringify({ job_id: this.props.job_id }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
      });
    console.log("Accepted Job id" + this.props.job_id);
  };

  render() {
    if (this.state.show_otp) {
      return (
        <Card
          style={{
            width: "90%",
            padding: "10px",
            background: "white",
            color: "black",
            boxShadow: "0px 0px 22px -15px grey",
            border: "1px solid lightgrey",
            borderRadius: "15px",
            marginLeft: "5%",
            marginTop: "20px",
          }}
        >
          <Card.Body style={{ padding: "5px 10px" }}>
            <Card.Title
              style={{
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Please Enter O.T.P from Job Poster
            </Card.Title>
            <div
              style={{
                textAlign: "center",
                margin: "20px auto",
                width: "fit-content",
                color: "black",
              }}
            >
              <div id="divOuter">
                <div id="divInner">
                  <input
                    id="partitioned"
                    type="text"
                    maxlength="4"
                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                    onKeyPress="if(this.value.length==4) return false;"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "inline-block",
                marginLeft: "25%",
                width: "50%",
                textAlign: "right",
              }}
            >
              <Button
                onClick={() => this.completeJob()}
                variant="primary"
                style={{
                  border: "0px",
                  background: "black",
                  color: "white",
                  borderRadius: "100px",
                  padding: "10px 20px",
                  fontSize: "12px",
                }}
              >
                Completed &nbsp;
                <GoCheck
                  style={{ position: "relative", top: "2px", color: "white" }}
                />
              </Button>
            </div>
            {/* Show location and accept button */}
          </Card.Body>
        </Card>
      );
    }

    return (
      <Card
        style={{
          width: "90%",
          padding: "10px",
          background: "white",
          color: "black",
          boxShadow: "0px 0px 22px -15px grey",
          border: "1px solid lightgrey",
          borderRadius: "15px",
          marginLeft: "5%",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "13px",
            border: "1px dashed lightgrey",
            borderRadius: "100px",
            padding: "0 20px",
          }}
        >
          <span
            style={{
              position: "relative",
              top: "-2px",
              fontSize: "10px",
              color: "black",
            }}
          >
            {this.props.category}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <AiOutlineTool
            style={{
              position: "absolute",
              top: "5px",
              right: "6px",
              fontSize: "15px",
            }}
          />
        </div>

        <Card.Body style={{ padding: "5px 10px" }}>
          <Card.Title style={{ fontSize: "18px", fontWeight: "bold" }}>
            {this.props.title}
          </Card.Title>

          {/* Show price */}
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
            <HiCurrencyRupee
              style={{ position: "relative", top: "5px", fontSize: "20px" }}
            />{" "}
            {this.props.price}
          </div>
          {/* Show price */}

          {/* Show description */}
          <Card.Text
            style={{ fontSize: "12px", marginTop: "10px", fontWeight: "light" }}
          >
            {this.props.description}
          </Card.Text>
          {/* Show description */}

          {/* Show location and accept button */}
          <div
            style={{
              display: "inline-block",
              width: "50%",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "10px", color: "grey" }}>
              {this.props.location}
              <br />
              Posted by: {this.props.poster}
              <br />
              {this.props.updated_at}
            </div>
          </div>
          <div
            style={{
              display: "inline-block",
              width: "50%",
              textAlign: "right",
            }}
          >
            {this.props.isActive ? (
              <Button
                onClick={() => this.completeJob()}
                variant="primary"
                style={{
                  border: "0px",
                  background: "black",
                  color: "white",
                  borderRadius: "100px",
                  padding: "10px 20px",
                  fontSize: "12px",
                }}
              >
                Completed &nbsp;
                <GoCheck
                  style={{ position: "relative", top: "2px", color: "white" }}
                />
              </Button>
            ) : (
              <Button
                onClick={() => this.acceptJob()}
                variant="primary"
                style={{
                  border: "0px",
                  background: "black",
                  color: "white",
                  borderRadius: "100px",
                  padding: "10px 20px",
                  fontSize: "12px",
                }}
              >
                Accept &nbsp;
                <GoCheck
                  style={{ position: "relative", top: "2px", color: "white" }}
                />
              </Button>
            )}
          </div>
          {/* Show location and accept button */}
        </Card.Body>
      </Card>
    );
  }
}

export default JobCard;
