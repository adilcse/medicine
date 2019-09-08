import _ from 'lodash';

import React, { Component } from 'react';
import {Search,Grid} from 'semantic-ui-react';
import './search.css'
import {firebase,db} from '../../firebaseconnect';
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


const initialState = { isLoading: false, results: [], value: '' }

export default class SearchComponent extends Component {
  state = initialState
 
  handleResultSelect = (e, { result }) => {
 // do when a result is selected
 console.log(result.name);
this.setState({ value: result.name })
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
            console.log(doc.id, " => ", doc.data());
            ares.title = doc.data().name;
            ares.image = doc.data().imageurl;
            
            ares.price = "$" + doc.data().price;

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
    const { isLoading, value, results } = this.state

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
            onSearchChange={_.debounce(this.handleSearchChange, 200, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          
          />
        </Grid.Column>
        </Grid>
     
    )
  }
}
