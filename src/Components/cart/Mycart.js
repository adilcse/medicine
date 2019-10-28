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
       
        console.log("cart changed")
       if(this.state.checkout){
           return(
               <Redirect to= "/Checkout"/>
           )
       }
        
        if(this.props.cartitems.length <=0){
            total = 0;
            return(
                <div  className="cl2">
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
            <div className="flex-container">
            <div>
            {this.props.cartitems.map((data,i)=>{
           return <CartCard key={i} 
                item={data}
                user={this.props.user}
            />
          })
    
            }
            </div>
            <div>
            <h1>Total : ₹ {total}/- </h1>
             <button className="btn btn-primary btn-lg" onClick={this.checkout.bind(this)}>Checkout</button>
           <Link className="navbar-brand" to="/">  <button className="btn btn-info btn-lg" >Shop More</button> </Link>
            </div>
            <div>

            </div>
            </div> 
        )
        }
       
    }
}
export default Mycart;