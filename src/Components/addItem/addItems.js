import React,{Component} from 'react'
import { Button, Form,Image,TextArea } from 'semantic-ui-react'
import './addItems.css'
import FileDrop from 'react-file-drop'
import {firebase,db} from '../../firebaseconnect';
const storage = firebase.storage();
const initialstate={
image : ""
}
class addItems extends Component {
	constructor(props) {
    super(props);
   this.state = {
    image:"",
    imageadded : false,
    formvalid : false,
    isAdmin :props.isAdmin
    
     };
   

   this.handleDragover = this.handleDragover.bind(this);
   this.handleDrop = this.handleDrop.bind(this);
  
     this.uploadImage = this.uploadImage.bind(this);
     this.idEntered = this.idEntered.bind(this);
    

}



 
 handleDrop(files, event) {
    this.setState({ image: files[0], imageSelected:true })
    var img = document.querySelector('img'); 

      if (files[0].type === "image/jpeg" || files[0].type === "image/png" ) {
       
          img.src = URL.createObjectURL(files[0]); // set src to file url
          this.setState({
                    	imageadded : true
                    })

    }else{
    	img.src="https://www.mbsplugins.de/images/drop-files-here-extra.jpg"
this.setState({
          	imageadded : false
          })
    	window.alert("invalid file type")
    }
  }
  idEntered=()=>{
    console.log("id added")
    const obj = this;
   const idbox =  document.getElementById("form-itemid");
   const errorbox = document.getElementById("takenid");
   const successbox = document.getElementById("uniqueid");
const id = idbox.value;
if(id.length<1){
  return
}

   var docRef = db.collection("Items").doc(idbox.value);

docRef.get().then(function(doc) {
    if (doc.exists) {
      errorbox.hidden = false;
      successbox.hidden = true;
      console.log(doc.data());
    } else {
      errorbox.hidden = true;
      successbox.hidden = false;
      obj.setState({
          formvalid : true
      })
        console.log("No such document!");

    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
  
   
  }
  uploadImage = ()=>{
  	 var progressbar = document.querySelector('progress'); 
     const itemid =	document.getElementById("form-itemid").value ;
	const itemname =document.getElementById("form-itemname").value ;
	const itemprice = document.getElementById("form-itemprice").value ;
	const itemdesc=document.getElementById("form-description").value ;
  const itemtype=document.getElementById("form-itemtype").value ;
  	
      let imageadded = (this.state.imageadded) ;
      
  	if(itemid.length < 1){
      window.alert("Enter valid ID");
      this.setState({
        formvalid :false
      })
      return;
    }else if( itemprice.length < 1){
      window.alert("Enter valid PRICE");
      this.setState({
        formvalid :false
      })
      return
    }else if( itemtype.length < 2){
      window.alert("Enter valid itemtype");
      this.setState({
        formvalid :false
      })
      return
    }else if(itemname.length < 3){
      window.alert("Enter valid NAME");
      this.setState({
        formvalid :false
      })
      return
    }else if(!imageadded){
      window.alert("please add an Image ");

      this.setState({
        formvalid :false
      })
      return

    }
    else if(this.state.formvalid){
     progressbar.hidden =false;
     document.getElementById("Uploadstatus").hidden=false;
  	const {image} = this.state;
  	const uploadTask = storage.ref(`items/images/${itemid}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
         progressbar.hidden =true;
         document.getElementById("Uploadstatus").hidden=true;
        storage.ref('items/images').child(itemid).getDownloadURL().then(url => {
          
            	db.collection("Items").doc(itemid).set({
   				 name: itemname,
   				 item_id: itemid,
  				  price: itemprice,
  				  description : itemdesc,
            imageurl : url,
            type :itemtype
					})
					.then(function() {
    					console.log("Document successfully written!");
    					window.alert("Item Added")
    					document.getElementById("form-itemid").value = ""
						document.getElementById("form-itemname").value = ""
						document.getElementById("form-itemprice").value = ""
            document.getElementById("form-description").value = ""
            document.getElementById("form-itemtype").value = ""
           document.getElementById("takenid").hidden = true
    document.getElementById("uniqueid").hidden = true
						  document.getElementById('addimage').src= "https://www.mbsplugins.de/images/drop-files-here-extra.jpg"
						this.setState = initialstate;

					})
					.catch(function(error) {
   					 console.error("Error writing document: ", error);
			});



            this.setState({url});
        })
    });
    return;
  }
  else{
    window.alert("id invalid")
  }
  }
handleDragover(event){
  console.log(event.target.files[0]);
  let files= event.target.files[0];
  this.setState({ image: files, imageSelected:true })
  var img = document.getElementById('addimage'); 
if(files)
   { if (files.type === "image/jpeg" || files.type === "image/png" ) {
     
        img.src = URL.createObjectURL(files); // set src to file url
        this.setState({
                    imageadded : true
                  })

  }else{
    img.src="https://www.mbsplugins.de/images/drop-files-here-extra.jpg"
this.setState({
          imageadded : false
        })
    window.alert("invalid file type")
  }}
}
  
clear(){
	document.getElementById("form-itemid").value = ""
	document.getElementById("form-itemname").value = ""
	document.getElementById("form-itemprice").value = ""
  document.getElementById("form-description").value = ""
  document.getElementById("form-itemtype").value = ""
	 document.getElementById('addimage').src= "https://www.mbsplugins.de/images/drop-files-here-extra.jpg"
}
  render() {
   
     console.log(this.props.isAdmin);
     if(!this.props.isAdmin){
       return(
         <h2> Sorry you are not Admin</h2>
       )
     }else{
 
    return (
    	<div className="fluid home ">
    	<div className="row">
  <div className="col-3" >
    <FileDrop 
    onDrop={this.handleDrop}
     

    >
        <Image src='https://www.mbsplugins.de/images/drop-files-here-extra.jpg' id="addimage" size='large' rounded floated='left'
        
        
        /><input type="file" onChange={(event)=> { this.handleDragover(event) }}></input>
         <progress value={this.state.progress} max="100" hidden/>
          
        <div id="Uploadstatus" hidden> Uploading {this.state.progress} %</div>
      
        </FileDrop>
   
  </div>
  <div className="col-5" align = "left" >
      <Form>
        <div  className = "itemspacing">
      <strong>Item Id</strong>
       <input   id="form-itemid" type="text" placeholder = "Enter Id" required onChange={this.idEntered} />
   
       </div>
       <div className="alert alert-danger" role="alert" id ="takenid" hidden>
 Item already added!!
</div>
<div className="alert alert-success" role="alert" id = "uniqueid" hidden>
  item can be added...
</div>
<div  className = "itemspacing">
<strong>Item Name</strong>
       <input  id="form-itemname" type="text" placeholder = "Item Name" required/>
       </div>
       <div  className = "itemspacing">

       <strong>Item Type</strong>
       <input  id="form-itemtype" type="text" placeholder = "Item Type" required/>
       </div>
       <div  className = "itemspacing">
       <strong>Item Price</strong>
       <input  id="form-itemprice" type="text" placeholder = "Item Price" required/>
       </div>
    
    
   
    <Form.Field 
  className = "itemspacing" 
      id='form-description'
      control={TextArea}
     
      placeholder='Description'
    />
    <Form.Group>
    <Form.Field
      id='form-submit'
      control={Button}
      content='Add'
      onClick={this.uploadImage}
    
    />
    <Form.Field
      id='form-clear'
      control={Button}
      content='Clear'
      
    onClick={this.clear}
    /></Form.Group>
  </Form>
  </div>
  <div className="col-4"></div>
</div>
  </div>
 
    )
    
  }
  }
}

export default addItems;