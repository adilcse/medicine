import React,{Component} from 'react';
import {db} from '../../firebaseconnect';
import './Profile.css';
import  {  Link } from "react-router-dom";
let addressupdatedclass ="alert alert-success";
let addressdata="Address updated";
class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            user :this.props.user,
            addressupdated : true,
            edit:false,
            edittext:"Edit"
        }
    }
    handeladdresschange=(add)=>{
        console.log("updates")
      
        const name=document.getElementById("name").value;
        const pin=document.getElementById("pin").value;
        const mobile=document.getElementById("Mobileno").value;
        const locality=document.getElementById("locality").value;
        const address=document.getElementById("address").value;
        const city=document.getElementById("city").value;
        const state=document.getElementById("state").value;
        const landmark=document.getElementById("landmark").value;
        const alternate=document.getElementById("alternate").value;
      switch(add){
        case "name":
          this.setState({
          
              name : name
          
          })
          break;
          case "pin":
              this.setState({
              
                  pin : pin
              
              })
              break;
              case "mobile":
                  this.setState({
                  
                      mobile : mobile

                  })
                  break;
                  case "locality":
                      this.setState({
                      
                          locality : locality
                      
                      })
                      break;
                      case "address":
                          this.setState({
                                address : address
                            
                          })
                          break;
                          case "city":
                              this.setState({
                               
                                  city : city
                               
                              })
                              break;
                              case "state":
                                  this.setState({
                                   
                                      state : state
                                   
                                  })
                                  break;
                                  case "landmark":
                                      this.setState({
                                      
                                        landmark : landmark
                                      
                                      })
                                      break; 
                                      case "alternate":
                                          this.setState({
                                          
                                              alternate : alternate
                                           
                                          })
                                          break;           
default :

      }
    } 
    verifyaddress=()=>{
        if(this.state.name)
        {
          if(this.state.name.length >=3){
              if(this.state.pin){
                if(this.state.pin.length === 6){
                  if(this.state.mobile){
                    if(this.state.mobile.length === 10){
                      if(this.state.address){
                        if(this.state.address.length >=5){
                          if(this.state.city){
                            if(this.state.city.length >=3){
                              if(this.state.state){
                                if(this.state.state.length >=3){
                                  if(this.state.alternate){
                                    if(this.state.alternate.length ===10){
                                      if(this.state.landmark){
                                        if(this.state.landmark.length >=3){
                                          if(this.state.locality){
                                            if(this.state.locality.length >=3){
                                              return true;
                                            }else {
                                              addressdata = "Please enter correct locality";
                                              return false;
                                            }
                                          }else {
                                            addressdata = "Please enter locality";
                                            return false;
                                          }
                                        }else {
                                          addressdata = "Please enter correct landmark";
                                          return false;
                                        }
                                      }else {
                                        addressdata = "Please enter landmark";
                                        return false;
                                      }
                                    }else {
                                      addressdata = "Please enter correct altername number";
                                      return false;
                                    }
                                  }else {
                                    addressdata = "Please enter alternate number";
                                    return false;
                                  }
                                }else {
                                  addressdata = "Please enter correct state";
                                  return false;
                                }
                              }else {
                                addressdata = "Please enter state";
                                return false;
                              }
                            }else {
                              addressdata = "Please enter correct city";
                              return false;
                            }
                          }else {
                            addressdata = "Please enter city";
                            return false;
                          }
                        }else {
                          addressdata = "Please enter correct Address";
                          return false;
                        }
                      }else {
                        addressdata = "Please enter Address";
                        return false;
                      }
                    }else {
                      addressdata = "Please enter correct Mobile number";
                      return false;
                    }
                  }else {
                    addressdata = "Please enter Mobile number";
                    return false;
                  }
                }else {
                  addressdata = "Please enter correct pin code";
                  return false;
                }
              }else {
                addressdata = "Please enter pin code";
                return false;
              }
          }else{
            addressdata = "Please enter Correct Name";
            return false;
          }
        }else{
          addressdata = "Please enter Name";
          return false;
        }
    }
    updateaddress=()=>{
        if(this.state.edit){
            this.setState({
                edit:false,
                edittext:"Edit"
            })
        let obj=this;
        if(!this.verifyaddress()){
          addressupdatedclass = "alert alert-danger";
  
          this.setState({
            shipping : true,
            payment : false,
            addressupdated : false
          })
        }else{
  
       
        let cartRef=db.collection("LastUser").doc(this.state.user.uid);
      
          cartRef.set({
            Address : {
              name : this.state.name,
              pin :this.state.pin,
              mobile :this.state.mobile,
                locality : this.state.locality,
                address :this.state.address,
               city : this.state.city,
               state :this.state.state,
               landmark : this.state.landmark,
                alternate : this.state.alternate,
              
            }
           
         }, { merge: true })
         .then(function() {
           console.log("Address updated");
           addressupdatedclass = "alert alert-success";
           addressdata = "Address updated Successfull";
           obj.setState({
             addressupdated : false
           })
         })
         .catch(function(error) {
           console.error("Error writing document: ", error);
         });
        }
    }
    else{
        this.setState({
            edit:true,
            edittext:"Update"
        })
    }
}
    componentDidMount(){
        console.log("mounted",this.props.user);
        if(this.props.user){
           if(this.props.user.Address)
            this.setState({
                edit : false,
              name : this.props.user.Address.name,
              pin :this.props.user.Address.pin,
              mobile :this.props.user.Address.mobile,
                locality : this.props.user.Address.locality,
                address :this.props.user.Address.address,
               city : this.props.user.Address.city,
               state :this.props.user.Address.state,
               landmark : this.props.user.Address.landmark,
                alternate : this.props.user.Address.alternate
            })
          }
    }
    componentWillReceiveProps(){
      
        if(!this.props.user){
            
            return;
           }
        this.setState({
            user : this.props.user,

        })
     
        if(this.props.user.Address){
           
            this.setState({
              name : this.props.user.Address.name,
              pin :this.props.user.Address.pin,
              mobile :this.props.user.Address.mobile,
                locality : this.props.user.Address.locality,
                address :this.props.user.Address.address,
               city : this.props.user.Address.city,
               state :this.props.user.Address.state,
               landmark : this.props.user.Address.landmark,
                alternate : this.props.user.Address.alternate
            })
          }
    }
    render(){
        if(!this.state.user){
           
            return(<h2>Please login First</h2>)
        }
        let {name,address,locality,mobile,alternate,city,state,pin,landmark}=this.state;
        return (
        	<div className="container">
          <div>
          <img className="im" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6lqu6IZWoJJrNGqKn6Bhaywmq_7M_6eyoJNGLg8yajoUEGqbY&s" alt="image"/>
          </div>
          <div className="profile-email">
          {this.state.user.email}
          </div>
          <div className="row justify-content-center">
          <div className="col">
          Name : <input type="text"  
className="form-control" 
id="name" 
placeholder="Enter Name"  
value={name}
readOnly={!this.state.edit}
onChange={()=>this.handeladdresschange("name")}
/>
          </div>
          <div className="col">
          Pin :<input type="text"  className="form-control" id="pin" placeholder="Enter Pin Code" value={pin} readOnly={!this.state.edit}  onChange={()=>this.handeladdresschange("pin")}/>
          </div>
          </div>
          <div className="row justify-content-center">
          <div className="col">
          City : <input type="text"  className="form-control" readOnly={!this.state.edit} id="city" placeholder="Enter City" value={city}   onChange={()=>this.handeladdresschange("city")}/>
          </div>
          <div className="col">
          State :<input type="text"  className="form-control" readOnly={!this.state.edit} id="state" placeholder="Enter State" value={state}   onChange={()=>this.handeladdresschange("state")}/>
          </div>
          </div>
          <div className="row justify-content-center">
          <div className="col">
          Mob No :<input type="text" className="form-control" id="Mobileno" placeholder="Enter Mobile number" readOnly={!this.state.edit} value={mobile}   onChange={()=>this.handeladdresschange("mobile")}/>
          </div>
          <div className="col">
          Locality :<input type="text"  className="form-control" id="locality" placeholder="Enter Locality" readOnly={!this.state.edit} value={locality}   onChange={()=>this.handeladdresschange("locality")}/>
          </div>
          </div>
          <div className="row justify-content-center">
          <div className="col">
          Landmark: <input type="text" className="form-control" readOnly={!this.state.edit} id="landmark" placeholder="Enter Landmark" value={landmark}   onChange={()=>this.handeladdresschange("landmark")}/>
          </div>
          <div className="col">
          Alternate no:<input type="text"  className="form-control" readOnly={!this.state.edit} id="alternate" placeholder="Alternate number" value={alternate}   onChange={()=>this.handeladdresschange("alternate")}/>
          </div>
          </div>
          <div className="row justify-content-center">
          <div>
          Address :<textarea   className="form-control " id="address" placeholder="Enter Address" value={address} readOnly={!this.state.edit} onChange={()=>this.handeladdresschange("address")}/>
          </div>
          </div>
          <div className="row justify-content-center">
          <div>
          <div className="" id="carderror" className={addressupdatedclass} role="alert" hidden={this.state.addressupdated}>
       {addressdata}
       </div>
       <div className="col">
<button  className="btn btn-primary" onClick={this.updateaddress}>{this.state.edittext}</button>
   <Link to="/"> <button className="btn btn-warning">Cancel</button></Link>
   </div>
          </div>
          </div>
          </div>
        )
    }
}
export default Profile;