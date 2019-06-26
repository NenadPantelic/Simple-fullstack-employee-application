import React,{Component} from 'react';
import { Table } from 'react-bootstrap';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { AddEmployee } from './AddEmployee';
import { EditEmployee } from './EditEmployee';
export class Employee extends Component{
    constructor(props) {
        super(props);
        this.state = { empls: [], modalShow: false, editModalShow: false };
    }

    refreshList() {
        fetch("http://localhost:51316/api/Employee")
            .then(response => response.json())
            .then(data => {
                this.setState({ empls: data });
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteEmployee(emplid){
        
        if(window.confirm("Are you sure with this action?")){
            fetch("http://localhost:51316/api/Employee/" + emplid,
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
        const { empls, emplid, emplname, empldepartment, emplmail, empldoj  } = this.state;
        let modalClose = () => this.setState({ modalShow: false});
        let editModalClose = () => this.setState({ editModalShow: false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th> EmployeeID</th>
                            <th> EmployeeName</th>
                            <th> Department</th>
                            <th> Mail</th>
                            <th> Date of joining </th>
                        </tr>
                    </thead>
                    <tbody>
                        {empls.map(empl =>
                            <tr key={empl.EmployeeID}>
                                <td> {empl.EmployeeID}</td>
                                <td> {empl.EmployeeName}</td>
                                <td> {empl.Department}</td>
                                <td> {empl.Mail}</td>
                                <td> {empl.DateOfJoining}</td>

                                <td>
                                <Button
                                    variant="info"
                                    className="mr-2"
                                    onClick={() => this.setState({ editModalShow: true , emplid:empl.EmployeeID, 
                                        emplname:empl.EmployeeName,
                                        emplmail:empl.Mail,
                                        empldepartment:empl.Department,
                                        empldoj:empl.DateOfJoining
                                    })}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="danger"
                                    className="mr-2"
                                    onClick={() => this.deleteEmployee(empl.EmployeeID)}
                                >
                                    Delete 
                                </Button>

                                <EditEmployee
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    emplid={emplid}
                                    emplname={emplname}
                                    empldepartment={empldepartment}
                                    emplmail={emplmail}
                                    empldoj={empldoj}
                            
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
                        Add employee
                    </Button>

                    <AddEmployee
                        show={this.state.modalShow}
                        onHide={modalClose}
                    />
                </ButtonToolbar>
            </div>

        );
    }



}