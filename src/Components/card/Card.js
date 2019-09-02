import React from 'react';
import './Card.css';
function Card({image,title,desc,price,dis}){
return(
<div className="card mb-3 cl1 bd" >
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src={image} className="card-img" alt={title}/>
    </div>
    <div className="col-md-8">
      <div className="card-body" align="left">
        <h4 className="card-title">{title}
        <h4> {price} ₹ only  <h5>{dis} % off</h5></h4>
       
        </h4>
        <p className="card-text">{desc}</p>
       
      </div>
    </div>
  </div>
</div>
);
}
export default Card;