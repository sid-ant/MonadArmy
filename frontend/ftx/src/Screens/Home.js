// import logo from './logo.svg';
import "../App.css";
import { Component } from "react";
import JobCard from "./JobCard.js";
import { TiLocationArrowOutline } from "react-icons/ti";
import { BiPowerOff } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import SignUp from "./SignUp";
import NewJob from "./NewJob";
import PostedJob from "./PostedJob";

class Home extends Component {
  constructor() {
    super();
    var tasks = [];
    this.state = {
      logout: false,
      has_active: false,
      tasks: tasks,
      loading: true,
      showMyJobs: false,
    };
  }

  componentDidMount() {
    //setTimeout(() => this.setState({ ...this.state, loading: false }), 1000);
    let self = this;
    if (!this.state.isApiLoaded) {
      fetch("https://sleepy-wildwood-72790.herokuapp.com/jobs/fetch", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("session_info"),
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          self.setState({
            ...self.state,
            has_active: data.body.has_active_jobs,
            tasks: data.body.jobs_list,
            loading: false,
          });
        });
    }
  }
  logOut = (e) => {
    localStorage.removeItem("session_info");
    this.setState({ ...this.state, logout: true });
  };
  myJobs = (e) => {
    this.setState({ ...this.state, showMyJobs: true });
  };

  addJob = (e) => {
    this.setState({ ...this.state, addJob: true });
  };

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
    if (!localStorage.getItem("session_info") || this.state.logout) {
      return <SignUp></SignUp>;
    }
    if (this.state.addJob) {
      return <NewJob></NewJob>;
    }
    if (this.state.showMyJobs) {
      return <PostedJob></PostedJob>;
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
      <div style={{ paddingBottom: "60px" }}>
        <div style={{ background: "black" }}>
          <AiOutlinePlus
            style={{
              position: "fixed",
              zIndex: "10",
              bottom: "40px",
              fontSize: "50px",
              padding: "10px",
              color: "white",
              boxShadow: "0px 0px 16px -1px black",
              background: "black",
              borderRadius: "400px",
              left: "40px",
            }}
            onClick={this.addJob}
          />
          <FaTasks
            style={{
              color: "white",
              fontSize: "20px",
              position: "absolute",
              top: "20px",
              left: "20px",
            }}
            onClick={this.myJobs}
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
            {this.state.has_active ? (
              <div
                style={{
                  fontSize: "18px",
                  width: "100%",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                You have an Active task
                <br></br>
              </div>
            ) : (
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
                  Price L to H
                </button>
                <button
                  className="sort-button priceFalse"
                  onClick={() => this.sortByName("price", false)}
                >
                  Price H to L
                </button>
                <button
                  className="sort-button updated_atTrue"
                  onClick={() => this.sortByName("updated_at", true)}
                >
                  Recent First
                </button>
              </div>
            )}
          </div>
        </div>
        {this.state.has_active ? (
          <JobCard
            title={this.state.tasks[0].title}
            description={this.state.tasks[0].description}
            location={this.state.tasks[0].location}
            category={this.state.tasks[0].category}
            price={this.state.tasks[0].price}
            job_id={this.state.tasks[0].job_id}
            poster={this.state.tasks[0].poster}
            isActive={this.state.has_active}
            updated_at={this.state.tasks[0].updated_at}
          />
        ) : (
          ""
        )}
        {this.state.tasks.map((person, i) =>
          this.state.has_active ? (
            ""
          ) : (
            <JobCard
              title={this.state.tasks[i].title}
              description={this.state.tasks[i].description}
              location={this.state.tasks[i].location}
              category={this.state.tasks[i].category}
              price={this.state.tasks[i].price}
              job_id={this.state.tasks[i].job_id}
              poster={this.state.tasks[i].poster}
              updated_at={this.state.tasks[i].updated_at}
              isActive={this.state.has_active}
            />
          )
        )}
      </div>
    );
  }
}

export default Home;
