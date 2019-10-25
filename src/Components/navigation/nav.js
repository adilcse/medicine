import React,{Component} from 'react';
import {Icon} from 'semantic-ui-react';
import Searchcomponent from '../search/Search';

import Popup from "reactjs-popup";
import Login from '../login/Login';
import Register from '../register/Register';
import  {  Link } from "react-router-dom";

class Nav extends Component{
	

	render(){
		

			let button;
		
	if(!this.props.signinstatus){
		button= <li className="nav-item btn-group" >
	       <Popup 
	       	  open={this.props.signinopen}
	        trigger={  <a className="nav-link" href="#" align="right" >	sign in <Icon name='sign-in' size='large' /> </a>}
	      
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
	       
	        modal
	        closeOnDocumentClick
	         onClose={()=>this.props.registerbox(false)}
	         onOpen= {()=>this.props.registerbox(true)}
	        > 
	         <div><Register cancel={()=>this.props.registerbox(false)} firebase={this.props.firebase} register={this.props.trylogin}/></div>
	  </Popup>
	          </li>;
	    }
	    else if(this.props.isAdmin){
	    		button = <li className="nav-item btn-group active " align="right"   >
				
         <Link className="nav-link"   to="/" onClick={this.props.signout}>Signout <Icon name='sign-out' size='large' /> </Link>
         <Link className="nav-link" to="/Profile"> Profile <Icon name='user' size='large' /> </Link>
          <Link className="nav-link " to="/addItems"> Add Items  <Icon name='add' size='large' /> </Link>
		  <Link className="nav-link " to="/Mycart">Cart <Icon name='cart' size='large' /> {this.props.cartitems.length}</Link>
		 
      </li>;
	    }else{
	    	button = <li className="nav-item btn-group active " align="right"   >
         <Link className="nav-link"   to='/' onClick={this.props.signout}>Signout <Icon name='sign-out' size='large' /> </Link>
         <Link className="nav-link" to="/Profile"> Profile  <Icon name='user' size='large' /> </Link>
		 <Link className="nav-link " to="/Mycart">Cart <Icon name='cart' size='large' /> {this.props.cartitems.length}</Link>
      </li>;
	    }
		return(
		<div align="center">
		<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" align="left">
  <Link className="navbar-brand" to="/"> <img className="logo"  src="https://firebasestorage.googleapis.com/v0/b/med-life.appspot.com/o/items%2Fimages%2Flogo%20copy.jpg?alt=media&token=0eb3cd28-9eae-4345-93c1-18bdc6faab02"  /> Revive </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item" className={this.props.home}>
        <Link className="nav-link active" to="/" >Home <Icon name='play' size='large' /> </Link>
      </li>
      
      <li className="nav-item" className={this.props.myorder} >
        <Link className="nav-link active" to="/Myorders">My Orders <Icon name='cart' size='large' /> </Link>
      </li>
     
      <li align="center"> 
       <Searchcomponent className="ws" placeholder="Search" searchchanged={this.props.searchchanged}  />
      </li>
     {
		
	 }
     {button}
      
 		</ul>
       
    
   
   
    
  </div>
   </nav>
   </div>
   );
	}
}
export default Nav;