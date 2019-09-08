import React from 'react';
import './Card.css';
import { tsPropertySignature } from '@babel/types';
function Card({image,title,desc,price,dis,itemClicked,itemid,source}){
  
return(
<div className="card mb-3 cl1 bd" >
  <div className="row no-gutters" onClick = {()=>itemClicked(source)}>
    <div className="col-md-4">
      <img src={image} className="card-img" alt={title}/>
    </div>
    <div className="col-md-8">
      <div className="card-body" align="left">
        <h4 className="card-title">{title}<br/>
         {price} ₹ only   </h4> <h5>{dis} % off</h5>
       
    
        <p className="card-text">{desc}</p>
       
      </div>
    </div>
  </div>
</div>
);
}
export default Card;