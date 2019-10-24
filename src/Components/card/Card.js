import React from 'react';
import './Card.css';
import  {  Link } from "react-router-dom";
function Card({source}){
  
return(
 
<div className="card mb-3 cl1 bd" >
  <div className="row no-gutters">
   
    <div className="col-md-4">
    <Link to={`/Product/${source.item_id}`}>  <img src={source.imageurl} className="card-img" alt={source.name}/></Link>
    </div>
    <div className="col-md-8">
      <div className="card-body" align="left">
      <Link to={`/Product/${source.item_id}`}>  <h4 className="card-title">{source.name} </h4><br/>
      <div className="cardprice"> {source.price} ₹ only  </div> </Link> <h5>10 % off</h5>
       
    
        <p className="card-text">{source.description}</p>
       
      </div>
    </div>
   
  </div>
</div>

);
}
export default Card;