import React, {Component} from "react";

import AdminBlocksService from "../services/admin.blocks.service";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import Jumbotron from "react-bootstrap/Jumbotron";

export default class AdminBlocksComponent extends Component {
    columns;

    constructor(props) {
        super(props);

        this.columns = [{
            dataField: 'id',
            text: 'Block ID'
        }, {
            dataField: 'name',
            text: 'Name'
        }, {
            dataField: 'description',
            text: 'Description'
        }, {
            dataField: 'createdAt',
            text: 'Created At'
        }, {
            dataField: 'updatedAt',
            text: 'Updated At',
        }
            // , {
            //     dataField: 'roles[].name',
            //     text: 'Roles'
            // }
            , {
                dataField: 'active',
                text: 'Active',
                editor: {
                    type: Type.SELECT,
                    options: [{
                        value: '0',
                        label: 'No'
                    }, {
                        value: '1',
                        label: 'Yes'
                    }]
                }
            }];

        this.state = {
            blocks_content: []
        };
    }

    componentDidMount() {
        AdminBlocksService.list().then(
            response => {
                this.setState({
                    blocks_content: response.data.blocks
                });
            },
            error => {
                this.setState({
                    blocks_content:
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
                        data={this.state.blocks_content}
                        columns={this.columns}
                        cellEdit={cellEditFactory({mode: 'click', blurToSave: true})}
                        noDataIndication="Table is Empty"
                    />
                </div>
            </Jumbotron>
        );
    }
}