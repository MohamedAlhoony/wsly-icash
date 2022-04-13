import React from 'react'
import { Alert, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

const SuccessflySubmitted = () => {
    const [searchParams] = useSearchParams()
    const doToken = searchParams.get('DOToken')
    return (
        <Row>
            <Col xs={12}>
                <Alert className="text-center my-3" variant="success">
                    <h3>تمت عملية الطلب بنجاح</h3>
                </Alert>
            </Col>
            <Col xs={12}>
                <div className="d-grid gap-2">
                    <Button
                        variant="success"
                        to={`/preview/?DOToken=${doToken}`}
                        as={Link}
                        size="lg"
                    >
                        اضغط هنا لمتابعة الطلب
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

export default SuccessflySubmitted
