import React,{Component} from 'react';
import _ from 'lodash';
import Card from './Components/card/Card';
import './Body.css';
import AddItems from './Components/addItem/addItems';
import {db} from './firebaseconnect';
import ItemView from './Components/itemView/ItemView';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { thisExpression } from '@babel/types';
let source= new Array ();
let lastsnapshot=null;
const MAX=2;
class Body extends Component{
constructor(props){
super(props)
this.state={
  source : [],
 loadmax :MAX,
loaded : 0
  
}
this.fetchitems = this.fetchitems.bind(this);
this.Home = this.Home.bind(this);
this.AddItems = this.AddItems.bind(this);
this.Product = this.Product.bind(this);
this.MyOrders = this.MyOrders.bind(this);
this.LoadMore = this.LoadMore.bind(this);
}
fetchitems=()=>{
  let query;
 this.setState({
   loaded: this.state.loaded+MAX
 })

 if(source.length>0){
   query =db.collection("Items").orderBy("name").startAfter(source[source.length-1].name);
 }
 else{
  query =db.collection("Items").orderBy("name");
 }
 query.limit(MAX).get().then(function(querySnapshot) {
   
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
       
        source.push(doc.data());
        console.log(source.length);
    });
}).then(()=>{
 console.log(source);
  this.setState({
    itemfetched :true,
    source : source
  })
});


}
LoadMore=()=>{
return(
  <div>
    <button className="btn" onClick={()=>{
     this.setState({loadmax : this.state.loadmax+MAX})
    }}>More....</button>
  </div>
)

  
}
Home=()=>{
  console.log("home called");
    if(this.state.loaded<this.state.loadmax){
    this.fetchitems();
    console.log("item not fetched");
    return <div className="load" status="load">
    <span className="spinner-grow spinner-grow-sm" role="status"></span>
    <h2>Loading</h2></div>
  }
	return(<div className=" home container">
        	{this.state.source.map((data,i)=>{
        	 return	<Card key={i} 
                source={data}
        		/>
          })}
         <this.LoadMore/>
       </div>);
}
AddItems=()=>{
  return(
     <div className="addItemcss">
  <div className="row">
    <div className="col-md">
     
    </div>
    <div >
     <AddItems
     isAdmin={this.props.isAdmin}
     />
    </div>
    <div className="col-md">
    
    </div>
  </div>
</div>
  );
}
Product=()=>{
  return(
  <ItemView/>
  )
}
MyOrders=()=>{
  return(
      <h2>  Orders </h2>
      );
}
render(){
  
return(

    <Switch>
   
          <Route path="/addItems">
          <this.AddItems/>
           </Route>
           <Route path="/Product/:id" component={ItemView}/>
           <Route path="/Myorders"><this.MyOrders/></Route>
           <Route path="/" exact>
              <this.Home/>
          </Route>
      </Switch>
   
)
  

}
}
export default Body;