// import logo from './logo.svg';
import "../App.css";
import { Card, Button } from "react-bootstrap";
import { Component } from "react";
import { GoCheck } from "react-icons/go";
import { RiDeleteBinLine, RiSecurePaymentLine } from "react-icons/ri";
import { HiCurrencyRupee } from "react-icons/hi";

class MyJobCard extends Component {
  constructor() {
    super();
  }

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

            background: "#FFC055",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "5px",
              fontSize: "10px",
              color: "black",
            }}
          >
            {this.props.is_complete ? (
              <div>
                Completed
                <div
                  style={{
                    position: "absolute",
                    right: "-9px",
                    top: "7px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50px",
                    background: "limegreen",
                  }}
                ></div>
              </div>
            ) : this.props.is_accepted ? (
              <div>
                In Progress
                <div
                  style={{
                    position: "absolute",
                    right: "-9px",
                    top: "7px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50px",
                    background: "limegreen",
                  }}
                ></div>
              </div>
            ) : (
              <div>
                Not Accepted Yet
                <div
                  style={{
                    position: "absolute",
                    right: "-9px",
                    top: "7px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50px",
                    background: "grey",
                  }}
                ></div>
              </div>
            )}
          </div>
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
            style={{
              fontSize: "12px",
              marginTop: "10px",
              marginBottom: "5px",
              fontWeight: "light",
            }}
          >
            {this.props.description}
          </Card.Text>
          {/* Show description */}

          {/* Show location and accept button */}
          <div
            style={{
              display: "inline-block",
              width: "100%",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "10px", color: "grey" }}>
              {this.props.location}
              <br />
              {this.props.updated_at}
            </div>
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "inline-block",
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
              <RiSecurePaymentLine
                style={{ position: "relative", top: "2px", color: "white" }}
              />
              &nbsp;Pay
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="primary"
              style={{
                border: "0px",
                background: "transparent",
                color: "black",
                border: "1px solid black",
                borderRadius: "100px",
                padding: "10px 20px",
                fontSize: "12px",
              }}
            >
              <RiDeleteBinLine
                style={{ position: "relative", top: "2px", color: "black" }}
              />
              &nbsp;Delete
            </Button>
          </div>
          {/* Show location and accept button */}
        </Card.Body>
      </Card>
    );
  }
}

export default MyJobCard;
