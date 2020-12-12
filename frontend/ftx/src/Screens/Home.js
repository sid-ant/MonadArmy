// import logo from './logo.svg';
import "../App.css";
import { Component } from "react";
import JobCard from "./JobCard.js";

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
      <div>
        <div
          style={{
            width: "calc(90% - 20px)",
            marginLeft: "5%",
            marginTop: "20px",
            fontSize: "10px",
          }}
        >
          Sort By:
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
