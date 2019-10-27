import React,{Component} from 'react';
import './itemview.css';
import {db} from '../../firebaseconnect';
import  {  Redirect } from "react-router-dom";

class EditItem extends Component{
    constructor(props){
        super(props);
        this.state={
            item:[],
            id : ""
        }
        this.fetchItem=this.fetchItem.bind(this);
        this.UpdateItem=this.UpdateItem.bind(this);
        this.cancel=this.cancel.bind(this);
        this.delete=this.delete.bind(this);
      
      console.log(this.props)
    }
    componentWillMount(){
        console.log(this.props)
        this.setState({
            id :this.props.match.params.id
        })
    }
    handelChange=(event)=>{
        console.log(event.target.value);
        switch(event.target.id){
            case "name":
                this.setState({
                    name : event.target.value
                });
                break;
           case "price":
                this.setState({
                    price : event.target.value
                });     
                break;
                case "desc":
                        this.setState({
                            desc : event.target.value
                        });  
                        break;
                        default:
                                this.setState({
                                    error : true
                                });     
        }

        
    }
    cancel=()=>{
        window.history.back()
    }
    fetchItem=()=>{
        const obj=this;
        db.collection("Items").doc(this.state.id).get().then(function(doc) {
            if (doc.exists) {
              
                obj.setState({
                    item : doc.data(),
                    name : doc.data().name,
                    item_id:doc.data().item_id,
                    imageurl : doc.data().imageurl,
                    desc:doc.data().description,
                    price : doc.data().price
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            obj.setState({
                error :true
              })
        }).then(()=>{
         
          obj.setState({
            itemfetched :true
          })
        });
        
    }
    componentDidMount(){
        this.fetchItem();
    }
    delete=()=>{
        let x;
        console.log("delted")
        let cartRef=db.collection("Items").doc(this.state.id);
        cartRef.delete().then(
           x = document.getElementById("snackbar"),
           x.innerHTML="item Deleted",
         x.className = "show",
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000),
      window.location = window.location.origin.toString(),
     
        ).catch(e=>{
            console.log(e);
        })
    }   
     UpdateItem=()=>{
        console.log(this.state)
        let cartRef=db.collection("Items").doc(this.state.id);
        cartRef.set({
         name:this.state.name,
         description: this.state.desc,
         price:this.state.price
         
       }, { merge: true })
       .then(function() {
         console.log("Updated");
         var x = document.getElementById("snackbar");
         x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
         window.location.reload()
       })
       .catch(function(error) {
         console.error("Error writing document: ", error);
       });
      
    }

    componentWillReceiveProps(){
        this.fetchItem();

    }
    render(){
        if(!this.props.isAdmin){
                return(<div className="container-fluid not-admin" >Sorry You are not Admin...</div>)
        }
        let item=this.state.item;
        let {name,price,desc}=this.state;
        if(item)
        { 
        return(
<div className="container-fluid item">
<img src={item.imageurl} alt={name}/><br/>

<div id="snackbar">Item Updated</div>

        <br/>
        
     Item Id : {item.item_id}
     <hr/>
  <form>
  <div>
    <ul><li> Name :<input className="form-control"  type="text" id="name" value={name} onChange={this.handelChange}></input></li>  <br/>  
        <li>Price ₹ : <input className="form-control" type="text" id="price" value={price} onChange={this.handelChange}></input><br/>
 
    </li>
  
    
    <li> Description:<textarea className="form-control"  rows="10" cols="70" id="desc" value={desc} onChange={this.handelChange}></textarea></li>
   
    </ul></div>
  </form>
  <div>
  <button className="btn btn-info"  onClick={this.UpdateItem} >Update</button>
    <button className="btn btn-warning"onClick={this.cancel}>Cancel</button>
    <button className="btn btn-danger"onClick={this.delete}>Delete</button>
    </div>
    </div>

        )
        }else{
          
                return(
                    <div className=" container-fluid load">
            <span className="spinner-grow spinner-grow-sm" role="status"></span>
            <h2>Loading</h2>
            
            </div>
                )
        }
    }
}
export default EditItem;