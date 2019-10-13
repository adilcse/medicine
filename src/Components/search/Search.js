import _ from 'lodash';

import React, { Component } from 'react';
import {Search,Grid} from 'semantic-ui-react';
import './search.css'
import {firebase,db} from '../../firebaseconnect';
import  {  Redirect ,Route} from "react-router-dom";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


const initialState = { isLoading: false, results: [], value: '',redirect : false }

export default class SearchComponent extends Component {
  state = initialState
 
  handleResultSelect = (e, { result }) => {
 // do when a result is selected

this.setState({ value: result.title,
                redirecturl : result.item_id,
                redirect : true
});
this.props.searchchanged(result.item_id)
  }
  handleSearchChange = (e, { value }) => {
    const obj = this;
   let res=[];
    this.setState({ isLoading: true, value })
    if(this.state.value.length >=1){
      let search = this.state.value;
      const colRef = db.collection('Items');
     
      colRef.where('name', '>=', search).where('name', '<=', search+ '\uf8ff')
      .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let ares={}
            // doc.data() is never undefined for query doc snapshots
     
            ares.title = doc.data().name;
            ares.image = doc.data().imageurl;
            ares.item_id=doc.data().item_id;
            ares.price = "Rs. " + doc.data().price;

          res.push(ares);
        });
       
        obj.setState({ isLoading: false })
       
        obj.setState({
          results :res
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        obj.setState({ isLoading: false })
        obj.setState({
          results :res
        })
    });
   
    }
    
  }

  render() {
    const { isLoading, value, results,redirect,redirecturl } = this.state;
    let re;
    if(redirect){

   
      re= <Redirect to={`/Product/${redirecturl}`}/>
   
      window.location = window.location.origin.toString()+`/Product/${redirecturl}`;
     
      
      
    }
    return (
       <Grid >
        <Grid.Column width={8}>
          <Search
            fluid={true}
           
             input={{ icon: 'search', iconPosition: 'left' }}
             size = "large"
             aligned="left"
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 10, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          
          />
          {re}
        </Grid.Column>
        </Grid>
     
    )
  }
}
