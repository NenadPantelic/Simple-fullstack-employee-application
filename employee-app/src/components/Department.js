import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import {ButtonToolbar, Button} from 'react-bootstrap';
import { AddDepartment } from './AddDepartment';
 
export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], modalShow: false };
    }

    refreshList() {
        fetch("http://localhost:51316/api/Department")
            .then(response => response.json())
            .then(data => {
                this.setState({ deps: data });
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    render() {
        const { deps } = this.state;
        let modalClose = () => this.setState({ modalShow: false });
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th> DepartmentID</th>
                            <th> DepartmentName</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td> {dep.DepartmentID}</td>
                                <td> {dep.DepartmentName}</td>


                            </tr>)}
                    </tbody>

                </Table>


                <ButtonToolbar>
                    <Button
                        variant="primary"
                        onClick={() => this.setState({ modalShow: true })}
                    >
                        Add department
                    </Button>

                    <AddDepartment
                        show={this.state.modalShow}
                        onHide={modalClose}
                    />
                </ButtonToolbar>
            </div>

        );
    }

}