import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/homePage'
import Map from './map/map'
import { useSearchParams, useNavigate } from 'react-router-dom'
import OrderInfo from './orderInfo/orderInfo'
import debounce from 'lodash.debounce'
let handleCenterChange
const _handleCenterChange = debounce((value) => {
    handleCenterChange(value)
}, 100)
const Home = ({ dispatch, data, selectedLocation, mapCenterCoordinations }) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const doToken = searchParams.get('DOToken')
    useEffect(() => {
        if (!data) {
            dispatch(actions.getData({ doToken })).then((data) => {
                if (data.OrderDetails?.Status !== 0) {
                    navigate(`/preview/?DOToken=${doToken}`)
                }
            })
        }
        if (data && data.OrderDetails?.Status !== 0) {
            navigate(`/preview/?DOToken=${doToken}`)
        }
    })
    const handleMarkerClick = ({ item, marker, key }) => {
        dispatch(actions.handleMarkderClick({ item, marker, key }))
    }
    const onMapClick = ({ marker }) => {
        dispatch(actions.onMapClick({ marker }))
    }
    const getUserCurrentLocation = () => {
        dispatch(actions.getCurrentPosition())
    }

    handleCenterChange = (value) => {
        dispatch({
            type: 'home_page-mapCenterCoordinations',
            data: value,
        })
    }

    return (
        <Row>
            <Col xs={12} className={'my-3'}>
                <OrderInfo orderDetails={data?.OrderDetails} />
            </Col>

            <Col xs={12}>
                {data && (
                    <>
                        <Row className="mb-2">
                            <Col xs={12} className={'mb-2'}>
                                <h3>حدد موقعك:</h3>
                            </Col>
                            <Col
                                xs={12}
                                className="d-flex justify-content-start"
                            >
                                <Button
                                    variant="warning"
                                    onClick={getUserCurrentLocation}
                                >
                                    اضغط لتحديد موقعك الحالي
                                    <i className="bi bi-geo"></i>
                                </Button>
                            </Col>
                        </Row>
                        <Map
                            store={{
                                lat: data?.OrderDetails?.FromLat,
                                lang: data?.OrderDetails?.FromLang,
                            }}
                            handleCenterChange={(value) =>
                                _handleCenterChange(value)
                            }
                            onMapClick={onMapClick}
                            handleMarkerClick={handleMarkerClick}
                            locations={data?.ClientLocations}
                            mapCenterCoordinations={mapCenterCoordinations}
                        />
                    </>
                )}
            </Col>

            <Col className={'mt-2 d-flex justify-content-end'}>
                <Button
                    onClick={() => {
                        if (selectedLocation.isNewPlace) {
                            navigate(`/confirm-location/?DOToken=${doToken}`)
                        } else {
                            navigate(`/user-form/?DOToken=${doToken}`)
                        }
                    }}
                    disabled={!selectedLocation ? true : false}
                    size="lg"
                    variant="warning"
                >
                    التالي &nbsp;
                    <i className="bi bi-arrow-left"></i>
                </Button>
            </Col>
        </Row>
    )
}

export default connect(({ home_page_reducer }) => {
    return {
        isLoading: home_page_reducer.isLoading,
        data: home_page_reducer.data,
        selectedLocation: home_page_reducer.selectedLocation,
        mapCenterCoordinations: home_page_reducer.mapCenterCoordinations,
    }
})(Home)
