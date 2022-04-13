import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/homePage'
import Map from './map/map'
import { useSearchParams, useNavigate } from 'react-router-dom'
import OrderInfo from './orderInfo/orderInfo'
const Home = ({ dispatch, data, selectedLocation }) => {
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
    }, [doToken, navigate, data, dispatch])
    const handleMarkerClick = ({ item, marker, key }) => {
        dispatch(actions.handleMarkderClick({ item, marker, key }))
    }
    const onMapClick = ({ marker }) => {
        dispatch(actions.onMapClick({ marker }))
    }
    return (
        <Row>
            <Col xs={12} className={'my-3'}>
                <OrderInfo orderDetails={data?.OrderDetails} />
            </Col>
            <Col xs={12}>
                {data && (
                    <>
                        <h3>حدد موقعك:</h3>
                        <Map
                            store={{
                                lat: data?.OrderDetails?.FromLat,
                                lang: data?.OrderDetails?.FromLang,
                            }}
                            onMapClick={onMapClick}
                            handleMarkerClick={handleMarkerClick}
                            locations={data?.ClientLocations}
                        />
                    </>
                )}
            </Col>
            <Col className={'mt-2 d-flex justify-content-end'}>
                <Button
                    onClick={() => navigate(`/user-form/?DOToken=${doToken}`)}
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
    }
})(Home)
