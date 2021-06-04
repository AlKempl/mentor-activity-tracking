import React, {Component} from "react";

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
            let column = this.state.columns[i];
            if (item.hasOwnProperty(column.dataField)) {
                cells.push(<td key={item.id + "-" + column}>{item[column.dataField]}</td>)
            }
        }
        return cells;
    }

    render() {
        return (
            <tr>
                {this.getRow(this.state.row)}
            </tr>
        );
    }
}