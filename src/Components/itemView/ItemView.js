import React, { Component } from 'react';
import {Search,Grid} from 'semantic-ui-react';
import './itemview.css'
import {firebase,db} from '../../firebaseconnect';

class ItemView extends Component{
    render(){
        return(
<div>
    <h1>{this.props.itemSelected.name}</h1>
    </div>
        )
    }
}

export default ItemView;