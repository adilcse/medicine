import React,{Component} from 'react';
import {Icon,Item} from 'semantic-ui-react';
import Searchcomponent from './Components/search/Search';
import "./Home.css";
import Popup from "reactjs-popup";
import Login from './Components/login/Login';
import Body from './Body';
import Register from './Components/register/Register';
import Nav from './Components/navigation/nav';
import * as firebase from "firebase/app";
import "firebase/auth";
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAuCg2E3sWkzwwmAT-3W7iu5RNN-C0r87U",
    authDomain: "med-life.firebaseapp.com",
    databaseURL: "https://med-life.firebaseio.com",
    projectId: "med-life",
    storageBucket: "",
    messagingSenderId: "799069840222",
    appId: "1:799069840222:web:0957d160b3d30bb8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

class Home extends Component{
	
	constructor(props) {
    super(props);
    this.state = {
     signinopen: false,
     registeropen:false,
     home:"active",
     myorder : "inactive",
     signedin : false,
     tab:"home"
    
     };
    this.signinbox = this.signinbox.bind(this);
   
     this.registerbox = this.registerbox.bind(this);
    
	 this.activestate = this.activestate.bind(this);
	 this.trylogin = this.trylogin.bind(this);
	  this.signout = this.signout.bind(this);
	  let obj=this;
firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
  	
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
        
         });
          break;
      case "myorder" :
        this.setState({ 
         home: "inactive",
         myorder :"active"

         });
          break;
       default :
        this.setState({ 
         home: "active",
         myorder :"inactive",
        
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
  h/>

    <Body tab={this.state.tab}/>
  </div>

				
	);
}
} 

export default Home;