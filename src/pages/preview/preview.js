import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/homePage'
import { useSearchParams, useNavigate } from 'react-router-dom'
import OrderInfo from '../home/orderInfo/orderInfo'
import Stepper from './stepper/stepper'
const Preview = (props) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const doToken = searchParams.get('DOToken')
    useEffect(() => {
        if (!props.data) {
            props.dispatch(actions.getData({ doToken })).then((data) => {
                if (data.OrderDetails?.Status === 0) {
                    navigate(`/?DOToken=${doToken}`)
                }
            })
        }
    }, [doToken, navigate, props])
    return (
        <Row>
            <Col xs={12} className={'my-3'}>
                <OrderInfo orderDetails={props.data?.OrderDetails} />
            </Col>
            <Col xs={12} className={'mt-5'}>
                <Stepper status={props.data?.OrderDetails?.Status} />
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
})(Preview)
