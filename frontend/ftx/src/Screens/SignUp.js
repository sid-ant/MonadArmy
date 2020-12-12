// import logo from './logo.svg';
import '../App.css';
import { Container,Col,Row,Button } from 'react-bootstrap';
import Home from './Home.js'
import {Redirect, Route} from 'react-router-dom';
import { Component } from 'react';
import Alert from 'react-bootstrap/Alert'
// import * as utils from '../maze.js';
class SignUp extends Component {

    state = {
        logged : false,
        isSignUp: false,
        showSignUpSuccess: false
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
    signUpCall = () =>{
        try{
        var nameD = document.getElementById("exampleInputName").value;
        var emailD = document.getElementById("exampleInputEmail1").value;
        var passD = document.getElementById("exampleInputPassword1").value;
        if (nameD.length > 0 && emailD.length>0 && passD.length>0){
            fetch('https://run.mocky.io/v3/1e00d44c-c695-40da-8af7-af765c63f201',{
                method : "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({name: nameD, email: emailD, pass: passD})
            })
            .then(this.setState({isSignUp:false,showSignUpSuccess:true}))
            .then(this.tabSwitchToLogin());

        }
        else{
            alert("Please fill all Values")
        }
    }
    catch(e){
        alert("Please enter proper values")
    }
    }
    loginCall = () =>{
        try{
        var emailD = document.getElementById("exampleInputEmail2").value;
        var passD = document.getElementById("exampleInputPassword2").value;
        if (emailD.length>0 && passD.length>0){
            fetch('https://run.mocky.io/v3/1e00d44c-c695-40da-8af7-af765c63f201',{
                method : "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email: emailD, pass: passD})
            })
            .then(this.setState({isSignUp:false,logged:true}))
            .then(localStorage.setItem("session_info",emailD))

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
        this.setState({isSignUp:true,showSignUpSuccess:false})
    }
    tabSwitchToLogin = () =>{
        document.getElementById("sign").classList.remove("active");
        document.getElementById("login").classList.add("active");
        this.setState({isSignUp:false,showSignUpSuccess:false})
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
                                    <form>
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Email address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputName">Name</label>
                                            <input type="text" className="form-control" id="exampleInputName"  placeholder="Enter name"></input>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                                        </div>
                                        <button type="submit" className="btn btn-dark btn-block" onClick = {this.signUpCall}>Sign Up</button>
                                    </form>
                                    </div>
                                    </div>
                                </Row>
                                : <Row><div className="card signUp" >
                                <div className="card-body">
                                {this.state.showSignUpSuccess ?<Row><p className ="successText">Sign Up Successful. Please login.</p></Row>:<Row></Row> }
                                <form>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email"></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
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
    return (
      <Container>
        <Row>
          <Col>1 of 1</Col>
          <Button onClick={this.login}>Click HEre</Button>
        </Row>
      </Container>
    );
  }
}

export default SignUp;
