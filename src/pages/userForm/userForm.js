import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useSearchParams, useNavigate } from 'react-router-dom'
import * as actions from '../../redux/actions/userFormPage'
import styles from './styles.module.scss'
const UserForm = (props) => {
    const data = props.data
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const doToken = searchParams.get('DOToken')
    const handleInputChange = ({ id, value }) => {
        props.dispatch({ type: `userForm_page-${id}-value`, data: value })
    }
    const submit = () => {
        props
            .dispatch(actions.submitForm({ doToken }))
            .then(() => {
                navigate(`/successfully-submitted/?DOToken=${doToken}`)
            })
            .catch((error) => {
                if (error === 'you are so far from the shop') {
                    navigate(`/?DOToken=${doToken}`)
                }
            })
    }
    useEffect(() => {
        if (!data) {
            navigate(`/?DOToken=${doToken}`)
        }
    }, [data, navigate, doToken])
    return (
        <Row className={`d-flex justify-content-center mt-5`}>
            <Col xs={12} lg={6}>
                {props.submitError && (
                    <div>
                        <Alert className="text-center my-3" variant="danger">
                            <p style={{ margin: 0 }}>{props.submitError}</p>
                        </Alert>
                    </div>
                )}
                <Form style={{ position: 'relative' }} onSubmit={submit}>
                    {props.isLoading && (
                        <div className={styles.loader}>
                            <Spinner variant="dark" animation="border" />
                        </div>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>اسم المرسل</Form.Label>
                        <Form.Control
                            onChange={(e) =>
                                handleInputChange({
                                    id: 'senderName',
                                    value: e.target.value,
                                })
                            }
                            value={props.senderName}
                            type="text"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>ملاحظات</Form.Label>
                        <Form.Control
                            onChange={(e) =>
                                handleInputChange({
                                    id: 'notes',
                                    value: e.target.value,
                                })
                            }
                            value={props.notes}
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button
                            onClick={(e) => {
                                e.preventDefault()
                                submit()
                            }}
                            type={'submit'}
                            disabled={props.senderName === ''}
                            variant="success"
                            size="lg"
                        >
                            قبول الطلب
                        </Button>
                    </div>
                </Form>
            </Col>
            <Col xs={12} className={'mt-5 d-flex justify-content-start'}>
                <Button
                    onClick={() => navigate(`/?DOToken=${doToken}`)}
                    size="lg"
                    variant="warning"
                >
                    عودة &nbsp;
                    <i className="bi bi-arrow-right"></i>
                </Button>
            </Col>
        </Row>
    )
}

export default connect(({ userForm_page_reducer, home_page_reducer }) => {
    return {
        data: home_page_reducer.data,
        senderName: userForm_page_reducer.senderName,
        notes: userForm_page_reducer.notes,
        isLoading: userForm_page_reducer.isLoading,
        submitError: userForm_page_reducer.submitError,
        selectedLocation: home_page_reducer.selectedLocation,
    }
})(UserForm)
