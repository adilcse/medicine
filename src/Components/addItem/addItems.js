import React,{Component} from 'react'
import { Button, Form, Segment,Image,Input,TextArea } from 'semantic-ui-react'
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
    imageadded : false
    
     };
   
   this.handleChange = this.handleChange.bind(this);
   this.handleDragover = this.handleDragover.bind(this);
   this.handleDrop = this.handleDrop.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
     this.uploadImage = this.uploadImage.bind(this);


}
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

 
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
  uploadImage = ()=>{
  	 var progressbar = document.querySelector('progress'); 
     const itemid =	document.getElementById("form-itemid").value ;
	const itemname =document.getElementById("form-itemname").value ;
	const itemprice = document.getElementById("form-itemprice").value ;
	const itemdesc=document.getElementById("form-description").value ;
  	
  	
  		let imageadded = (this.state.imageadded) ;
  		console.log(imageadded);
  	if(itemid.length < 1 || itemprice.length < 1 || itemname < 3|| !imageadded){
  			window.alert("Enter valid data");
  		return;

  	}
  	 progressbar.hidden =false;
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
        storage.ref('items/images').child(itemid).getDownloadURL().then(url => {
            console.log(url);
            	db.collection("Items").doc(itemid).set({
   				 name: itemname,
   				 item_id: itemid,
  				  price: itemprice,
  				  description : itemdesc,
  				  imageurl : url
					})
					.then(function() {
    					console.log("Document successfully written!");
    					window.alert("Item Added")
    					document.getElementById("form-itemid").value = ""
						document.getElementById("form-itemname").value = ""
						document.getElementById("form-itemprice").value = ""
						document.getElementById("form-description").value = ""
						   var img = document.querySelector('img').src= "https://www.mbsplugins.de/images/drop-files-here-extra.jpg"
						this.setState = initialstate;

					})
					.catch(function(error) {
   					 console.error("Error writing document: ", error);
			});



            this.setState({url});
        })
    });

  }
handleDragover(event){
	
}
  handleSubmit ()  {
    const { name, email } = this.state

   
  }
clear(){
	document.getElementById("form-itemid").value = ""
	document.getElementById("form-itemname").value = ""
	document.getElementById("form-itemprice").value = ""
	document.getElementById("form-description").value = ""
	 document.querySelector('img').src= "https://www.mbsplugins.de/images/drop-files-here-extra.jpg"
}
  render() {
    const { name, email, submittedName, submittedEmail } = this.state
     
    return (
    	<div className="fluid home ">
    	<div className="row">
  <div className="col-3" >
    <FileDrop 
    onDrop={this.handleDrop}
    onDragOver={this.handleDragover} 

    >
        <Image src='https://www.mbsplugins.de/images/drop-files-here-extra.jpg' id="addimage" size='large' rounded floated='left'
        	onClick={this.handleDragover}
        
        />
         <progress value={this.state.progress} max="100" hidden/>
      
        </FileDrop>
   
  </div>
  <div className="col-5">
      <Form >
   <Form.Field
        id='form-itemid'
        control={Input}
         required
        label='ItemID'
        placeholder='Item ID'
      />
      
      <Form.Field
      
        id='form-itemname'
        control={Input}
           required
        label='Item Name'
        placeholder='Item name'
       
      />
      <Form.Field
        id='form-itemprice'
        control={Input}
            required
        label='Item Price'
        placeholder='Item Price'
      />
      
   
    <Form.Field 

      id='form-description'
      control={TextArea}
      label='Description'
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

export default addItems;