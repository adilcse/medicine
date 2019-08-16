import React,{Component} from 'react';
import {Icon,Item} from 'semantic-ui-react';
import Searchcomponent from '../search/Search';

import Popup from "reactjs-popup";
import Login from '../login/Login';
import Register from '../register/Register';
class Nav extends Component{
	constructor(props){
		super(props);
}
	render(){
		

			let button;
		
	if(!this.props.signinstatus){
		button= <li className="nav-item btn-group" >
	       <Popup 
	       	  open={this.props.signinopen}
	        trigger={  <a className="nav-link" href="#" align="right" >	sign in <Icon name='sign-in' size='large' /> </a>}
	        position=" center center"
	        modal
	        closeOnDocumentClick
	         onClose={()=>this.props.signinbox(false)}
	         onOpen= {()=>this.props.signinbox(true)}
	        > 
	         <div><Login cancel={()=>this.props.signinbox(false)} login={this.props.trylogin} firebase={this.props.firebase}/></div>
	  </Popup>
	   <Popup
	       	  open={this.props.registeropen}
	        trigger={ <a className="nav-link" href="#" align="right" >	sign up <Icon name='signup' size='large' /> </a>}
	        position=" center center"
	        modal
	        closeOnDocumentClick
	         onClose={()=>this.props.registerbox(false)}
	         onOpen= {()=>this.props.registerbox(true)}
	        > 
	         <div><Register cancel={()=>this.props.registerbox(false)} firebase={this.props.firebase} register={this.props.trylogin}/></div>
	  </Popup>
	          </li>;
	    }else{
	    	button = <li className="nav-item btn-group active " align="right"   >
         <a className="nav-link"   href="#" onClick={this.props.signout}>Signout <Icon name='sign-out' size='large' /> </a>
         <a className="nav-link" href="#"> Welcome {this.props.user.displayName} <Icon name='user' size='large' /> </a>
      
      </li>;
	    }
		return(
		<div align="center">
		<nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark" align="left">
  <a className="navbar-brand" href="#"> <Icon name='leaf' size='large' /> MedLife </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item" className={this.props.home} onClick={()=>this.props.activestate("home")}>
        <a className="nav-link" href="#">Home  <Icon name='home' size='large' /> </a>
      </li>
      <li className="nav-item" className={this.props.myorder} onClick={()=>this.props.activestate("myorder")}>
        <a className="nav-link"   href="#">My Orders  <Icon name='cart' size='large' /> </a>
      </li>
     
      <li align="center"> 
       <Searchcomponent className=" wd"   />
      </li>
     
     {button}
      
 		</ul>
       
    
   
   
    
  </div>
   </nav>
   </div>
   );
	}
}
export default Nav;