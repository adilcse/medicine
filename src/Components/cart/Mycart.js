import React,{Component} from 'react';
import CartCard from './cartCard';
import  {  Link } from "react-router-dom";
import './cart.css';

class Mycart extends Component{

    render(){
        let total;
        console.log("cart changed")
       
        
        if(this.props.cartitems.length <=0){
            total = 0;
            return(
                <div  >
            <h1>No item in cart</h1>
            <Link className="navbar-brand" to="/"> Shop Now </Link>
            </div>
                )
        }else{
            total = 0;
            this.props.cartitems.forEach(element => {
                total = total + parseInt(element.item.price) * parseInt(element.numbers)
            });
    
        return(
            
           <div >
        	{this.props.cartitems.map((data,i)=>{
        	 return	<CartCard key={i} 
                item={data}
                user={this.props.user}
        		/>
          })
    
            }
           <h1>Total : {total} </h1> 
           <button className="btn btn-primary btn-lg" >Checkout</button>
           <Link className="navbar-brand" to="/">  <button className="btn btn-info btn-lg" >Shop More</button> </Link>
        
       </div>
          
        )
        }
       
    }
}
export default Mycart;