// import logo from './logo.svg';
import '../App.css';
import { Container,Row } from 'react-bootstrap';
import Home from './Home.js'
import { Component } from 'react';
import React from 'react'
class SignUp extends Component {

    state = {
        logged : false,
        isSignUp: false,
        showSignUpSuccess: false,
        showSignUpFail:false,
        loggingError:false
    }
    scriptLoaded(){
        window.main()
        window.animate()
    }
    componentDidMount () {

        const script = document.createElement("script");
        script.src = "http://localhost:3000/maze.js";
        script.async = true;
        script.onload = () => this.scriptLoaded();
      
        document.body.appendChild(script); 
          
    }
    signUpCall = (e) =>{
        e.preventDefault();
        try{
        var nameD = document.getElementById("exampleInputName").value;
        var emailD = document.getElementById("exampleInputEmail1").value;
        var passD = document.getElementById("exampleInputPassword1").value;
        var upiD = document.getElementById("exampleInputUPI").value;
        var phoneD = document.getElementById("exampleInputPhone").value;
        
        if (nameD.length > 0 && emailD.length>0 && passD.length>0 && upiD.length>0){
            var data;
            if (phoneD.length>0){
                data = {name: nameD, email: emailD, password: passD,upi:upiD,phone:phoneD}
            }
            else{
                data = {name: nameD, email: emailD, password: passD,upi:upiD}
            }
            fetch('https://sleepy-wildwood-72790.herokuapp.com/auth/register',{
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
            })
            .then(response=>{response.json();
                            if(response.status && (response.status ===200 ||response.status ===201)){
                                this.setState({isSignUp:false,showSignUpSuccess:true})
                                fetch('https://sleepy-wildwood-72790.herokuapp.com/auth/login',{
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({email:emailD,password:passD})
            })
            .then(response=>{
                console.log(response)
                if(response.status && (response.status ===200 ||response.status ===201)){
                    return response.json()
                }
                else{
                    throw new Error("No rep")
                }
            }).then(data=> {console.log(data)
                            localStorage.setItem("session_info",data.token);
                            this.setState({logged:true})
            }).catch(e=>{this.setState({isSignUp:false,loggingError:true})})
                                // this.tabSwitchToLogin()
                            }
                            else{
                                this.setState({isSignUp:true,showSignUpFail:true})
                            }
                        })
            .then(this.setState({isSignUp:false}))
            .catch(err=>{this.setState({isSignUp:true,showSignUpFail:true})})

        }
        else{
            alert("Please fill all Values")
        }
    }
    catch(e){
        alert("Please enter proper values")
    }
    }
    loginCall = (event) =>{
        try{
        var emailD = document.getElementById("exampleInputEmail2").value;
        var passD = document.getElementById("exampleInputPassword2").value;
        if (emailD.length>0 && passD.length>0){
            event.preventDefault();
            fetch('https://sleepy-wildwood-72790.herokuapp.com/auth/login',{
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({email:emailD,password:passD})
            })
            .then(response=>{
                console.log(response)
                if(response.status && (response.status ===200 ||response.status ===201)){
                    return response.json()
                }
                else{
                    throw new Error("No rep")
                }
            }).then(data=> {console.log(data)
                            localStorage.setItem("session_info",data.token);
                            this.setState({logged:true})
            }).catch(e=>{this.setState({isSignUp:false,loggingError:true})})

        }
        else{
            alert("Please fill all Values")
        }
    }
    catch(e){
        alert("Please Enter proper values")
    }
    }
    tabSwitchToSign = () =>{
        document.getElementById("login").classList.remove("active");
        document.getElementById("sign").classList.add("active");
        this.setState({isSignUp:true,showSignUpSuccess:false, showSignUpFail:false,loggingError:false})
    }
    tabSwitchToLogin = () =>{
        document.getElementById("sign").classList.remove("active");
        document.getElementById("login").classList.add("active");
        this.setState({isSignUp:false,showSignUpSuccess:false, showSignUpFail:false,loggingError:false})
    }
    render(){
        if (localStorage.getItem("session_info") ){
            
                    return (
                      <Home></Home>
                    );
                  }
                  return (
                        <Container>
                            <Row>
                                <canvas id="game"  height="100"></canvas>
                            </Row>
                            <Row>
                            <h1 className = 'title'>RICO</h1>
                            <h6 className = 'title'>Do you Dare?</h6>
                            </Row>
                            <Row>
                            <ul className="nav nav-pills nav-fill navs">
                                <li className="nav-item">
                                    <a className="nav-link active" id = "login" onClick ={this.tabSwitchToLogin}>Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="sign" onClick = {this.tabSwitchToSign} >SignUp</a>
                                </li>
                                </ul>
                            </Row>
                            {
                                this.state.isSignUp ? 
                                <Row>
                                    <div className="card signUp" >
                                    <div className="card-body">
                                    {this.state.showSignUpFail? <Row><p className = "failureText">SignUp Failed</p></Row>:<Row></Row> }
                                    <form>
                                        <div className="form-group">
                                            <label >Email address*</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label >Name*</label>
                                            <input type="text" className="form-control" id="exampleInputName"  placeholder="Enter name"></input>
                                        </div>
                                        <div className="form-group">
                                            <label >UPI*</label>
                                            <input type="text" className="form-control" id="exampleInputUPI"  placeholder="Enter UPI Id"></input>
                                        </div>
                                        <div className="form-group">
                                            <label >Phone</label>
                                            <input type="tel" className="form-control" id="exampleInputPhone"  placeholder="Enter Phone number"></input>
                                        </div>
                                        <div className="form-group">
                                            <label >Password*</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                                        </div>
                                        <small id="emailHelp" className="form-text text-muted">* are required</small>
                                        <button type="submit" className="btn btn-dark btn-block" onClick = {this.signUpCall}>Sign Up</button>
                                    </form>
                                    </div>
                                    </div>
                                </Row>
                                : <Row><div className="card signUp" >
                                <div className="card-body">
                                {this.state.showSignUpSuccess ?<Row><p className ="successText">Sign Up Successful. Please login.</p></Row>: this.state.showSignUpFail? <Row><p className = "failureText">SignUp Failed</p></Row>:<Row></Row> }
                                {this.state.loggingError?<p className = "errorText">Incorrect login info</p>:<p></p>}
                                <form>
                                    <div className="form-group">
                                        <label >Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email"></input>
                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password"></input>
                                    </div>
                                    <button type="submit" className="btn btn-dark btn-block" onClick = {this.loginCall}>Login</button>
                                </form>
                                
                                </div>
                                </div></Row>
                            }
                        </Container>
                      );

    
  }
}

export default SignUp;
