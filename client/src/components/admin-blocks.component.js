import React, {Component} from "react";

import AdminBlocksService from "../services/admin.blocks.service";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Jumbotron from "react-bootstrap/Jumbotron";
import UITable from "./ui/UITable";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import UserForm from "./crud/UserForm";
import DelBlockForm from "./crud/DelBlockForm";
import BlockForm from "./crud/BlockForm";

export default class AdminBlocksComponent extends Component {
    constructor(props) {
        super(props);

        let columns = [{
            dataField: 'id',
            text: 'Block ID',
            width: null
        }, {
            dataField: 'name',
            text: 'Name',
            width: null
        }, {
            dataField: 'description',
            text: 'Description',
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
            dataField: 'active',
            text: 'Active',
            width: null
        }, {
            dataField: null,
            text: 'Actions',
            width: null,
            actions: {
                edit_btn: {
                    title: (block) => {
                        return 'Edit: ' + block.name;
                    },
                    bodyValue: (block) => {
                        return (<div><BlockForm block={block} new={false}/></div>);
                    }
                },
                del_btn: {
                    title: (block) => {
                        return 'Delete: ' + block.name;
                    },
                    bodyValue: (block) => {
                        return (<div><DelBlockForm block={block}/></div>);
                    }
                }
            }
        }];

        let new_block = {name: '', description: '', active: 1, };
        let actions = {
            add_btn: {
                cellValue: <Button variant="primary">Add</Button>,
                title: 'Add new block',
                bodyValue: <div><BlockForm block={new_block} new={true}/></div>
            }
        };

        this.state = {
            blocks_content: [],
            columns: columns,
            isLoading: true,
            actions: actions
        };
    }

    async componentDidMount() {
        await AdminBlocksService.list().then(
            response => {
                this.setState({
                    blocks_content: response.data.blocks,
                    isLoading: false
                });
            },
            error => {
                this.setState({
                    blocks_content:
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
                            data={this.state.blocks_content}
                            actions={this.state.actions}
                        />
                }
            </Jumbotron>
        );
    }
}