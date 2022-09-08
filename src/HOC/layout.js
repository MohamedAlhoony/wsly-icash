import React from 'react'
import Header from '../components/header/header'
import { Container, Col, Row } from 'react-bootstrap'
import styles from './styles.module.css'
import { Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import { toastOptionsAction } from '../redux/actions/layout'
import ToastPopup from '../components/toastPopup/toastPopup'
const Layout = (props) => {
    const closeToastPopup = () => {
        props.dispatch(toastOptionsAction({ ...props.toast, show: false }))
    }
    return (
        <Container className={styles.mainContainer} fluid>
            <Header />
            <Container className="py-5" fluid={'lg'}>
                <Row>
                    <Col xs={12}>
                        <h1 className="text-center">
                            خدمة آي كاش لعندك&nbsp;
                            <span
                                style={{ color: '#f5a62b', fontSize: '3rem' }}
                            >
                                !
                            </span>
                        </h1>
                        <p
                            style={{ fontSize: '1.1rem' }}
                            className="text-center"
                        >
                            {/* رصيدك الآي كاش يوصلك لحوشكم. */}
                        </p>
                    </Col>
                </Row>
                <ToastPopup
                    closeToastPopup={closeToastPopup}
                    toast={props.toast}
                />
                <Outlet />
            </Container>
        </Container>
    )
}

export default connect((state) => {
    return {
        toast: state.layout_reducer.toast,
    }
})(Layout)
