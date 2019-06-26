import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class EditDepartment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snackbaropen: false,
            snackbarmsg: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    }

    handleSubmit(event) {

        event.preventDefault();

        fetch('http://localhost:51316/api/Department', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentID: event.target.DepartmentID.value,
                DepartmentName: event.target.DepartmentName.value
            })
        })
            .then(res => res.json())
            .then((res) => {
                this.setState({ snackbaropen: true, snackbarmsg: res })
            },
                (error) => {
                    this.setState({ snackbaropen: true, snackbarmsg: 'Failed to add: ' + error })
                });

    }

    render() {
        return (
            <div>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarmsg} </span>}
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackbarClose}>
                            x
                        </IconButton>
                    ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit department
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="DepartmentID">
                                        <Form.Label> Department ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="DepartmentID"
                                            required
                                            disabled
                                            defaultValue={this.props.depid}
                                            />

                                    </Form.Group>

                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label> Department name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="DepartmentName"
                                            required
                                            defaultValue={this.props.depname}
                                            />

                                    </Form.Group>

                                    <Form.Group>
                                        <Button type="submit" >
                                            Update department
                                    </Button>
                                    </Form.Group>

                                </Form>
                            </Col>



                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );

    }



}