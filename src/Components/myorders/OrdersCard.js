import React,{Component} from 'react';
import  {  Link } from "react-router-dom";
class OrderCard extends Component{
    

render(){
  let source=this.props.source;
  let number=1;
  console.log(this.props.source)
  if(!this.props.source){
    return;
  }
  if(this.props.source.item){
    number = source.numbers
    source=source.item
    

  }
  
    return(
              <div className="card mb-5 " >
               
  <div className="row order-row">
   
    <div className="col-md-4">
      <img src={source.imageurl} className="card-img order-img" alt={source.name}/>
    </div>
    <div className="col-md-8">
      <div className="card-body" align="left">
      <Link to={`/Product/${source.item_id}`}>  <h4 className="card-title">{source.name}  </h4> </Link>
    
        <h4> ₹ {source.price}  only   </h4> 
        Quantity :  {number} 
        
       
    
   
       
      </div>
    </div>
   
  </div>
</div>
    )
}
}
export default OrderCard;