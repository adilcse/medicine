import React, { Component } from 'react';
import './itemview.css'
import {db} from '../../firebaseconnect';


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "http://img1a.flixcart.com/www/linchpin/fk-cp-zion/css/app.chunk.0cf296.css";
document.head.appendChild(styleLink);


class ItemView extends Component{
    constructor(props){
        super(props);
        this.state={
            item:null,
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
               
                obj.setState({
                    item : doc.data()
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
         if(this.state.item )
       { return(
<div>
            <div className="heading">
            <h1>{this.state.item.name}</h1>
            </div>
<div className="item">
    <img src={this.state.item.imageurl} alt={this.state.item.name}/>
    <ul>
    <li><input className="btnn" type="submit" value="checkout"></input></li>
    <li><input className="btnn" type="submit" value="add to cart" onClick={()=>this.props.addtocart(this.state.item)}/></li>
    </ul>
    <span className="pcolor"><p>{this.state.item.description}</p></span>
    <span className="pcolor"><p>Only {this.state.item.price} Rupees with 10% discount </p></span>
    </div>
    </div>
        )}
        else {
            return(
            <div className="load">
    <span className="spinner-grow spinner-grow-sm" role="status"></span>
    <h2>Loading</h2></div>
            )
        }
    }
}

export default ItemView;