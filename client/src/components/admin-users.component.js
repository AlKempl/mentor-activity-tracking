import React, {Component, useState} from "react";

import AdminUsersService from "../services/admin.users.service";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Jumbotron from "react-bootstrap/Jumbotron";
import UITable from "./ui/UITable";

export default class AdminUsersComponent extends Component {
    constructor(props) {
        super(props);

        this.columns = [{
            dataField: 'id',
            text: 'User ID'
        }, {
            dataField: 'username',
            text: 'Username'
        }, {
            dataField: 'createdAt',
            text: 'Created At'
        }, {
            dataField: 'updatedAt',
            text: 'Updated At',
            editor: null
        }
            // , {
            //     dataField: 'roles[].name',
            //     text: 'Roles'
            // }
            , {
                dataField: 'enabled',
                text: 'Enabled',
                editor: {
                    type: null,
                    options: [{
                        value: '0',
                        label: 'Disabled'
                    }, {
                        value: '1',
                        label: 'Enabled'
                    }]
                }
            }];

        this.state = {
            users_content: [],
        };
    }

    async componentDidMount() {
        await AdminUsersService.list().then(
            response => {
                this.setState({
                    users_content: response.data.users
                });
            },
            error => {
                this.setState({
                    users_content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <Jumbotron>
                <UITable data={this.state.users_content}/>
            </Jumbotron>
        );
    }
}