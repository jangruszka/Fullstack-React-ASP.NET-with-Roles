import React from 'react';


const modal = (props) => {

  






    return (

        <div className="modalBackdrop">
            <div className="modalInner ">
                <div className="text-right"><button className="btn btn-link" onClick={props.close}> &times; </button>  </div>
                <h2 className="text-center font-weight-bold">Booking summary</h2>
                <h3>City: {props.city}</h3>
                <h3>Price: {props.price} PLN</h3>
                <h2 className="text-center">Date</h2>
                <div className="row"> 
                    <div className="col-lg-6 text-center"><h3>Start</h3>
                        <input onChange={props.change} identifier="startDate" type="date" />
                    </div>

                    <div className="col-lg-6 text-center"><h3>End</h3>
                        <input onChange={props.change} identifier="endDate" type="date" />

                    </div>


                </div>
                <hr/>
                <div className="text-center mt-5"><button onClick={props.order} className="btn btn-success">Book!</button>  </div>

            </div>


        </div>
    );


}

export default modal;