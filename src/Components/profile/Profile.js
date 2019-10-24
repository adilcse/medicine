import React,{Component} from 'react';
import {db,firebase} from '../../firebaseconnect';
import './Profile.css';
import  {  Link } from "react-router-dom";
class Profile extends Component{
    
    render(){
        return (
        	<div>
        	<div>
        	<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6lqu6IZWoJJrNGqKn6Bhaywmq_7M_6eyoJNGLg8yajoUEGqbY&s" alt="image"/>
        	</div>
            <div className="form-group">
             <input type="text"  className="form-control" placeholder="Name"></input>
             <input type="text"  className="form-control" placeholder="Mobile No."></input>
             <input type="text"  className="form-control" placeholder="email@something.com"></input>
             <input type="text"  className="form-control" placeholder="Locality"></input>
             <input type="text"  className="form-control" placeholder="Address"></input>
             <input type="text"  className="form-control" placeholder="city"></input>
             <input type="text"  className="form-control" placeholder="Pin"></input>
             <input type="text"  className="form-control" placeholder="Landmark"></input>
             <input type="text"  className="form-control" placeholder="State"></input>
             <input type="text"  className="form-control" placeholder="Alternate Mobile no."></input>
             <input type="Button"  className="btn btn-primary" value="Update"></input>
            </div>

            </div>
        )
    }
}
export default Profile;