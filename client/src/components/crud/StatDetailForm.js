import React from "react";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminUsersService from "../../services/admin.users.service";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import UITable from "../ui/UITable";
import DelUserForm from "./DelUserForm";

export default class UserForm extends React.Component {

    constructor(props) {
        super(props);

        let columns = [{
            dataField: 'id',
            text: '#',
            width: null
        }, {
            dataField: 'date',
            text: 'Date',
            width: null
        }, {
            dataField: 'senior_mentor',
            text: 'Senior mentor',
            width: null
        }, {
            dataField: 'student_name',
            text: 'Student',
            width: null
        }, {
            dataField: 'status',
            text: 'Status',
            width: null
        }, {
            dataField: null,
            text: 'Actions',
            width: null,
            actions: {
                edit_btn: {
                    title: (item) => {
                        return 'Edit: ' + item.id;
                    },
                    bodyValue: (item) => {
                        return (<div><UserForm user={item} new={false}/></div>);
                    }
                },
                del_btn: {
                    title: (item) => {
                        return 'Delete: ' + item.username;
                    },
                    bodyValue: (item) => {
                        return (<div><DelUserForm user={item}/></div>);
                    }
                }
            }
        }];

        this.state = {
            loading: false,
            item: props.item,
            columns: columns,
            data: props.item,
            actions: []
        };

        console.log('lessons', props.item)
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeEnabled = this.onChangeEnabled.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onClickDismiss = this.onClickDismiss.bind(this);


    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEnabled(e) {
        this.setState({
            enabled: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onClickDismiss(e) {
        this.setState({
            message: null
        });
    }

    onChangeRole(e) {
        this.setState((state) => {
            let id = parseInt(e.target.id.replace('role_', ''));
            if (!state.roles.includes(id)) {
                // console.warn(id, 'not includes in', state.roles)
                return {roles: state.roles.concat([id])}
            } else {
                // console.error(id, 'includes in', state.roles)
                return {roles: state.roles.filter(x => x !== id)}
            }

        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        if (this.state.new) {
            AdminUsersService.add(this.state.username, this.state.password, this.state.email, this.state.roles, this.state.enabled).then(
                () => {
                    window.location.href = '/admin/users';
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            AdminUsersService.updateOne(this.state.id, this.state.email, this.state.roles, this.state.enabled).then(
                () => {
                    window.location.href = '/admin/users';
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        }

    }

    componentDidMount() {

    }

    render() {
        let user = this.state;
        // console.log(user)
        return (
            <div>
                <UITable columns={this.state.columns}
                         data={this.state.data}
                         actions={this.state.actions}/>
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
            </div>
        );
    }
}

