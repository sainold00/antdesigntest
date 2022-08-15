import React, { Component, useEffect, useState } from "react";
//antdesign
import { Col, Divider, Row, Button, Pagination } from "antd";
import "antd/dist/antd.css";
//css
import "../App.css"
//map
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const style = {
  background: "#395B64",
  padding: "5%",
};



export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},

      latitude: null,
      longitude: null,

      mapCenter: {
        lat: null,
        lng: null,
      },
    };

    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  getCoordinates(position) {
    console.log(position);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      mapCenter: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

 
  handleChange = (address) => {
    this.setState({ address });
  };

   handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        this.setState({ address });
        this.setState({ mapCenter: latLng });
      })
      .catch((error) => console.error("Error", error)); 
  };
  

  

  render() {
    const locLat = this.state.mapCenter.lat
    const locLng = this.state.mapCenter.lng
    
    const currentDate = new Date()
    const timestamp = currentDate.getTime()/1000
    const apikey = 'AIzaSyBCbAbPimMJH-U5J0i69zNqNwOCyXI9Bc0'
    
    const apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + locLat + "," + locLng + '&timestamp=' + timestamp + '&key=' + apikey

    
    
    // console.log(apicall)
    return (
      <>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Divider></Divider>
          <Col className="gutter-row" span={24}>
            <Button onClick={this.getLocation}>Get Your Location</Button>
            <br />
            <br />
            <p>Latitude: {this.state.latitude}</p>
            <p>Longitude: {this.state.longitude}</p>
          </Col>
          <Divider></Divider>
          <Col className="gutter-row" span={12}>
            
            <div style={style}>
              <div>
                <h2>Search Location</h2>
                <PlacesAutocomplete
                  value={this.state.address}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: "Search Places ...",
                          className: "location-search-input",
                        })}
                        
                      />
                      <button type="submit">Search</button>
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <h2>Search History</h2>
              <p>{this.state.address}</p>
              <Pagination defaultCurrent={1} total={500} />;
            </div>
          </Col>
          <Divider></Divider>
          <Col className="gutter-row" span={24}>
            <h2>Map Currently Displaying:</h2>
            <p>Latitude: {this.state.mapCenter.lat}</p>
            <p>Longitude: {this.state.mapCenter.lng}</p>
            <Button href= {apicall}>Get Time Zone</Button>
          </Col>
        </Row>
        

        <Map
          className="googleMap"
          google={this.props.google}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
        >
          <Marker
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng,
            }}
          />
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBCbAbPimMJH-U5J0i69zNqNwOCyXI9Bc0",
})(MapContainer);
