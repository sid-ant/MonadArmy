// import logo from './logo.svg';
import "../App.css";
import { Card, Button } from "react-bootstrap";
import { Component } from "react";

class JobCard extends Component {
  render() {
    return (
      <Card
        style={{
          width: "calc(90% - 20px)",
          padding: "10px",
          background: "black",
          color: "white",
          boxShadow: "0px 0px 22px -15px grey",
          border: "1px solid lightgrey",
          borderRadius: "0px",
          marginLeft: "5%",
          marginTop: "20px",
        }}
      >
        {/* <Card.Img
          variant="top"
          style={{
            opacity: 0.7,
            background: "black",
            width: "100%",
            height: "150px",
          }}
          src="https://images.ctfassets.net/zma7thmmcinb/6NkrAIY4Jo5fjCKULa6n4C/80593107e9a046a9883f5fa3b1530bcb/gardening-reduces-stress-preview2.jpg"
        /> */}
        <Card.Body style={{ padding: "5px 10px" }}>
          <Card.Title style={{ fontSize: "18px", fontWeight: "bold" }}>
            {this.props.title}
            {this.props.price}
          </Card.Title>
          <Card.Text style={{ fontSize: "14px", fontWeight: "light" }}>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button
            variant="primary"
            style={{
              border: "0px",
              width: "100%",
              background: "black",
              color: "white",
              padding: "10px 20px",
            }}
          >
            Accept
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default JobCard;
