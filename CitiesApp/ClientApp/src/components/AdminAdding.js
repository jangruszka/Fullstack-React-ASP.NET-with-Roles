import React, { Component } from 'react';
import Axios from 'axios';
import authService from './api-authorization/AuthorizeService';
import { Map } from './Map';


export class AdminAdding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cityName: "",
            price: null,
            childUpdates: 0
        };
    }


    inputCityHandler = (event) => {
        this.setState({ cityName: event.target.value });
    }
    inputPriceHandler = (event) => {
        this.setState({ price: event.target.value });
    }



    //addRequestHandler = () => {
    //    console.log(this.state);
    //    Axios.post('api/AdminOperations/AddCity?city=' + this.state.cityName + "&price=" + this.state.price).then(res => { if (res.data === true) { this.setState({ cityName: "" }) } });

    //}

    //addRequestHandler = async () => {
    //    Axios.post('api/AdminOperations/AddCity?city=' + this.state.cityName + "&price=" + this.state.price).then(res => { if (res.data === true) { this.setState({ cityName: "" }) } });

    //}

      addRequestHandler = async () => {

      

        if (!this.props.isAuth || !this.props.isAdm) {
            alert("You have to log in as admin to add cities!");
            return;
          }
          if (this.state.cityName != "" && this.state.price > 0) {
              const user = await authService.getUser();
              const token = await authService.getAccessToken();
              const response = await fetch("api/AdminOperations/AddCity?city=" + this.state.cityName + " &price=" + this.state.price, {
                headers: !token ? {} : {
                      'Authorization': `Bearer ${token}`,
                      'User': JSON.stringify(user),

                },
                method: 'POST',
              });
              let updates = this.state.childUpdates;
              updates++;
              this.setState({ childUpdates: updates, cityName: "", price: 0 });
             
                    
        }
        else {
            alert("All fields are required");
        }
    }
   

    render() {
        return (
            <div>
              
                <div className="row">
                    <div className="col-lg-8">
                        <Map childUpdate={this.state.childUpdates} isAuth={this.props.isAuth} isAdm={this.props.isAdm} userName={this.props.userName} previewMode ></Map>

                    </div>
                    <div className="col-lg-4 p-5">
                        <h2 className="text-center text-warning">Admin panel <span className="text-muted small">( {this.props.userName} )</span> </h2>
                        <input type="text" identifier="cityName" className="form-control" placeholder="City name (Europe, name in native language)" value={this.state.cityName} onChange={this.inputCityHandler} />
                        <input type="number" identifier="price" className="form-control" placeholder="Price per day (PLN)" onChange={this.inputPriceHandler} value={this.state.price} />
                        <button onClick={this.addRequestHandler} className="btn btn-warning text-white w-100">Add city!</button>
                    </div>

                 </div>

            </div>
        );
    }
}
