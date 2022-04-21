import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Map from './map/map'
import { Row, Col, Button } from 'react-bootstrap'
import { useSearchParams, useNavigate } from 'react-router-dom'

const ConfirmLocation = (props) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const doToken = searchParams.get('DOToken')
    const selectedLocation = props.selectedLocation
    useEffect(() => {
        if (selectedLocation === null) {
            navigate(`/?DOToken=${doToken}`)
        }
    }, [selectedLocation, navigate, doToken])
    return (
        <Row className="mt-3">
            <Col xs={12}>
                <h3>هل أنت متأكد من موقعك؟</h3>
                <Map selectedLocation={selectedLocation} />
            </Col>
            <Col xs={12} className={'mt-2 d-flex justify-content-end'}>
                <Button
                    onClick={() => {
                        navigate(`/?DOToken=${doToken}`)
                    }}
                    size="lg"
                    variant="warning"
                >
                    تعديل الموقع &nbsp;
                    <i className="bi bi-arrow-right"></i>
                </Button>
                <Button
                    style={{ marginRight: '0.5rem' }}
                    onClick={() => {
                        navigate(`/user-form/?DOToken=${doToken}`)
                    }}
                    size="lg"
                    variant="success"
                >
                    تأكيد &nbsp;
                    <i className="bi bi-arrow-left"></i>
                </Button>
            </Col>
        </Row>
    )
}

export default connect(({ home_page_reducer }) => {
    return {
        selectedLocation: home_page_reducer.selectedLocation,
    }
})(ConfirmLocation)
