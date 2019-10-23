import React, { Component } from 'react';
import './itemview.css'
import {db} from '../../firebaseconnect';
import  { Switch,  Link ,Route} from "react-router-dom";
import Checkout from "../checkout/Checkout";
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
      
      console.log(this.props)
    }
    componentWillMount(){
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


    render(){
        console.log(this.props);
        let item = this.state.item[0];
         if(item)
       { return(       
<div className="container item">
    <img src={item.imageurl} alt={item.name}/>
    <ul><li><h1>{item.name}</h1></li>    
        <li><h1>Price :  {item.price} Only </h1>
    <p>  with 10% discount </p>
    </li>
    <li>    <Link className="navbar-brand" to="/Checkout"  onClick={()=>this.props.checkoutf(this.state.item,this.state.item.price,"item")}>
        <button className="btn btn-info"> checkout</button></Link></li>
    <li><button className="btn btn-warning" onClick={()=>this.props.addtocart(this.state.item[0])}> add to cart</button></li>
    <li><p>{this.state.item.description}</p></li>
    </ul>
    <span className="pcolor"></span>
    <span className="pcolor"></span>
    </div>
  
        )}
        else {
            return(
            <div className="load">
    <span className="spinner-grow spinner-grow-sm" role="status"></span>
    <h2>Loading</h2>
    
    </div>
   
            )
        }
    }
}

export default ItemView;