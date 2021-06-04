import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {Badge, Form} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Example(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(props)
    return (
        <>
            <Badge variant={props.badge_variant} onClick={handleShow}>
                {props.value}
            </Badge>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.data.name} – {props.data.columnName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Дата</th>
                            <th>Сеньор ментор (добавил)</th>
                            <th>Обучаемый</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>25.02.2021</td>
                            <td>Otto, 26.02.2021</td>
                            <td>Иван</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>10.03.2021</td>
                            <td>Thornton, 12.03.2021</td>
                            <td>Петр</td>
                            <td>--</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>12.03.2021</td>
                            <td>Emma, 12.03.2021</td>
                            <td>Мария</td>
                            <td>--</td>
                        </tr>
                        </tbody>
                    </Table>
                    <hr/>
                    <Container>
                        <h5>Add new entry</h5>
                        <Row>
                            <Col>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control type="date"/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Mentor</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Helen</option>
                                                    <option>Peter</option>
                                                    <option>Mike</option>
                                                    <option>Sofia</option>
                                                    <option>Josh</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example