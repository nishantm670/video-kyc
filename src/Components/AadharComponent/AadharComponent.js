import React from 'react'

const AadharComponent = props => {
    return (
        <div>
            <form>
            <div className="form-group">
                    <input
                        type="text"
                        name="aadharNumber"
                        // value={props.values.aadharNumber}
                        // onChange={props.onChange}
                        className="form-control"
                        placeholder="Aadhar Number"/>
                </div>
                <button  type="submit" className="btn btn-primary confirm-btn">Generate OTP</button>
            </form>
        </div>
    )
}

export default AadharComponent