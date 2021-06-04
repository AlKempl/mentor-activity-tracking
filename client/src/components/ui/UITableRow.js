import React, {Component} from "react";

export default class UITableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:props.data,
        };
    }

    componentDidMount() {

    }

    render() {
        return (
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
        );
    }
}