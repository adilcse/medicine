import React,{Component} from 'react';
import OrderCard from './OrdersCard';
import { db } from '../../firebaseconnect';
import './order.css'
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
                <div className="not-admin">Nothing Ordered Yet...</div>)
        }
        {console.log(this.state.orders)}
        return (
            <div className="orderbody">

           
            <div className="container-fluid">
            <h2>Orders</h2>
            <div className="row">
                 <div className="col">
    
                  </div>
                 <div className="col-8">
                   
            {this.state.orders.map((elements,i)=>{
            let currentDate= elements.data.time.toDate();
            var date = currentDate.getDate();
            var month = currentDate.getMonth(); //Be careful! January is 0 not 1
            var year = currentDate.getFullYear();

            var dateString = date + "-" +(month + 1) + "-" + year;
            return <div className="card text-center order-card">
                 
          <div className="card-header">
              <div className="row">
            <div className="col-6">Order Id : {elements.id}</div>
            <div className="col-6">Date : {dateString}</div>
         
            </div>
          </div>

          <div className="card-body-order">
              {
                  elements.data.items.map((item,i)=>{
                    return <OrderCard
                    source = {item}
                    key = {i}


                  />
                  }
              )
                }
         <h3>
           Total : ₹{elements.data.price}/-<br/>
           Address : {elements.data.Address.address +" , "+ elements.data.Address.city}
           </h3>
          </div>
          <div className="card-footer text-muted">
           Status : {elements.data.status}
          </div></div>})}
                 </div>
             <div class="col">

                </div>
            </div>
             
             
           
        	
              </div>
            
             
            
              </div>
        )
    }
}
export default Orders;