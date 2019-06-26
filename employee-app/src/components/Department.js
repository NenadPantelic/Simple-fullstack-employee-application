import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { AddDepartment } from './AddDepartment';
import { EditDepartment } from './EditDepartment';

export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], modalShow: false, editModalShow: false };
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

    componentDidUpdate() {
        this.refreshList();
    }

    deleteDepartment(depid){
        
        if(window.confirm("Are you sure with this action?")){
            fetch("http://localhost:51316/api/Department/" + depid,
            {
                method:"DELETE",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            });
        }
    }
    render() {
        const { deps, depid, depname } = this.state;
        let modalClose = () => this.setState({ modalShow: false});
        let editModalClose = () => this.setState({ editModalShow: false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th> DepartmentID</th>
                            <th> DepartmentName</th>
                            <th> Options </th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td> {dep.DepartmentID}</td>
                                <td> {dep.DepartmentName}</td>
                                <td>
                                <Button
                                    variant="info"
                                    className="mr-2"
                                    onClick={() => this.setState({ editModalShow: true , depid:dep.DepartmentID, depname:dep.DepartmentName})}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="danger"
                                    className="mr-2"
                                    onClick={() => this.deleteDepartment(dep.DepartmentID)}
                                >
                                    Delete 
                                </Button>

                                <EditDepartment
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    depid={depid}
                                    depname={depname}
                                />
                                </td>

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