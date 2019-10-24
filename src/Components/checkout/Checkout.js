import React,{Component} from 'react';
import './checkout.css';
import {db,firebase} from '../../firebaseconnect';
import  {  Link } from "react-router-dom";
let addressdata="Address updated";
let addressupdatedclass ="alert alert-success"
class Checkout extends Component{
    constructor(props){
        super(props)
        this.state={

        }
        if(this.props.user){
          this.state={
            orderplaced :false,
            addressupdated : true,
            shipping :true,
            payment : false,
            errorcard:true,
            Address : this.props.user.Address,
            user : this.props.user,
            loading : false,
            login : true,
            
        
             price : parseInt(this.props.checkout.price)+40
           }
        }
        else{
          this.state={
            loading : true,
           
          }
        }
        this.verifyaddress = this.verifyaddress.bind(this);
      
    }
    updateaddress=()=>{
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
    ship=()=>{
      if(this.verifyaddress()){
        addressdata = "Address updated";
        addressupdatedclass = "alert alert-success";
       this.setState({
        shipAddress :{
          name : this.state.name,
          pin :this.state.pin,
          mobile :this.state.mobile,
            locality : this.state.locality,
            address :this.state.address,
           city : this.state.city,
           state :this.state.state,
           landmark : this.state.landmark,
            alternate : this.state.alternate

        },
        shipping : false,
        payment : true,
        addressupdated : false
      })     
    }else{
      addressupdatedclass = "alert alert-danger";
      this.setState({
        shipping : true,
        payment : false,
        addressupdated : true,
        addressupdated : false
      })
      
    }
    }
   componentDidMount(){
     try{
       if(!this.props.user){
        this.setState({
          login : false,
          loading : false
        })
        return;
       }
      this.setState({
       
        Address : this.props.user.Address,
        user : this.props.user,
        loading : false,
        login : true,

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
     }catch(e){
       console.log(e);
     }
      
    }
    PlaceOrder=(order)=>{
      let obj= this;
     let cartRef=db.collection("LastUser").doc(this.state.user.uid);
 cartRef.collection("Orders").doc().set({
  items :obj.props.checkout.items,
  price : obj.state.price,
  Address:obj.state.shipAddress,
  paymentmethod : order,
   time : firebase.firestore.FieldValue.serverTimestamp(),
   status : "pending"
  
  
}, { merge: true })
.then(function() {
  if(obj.props.checkout.via === "cart"){
    obj.props.cartitems.map((data,i)=>{
      cartRef.collection("Cart").doc(data.item.item_id ).delete().then(()=>{
        console.log("cart deleted",data.item);
      })
    })
    

  }else if(obj.props.checkout.via === "item")
  console.log("Order Placed by item");
  obj.setState({
    orderplaced :true

  })
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});
    }
    PaymentCnf=()=>{
      const cardno = document.getElementById("cardno").value;
     const cvv = document.getElementById("cvv").value;
      const pin = document.getElementById("pin").value;
      if(cardno.length===16 && cvv.length===3 && pin.length === 4){
        console.log("Payment success")
        this.setState({
          errorcard:true
        })
        let orderplace="card"
        this.PlaceOrder(orderplace)

      }
      else{
        this.setState({
          errorcard:false
        })
      }
     
    }
    COD=()=>{
      let orderplace = "COD"
      this.PlaceOrder(orderplace)
    }
    
    
    render(){
      
      try{
     
        if(this.state.loading){
            return(<h1>Loading</h1>)
        }
        if(!this.state.login){
          return(<h2>Please login first</h2>)
      }
        console.log("called",this.state,{addressdata})
      }catch(e){
        return(<h2>Something went wrong..</h2>)
      }
      const    
      {name,
       pin,
       mobile,
       locality,
       address,
       city,
       state,
       landmark,
       alternate} = this.state;

     const Shipping =        <div className="col-5"  >
     <h2 align = "left">Shipping address</h2>
   
     <div align="center" classNAme="container md-form">
     <form>
<div className="row">
<div className="col-6">


Name : <input type="text"  
className="form-control" 
id="name" 
placeholder="Enter Name"  
value={name}
onChange={()=>this.handeladdresschange("name")}
/>


Pin :<input type="text"  className="form-control" id="pin" placeholder="Enter Pin Code" value={pin}   onChange={()=>this.handeladdresschange("pin")}/>





   </div>
   <div className="col-6">
 
Mob No :<input type="text" className="form-control" id="Mobileno" placeholder="Enter Mobile number" value={mobile}   onChange={()=>this.handeladdresschange("mobile")}/>

Locality :<input type="text"  className="form-control" id="locality" placeholder="Enter Locality" value={locality}   onChange={()=>this.handeladdresschange("locality")}/>

   

   </div>
   <div className="row">
   <div className="col">
    Address :<textarea   className="form-control" id="address" placeholder="Enter Address" value={address}   onChange={()=>this.handeladdresschange("address")}/>
        </div>

       </div>
       <div className="row">
<div className="col-6">


City : <input type="text"  className="form-control" id="city" placeholder="Enter City" value={city}   onChange={()=>this.handeladdresschange("city")}/>


State :<input type="text"  className="form-control" id="state" placeholder="Enter State" value={state}   onChange={()=>this.handeladdresschange("state")}/>





   </div>
   <div className="col-6">
  
Landmark: <input type="text" className="form-control" id="landmark" placeholder="Enter Landmark" value={landmark}   onChange={()=>this.handeladdresschange("landmark")}/>


Alternate no:<input type="text"  className="form-control" id="alternate" placeholder="Alternate number" value={alternate}   onChange={()=>this.handeladdresschange("alternate")}/>

   
</div> 
   </div>
   
   </div>
   
   <div className="row" id="carderror" className={addressupdatedclass} role="alert" hidden={this.state.addressupdated}>
       {addressdata}
       </div>
  
   </form>
   <button  className="btn btn-primary" onClick={this.updateaddress}>Update</button>
   <button className="btn btn-success" onClick={this.ship}>Continue</button>
   <button className="btn btn-outline-danger"><Link to="/">Cancel</Link></button>
   </div>
  
 </div>
     const Review =   <div className="col-4">
     <div className="card card-checkout" >
<div className="card-body" align="left">
<h2 className="card-title">Order Review :</h2>
<h3>cart value: ₹ {this.props.checkout.price} </h3> 
<h3>Delevery charges : ₹  40</h3>
<hr></hr>
<h3 className="card-text">Total : ₹  {this.state.price}  only</h3>

</div>
</div>
   
     
     </div>  
     const Payment = <div className="col-5"  >
    
   
     <div classNAme="container md-form">
     <h2 align = "left">Payment</h2>
    
       <h1>Pay via card</h1> 

       <div className="row">
       <input type="text"  className="form-control" id="cardno" placeholder="Enter Card Number" maxLength="16"></input></div>
       <div className="row">
       <div className="col-3" align="left">
       <input type="text"  className="form-control" id="cvv" placeholder="CVV" maxLength="3"></input>
       </div>
       <div className="col-3" align="left">
       <input type="text"  className="form-control" id="pin" placeholder="PIN" maxLength="4"></input>
       </div></div>
       <div className="row" id="carderror" className="alert alert-danger" role="alert" hidden={this.state.errorcard}>
         Please Enter correct details
       </div>
       <div align = "center">
         <button className="btn btn-success" onClick={this.PaymentCnf}>Confirm</button>
         <button className="btn btn-warning"><Link to="/">Cancel</Link></button>
       </div>
      
       </div>
       <div align = "center">
         <h1>OR</h1>
         <button className="btn btn-primary btn-lg " onClick={this.COD}>Cash On Delevery</button>
       </div>
       </div>
       if(this.state.orderplaced){
         return(
          <div classNAme="container success" >
          <div className="row">
            <div className="col-3">
           
            </div>
            <div className="col-6">
          <div className="card text-center">
          <div className="card-header">
            <h1>Congratulation </h1>
          </div>

          <div className="card-body bd">
            <h3 className="card-title">Order Placed Succesfull!!!</h3>
            <h4 className="card-text">now get extra 10 % discount on Shopping.</h4>
            <Link to="/" className="btn btn-primary">Shop Now</Link>
          </div>
          <div className="card-footer text-muted">
          <Link to="/Myorders"> Check order Status</Link>
          </div></div>
        </div>
        </div></div>
         )
       }
     if(this.state.shipping)
     {
      return(
        <div classNAme="container" >
        <div className="row">
          <div className="col-3">
         
          </div>
          {Shipping}
          {Review}
        </div>

        </div>
      
    )
     }else if(this.state.payment)
       return (
        <div classNAme="container" >
        <div className="row">
          <div className="col-3">
         
          </div>
         {Payment}
          {Review}
        </div>

        </div>
       )
     else{

       return(
       <div className="load">
        <span className="spinner-grow spinner-grow-sm" role="status"></span>
       <h2>Loading</h2>
       </div>)
     }   
       
    }
}
export default Checkout;