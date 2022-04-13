import React from 'react'
import { Row, Col, Toast } from 'react-bootstrap'
import styles from './styles.module.scss'
const ToastPopup = (props) => {
    return (
        <Row
            style={{ position: 'sticky', top: '1rem', zIndex: 1 }}
            className={'d-flex justify-content-center'}
        >
            <Col xs={12} md={6}>
                <Toast
                    onClose={props.closeToastPopup}
                    className={styles.toast}
                    show={props.toast.show}
                >
                    <Toast.Header>
                        <strong
                            style={{
                                color: props.toast.isWarning ? 'red' : 'green',
                            }}
                            className="me-auto"
                        >
                            {props.toast.isWarning ? (
                                <i className="bi bi-exclamation-circle-fill"></i>
                            ) : (
                                <i className="bi bi-check-circle-fill"></i>
                            )}
                            &nbsp;
                            {props.toast.header}
                        </strong>
                    </Toast.Header>
                    {props.toast.msg !== '' && (
                        <Toast.Body>{props.toast.msg}</Toast.Body>
                    )}
                </Toast>
            </Col>
        </Row>
    )
}

export default ToastPopup
