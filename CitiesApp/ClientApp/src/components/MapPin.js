import React, { Component } from 'react';
import Marker from '../assets/marker.png';
import Arrow from '../assets/arrow.png';

 class Pin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hovering: false


        };
    }

     hoverOnHandler = () => {
        this.setState({ hovering: true });
    }
     hoverOffHandler = () => {
         this.setState({ hovering: false });
     }
    

     render() {

         const bottomPos = "calc(" + (((this.props.lat - 30) / 30) * 100) + "% - 20px)";
         const leftPos = "calc(" + (((this.props.lon + 10) / 50) * 100) + "% - 20px)";

         const pinStyle = {
             left: leftPos,
             bottom: bottomPos
         }


         let marker = (<img src={Marker} />);


         //console.log(this.props.cityId);
         //console.log(this.props.highlightedId);
         if (this.props.highlightedId == this.props.cityId) {
             marker = (<img src={Arrow} />);
         }

         let button = (<button onClick={this.props.buy} className="btn btn-success" >{this.props.price} PLN</button>);
         if (this.props.previewMode) {
             button = (<button onClick={this.props.delete} className="btn btn-danger">DELETE ({this.props.price} PLN)</button>);
         }

       
         return (

             <div className="pinMain" style={pinStyle} onMouseEnter={this.hoverOnHandler} onMouseLeave={this.hoverOffHandler}>
                 {marker}
                 {this.state.hovering ? <div>{button}</div> :
                     <p>{this.props.name}</p>}


             </div>
         );
    }
}

export default Pin;