// import logo from './logo.svg';
import "../App.css";
import { Card, Button } from "react-bootstrap";
import { Component } from "react";
import { GoCheck } from "react-icons/go";
import { HiCurrencyRupee } from "react-icons/hi";
import { AiOutlineTool } from "react-icons/ai";

class JobCard extends Component {
  render() {
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
            REPAIR
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
          <Card.Text style={{ fontSize: "12px", fontWeight: "light" }}>
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
              221b Baker's Street,London
            </div>
          </div>
          <div
            style={{
              display: "inline-block",
              width: "50%",
              textAlign: "right",
            }}
          >
            <Button
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
          </div>
          {/* Show location and accept button */}
        </Card.Body>
      </Card>
    );
  }
}

export default JobCard;
