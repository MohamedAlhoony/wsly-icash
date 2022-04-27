import React from 'react'
import { Row, Col, ListGroup, Badge } from 'react-bootstrap'
import styles from './styles.module.scss'
import moment from 'moment'
const OrderInfo = (props) => {
    return (
        <ListGroup className={styles.listGroup} horizontal as={Row}>
            <Col xs={6} md={'auto'}>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">رقم العملية</div>
                        <span>{props.orderDetails?.RefrenceNo}</span>
                    </div>
                    <Badge className={styles.badge} bg="warning" pill>
                        #
                    </Badge>
                </ListGroup.Item>
            </Col>
            <Col xs={6} md={'auto'}>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">تاريخ الطلب</div>
                        {moment
                            .utc(props?.orderDetails?.CreateDate)
                            .local()
                            .format('DD/MM/YYYY hh:mm A')}
                    </div>
                    <Badge className={styles.badge} bg="warning" pill>
                        <i className="bi bi-clock"></i>
                    </Badge>
                </ListGroup.Item>
            </Col>
            <Col xs={6} md={'auto'}>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">القيمة المطلوية</div>
                        <span>{props.orderDetails?.TotalAmount}</span>
                        دينار ليبي
                    </div>
                    <Badge className={styles.badge} bg="warning" pill>
                        <i className="bi bi-currency-dollar"></i>
                    </Badge>
                </ListGroup.Item>
            </Col>
        </ListGroup>
    )
}
export default OrderInfo
