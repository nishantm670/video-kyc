import React from 'react';
import './PanComponent.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Pan = props => {
    return (
        <div>
            <h2>PAN Verification</h2>
            <form>
                <p>Enter PAN Details</p>
                <div className="form-group">
                    <input
                        type="text"
                        name="panNumber"
                        value={props.values.panNumber}
                        onChange={props.onChange}
                        className="form-control"
                        placeholder="PAN Number"/>
                </div>
                <div className="form-group">
                    <input type="text" name="nameAsPan" value={props.values.nameAsPan} onChange={props.onChange} className="form-control" placeholder="Name as per PAN"/>
                </div>
                <div className="form-group text-left">
                    <label>Date of Birth</label>
                    <br/>
                    <DatePicker
        selected={props.values.dob}
        className="form-control"
        onChange={props.dateHandleChange}
      />
                    {/* <DatePicker  className="form-control"/> */}
                    {/* name="dob"  value={props.values.dob} onChange={props.onChange} */}
                    {/* <input type="email" className="form-control" placeholder="Name as per PAN"/> */}
                </div>
                <div className="form-group">
                    <textarea name="address" value={props.values.address} onChange={props.onChange} className="form-control" placeholder="Address as present on Aadhaar" />
                </div>
                <div className="form-group">
                    <input type="email" value={props.values.pinCode} onChange={props.onChange} name="pinCode" className="form-control" placeholder="PIN Code"/>
                </div>
                <button onClick={props.panConfirmHandler} type="submit" className="btn btn-primary confirm-btn">Confirm</button>
            </form>
        </div>
    )
}

export default Pan;