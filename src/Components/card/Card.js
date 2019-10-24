import React from 'react';
import { Card as Cardboot ,Button} from 'react-bootstrap';
import './Card.css';
import {Link} from 'react-router-dom';

class Card extends React.Component{
  
   tocart=()=>{
    const source= this.props.source;
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      this.props.addtocart(source);
  }
  render(){
    const source= this.props.source;
return(


<div className="shadow">
<Cardboot  className="crd" >
<Link to={`/Product/${source.item_id}`}><Cardboot.Img variant="top" src={source.imageurl} className="card-img zoom" />
</Link>
  <Cardboot.Body>
    <Cardboot.Title><Link to={`/Product/${source.item_id}`}><div className="title">{source.name}</div></Link></Cardboot.Title>
    <Cardboot.Text>
   <h3><i><small><strike>MRP ₹{Math.floor(parseInt(source.price)*1.1)}</strike></small> </i>₹{source.price}</h3>
    </Cardboot.Text>
    <Link className="navbar-brand" to="/Checkout" >
    <Button variant="primary" onClick={()=>this.props.checkoutf(source,source.price,"item")}>Buy </Button> 
    </Link>
    <Button variant="primary"  onClick={this.tocart}>Add to Cart</Button> 
  </Cardboot.Body>
  <div id="snackbar">Item Added to Cart</div>
</Cardboot>
  </div>
);

}}
export default Card;