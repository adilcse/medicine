import React,{Component} from 'react';
class CartCard extends Component{
    render(){
       console.log("card")
        return (
            <h1>{this.props.item.item.name}</h1>
        )
    }
}
export default CartCard;