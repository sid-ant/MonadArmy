import React, { Component } from 'react';
import FormFields from './formFields';
import { Redirect } from "react-router-dom";

class User extends Component {

    state = {
        status: true,
        error: false,
        formData:{
            task:{
                element:'input',
                value:'',
                label:true,
                labelText:'Task Name',
                config:{
                    name:'task_input',
                    type:'text',
                    placeholder:'Enter task name'
                },
                validation:{
                    required:true,
                    minLen:5
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            price:{
                element:'input',
                value:'',
                label:true,
                labelText:'Price',
                config:{
                    name:'price_input',
                    type:'text',
                    placeholder:'Enter Price'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            location:{
                element:'input',
                value:'',
                label:true,
                labelText:'Location',
                config:{
                    name:'location_input',
                    type: 'text',
                    placeholder: "Enter Location"
                },
                validation:{
                    required:true
                },
                valid:true
            },
            Category:{
                element:'input',
                value:'',
                label:true,
                labelText:'Category',
                config:{
                    name:'category_input',
                    type: 'text',
                    placeholder: "Enter Cateogory"
                },
                validation:{
                    required:true
                },
                valid:true
            },
            description:{
                element:'input',
                value:'',
                label:true,
                labelText:'Description',
                config:{
                    name:'decs_input',
                    type: 'text',
                    placeholder: "Enter Description"
                },
                validation:{
                    required:true
                },
                valid:true
            },
            estimate:{
                element:'input',
                value:'',
                label:true,
                labelText:'Time For Completion',
                config:{
                    name:'time_input',
                    type: 'text',
                    placeholder: "Enter Time for completion"
                },
                validation:{
                    required:true
                },
                valid:true
            }
            
        }
    }

    updateForm = (newState) => {
        this.setState({
            formData:newState
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        
        // let firebaseUsers = []
        
        // console.log("usernames - ", firebaseUsers)
        // for(let key in this.state.formData){
        //     dataToSubmit[key] = this.state.formData[key].value;
        // }
        // firebaseDB.ref('users').on('value', (snapshot) => {
        //     console.log("triggered")
        //     snapshot.forEach((child) => {
        //         console.log("child", child.val())
        //         firebaseUsers.push(child.val().username)
        //         if(child.val().username == dataToSubmit["username"])
        //         console.log("data firebase", firebaseUsers)
        //     })
        //     localStorage.setItem('firebaseUsers', firebaseUsers);
        // });
        // let users = localStorage.getItem('firebaseUsers').split(',')
        // console.log("local status", users)
        // dataToSubmit["timestamp"] = Date.now();
        // dataToSubmit["session"] = true;

        // for(let key in this.state.formData){
        //     formIsValid = this.state.formData[key].valid && formIsValid;
        // }


        // if(formIsValid && !(users.includes(dataToSubmit["username"])) ){
        //     firebaseDB.ref('users').push(dataToSubmit)
        //     .then(()=>{
        //        console.log('new user added') 
        //     }).catch( e =>{
        //         console.log(e)
        //     })
        //     localStorage.setItem('username', dataToSubmit["username"]);
        //     localStorage.setItem('status', false)
            
        //     firebaseDB.ref("users").once("value")
        //     .then((snapshot) => {
        //         let id = '';
        //         snapshot.forEach((child) => {
                    
        //             if(child.val().username == dataToSubmit["username"] && child.val().password == dataToSubmit["password"])
        //             {
        //                 console.log("logged in ")
        //                 id = child.key
        //                 localStorage.setItem('id', id);

        //             }
        //         })
        //     })
        //     this.setState({status: false, error: false})
        // }
        // else{
        //     this.setState({error: true})
        // }
    
    }

    render(){
        if(!!localStorage.getItem('username') && this.state.username !== localStorage.getItem('username')){
            let t = localStorage.getItem('status') === "false"?false:true
            this.setState({username: localStorage.getItem('username'), status: t})
            
        }
        return(
            
            <div className="new_job">
                <h2>Create a new Job</h2>
                { this.state.status?
                <form onSubmit={this.submitForm}>

                    <FormFields
                        formData={this.state.formData}
                        onblur={(newState) => this.updateForm(newState)}
                        change={(newState) => this.updateForm(newState)}
                    />

                    <button type="submit">Submit</button>
                </form>
                :
                 <Redirect to="/" />
                }
                {
            this.state.error?
            <div class="alert">

            <strong>Error!</strong> Duplicate username found.
            </div>
            :
            null
            }
            </div>
            
        )
    }
}

export default User;