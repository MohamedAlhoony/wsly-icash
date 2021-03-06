import React, { useRef } from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps'

const handleMarkerClick = (props, item, marker, key) => {
    props.handleMarkerClick({ item, marker, key })
}
const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap
            ref={props.google_map_ref}
            onCenterChanged={() => {
                props.handleCenterChange({
                    Lat: props.google_map_ref.current.getCenter().lat(),
                    Lang: props.google_map_ref.current.getCenter().lng(),
                })
            }}
            onClick={(marker) => {
                props.onMapClick({ marker })
            }}
            defaultZoom={props.store.lat && props.store.lang ? 15 : 9}
            center={{
                lat: props.mapCenterCoordinations.Lat,
                lng: props.mapCenterCoordinations.Lang,
            }}
        >
            {props.store.lat && props.store.lang && (
                <Marker
                    zIndex={1000}
                    styl
                    icon={'/images/store.svg'}
                    position={{ lat: props.store.lat, lng: props.store.lang }}
                />
            )}
            {props.locations.map((item, key) => {
                return (
                    <Marker
                        icon={
                            item.isSelected
                                ? '/images/marker-selected.svg'
                                : '/images/marker.svg'
                        }
                        zIndex={item.isSelected ? 1000 : 1}
                        key={key}
                        position={{ lat: item.Lat, lng: item.Lang }}
                        onClick={(marker) =>
                            handleMarkerClick(props, item, marker, key)
                        }
                    />
                )
            })}
        </GoogleMap>
    ))
)
const Map = (props) => {
    let google_map_ref = useRef(null)
    return (
        <MyMapComponent
            google_map_ref={google_map_ref}
            {...props}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk3aFNasenVAyx12Q6qSPKJrthxHm7D4Q&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}

export default Map
