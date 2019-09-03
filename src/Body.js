import React,{Component} from 'react';
import _ from 'lodash';
import Card from './Components/card/Card';
import './Body.css';
import AddItems from './Components/addItem/addItems';
import {firebase,db} from './firebaseconnect';

let source= new Array ();
class Body extends Component{
constructor(props){
super(props)
this.state ={
  itemfetched : false
}
this.fetchitems = this.fetchitems.bind(this);
}
fetchitems=()=>{
  db.collection("Items").orderBy("name").limit(10).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        source.push(doc.data());
    });
}).then(()=>{
  console.log("logged")
  this.setState({
    itemfetched :true
  })
});


}
     componentDidMount(){
      const tab = this.props.tab;
      if(tab === "home"){
        this.fetchitems();
      }
     } 
render(){
	 const tab = this.props.tab;
let mainbody =<div/> ;
if(tab === "home"){
  if(!this.state.itemfetched){
    return <div><h2>Loading</h2></div>
  }
	return(<div className=" home container">
        	{source.map((data,i)=>{
        	 return	<Card key={i} 
        			  image={data.imageurl}
        			  desc={data.description}
        			  title={data.name}
        			  price={data.price}
        			  dis={10}
        		/>
        	})}
       </div>);
}else if(tab === "addItems"){
	return(
   <div className="addItemcss">
  <div className="row">
    <div className="col-md">
     
    </div>
    <div >
     <AddItems/>
    </div>
    <div className="col-md">
    
    </div>
  </div>
</div>
	
	);
}
else{
  return(
  <h2>  Orders </h2>
  );
}
}
}
export default Body;