import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import AllMarker from './Markers';

class Map extends Component{

	constructor(props){
		super(props);
		
	}

	render(){
		return (
			<div>
			  <GoogleMap
				  zoom={15}
				  center={{ lat: 21.0168864, lng: 105.7855574 }}
				>
			  <AllMarker/>
			  </GoogleMap>
			</div>
		);
	}
	}
	
export default withScriptjs(withGoogleMap(Map));