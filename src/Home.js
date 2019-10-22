import React,{Component} from 'react';

import "./Home.css";

import Body from './Body';

import Nav from './Components/navigation/nav';
import {db,firebase} from './firebaseconnect';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
let cartRef;
 

class Home extends Component{
  
	constructor(props) {
    super(props);
    this.state = {
     signinopen: false,
     registeropen:false,
      searchurl : null,
     signedin : false,
     isAdmin :false,
    cartitems:[],
     
     useremail :""
    
     };
    this.signinbox = this.signinbox.bind(this);
   
     this.registerbox = this.registerbox.bind(this);
    
     this.searchchanged = this.searchchanged.bind(this);
	 this.trylogin = this.trylogin.bind(this);
    this.signout = this.signout.bind(this);
    this.addtocart = this.addtocart.bind(this);
    

	 

	 
  }
  componentDidMount(){
    let obj=this;
    firebase.auth().onAuthStateChanged(function(user) {
     
      if (user) {
        const uid=user.uid;
        let userRef = db.collection('LastUser').doc(uid);
    let getDoc = userRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('user not exist');
           obj.setState({
        isAdmin:false
       });
        } else {
          let userdetails = doc.data();
          obj.setState({
            uid:doc.id,
            useremail : userdetails.email,
            user:user,
            signedin:true
           });
         
          if(userdetails.type === "admin"){
            obj.setState({
        isAdmin:true
       
       });
          }
        }
        return doc.data();
      }).then(user=>{
       userRef.collection("Cart").orderBy("time", "desc").onSnapshot(function(querySnapshot) {
        var items = [];
        querySnapshot.forEach(function(doc) {
            items.push(doc.data());
        });
       obj.setState({
         cartitems:items
       })
    });
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
      
      } else {
        console.log("check");
         obj.setState({user:false,
          signedin: false
        });
      }
    });
   
    
  }
  signinbox(status) {
    this.setState({ signinopen: status });
   
  }
 
   registerbox(status) {
    this.setState({ registeropen: status });
      
  }
//check which tab in current
  

//try login
trylogin(status=false){
	let x=this;
console.log("Login status",status);
if(status)
{	x.setState({
			signedin:true
		});


}else{
	x.setState({
			signedin:false
		});
}
console.log("signedin ",this.state.signedin);
}
//do signout stuff here
signout(){
	firebase.auth().signOut().then(function() {
  window.alert("logged out");
  
}).catch(function(error) {
   window.alert("something went wrong");
});
	this.setState({
			signedin:false,
			signinopen: false ,
			 registeropen: false
		});
}
searchchanged(url){
	this.setState({
    searchurl : url
  });
  


}
addtocart=(item)=>{
  
cartRef=db.collection("LastUser").doc(this.state.uid).collection("Cart");
 cartRef.doc(item.item_id).set({
   item : item,
   time : firebase.firestore.FieldValue.serverTimestamp(),
   numbers : 1
  
}, { merge: true })
.then(function() {
  console.log("item added to cart");
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});


  
}
render(){

return(
  <Router>
  <div>
  <Nav signinstatus={this.state.signedin}
  signinopen={this.state.signinopen}
  registeropen={this.state.registeropen} 
  signinbox={this.signinbox}
  registerbox={this.registerbox}
  trylogin={this.trylogin}
  firebase={firebase}
  myorder={this.state.myorder}
  user={this.state.user}
  signout={this.signout}
  isAdmin={this.state.isAdmin}
  searchchanged={this.searchchanged}
  cartitems={this.state.cartitems}
  user = {this.state.user}
  />

    <Body 
     isAdmin={this.state.isAdmin}
     addtocart={this.addtocart}
     cartitems={this.state.cartitems}
     user = {this.state.user}
    />
   
  </div>
  </Router>
				
	);
}
} 

export default Home;