import React,{Component} from 'react';
import './checkout.css';
import {db,firebase} from '../../firebaseconnect';
class Checkout extends Component{
    constructor(props){
        super(props)

    }
    updateaddress=()=>{
        console.log("updates")
        let user = this.props.user ;
        const name=document.getElementById("name").value;
        const pin=document.getElementById("pin").value;
        const mobile=document.getElementById("Mobileno").value;
        const locality=document.getElementById("locality").value;
        const address=document.getElementById("address").value;
        const city=document.getElementById("city").value;
        const state=document.getElementById("state").value;
        const landmark=document.getElementById("landmark").value;
        const alternate=document.getElementById("alternate").value;
      let Address={
          name : name,
          pin : pin,
          mobile : mobile,
          locality : locality,
          address : address,
          city : city,
          state : state,
          landmark : landmark,
          alternate : alternate
      }
        let cartRef=db.collection("LastUser").doc(user.uid);
        cartRef.set({
          Address : Address
         
       }, { merge: true })
       .then(function() {
         console.log("Address updated");
       })
       .catch(function(error) {
         console.error("Error writing document: ", error);
       });
       
    }
    render(){
        console.log("called",this.props)
        if(!this.props.user){
            return(<h1>Loading</h1>)
        }
        const    {name,
         pin,
         mobile,
         locality,
         address,
         city,
         state,
         landmark,
         alternate} = this.props.user.Address;
        return(
            <div classNAme="container">
            <div className="row">
              <div className="col-3">
               
              </div>
              <div className="col-5">
                  <h2 align = "left">Shipping address</h2>
                
                  <div classNAme="container md-form">
                  <form>
            <div className="row">
            <div className="col-6">
           

      <input type="text"  className="form-control" id="name" placeholder="Enter Name" contenteditable="true" value={this.props.user.Address.name}/>
   
 
      <input type="text"  className="form-control" id="pin" placeholder="Enter Pin Code" value={pin}/>
   
  

           
         
                </div>
                <div className="col-6">
              
      <input type="text" className="form-control" id="Mobileno" placeholder="Enter Mobile number" value={mobile}/>
    
      <input type="text"  className="form-control" id="locality" placeholder="Enter Locality" value={locality}/>
    
                
 
                </div>
                <div className="row">
                <div className="col">
                 <textarea   className="form-control" id="address" placeholder="Enter Address" value={address}/>
                     </div>

                    </div>
                    <div className="row">
            <div className="col-6">
           
 
      <input type="text"  className="form-control" id="city" placeholder="Enter City" value={city}/>
   
  
      <input type="text"  className="form-control" id="state" placeholder="Enter State" value={state}/>
   
  

           
         
                </div>
                <div className="col-6">
               
      <input type="text" className="form-control" id="landmark" placeholder="Enter Landmark" value={landmark}/>
   
 
      <input type="text"  className="form-control" id="alternate" placeholder="Alternate number" value={alternate}/>
   
                
  </div> 
                </div>
                
                </div>
                </form>
                <button  className="btn btn-primary" onClick={this.updateaddress}>Update</button>
                <button className="btn btn-success">Continue</button>
                <button className="btn btn-warning">Cancel</button>
                </div>
               
              </div>
              <div className="col-4">
              
              </div>
            </div>
            </div>
          
        )
       
    }
}
export default Checkout;