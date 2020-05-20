import React, { Component } from 'react';
import StepForm from './StepForm';
import {ProgressBar} from 'react-bootstrap';
import axios from 'axios';


import './main.css';


export class main extends Component {

    state={
        latitude : '',
        longitude : '',
        address : '',
        base64 : '',
        panSelected : null,
        progressPercent : null
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

        // console.log('showPosition', this.state.latitude);
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
                    address : data.results[0].formatted_address
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
        // let reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onloadend = () => {
            this.setState({
                panSelected : file,
                // base64 : reader.result
            })
        // }
        // console.log("FILE", file);
        console.log("FILE2", this.state.panSelected);
        // console.log("FILE3", this.state.base64);
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('PAN', this.state.panSelected, this.state.panSelected.name);
        axios.post('https://www.mocky.io/v2/5185415ba171ea3a00704eed', fd, {
            onUploadProgress : ProgressEvent => {
                this.setState({
                    progressPercent : Math.floor(ProgressEvent.loaded / ProgressEvent.total * 100)
                })
                // console.log(progressPercent);
            }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
    getFiles(files){
        this.setState({ files: files })
      }

    render() {
        const {latitude, longitude, address} = this.state;
        let progressBar = null;
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
        <p>{address}</p> */}
        <input
            style={{display : "none"}}
            ref={fileInput => this.fileInput = fileInput}
            type="file"
            onChange={this.panSelectHandler}/>
        <button
            className="selectPan"
            onClick={() => this.fileInput.click()}>
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
        <StepForm />
            </div>
            
        )
    }
}

const style = {
    progressBar : {
        width : "30%",
        margin : "10px auto"
    }
}

export default main
