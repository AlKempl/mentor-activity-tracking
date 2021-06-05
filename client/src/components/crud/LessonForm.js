import React from "react";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminUsersService from "../../services/admin.users.service";

export default class LessonForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loading: false, new: props.new, ...props.user};

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDisplayname = this.onChangeDisplayname.bind(this);
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

    onChangeDisplayname(e) {
        this.setState({
            displayname: e.target.value
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
            AdminUsersService.add(this.state.username, this.state.displayname, this.state.password, this.state.email, this.state.roles, this.state.enabled).then(
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
            AdminUsersService.updateOne(this.state.id, this.state.displayname, this.state.email, this.state.roles, this.state.enabled).then(
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
            <Form onSubmit={e => this.handleSubmit(e)}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            disabled={!this.state.new}
                            placeholder="Enter username"
                            onChange={this.onChangeUsername}
                            value={user.username}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="displayname">
                        <Form.Label>Display name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter displayname"
                            onChange={this.onChangeDisplayname}
                            value={user.displayname}/>
                    </Form.Group>

                </Row>
                <Row>
                <Form.Group as={Col} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={user.email}
                        onChange={this.onChangeEmail}
                    />
                </Form.Group>
                {this.state.new &&
                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            disabled={!this.state.new}
                            placeholder="Enter password"
                            onChange={this.onChangePassword}
                            value={user.password}/>
                    </Form.Group>
                }
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="rights">
                        <Form.Label>Rights</Form.Label>
                        <Row>{
                            [
                                {id: 1, name: 'user'}
                                , {id: 2, name: 'mentor'}
                                , {id: 3, name: 'senior'},
                                {id: 4, name: 'admin'}
                            ].map((type) => (
                                <Col>
                                    <div key={`role-${type.id}`} className="mb-3">
                                        <Form.Check
                                            // type={type}
                                            id={`role_${type.id}`}
                                            label={`${type.name}`}
                                            checked={user.roles.includes(type.id)}
                                            onChange={this.onChangeRole}
                                        />
                                    </div>
                                </Col>))}</Row>
                    </Form.Group>

                    <Form.Group as={Col} controlId="enabled">
                        <Form.Label>Enabled</Form.Label>
                        <Form.Control
                            as="select"
                            value={user.enabled}
                            onChange={this.onChangeEnabled}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit" disabled={this.state.loading}>
                    Save
                </Button>
                {this.state.message && (
                    <div className="form-group" onClick={this.onClickDismiss}>
                        <div className="alert alert-danger" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                )}
            </Form>
        );
    }
}

