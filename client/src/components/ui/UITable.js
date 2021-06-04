import React, {Component} from "react";
import Table from "react-bootstrap/Table";
import UITableRow from "./UITableRow";
import {col} from "sequelize";

export default class UITable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            columns: props.columns,
            rowActions: props.rowActions,
            actions: props.actions
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data,
            columns: props.columns,
            rowActions: props.rowActions,
            actions: props.actions
        });
    }

    getActions() {
        let columns = [];
        for (let i = 0; i < this.state.columns.length; i++) {
            let column = this.state.columns[i];
            columns.push(<th style={{width: column.width}} key={column.dataField}>{column.text}</th>)
        }
        return columns;
    }

    getHeader() {
        let columns = [];
        for (let i = 0; i < this.state.columns.length; i++) {
            let column = this.state.columns[i];
            columns.push(<th style={{width: column.width}} key={column.dataField}>{column.text}</th>)
        }
        return columns;
    }

    render() {
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        {this.getHeader()}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map(item => <UITableRow
                            row={item}
                            columns={this.state.columns}
                            rowActions={this.state.rowActions}/>)
                    }
                    </tbody>
                </Table></div>
        );
    }
}