import React,{Component} from 'react';
import faker from 'faker';
import _ from 'lodash';
import Card from './Components/card/Card';
import './Body.css';

const source = _.times(20, () => ({
  title: faker.commerce.productName(),
  desc: faker.lorem.paragraph(),
  image: faker.image.sports(),
  price: faker.commerce.price(),
  dis : "20"
}))
let paragraph=faker.lorem.paragraph();


class Body extends Component{

        
render(){
	 const tab = this.props.tab;
let mainbody =<div/> ;
if(tab === "home"){
	return(<div className=" home container">
        	{source.map((data,i)=>{
        	 return	<Card key={i} 
        			  image={data.image}
        			  desc={data.desc}
        			  title={data.title}
        			  price={data.price}
        			  dis={data.dis}
        		/>
        	})}
       </div>);
}else{
	return(
	<h2>  orders </h2>
	);
}

}
}
export default Body;