import React, { Component } from 'react';
import StepForm from './StepForm';
import {ProgressBar} from 'react-bootstrap';
import axios from 'axios';
import PanData from '../PanData';

import './main.css';

export class main extends Component {

    state={
        latitude : '',
        longitude : '',
        geoAddress : '',
        panSelected : null,
        progressPercent : null,
        previewImage : false,
    /* Pan form State */
        panNumber : '',
        nameAsPan : '',
        dob : new Date(),
        address : '',
        pinCode : '',
    /* Aadhaar form State */
        aadharShown : false,
        aadharNumber : '',
        
    }

    componentDidMount() {
        const getCoordinates = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
              } else { 
                alert("Geolocation is not supported by this browser.");
              }
        }
        getCoordinates();
        navigator.mediaDevices.getUserMedia({ audio: true, video : true });
        console.log('componentDidMount', this.state.latitude);
    }

    showPosition = position => {
        this.setState({
            
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        })
        this.reverseGeocode();
        const {latitude, longitude} = this.state;
        const coords = {
            latitude : latitude,
            longitude : longitude
        }
        if(latitude && longitude){
            axios.post('https://panvalid.firebaseio.com/coords.json', coords)
        .then(response => console.log(response.data))
        .catch(error => console.log(error))

        }
    }

    reverseGeocode = () =>{
        const apiKey = 'AIzaSyD-ARTflitYx4OXioKbUHNTTxrghaDp4vs';
        const LAT = this.state.latitude;
        const LONG = this.state.longitude;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LONG}&key=${apiKey}`)
        .then(response => response.json())
        .then(data =>  {
            console.log('Reverse Geocode', data);
                this.setState({
                    geoAddress : data.results[0].formatted_address
                })
            }
            )
        .catch(error => console.log(error))
    }

    showError = error => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.")
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.")
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.")
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.")
              break;
            default :
                alert("Something Wrong")
          }
    }

    panSelectHandler = event => {
        event.persist();
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                panSelected : reader.result
            })
        }
        reader.readAsDataURL(file);
        console.log("FILE2", this.state.panSelected);
    }

    onChangeHandler = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name] : target.value
        })
    }

    dateHandleChange = date => {
        this.setState({
          dob: date
        });
      };

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('PAN', this.state.panSelected);
        axios.post('https://www.mocky.io/v2/5185415ba171ea3a00704eed', fd, {
            onUploadProgress : ProgressEvent => {
                this.setState({
                    progressPercent : Math.floor(ProgressEvent.loaded / ProgressEvent.total * 100)
                })
            }
        })
        .then(response => { 
                console.log(response);
                const panData = PanData;
                console.log('first', panData);
                console.log('second', panData);
                this.setState({
                    panNumber : panData[0].panNumber
                })
            })
        .catch(error => {
            console.log(error);
            const panData = PanData;
            console.log('first', panData);
            console.log('second', panData);
            this.setState({
                panNumber : panData[0].panNumber,
                nameAsPan : panData[0].name,
                address : panData[0].address,
                pinCode : panData[0].pinCode
            })
            // this.onChangeHandler();
        })
    }

    panConfirmHandler = () => {
        this.setState({
            aadharShown : true
        })
    }


    render() {

        // console.log("FILE2", this.state.panSelected);
        const {latitude, longitude, geoAddress} = this.state;
        let progressBar = null;

        //PAN form state
        const {panNumber, nameAsPan, dob, address, pinCode} = this.state;
        const values = {panNumber, nameAsPan, dob, address, pinCode};

        if(this.state.progressPercent > 0 && this.state.progressPercent <= 99){
            progressBar = <ProgressBar style={style.progressBar} variant="success" now={this.state.progressPercent} />
        }
        if(this.state.progressPercent == 100){
            progressBar = <p className="uploadSuccessText">Uploaded Successfully</p>
        }

        return (
            <div>
                {/* <p>Coordinates and address</p>
        <p>Latitude : {latitude}</p>
        <p>Longitude : {longitude}</p>
        <p><strong>Adress</strong></p>
        <p>{geoAddress}</p> */}
        <input
            style={{display : "none"}}  
            ref={fileInput => this.fileInput = fileInput}
            type="file"
            onChange={this.panSelectHandler}/>
        <button
            className="selectPan"
            onClick={()=>this.fileInput.click()}>
                Select PAN
        </button>
        {this.state.panSelected ?
            <button
                className="uploadBtn"
                onClick={this.fileUploadHandler}>
                Upload
            </button> : 
        null}
        {progressBar}
        <div>
        {this.state.panSelected ? <img style={style.previewImage} src={this.state.panSelected} alt="Preview PAN" /> : null}
        </div>
        <StepForm 
            values={values}
            changeHandler={(event)=>this.onChangeHandler(event)}
            panConfirmHandler={this.panConfirmHandler}
            aadharShown={this.state.aadharShown}/>
            </div>
            
        )
    }
}

const style = {
    progressBar : {
        width : "30%",
        margin : "10px auto"
    },
    previewImage : {
        width : "100%",
        maxWidth : "200px",
        marginTop : "1rem"
    }
}

export default main
