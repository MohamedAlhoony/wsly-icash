import React from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps'

const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap
            defaultZoom={20}
            defaultCenter={
                props.selectedLocation?.Lat && props.selectedLocation?.Lang
                    ? {
                          lat: props.selectedLocation?.Lat,
                          lng: props.selectedLocation?.Lang,
                      }
                    : { lat: 32.8872, lng: 13.1913 }
            }
        >
            {props.selectedLocation?.Lat && props.selectedLocation?.Lang && (
                <Marker
                    icon={'/images/marker-selected.svg'}
                    position={{
                        lat: props.selectedLocation?.Lat,
                        lng: props.selectedLocation?.Lang,
                    }}
                />
            )}
        </GoogleMap>
    ))
)
const map = (props) => {
    return (
        <MyMapComponent
            {...props}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk3aFNasenVAyx12Q6qSPKJrthxHm7D4Q&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}

export default map
