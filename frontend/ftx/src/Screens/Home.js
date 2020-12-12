// import logo from './logo.svg';
import "../App.css";
import { Component } from "react";
import JobCard from "./JobCard.js";
import { TiLocationArrowOutline } from "react-icons/ti";
import { BiPowerOff } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { GoListUnordered } from "react-icons/go";

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
    this.state = { tasks: tasks, loading: true };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ ...this.state, loading: false }), 1000);
    var response = {
      has_active: true,
      jobs: [
        {
          title: "Drugs Delivery",
          category: "Delivery",
          price: 190,
          location: "221b Baker's Street,London",
          description: "Come, get drugs , drive , give drug",
          poster: "Pablo",
          user_id: "xxxx",
          updated_at: "",
          job_id: "2",
        },
        {
          title: "Drugs Delivery",
          category: "Delivery",
          price: 190,
          location: "221b Baker's Street,London",
          description: "Come, get drugs , drive , give drug",
          poster: "Pablo",
          user_id: "xxxx",
          updated_at: "",
          job_id: "3",
        },
        {
          title: "Drugs Delivery",
          category: "Delivery",
          price: 190,
          location: "221b Baker's Street,London",
          description: "Come, get drugs , drive , give drug",
          poster: "Pablo",
          user_id: "xxxx",
          updated_at: "",
          job_id: "6",
        },
      ],
    };

    this.setState({
      ...this.state,
      has_active: response.has_active,
      tasks: response.jobs,
    });
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
      <div style={{ paddingBottom: "60px" }}>
        <div style={{ background: "black" }}>
          <AiOutlinePlus
            style={{
              position: "fixed",
              zIndex: "10",
              bottom: "20px",
              fontSize: "50px",
              padding: "10px",
              color: "white",
              boxShadow: "0px 0px 16px -1px black",
              background: "#fec005",
              borderRadius: "400px",
              left: "20px",
            }}
          />
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
            category={this.state.tasks[i].category}
            price={this.state.tasks[i].price}
            job_id={this.state.tasks[i].job_id}
            poster={this.state.tasks[i].poster}
          />
        ))}
      </div>
    );
  }
}

export default Home;
