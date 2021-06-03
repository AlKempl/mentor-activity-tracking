import React, {Component} from "react";

import UserService from "../services/user.service";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import BoardUser from "./board-user.component";
import AdminUsersComponent from "./admin-users.component";
import AdminBlocksComponent from "./admin-blocks.component";

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
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
            <div className="container">
                {/*<header className="jumbotron">*/}
                {/*    <h3>{this.state.content}</h3>*/}
                {/*</header>*/}
                <Tabs defaultActiveKey="users" id="uncontrolled-tab-example">
                    <Tab eventKey="users" title="Пользователи">
                        <AdminUsersComponent />
                    </Tab>
                    <Tab eventKey="blocks" title="Блоки">
                        <AdminBlocksComponent />
                    </Tab>
                    <Tab eventKey="settings" title="Настройки">
                        {this.state.content}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}