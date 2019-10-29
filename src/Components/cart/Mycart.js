import React,{Component} from 'react';
import CartCard from './cartCard';
import  {  Link,Redirect } from "react-router-dom";
import './cart.css';
let total;
class Mycart extends Component{
constructor(props){
    super(props)
    this.state={
        checkout : false
    }
}
    checkout=()=>{
        this.props.checkoutf(this.props.cartitems,total,"cart");
       this.setState({
           checkout : true
       })
        
    }
    render(){
       
       if(this.state.checkout){
           return(
               <Redirect to= "/Checkout"/>
           )
       }
        
        if(this.props.cartitems.length <=0){
            total = 0;
            return(
                <div  className="cl2">
            <div className="not-admin">No item in cart</div>
            <Link className="navbar-brand" to="/"> Shop Now </Link>
            </div>
                )
        }else{
            total = 0;
            this.props.cartitems.forEach(element => {
                total = total + parseInt(element.item.price) * parseInt(element.numbers)
            });
    
        return(
            <div className="container">
            <div className="row">
            <div className="col-sm-1">
            </div>
            <div className="col-sm-8">
            {this.props.cartitems.map((data,i)=>{
           return <CartCard key={i} 
            <div classNAme="container-fluid">
            <div className="row">
              <div className="col">
                
              </div>
              <div className="col-6 cl2">
            
        	{this.props.cartitems.map((data,i)=>{
        	 return	<CartCard key={i} 
                item={data}
                user={this.props.user}
        		/>
          })
    
            }
            </div>
             <div className="col-sm-3">
            <h1>Total : ₹ {total}/- </h1>
             <button className="btn btn-primary btn-lg" onClick={this.checkout.bind(this)}>Checkout</button>
           <Link className="navbar-brand" to="/">  <button className="btn btn-primary btn-lg" >Shop More</button> </Link>
            </div>
            </div>
           
            <div>

              </div>
              <div className="col cart-total cl2">
              <h1>Total : ₹ {total}/- </h1> 
           <button className="btn btn-primary btn-lg" onClick={this.checkout.bind(this)}>Checkout</button>
           <Link className="navbar-brand" to="/">  <button className="btn btn-info btn-lg" >Shop More</button> </Link>
        
              </div>
            </div>
            </div>
          
          
    
          
        )
        }
       
    }
}
export default Mycart;