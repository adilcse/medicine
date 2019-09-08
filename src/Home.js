import React,{Component} from 'react';
import {Icon,Item} from 'semantic-ui-react';
import Searchcomponent from './Components/search/Search';
import "./Home.css";
import Popup from "reactjs-popup";
import Login from './Components/login/Login';
import Body from './Body';
import Register from './Components/register/Register';
import Nav from './Components/navigation/nav';
import {db,firebase} from './firebaseconnect';


 

class Home extends Component{
	
	constructor(props) {
    super(props);
    this.state = {
     signinopen: false,
     registeropen:false,
     home:"active",
     addItems : "inactive",
     myorder : "inactive",
     signedin : false,
     tab:"home",
     isAdmin :false,
    
     useremail :""
    
     };
    this.signinbox = this.signinbox.bind(this);
   
     this.registerbox = this.registerbox.bind(this);
    
	 this.activestate = this.activestate.bind(this);
	 this.trylogin = this.trylogin.bind(this);
	  this.signout = this.signout.bind(this);
      this.addItems = this.addItems.bind(this);
    this.itemClicked = this.itemClicked.bind(this);
	  let obj=this;
firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    const uid=user.uid;
  	let userRef = db.collection('LastUser').doc(uid);
let getDoc = userRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('user not admin');
       obj.setState({
    isAdmin:false
   });
    } else {
      console.log('Document data:', doc.data());
      let userdetails = doc.data();
      if(userdetails.type === "admin"){
        obj.setState({
    isAdmin:true,
    useremail : userdetails.email
   });
      }
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
   obj.setState({
   	user:user,
   	signedin:true

   });
  } else {
  	console.log("check");
     obj.setState({user:false});
  }
});
	 
  }

  itemClicked=(item)=>{
    console.log(item);
    this.setState({
      itemView:true,
      itemSelected :item,
      tab : "itemView"
    })
    }
  signinbox(status) {
    this.setState({ signinopen: status });
   
  }
 
   registerbox(status) {
    this.setState({ registeropen: status });
      
  }
//check which tab in current
  activestate(tab){
    switch(tab){
      case "home":
        this.setState({ 
         home: "active",
         myorder :"inactive",
         addItems : "inactive"
        
         });
          break;
      case "myorder" :
        this.setState({ 
         home: "inactive",
         myorder :"active",
          addItems : "inactive"

         });
          break;
            case "addItems" :
        this.setState({ 
         home: "inactive",
         myorder :"inactive",
         addItems : "active"

         });
          break;
       default :
        this.setState({ 
         home: "active",
         myorder :"inactive",
         addItems : "inactive"
         });  
       }

      this.setState({ 
         tab:tab

         }); 
  
  }
  

//try login
trylogin(status=false){
	let x=this;
console.log("Login status",status);
if(status)
{	x.setState({
			signedin:true
		});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    x.setState({user:user});
  } else {
     x.setState({user:false});

  }
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

addItems(){
  this.activestate("addItems");

}

render(){
	
return(
  <div>
  <Nav signinstatus={this.state.signedin}
  signinopen={this.state.signinopen}
  signinbox={this.signinbox}
  registerbox={this.registerbox}
  trylogin={this.trylogin}
  firebase={firebase}
  registeropen={this.state.registeropen}
  home={this.state.home}
  myorder={this.state.myorder}
  user={this.state.user}
  activestate={this.activestate}
  signout={this.signout}
  isAdmin={this.state.isAdmin}
  addItemstab={this.state.addItems}
  addItems={this.addItems}
  />

    <Body 
    tab={this.state.tab}
    itemClicked={this.itemClicked}
    itemSelected={this.state.itemSelected}
    
    />
  </div>

				
	);
}
} 

export default Home;