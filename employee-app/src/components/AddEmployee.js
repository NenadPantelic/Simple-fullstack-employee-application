import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class AddEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deps: [],
            snackbaropen: false,
            snackbarmsg: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    }

    componentDidMount() {

        fetch("http://localhost:51316/api/Department")
            .then(response => response.json())
            .then(data => {
                this.setState({ deps: data });
            });
    }

    handleSubmit(event) {

        event.preventDefault();
        let body = JSON.stringify({
            EmployeeID: null,
            EmployeeName: event.target.EmployeeName.value,
            Department: event.target.Department.value,
            Mail: event.target.Mail.value,
            DateOfJoining: event.target.DOJ.value
        });
        console.log(body);
        fetch("http://localhost:51316/api/Employee", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                EmployeeID: null,
                EmployeeName: event.target.EmployeeName.value,
                Department: event.target.Department.value,
                Mail: event.target.Mail.value,
                DateOfJoining: event.target.DOJ.value
            })
        })
            .then(res => res.json())
            .then((res) => {
                this.setState({ snackbaropen: true, snackbarmsg: res })
            },
                (error) => {
                    console.log(error);
                    this.setState({ snackbaropen: true, snackbarmsg: "Failed to add." })
                });

    }

    render() {
        return (
            <div>
                <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
                            Add employee
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="EmployeeNameGr">
                                        <Form.Label> Employee name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="EmployeeName"
                                            required
                                            placeholder="employee name" />
                                        <Form.Label> Department</Form.Label>
                                        <Form.Control as="select" name="Department">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.DepartmentID}> {dep.DepartmentName}</option>)}
                                        </Form.Control>
                                        <Form.Label> Mail</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Mail"
                                            required
                                            placeholder="mail" />
                                        <Form.Label> Date of Joining</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DOJ"
                                            required
                                            placeholder="date of joining" />

                                    </Form.Group>

                                    <Form.Group>
                                        <Button type="submit" >
                                            Add employee
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