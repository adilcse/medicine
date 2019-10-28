import React,{Component} from 'react';
import Card from './Components/card/Card';
import './Body.css';
import AddItems from './Components/addItem/addItems';
import {db} from './firebaseconnect';
import ItemView from './Components/itemView/ItemView';
import EditItem from './Components/itemView/EditItem';
import {Switch,Route} from 'react-router-dom';
import Mycart from './Components/cart/Mycart';
import Profile from './Components/profile/Profile';
import Orders from './Components/myorders/orders';
import Checkout from './Components/checkout/Checkout';
import ErrorPage from './Components/itemView/ErrorPage';
let source= [];
const MAX=9;
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
this.MyCart = this.MyCart.bind(this);
this.LoadMore = this.LoadMore.bind(this);
this.MyProfile = this.MyProfile.bind(this);
this.Checkout = this.Checkout.bind(this);
this.EditItem = this.EditItem.bind(this);
}
MyCart=()=>{
  return(
    <Mycart cartitems={this.props.cartitems}
    user={this.props.user}
    checkout={this.props.checkout}
    checkoutf={this.props.checkoutf}
    />
    );
}
fetchitems=()=>{
  let query;
 this.setState({
   loaded: this.state.loaded+MAX,
   itemfetched :false
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
       
    });
}).then(()=>{

  this.setState({
    itemfetched :true,
    source : source
  })
});


}
LoadMore=()=>{
 if(this.state.loaded<=this.state.source.length)
return(
 <center> <div>
   
   
    <button className="btn-body" onClick={()=>{
     this.setState({loadmax :this.state.loadmax+MAX})
    }}>More....</button>

  </div>
  </center>
)
else{
  return(
    <h1>Sorry!no more content...☹️</h1>
  )
}
  
}
Home=()=>{
  let load;
    if(this.state.loaded<this.state.loadmax){
    this.fetchitems();
   
    return <div className="load" status="load">
    <span className="spinner-grow spinner-grow-sm" role="status"></span>
    <h2>Loading</h2></div>
  }
  
  if(this.state.itemfetched){
   load= <this.LoadMore/>
  }
  else{
    return <div className="load" status="load">
    <span className="spinner-grow spinner-grow-sm" role="status"></span>
    <h2>Loading</h2></div>
  }
	return(<div className="  container home-container">
        	{this.state.source.map((data,i)=>{
        	 return	<Card key={i} 
                source={data}
                checkoutf={this.props.checkoutf}
                addtocart={this.props.addtocart}
                user={this.props.user}
        		/>
          })
    
          
        
          
            }
          
          {load}
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
      <Orders
      user={this.props.user}
      />
      );
}
MyProfile=()=>{
  return(
      <Profile
      user={this.props.user}
      />
      );
}
Checkout=()=>{
  return(
      <Checkout
      checkout={this.props.checkout}
      user={this.props.user}
      cart={this.props.cartitems}

      {...this.props}
      />
      );
}
EditItem=()=>{
  return (<EditItem
  isAdmin={this.props.isAdmin}
  {...this.props}
  />);

}
render(){

 
return(
  <div className="main-body bk">
    <Switch>
   
          <Route path="/addItems" exact>
          <this.AddItems/>
           </Route>
           <Route path="/Product/:id" exact render={props=><ItemView 
           addtocart={this.props.addtocart}
            checkoutf={this.props.checkoutf} 
            isAdmin={this.props.isAdmin}
           user={this.props.user} {...props}/>}/>
           <Route path="/Myorders" exact><this.MyOrders/></Route>
            <Route path="/Mycart" exact><this.MyCart/></Route>
            <Route path="/Profile" exact><this.MyProfile/></Route>
            <Route path="/Checkout" exact><this.Checkout/></Route>
            <Route path="/EditItem/:id" exact render={props=><EditItem
            isAdmin={this.props.isAdmin}
            user={this.props.user}
            {...props}
            
            />}></Route>
           <Route path="/" exact>
              <this.Home/>
          </Route>
          <Route path="/" >
              <ErrorPage/>
          </Route>
      </Switch>
      </div>
)
  

}
}
export default Body;