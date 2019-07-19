import React from 'react';


const oneOrder = (props) => {





    return (


        <div onMouseEnter={props.highlightedHanlder} onMouseLeave={props.highlightedCancel} className="oneOrder shadow mt-2 mb-2">
            <h4><span className="text-success">&#127968;</span> {props.cityName}</h4>
            <p className="mt-4"><span className="text-success">&#128198;</span>{props.start.substring(0, 10)} to {props.end.substring(0,10)} ({props.days} days ) </p>
            <h6 className="text-right text-success">{props.price} PLN </h6>


        </div>
    );


}

export default oneOrder;