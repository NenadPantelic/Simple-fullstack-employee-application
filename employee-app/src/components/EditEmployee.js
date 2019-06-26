import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class EditEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snackbaropen: false,
            snackbarmsg: "",
            deps: []
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

        fetch('http://localhost:51316/api/Employee', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: event.target.EmployeeID.value,
                EmployeeName: event.target.EmployeeName.value,
                Department: event.target.Department.value,
                Mail: event.target.Mail.value,
                DateOfJoining: event.target.DOJ.value,
            })
        })
            .then(res => res.json())
            .then((res) => {
                this.setState({ snackbaropen: true, snackbarmsg: res })
            },
                (error) => {
                    this.setState({ snackbaropen: true, snackbarmsg: 'Failed to add.' })
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
                            Edit employee
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeNameGr">
                                        <Form.Label> Employee ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="EmployeeID"
                                            disabled
                                            defaultValue={this.props.emplid}
                                        />

                                        <Form.Label> Employee name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="EmployeeName"
                                            defaultValue={this.props.emplname}
                                        />
                                        <Form.Label> Department</Form.Label>
                                        <Form.Control as="select" name="Department" defaultValue={this.props.empldepartment}>
                                            {this.state.deps.map(dep =>
                                                <option key={dep.DepartmentID}> {dep.DepartmentName}</option>)}
                                        </Form.Control>
                                        <Form.Label> Mail</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Mail"
                                            defaultValue={this.props.emplmail}/>
                                        <Form.Label> Date of Joining</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DOJ"
                                            defaultValue={this.props.empldoj}/>



                                    </Form.Group>


                                    <Form.Group>
                                        <Button type="submit" >
                                            Update employee
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