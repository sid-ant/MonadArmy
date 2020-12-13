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
  componentDidMount (){
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true;
    document.body.appendChild(script);
}

handleClick(e) {
    // e.preventDefault();
    console.log('The link was clicked.');

    let job_id = this.props.job_id;
    let amount = this.props.price;
    

    fetch('https://sleepy-wildwood-72790.herokuapp.com/txn/create',{
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('session_info')
              },
              body: JSON.stringify({amount:amount, job_id:job_id})
        })
        .then(function(res){ return res.json(); })
        .then(function(data){ 
          if(data.status =="200"){
            window.txn_id = data.body.txn_id;
            window.job_id = data.body.job_id;
            var options = {
                "key": "rzp_test_AL8RkobytmhhFR", // Enter the Key ID generated from the Dashboard
                "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Rico",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": data.body.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response){
                  fetch('https://sleepy-wildwood-72790.herokuapp.com/txn/update',{
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('session_info')
              },
              body: JSON.stringify({txn_id:window.txn_id, job_id:window.job_id,razorpay_payment_id:response.razorpay_payment_id,razorpay_order_id:response.razorpay_order_id,razorpay_signature:response.razorpay_signature})
        })
        .then(function(res){ return res.json(); })
        .then(function(data){window.location.href = "/successtxn" })
                
              },
                "prefill": {
                    "name": "Gaurav Kumar",
                    "email": "gaurav.kumar@example.com",
                    "contact": "7417418249"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#252b29"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
            
         }else{
           console.log("error",data)
         }
        })

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
                Job Active
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
              onClick={() => this.handleClick()}
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
            {/* <Button
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
            </Button> */}
          </div>
          {/* Show location and accept button */}
        </Card.Body>
      </Card>
    );
  }
}

export default MyJobCard;
