import React,{Component} from 'react';
import  {  Link } from "react-router-dom";
class OrderCard extends Component{
    

render(){
  if(!this.props.source){
    return;
  }
  let source=this.props.source;
    return(
              <div className="card mb-5" >
               
  <div className="row no-gutters">
   
    <div className="col-md-4">
      <img src={source.imgurl} className="card-img" alt={source.name}/>
    </div>
    <div className="col-md-8">
      <div className="card-body" align="left">
      <Link to={`/Product/${source.item_id}`}>  <h4 className="card-title">{source.name}  </h4> </Link>
    
        <h4> ₹ {source.price}  only   </h4> 
        Quantity :  {source.number} 
        
       
    
   
       
      </div>
    </div>
   
  </div>
</div>
    )
}
}
export default OrderCard;