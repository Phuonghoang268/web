// import React, {useState} from 'react'
// import { Marker, InfoWindow } from 'react-google-maps'
// import Autocomplete from 'react-google-autocomplete'
// import PlacesAutocomplete, {
//     geocodeByAddress,
//     getLatLng,
//   } from 'react-places-autocomplete';
// import { useSelector, useDispatch } from "react-redux";

// function Markers(props){

//   const [showInfoWindow, setShowInfoWindow] = useState(false)
//   const [activeMarker, setActiveMarker] = useState({})
//   const [selectedPlace, setSelectedPlace] = useState({name:'Marker'})
//   function onMarkerClick(props, marker, e){       
//     setSelectedPlace(props)     
//     setActiveMarker(marker)     
//     setShowInfoWindow(true);
//   }

//   function onClose(){     
//     if (showInfoWindow) {     
//         setShowInfoWindow(false)        
//         setActiveMarker(null)
//     }
//   }
//   return (
//     <div>
//          <Marker 
//               position={{ lat: props.lat, lng: props.lng }}
//               onClick={onMarkerClick} 
//               name={'Marker'}>
//             <InfoWindow 
//               marker={activeMarker}           
//               visible={showInfoWindow}           
//               onClose={onClose}>           
//                 <div>           
//                   <h4>{selectedPlace.name}</h4>           
//                 </div>         
//             </InfoWindow> 
//           </Marker>
//     </div>
//   );
// }

// function AllMarker(){
//   const parks = useSelector(state => state.all_parks)
//   const dispatch = useDispatch();

//   const markers = [
//     {id: 1, lat: 21.0168864, lng: 105.7855574},
//     {id: 2, lat: 21.0268864, lng: 105.7855574},
//     {id: 3, lat: 21.0368864, lng: 105.7855574}];
//   return (
//     <ul>
//         {markers.map((marker) => <Markers lat={marker.lat} lng={marker.lng} />)}
//     </ul>
//   )
// }

// export default AllMarker;

import React, { useEffect, useState } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import Autocomplete from 'react-google-autocomplete'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useSelector, useDispatch } from "react-redux";
import { fetchAllParks } from "../../redux/ActionCreators";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
      all_parks: state.all_parks,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllParks: () => dispatch(fetchAllParks())
});

function AllMarker(props) {
  // const parks = useSelector(state => state.all_parks)
  // const dispatch = useDispatch();
  // const markers = [];

  const [makers, setMakers] = React.useState([]);
  
  function handleAddNewMaker(newMaker) {
    const updateMakers = [
      ...makers,
      {
        lat: newMaker.lat,
        lng: newMaker.lng
      }
    ];
    setMakers(updateMakers);
  }


  useEffect(() => {
    props.fetchAllParks();
    props.all_parks.parks.map((park) =>
    geocodeByAddress(park.location)
      .then(results => getLatLng(results[0]))
      .then(latLng => { 
        // makerObj.push({ lat: latLng.lat, lng: latLng.lng });
        // setMakers(result => [...result, response]);
        handleAddNewMaker({ lat: latLng.lat, lng: latLng.lng })
      })
      .catch(error => console.error('Error', error)))
  }, [])

  console.log(makers);
  // const parks = props.all_parks.parks;

  return (
    <ul>
      {makers.map((marker) => {
        return (
          <Marker position={{ lat: marker.lat, lng: marker.lng }}></Marker>
        );
      })}
    </ul>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMarker);