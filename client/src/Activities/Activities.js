import React from "react";
import Table from "react-bootstrap/Table";

export default class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {persons: props.persons, columns: props.columns}
        this.generateHeader = this.generateHeader.bind(this);
        this.generateTableData = this.generateTableData.bind(this);
    }

    generateHeader() {
        let res = [];
        //res.push({dataField: 'name', text: 'Mentor name', headerStyle: {width: '25%'}})
         res.push(<th style={{width: '25%'}} key={this.state.columns[0].dataField}>{this.state.columns[0].text}</th>)
        for (var i = 1; i < this.state.columns.length; i++) {
            res.push(<th style={{width: '5%'}} key={this.state.columns[i].dataField}>{this.state.columns[i].text}</th>)
            //res.push({dataField: 'blah', text: this.state.columns[i]})
        }
        return res;
    }

    generateTableData() {
        let res = [];
        let tableData = this.state.persons;
        for (var i = 0; i < tableData.length; i++) {
            res.push(tableData[i].render())
        }
        return res;
    }

    render() {
        return <Table striped hover>
            <thead>
            <tr>
                {this.generateHeader()}
            </tr>
            </thead>
            <tbody>
            {this.generateTableData()}
            </tbody>
        </Table>
            ;
        // return <BootstrapTable
        //     keyField='id'
        //     data={this.state.persons}
        //     columns={this.state.columns}
        //     />
        //     ;
    }
}
