import React,{Component} from 'react';
import CartCard from './cartCard';
class Mycart extends Component{
    render(){
        return(
         
           <div >
        	{this.props.cartitems.map((data,i)=>{
        	 return	<CartCard key={i} 
                item={data}
        		/>
          })
    
            }
        
       </div>
          
        )
    
       
    }
}
export default Mycart;