import React, {Component} from "react";
import UIModalCell from './UIModalCell'
import {InfoCircle, XCircle} from 'react-bootstrap-icons';
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Badge, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserForm from "../crud/UserForm";
import DelUserForm from "../crud/DelUserForm";

export default class UITableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            row: props.row,
            columns: props.columns
        };

    }

    componentWillReceiveProps(props) {
        this.setState({
            row: props.row,
            columns: props.columns
        });
    }

    getRow(item) {
        let cells = [];
        for (let i = 0; i < this.state.columns.length; i++) {
            let action_cell = []
            //console.log('item', item)
            let column = this.state.columns[i];
            //console.log('column', column)

            if (item.hasOwnProperty(column.dataField)) {
                if(column.hasOwnProperty('visual')){
                    //console.log('visual found')
                    cells.push(
                        // item.visual(item)
                        // cells.push(<td key={item.id + "-" + column.dataField}>{item[column.dataField]}</td>)
                            <td>{column.visual(column, item)}</td>
                    )
                }else{
                    cells.push(<td key={item.id + "-" + column.dataField}>{item[column.dataField]}</td>)
                }
            } else if (column.dataField == null){
                if(column.actions.hasOwnProperty('edit_btn')) {
                    let cellValue = <InfoCircle color="royalblue" size={24}/>;
                    action_cell.push(
                        <Col><UIModalCell
                            cellValue={cellValue}
                            bodyValue={column.actions.edit_btn.bodyValue(item)}
                            title={column.actions.edit_btn.title(item)}/></Col>
                    )
                }

                if (column.actions.hasOwnProperty('del_btn')) {
                    let cellValue = <XCircle color="royalblue" size={24}/>;
                    action_cell.push(
                        <Col><UIModalCell
                            cellValue={cellValue}
                            bodyValue={column.actions.del_btn.bodyValue(item)}
                            title={column.actions.del_btn.title(item)}/></Col>
                    )
                }
            }

            if(action_cell.length > 0 )
                cells.push(<td><Row>{action_cell}</Row></td>)
        }
        return cells;
    }

    render() {
        //console.log(this.state)
        return (
            <tr>
                {this.getRow(this.state.row)}
            </tr>
        );
    }
}