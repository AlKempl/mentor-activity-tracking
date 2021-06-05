import React, {Component} from "react";
import Table from "react-bootstrap/Table";
import UITableRow from "./UITableRow";
import {col} from "sequelize";
import Col from "react-bootstrap/Col";
import UIModalCell from "./UIModalCell";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {XCircle} from "react-bootstrap-icons";
import DelUserForm from "../crud/DelUserForm";
import UserForm from "../crud/UserForm";

export default class UITable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            columns: props.columns,
            actions: props.actions
        };
        //console.log(this.state)
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data,
            columns: props.columns,
            actions: props.actions
        });
    }

    getHeader() {
        let columns = [];
        for (let i = 0; i < this.state.columns.length; i++) {
            let column = this.state.columns[i];
            columns.push(<th style={{width: column.width}}
                             key={column.dataField ? column.dataField : column.text.toLowerCase().replace(/\s/g, '')}>{column.text}</th>)
        }
        return columns;
    }


    getActions() {
        let actions = []
        if(this.state.actions.hasOwnProperty('add_btn')){

            actions.push(
                <div><UIModalCell
                    cellValue={this.state.actions.add_btn.cellValue}
                    bodyValue={this.state.actions.add_btn.bodyValue}
                    title={this.state.actions.add_btn.title}/></div>
            )
        }
        return <Row>{actions}</Row>
    }

    render() {
        return (
            <div>
                {this.getActions()}
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
                        />)
                    }
                    </tbody>
                </Table></div>
        );
    }
}