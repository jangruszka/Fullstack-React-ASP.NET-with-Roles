import React, { Component } from 'react';
import Axios from 'axios';
import Background from '../assets/map.jpg';
import MapPin from './MapPin';
import OrderModal from './OrderModal';
import authService from './api-authorization/AuthorizeService';
import MyOrders from './MyOrders';


export class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {



            orders: [],
            cities: [],
            modalOpen: false,
            idForOrder: null,
            cityForOrder: null,
            priceForOrder: null,
            startDate: null,
            endDate: null,

            highlightedId: 0


        };
    }

    componentDidMount() {
        Axios.get("api/ClientOperations/GetAllCities").then(res => this.setState({ cities: res.data }));
        //if (!this.props.previewMode) {
        //    this.getOrders();
        //} 
    }
    componentDidUpdate() {
        if (this.props.previewMode) {
            Axios.get("api/ClientOperations/GetAllCities").then(res => this.setState({ cities: res.data }));
        }
        if (!this.props.previewMode && this.state.orders.length == 0) {
            this.getOrders();
        }

    }



    buyBtnHandler = (id, city, price) => {
        if (this.props.previewMode) {
            return;
        }
        this.setState({ modalOpen: true, idForOrder: id, cityForOrder: city, priceForOrder: price });

    }

   

    closeModalHandler = () => {
        this.setState({ modalOpen: false, idForOrder: null, cityForOrder: null, priceForOrder: null, startDate: null, endDate: null });
    }

    highlightedHandler = (id) => {
        this.setState({ highlightedId: id });  
    }
    highlightedCancel = () => {
        this.setState({ highlightedId: 0 });  
    }

    async getOrders() {
      

        if (this.props.isAuth) {
            const user = await authService.getUser(); 
            const token = await authService.getAccessToken();
            const response = await fetch("api/ClientOperations/GetMyOrders", {
                headers: !token ? {} : {
                    'Authorization': `Bearer ${token}`,
                    'User': JSON.stringify(user),
                },
                method: 'GET',
            });
            const data = await response.json();
            console.log("My orders");

            console.log(data);
            this.setState({ orders: data });
        }
    }

    
    dateInputHandler = (event) => {

        const identifier = event.target.getAttribute('identifier');

        let upState = { ...this.state };

        upState[identifier] = event.target.value;

        this.setState(upState);
    } 



    sendOrderHandler = async () => {
        const user = await authService.getUser(); 

        if (!this.props.isAuth) {
            alert("You have to log in to place an order!");
            return;
        }
        if (this.state.startDate !== null && this.state.endDate !== null && this.state.endDate > this.state.startDate) {
            const token = await authService.getAccessToken();
            const response = await fetch("api/ClientOperations/SendOrder?cityId=" + this.state.idForOrder + "&startDate=" + this.state.startDate + "&endDate=" + this.state.endDate, {
                headers: !token ? {} : {
                    'Authorization': `Bearer ${token}`,
                    'User': JSON.stringify(user),
                },
                method: 'POST',
            });
            const data = await response.json();
            if (data === true) {
       
                this.getOrders();
                this.setState({ modalOpen: false });
            }
            else {
                alert("Sorry, something went wrong. Check your start and end dates.");
            }
        }
        else {
            alert("Sorry, something went wrong. Check your start and end dates.");
        }
    }

    deleteRequestHandler = async (cityId) => {
        const user = await authService.getUser();
      
        if (!this.props.isAdm || !this.props.isAuth) {
            return;
        }

        const token = await authService.getAccessToken();
        const response = await fetch("api/AdminOperations/RemoveCity?cityid=" + cityId, {
            headers: !token ? {} : {
                'Authorization': `Bearer ${token}`,
                'User': JSON.stringify(user),
            },
            method: 'POST',
        });
    }
 
    render() {
      

        const pins = [...this.state.cities].map(el => (<MapPin delete={() => this.deleteRequestHandler(el.id)} highlightedId={this.state.highlightedId} key={el.id} buy={() => this.buyBtnHandler(el.id, el.name, el.price)} price={el.price} name={el.name} cityId={el.id} lon={el.longitude} lat={el.latitude} previewMode={this.props.previewMode} />));

        const mapStyle = {
            backgroundImage: "url(" + Background + ")"
        }


        return (
            <div className="row">
            <div style={mapStyle} className="mapMain shadow">
                {pins}
                {this.state.modalOpen ? < OrderModal change={this.dateInputHandler} order={this.sendOrderHandler} cityId={this.state.idForOrder} city={this.state.cityForOrder} price={this.state.priceForOrder} close={this.closeModalHandler} /> : ""}
                </div>
                {!this.props.previewMode ? <MyOrders highlightedHandler={this.highlightedHandler} highlightedCancel={this.highlightedCancel} isAuth={this.props.isAuth} ordersArr={this.state.orders} /> : ""}
              
                   
                
            </div>
        );
    }
}
