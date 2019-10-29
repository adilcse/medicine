import React, { Component } from 'react';
import './itemview.css'
import {db} from '../../firebaseconnect';
import  {   Link } from "react-router-dom";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "http://img1a.flixcart.com/www/linchpin/fk-cp-zion/css/app.chunk.0cf296.css";
document.head.appendChild(styleLink);


class ItemView extends Component{
    constructor(props){
        super(props);
        this.state={
            item:[],
          id : null,
          itemsincart:0
        }
        this.fetchItem=this.fetchItem.bind(this);
        this.addtocart=this.addtocart.bind(this);
      
      console.log(this.props)
    }
    componentWillMount(){
        console.log(this.props)
        this.setState({
            id :this.props.match.params.id
        })
    }
   
    fetchItem=()=>{
        const obj=this;
        db.collection("Items").doc(this.state.id).get().then(function(doc) {
            if (doc.exists) {
               let itm=[doc.data()]
                obj.setState({
                    item : itm
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        }).then(()=>{
         
          obj.setState({
            itemfetched :true
          })
        });
        
    }
    componentDidMount(){
        this.fetchItem();
    }
    addtocart=()=>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        if(!this.props.user){
                x.innerHTML="Please Login First";
                return;

        }
        this.props.addtocart(this.state.item[0]);
    }

    render(){
     
        let item = this.state.item[0];
        if(item)
        { 
          
        let btn=<ul><li><button className="btn btn-warning" onClick={this.addtocart}> add to cart</button></li>
        <li>    <Link className="navbar-brand" to="/Checkout"  onClick={()=>this.props.checkoutf(this.state.item,item.price,"item")}>
                <button className="btn btn-info"> checkout</button></Link></li> </ul>
       if(this.props.isAdmin){
           console.log(this.props)
        btn=<ul><li><button className="btn btn-warning" onClick={this.addtocart}> add to cart</button></li>
        <li>    <Link className="navbar-brand" to="/Checkout"  onClick={()=>this.props.checkoutf(item,item.price,"item")}>
                <button className="btn btn-info"> checkout</button></Link></li>
                <li>  <Link to={`/EditItem/${item.item_id}`} > <button className="btn btn-info"> EDIT</button></Link></li>
                 </ul>
       }
       
           return(       
<div className="container-fluid item">
<img src={item.imageurl} alt={item.name}/><br/>
<div>
{btn}
        <div id="snackbar">Item Added to Cart</div>
       
        </div>
        <br/>
  
    <ul><li><h1>{item.name}</h1></li>    
        <li><h1><i><small><strike>MRP ₹{Math.floor(parseInt(item.price)*1.1)}</strike></small> </i>₹{item.price}</h1>
    <p>  with 10% discount </p>
    </li>
  
    
    <li><p>{item.description}</p></li>
    </ul>
  
        
    </div>
 
        )}
        else {
            return(
            <div className=" container-fluid load">
    <span className="spinner-grow spinner-grow-sm" role="status"></span>
    <h2>Loading</h2>
    
    </div>
   
            )
        }
    }
}

export default ItemView;