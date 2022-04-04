import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/homePage'
import Map from './map/map'
import { useSearchParams, useNavigate } from 'react-router-dom'
import OrderInfo from './orderInfo/orderInfo'
const Home = (props) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const doToken = searchParams.get('DOToken')
    useEffect(() => {
        if (!props.data) {
            props.dispatch(actions.getData({ doToken })).then((data) => {
                if (data.OrderDetails?.Status !== 0) {
                    navigate(`/preview/?DOToken=${doToken}`)
                }
            })
        }
    }, [doToken, navigate, props])
    const handleMarkerClick = ({ item, marker, key }) => {
        props.dispatch(actions.handleMarkderClick({ item, marker, key }))
    }
    const onMapClick = ({ marker }) => {
        props.dispatch(actions.onMapClick({ marker }))
    }
    return (
        <Row>
            <Col xs={12} className={'my-3'}>
                <OrderInfo orderDetails={props.data?.OrderDetails} />
            </Col>
            <Col xs={12}>
                {props.data && (
                    <Map
                        store={{
                            lat: props.data?.OrderDetails?.FromLat,
                            lang: props.data?.OrderDetails?.FromLang,
                        }}
                        onMapClick={onMapClick}
                        handleMarkerClick={handleMarkerClick}
                        locations={props.data?.ClientLocations}
                    />
                )}
            </Col>
            <Col className={'mt-2 d-flex justify-content-end'}>
                <Button
                    onClick={() => navigate(`/user-form/?DOToken=${doToken}`)}
                    disabled={!props.selectedLocation ? true : false}
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
