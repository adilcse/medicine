import React,{Component} from 'react';
import OrderCard from './OrdersCard';
import  {  Link } from "react-router-dom";
import { db } from '../../firebaseconnect';
class Orders extends Component{
    constructor(props){
        super(props)
        this.state={
            orders:[]
        }
      
    }
        componentWillReceiveProps(){
            let obj = this;
            if(this.props.user){
                let userRef = db.collection('LastUser').doc(this.props.user.uid);
                userRef.collection("Orders").orderBy("time", "desc").onSnapshot(function(querySnapshot) {
                    var ordersdata = [];
                    querySnapshot.forEach(function(doc) {
                        let ord = {
                            id : doc.id,
                            data : doc.data()
                        }
                        ordersdata.push(ord);
                    });
                   obj.setState({
                     orders:ordersdata,
                     
                   })
                })
                ;}
              
              
        
    }
    componentDidMount(){
        let obj = this;
            if(this.props.user){
                let userRef = db.collection('LastUser').doc(this.props.user.uid);
                userRef.collection("Orders").orderBy("time", "desc").onSnapshot(function(querySnapshot) {
                    var ordersdata = [];
                    querySnapshot.forEach(function(doc) {
                        let ord = {
                            id : doc.id,
                            data : doc.data()
                        }
                        ordersdata.push(ord);
                    });
                   obj.setState({
                     orders:ordersdata,
                     
                   })
                })
                ;}
              
    }
    render(){
      
        if(this.state.orders.length=== 0 ){
            return(
                <h1>Nothing Ordered Yet...</h1>
            )
        }
        return (
            <div>
            <h2>Orders</h2>
            <div className="container">
            
             
             
           
            {this.state.orders.map((elements,i)=>{
            let currentDate= elements.data.time.toDate();
            var date = currentDate.getDate();
            var month = currentDate.getMonth(); //Be careful! January is 0 not 1
            var year = currentDate.getFullYear();

            var dateString = date + "-" +(month + 1) + "-" + year;
            return <div className="card text-center">
          <div className="card-header">
              <div className="row">
            <div className="col-6">{i} Order Id : {elements.id}</div>
            <div className="col-6">Date : {dateString}</div>
            {console.log()}
            </div>
          </div>

          <div className="card-body">
              {
                  elements.data.items.map((item,i)=>{
                    return <OrderCard
                    source = {item}
                    key = {i}

                  />
                  }
              )
                }
         
           
            
          </div>
          <div className="card-footer text-muted">
           Check order Status
          </div></div>})}
        	
              </div>
            
             
            
              </div>
        )
    }
}
export default Orders;