import React, {Component} from "react";
import Table from "react-bootstrap/Table";
import UITableRow from "./UITableRow";

export default class UITable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            columns: []
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            isLoading: props.isLoading,
            data: props.data,
            columns: props.columns
        });
    }
    componentDidMount() {
        this.rows = this.state.data.map(item => (new UITableRow({key: item.id, data: item})));
    }

    getData(){
        return this.state.data.map(item => <UITableRow key={item.id} data={item}>{JSON.stringify(item)}</UITableRow>)
    }

    render() {
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>

                    {/*{this.state.data ? this.state.data.map(item=> item.username()) :*/}
                    {/*    <tr colspan="4">No data</tr>*/}
                    {/*}*/}
                    {
                        this.getData()
                    }
                    </tbody>
                </Table></div>
        );
    }
}