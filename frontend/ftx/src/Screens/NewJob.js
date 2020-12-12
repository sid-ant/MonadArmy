import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class NewJob extends Component {

    render(){
        return(
            <div className="container">
                <h2>Create a new Job</h2>
                <form>
                    <div class="form-group">
                        <label for="task">Task:</label>
                        <input type="text" class="form-control" id="task" placeholder="Enter Task" name="task" required/>
                    </div>
                    <div class="form-group">
                        <label for="price">Price:</label>
                        <input type="text" class="form-control" id="price" placeholder="Enter Price" name="price" required/>
                    </div>
                    <div class="form-group">
                        <label for="location">Location:</label>
                        <input type="text" class="form-control" id="location" placeholder="Enter location" name="location"/>
                    </div>

                    <div class="form-group">
                        <label for="task">Contact Details:</label>
                        <input type="text" class="form-control" id="contact" placeholder="Enter Contact Detail" name="contact" required/>
                    </div>
                    <div class="form-group">
                        <label for="category">Category:</label>
                        <input type="text" class="form-control" id="category" placeholder="Enter Category" name="category" required/>
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <input type="text" class="form-control" id="description" placeholder="Enter Description" name="description"/>
                    </div>
                    <div class="form-group">
                        <label for="time">Time for completion:</label>
                        <input type="text" class="form-control" id="time" placeholder="Enter Time for completion" name="time"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            
        )
    }
}

export default NewJob;