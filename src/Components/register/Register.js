import React from 'react';
import './Register.css';

function Register({cancel,register,firebase}) {
  function googlesignin(){
  var provider = new firebase.auth.GoogleAuthProvider();
 firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
 console.log(user.email);
 register(user);
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
   console.log(errorCode);
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}
let invaliddata ="none";
function tryregister(){
console.log("trying");
const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;
const cpassword=document.getElementById("cpassword").value;
if(password === cpassword && name.length >= 3){
    console.log("pasword varified");
firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
user.user.updateProfile({
  displayName: name,
 
}).then(function() {
  console.log("name added");
  register(user.user);
}).catch(function(error) {
  console.log("name adding failed");
});

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;

  var errorMessage = error.message;
    console.log(errorCode);
    switch(errorCode){
      case "auth/invalid-email" :  
          invaliddata ="enter valid email";
           break;
      case "auth/email-already-in-use" :
          invaliddata ="user already exist";
            break;
      case "auth/weak-password" :
              invaliddata ="enter a strong password";  
              break;
       default :
             invaliddata ="something went wrong";     
    }
    console.log(invaliddata);
     let place=document.getElementById("nf");
   place.setAttribute("class", "alert alert-danger");
   place.setAttribute("role", "alert");
   place.innerHTML=invaliddata;
   
});
}else if(name.length<3){
  invaliddata ="Enter valid name";

}else{
  invaliddata = "pasword not matched";
}
console.log(invaliddata);
if(invaliddata!="none")
 {let place=document.getElementById("nf");
    place.setAttribute("class", "alert alert-danger");
    place.setAttribute("role", "alert");
    place.innerHTML=invaliddata;}

}
  return (
    <div className="col-lg-11">
    <div className="card mb-3 Register border-secondar">
   

  <div className="row no-gutters">
    <div className="col-md-4">
      <img src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/07/medical-logo.jpg" className="card-img" alt="logo"></img>
    </div>
    <div className="col-md-8 bg-light y">
     <h2> Register</h2>
      <div className="card-body">
        <form className=" container">
         
  <div className="form-group row">
  <label for="name" className="col">Name</label>
  <input type="name" className="form-control col" id="name"  placeholder="Enter name"></input>

  </div>
  <div className="form-group row">
    <label for="email" className="col">email</label>
    <input type="email" className="form-control col " id="email" placeholder="Enter email"></input>
  </div>
  <div className="form-group row">
    <label for="password" className="col">Password</label>
    <input type="password" className="form-control col " id="password" placeholder="Password"></input>
  </div>
   <div className="form-group row">
    <label for="cpassword" className="col">Confirm Password</label>
    <input type="cpassword" className="form-control col " id="cpassword" placeholder="Confirm Password"></input>
  </div>
    <div id="nf"></div>
  <div className="row">
  <button type="button" className="btn btn-primary col" onClick={tryregister}>Sign up</button>
  <button type="button" class="btn btn-primary col" onClick={cancel}>cancel</button>
  </div>
   <h3 align="center"> or </h3>
 
   <button type="button" class="google-button" onClick={googlesignin}>
  <span class="google-button__icon">
    <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/></svg>
  </span>
  <span class="google-button__text">Sign in with Google</span>
</button>
</form>
      </div>
    </div>
  </div>
</div>
</div>
  );
}

export default Register;
