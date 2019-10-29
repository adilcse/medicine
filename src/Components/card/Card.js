import React from 'react';
import { Card as Cardboot ,Button} from 'react-bootstrap';
import './Card.css';
import {Link} from 'react-router-dom';

class Card extends React.Component{
  
   tocart=()=>{
    var x = document.getElementById("snackbar");
     if(this.props.user){

     
    const source= this.props.source;
     
    x.innerHTML="item added to Cart"
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      this.props.addtocart(source);
  }else{
    x.innerHTML="please login first"
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

  }
}
  render(){
    const source= this.props.source;
    let sourcearray=[];
    sourcearray.push(source);

return(



<Cardboot  className="crd shadow" >
<Link to={`/Product/${source.item_id}`}><Cardboot.Img variant="top" src={source.imageurl} className="card-img zoom" />
</Link>
  <Cardboot.Body >
    <Cardboot.Title ><Link  to={`/Product/${source.item_id}`}><div className="title">{source.name}</div></Link></Cardboot.Title>
    <Cardboot.Text >
   <h3 className="pd"><i><small><strike>MRP ₹{Math.floor(parseInt(source.price)*1.1)}</strike></small> </i>₹{source.price}</h3>
    </Cardboot.Text >
    <Link className="navbar-brand " to="/Checkout" >
    <Button variant="primary" onClick={()=>this.props.checkoutf(sourcearray,source.price,"item")}>Buy </Button> 
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
 
);

}}
export default Card;