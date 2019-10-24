import React,{Component} from 'react';
import  {  Link } from "react-router-dom";
import './cart.css';
import {db,firebase} from '../../firebaseconnect';
let user;

class CartCard extends Component{
    constructor(props){
        super(props)
        this.additem = this.additem.bind(this);
        this.removeitem = this.removeitem.bind(this);
        user = this.props.user;
       
    }
    additem=()=>{
       let cartRef=db.collection("LastUser").doc(user.uid).collection("Cart");
        cartRef.doc(this.props.item.item.item_id).set({
          numbers :  firebase.firestore.FieldValue.increment(1)
         
       }, { merge: true })
       .then(function() {
         console.log("quantity increased");
       })
       .catch(function(error) {
         console.error("Error writing document: ", error);
       });
       

    }
    removeitem=(num)=>{
       let cartRef=db.collection("LastUser").doc(user.uid).collection("Cart").doc(this.props.item.item.item_id);
        cartRef.set({
          numbers :  firebase.firestore.FieldValue.increment(-1)
         
       }, { merge: true })
       .then(function() {
         num--;
       if(num<=0){
         cartRef.delete().then(()=>{
           console.log("item deleted")
         })
         }

       })
       .catch(function(error) {
         console.error("Error writing document: ", error);
       });

    }
    render(){
     
       let source = this.props.item.item;
    
        return (
           
            <div className="card mb-5 cl2" >
               
  <div className="row no-gutters">
   
    <div className="col-md-4">
      <img src={source.imageurl} className="card-img" alt={source.name}/>
    </div>
    <div className="col-md-8">
      <div className="card-body" align="left">
      <Link to={`/Product/${source.item_id}`}>  <h4 className="card-title">{source.name}  </h4> </Link>
    
        <h4> ₹ {source.price}  only   </h4> 
        Quantity : <button className="btn btn-success" onClick={this.additem}>Add</button>  {this.props.item.numbers} <button className="btn btn-warning" onClick={()=>this.removeitem(this.props.item.numbers)}>Remove</button> 
        
       
    
   
       
      </div>
    </div>
   
  </div>
</div>

        )
    }
}
export default CartCard;