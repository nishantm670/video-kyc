import React, { Component } from 'react';
import PanComponent from '../Components/PanComponent/PanComponent';
import AadharComponent from '../Components/AadharComponent/AadharComponent';


export class StepForm extends Component {

    state={
        step : 1,
        // panNumber : '',
        // nameAsPan : '',
        // dob : new Date(),
        // address : '',
        // pinCode : ''

    }

    // confirmHandler = () => {
    //     const {step} = this.state;
    //     this.setState({
    //         step : step + 1
    //     })
    // }

    // onChangeHandler = (event) => {
    //     const target = event.target;
    //     const name = target.name;
    //     this.setState({
    //         [name] : target.value
    //     })
    // }

    // dateHandleChange = date => {
    //     this.setState({
    //       dob: date
    //     });
    //   };

    render() {
        const {step} = this.state;
        // const {panNumber, nameAsPan, dob, address, pinCode} = this.state;
        // const values = {panNumber, nameAsPan, dob, address, pinCode};

        switch(step){
            case 1 :
        return (
            <React.Fragment>
            <div style={styles.formWrapper}>
                <PanComponent
                    nextStep={this.confirmHandler}
                    onChange={(event) => this.props.changeHandler(event)}
                    values={this.props.values}
                    dateHandleChange={this.dateHandleChange}
                    panConfirmHandler={this.props.panConfirmHandler}
                />
            </div>
            {this.props.aadharShown ? 
                <div style={styles.formWrapper}> 
                 <AadharComponent />
                </div> : null }
            </React.Fragment>
        )   
        case 2 :
        return (
            <div style={styles.formWrapper}>
                <h2>Step 2</h2>
            </div>
        )
        default :
            return 'Something Wrong'
    }
    }
}

const styles = {
    formWrapper : {
        width : "70%",
        maxWidth : "500px",
        margin : " 2rem auto",
        // position : "absolute",
        // top : "55%",
        // left : "50%",
        // transform : "translate(-50%, -50%)",
        padding : "20px",
        boxSizing : "border-box",
        borderRadius : "5px",
        boxShadow : "0 0 5px 3px rgba(0,0,0,0.1)"
    }
}

export default StepForm
