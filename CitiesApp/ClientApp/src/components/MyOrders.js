import React, { Component } from 'react';
import OneOrder from './OneOrder';

class MyOrders extends Component {
    constructor(props) {
        super(props);

      
    }

   


    render() {

        const orders = this.props.ordersArr.map(el => (<OneOrder highlightedCancel={this.props.highlightedCancel} highlightedHanlder={() => this.props.highlightedHandler(el.cityId)} key={el.id} cityId={el.id} cityName={el.city.name} start={el.start} end={el.end} price={el.totalPrice} days={el.totalDays} />));

        return (

            <div className="myOrders p-4 shadow ">
                <h2 className="text-center text-white">My bookings</h2>
                {!this.props.isAuth? <h4 className="text-center mt-4 text-white">Log in to browse your bookings</h4> : ""   }

                {orders}
               

            </div>
        );
    }
}

export default MyOrders;