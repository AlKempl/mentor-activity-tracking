import React, {Component} from "react";

import UserService from "../services/user.service";
import Jumbotron from "react-bootstrap/Jumbotron";

export default class BoardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
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
                    <h3>{this.state.content}</h3>
                </div>
            </Jumbotron>
        );
    }
}