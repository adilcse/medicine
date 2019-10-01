import React from 'react';
import './Card.css';
import  {  Link } from "react-router-dom";
function Card({image,title,desc,price,dis,itemClicked,source}){
  
return(
 
<div className="card mb-3 cl1 bd" >
  <div className="row no-gutters">
   
    <div className="col-md-4">
      <img src={source.imageurl} className="card-img" alt={source.name}/>
    </div>
    <div className="col-md-8">
      <div className="card-body" align="left">
      <Link to={`/Product/${source.item_id}`}>  <h4 className="card-title">{source.name}<br/>
         {source.price} ₹ only   </h4> </Link> <h5>10 % off</h5>
       
    
        <p className="card-text">{source.description}</p>
       
      </div>
    </div>
   
  </div>
</div>

);
}
export default Card;