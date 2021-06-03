import React, {Component} from "react";

import AdminUsersService from "../services/admin.users.service";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import Jumbotron from "react-bootstrap/Jumbotron";

export default class AdminUsersComponent extends Component {
    columns;

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
                    type: Type.SELECT,
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
            users_content: []
        };
    }

    componentDidMount() {
        AdminUsersService.list().then(
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
                <div className="container">
                    <BootstrapTable
                        keyField='id'
                        data={this.state.users_content}
                        columns={this.columns}
                        cellEdit={cellEditFactory({mode: 'click', blurToSave: true})}
                        noDataIndication="Table is Empty"
                    />
                </div>
            </Jumbotron>
        );
    }
}