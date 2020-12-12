// import logo from './logo.svg';
import "../App.css";
import { Component } from "react";
import JobCard from "./JobCard.js";
import { TiLocationArrowOutline } from "react-icons/ti";
import { BiPowerOff } from "react-icons/bi";

class Home extends Component {
  constructor() {
    super();
    var tasks = [];
    tasks = [
      {
        title: "Pizza Delivery",
        description: "what part of pizza delivery did you not understand",
        location: "My House to Customer's Houses",
        catergory: "Delivery",
        price: 220,
        timeposted: "today",
      },
      {
        title: "Pizza Delivery",
        description: "what part of pizza delivery did you not understand",
        location: "My House to Customer's Houses",
        catergory: "Delivery",
        price: 120,
        timeposted: "today",
      },
      {
        title: "Pizza Delivery",
        description: "what part of pizza delivery did you not understand",
        location: "My House to Customer's Houses",
        catergory: "Delivery",
        price: 20,
        timeposted: "today",
      },
      {
        title: "Pizza Delivery",
        description: "what part of pizza delivery did you not understand",
        location: "My House to Customer's Houses",
        catergory: "Delivery",
        price: 2,
        timeposted: "today",
      },
      {
        title: "Pizza Delivery",
        description: "what part of pizza delivery did you not understand",
        location: "My House to Customer's Houses",
        catergory: "Delivery",
        price: 190,
        timeposted: "today",
      },
    ];
    this.state = { tasks };
  }

  sortByName = (key, direction) => {
    var tempTask = this.state.tasks;
    // direction true is increasing and false is decending
    function GetSortOrder(prop) {
      return function (a, b) {
        if (a[prop] > b[prop]) {
          return direction ? 1 : -1;
        } else if (a[prop] < b[prop]) {
          return direction ? -1 : 1;
        }
        return 0;
      };
    }
    try {
      document
        .querySelectorAll(".sort-button.active")[0]
        .classList.remove("active");
    } catch (e) {}
    document
      .querySelectorAll("." + key + (direction ? "True" : "False"))[0]
      .classList.add("active");

    this.setState({
      ...this.state,
      tasks: tempTask.sort(GetSortOrder(key)),
    });
  };

  render() {
    return (
      <div style={{ paddingBottom: "40px" }}>
        <div style={{ background: "black" }}>
          <BiPowerOff
            style={{
              color: "white",
              fontSize: "30px",
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
          />
          <div
            style={{
              background: "black",
              color: "white",
              padding: "40px",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            <TiLocationArrowOutline
              style={{
                color: "white",
                fontSize: "30px",
                position: "relative",
                top: "7px",
                left: "-10px",
              }}
            />
            Jobs Near You
          </div>
          <div
            style={{
              fontSize: "10px",
              borderRadius: "50px 50px 0px 0px",
              background: "white",
              paddingTop: "50px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                width: "90%",
                marginLeft: "5%",
              }}
            >
              <div
                style={{
                  marginLeft: "10px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Sort By:
              </div>
              <button
                className="sort-button priceTrue"
                onClick={() => this.sortByName("price", true)}
              >
                Price Low to High
              </button>
              <button
                className="sort-button priceFalse"
                onClick={() => this.sortByName("price", false)}
              >
                Price High to Low
              </button>
              <button
                className="sort-button titleTrue"
                onClick={() => this.sortByName("title", true)}
              >
                Title
              </button>
            </div>
          </div>
        </div>
        {this.state.tasks.map((person, i) => (
          <JobCard
            title={this.state.tasks[i].title}
            description={this.state.tasks[i].description}
            location={this.state.tasks[i].location}
            catergory={this.state.tasks[i].catergory}
            price={this.state.tasks[i].price}
          />
        ))}
      </div>
    );
  }
}

export default Home;
