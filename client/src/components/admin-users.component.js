import React, {Component} from "react";

import AdminUsersService from "../services/admin.users.service";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Jumbotron from "react-bootstrap/Jumbotron";
import UITable from "./ui/UITable";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import UserForm from "./crud/UserForm";
import DelUserForm from "./crud/DelUserForm";

export default class AdminUsersComponent extends Component {
    constructor(props) {
        super(props);

        let columns = [{
            dataField: 'id',
            text: 'User ID',
            width: null
        }, {
            dataField: 'username',
            text: 'Username',
            width: null
        }, {
            dataField: 'createdAt',
            text: 'Created At',
            width: null
        }, {
            dataField: 'updatedAt',
            text: 'Updated At',
            width: null
        }, {
            dataField: 'enabled',
            text: 'Enabled',
            width: null
        }, {
            dataField: null,
            text: 'Actions',
            width: null,
            actions: {
                edit_btn: {
                    title: (item) => {
                        return 'Edit: ' + item.username;
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

        let new_user = {username: '', email: '', roles: [1], enabled: 1, password: ''};
        let actions = {
            add_btn: {
                cellValue: <Button variant="primary">Add</Button>,
                title: 'Add new user',
                bodyValue: <div><UserForm user={new_user} new={true}/></div>
            }
        };

        this.state = {
            users_content: [],
            columns: columns,
            isLoading: true,
            actions: actions
        };
    }

    async componentDidMount() {
        await AdminUsersService.list().then(
            response => {
                this.setState({
                    users_content: response.data.users,
                    isLoading: false
                });
            },
            error => {
                this.setState({
                    users_content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString(),
                    isLoading: false
                });
            }
        );
    }

    render() {
        return (
            <Jumbotron>
                {
                    this.state.isLoading ?
                        <div>
                            <Spinner animation="border"/>
                        </div>
                        :
                        <UITable
                            columns={this.state.columns}
                            data={this.state.users_content}
                            actions={this.state.actions}
                        />
                }
            </Jumbotron>
        );
    }
}