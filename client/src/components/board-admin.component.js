import React, {Component} from "react";

import UserService from "../services/user.service";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AdminUsersComponent from "./admin-users.component";
import AdminBlocksComponent from "./admin-blocks.component";
import AuthService from "../services/auth.service";

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);

        this.selectTab = this.selectTab.bind(this);
        this.state = {
            content: "",
            isAdmin: AuthService.checkLevel('ROLE_ADMIN')
        };
    }

    componentDidMount() {
        if (!this.state.isAdmin)
            window.location.href = '/'

        console.log(window.location.pathname.split("/").pop())
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

    selectTab(e) {
        if (this.state.isAdmin)
            window.location.href = '/admin/' + e;
    }

    render() {
        return (
            <div className="container">
                <Tabs
                    defaultActiveKey={['users', 'blocks', 'settings']
                        .includes(window.location.pathname.split("/").pop())
                        ? window.location.pathname.split("/").pop()
                        : 'users'}

                    onSelect={this.selectTab}
                    id="uncontrolled-tab-example">
                    <Tab eventKey="users" title="Пользователи">
                        <AdminUsersComponent/>
                    </Tab>
                    <Tab eventKey="blocks" title="Блоки">
                        <AdminBlocksComponent/>
                    </Tab>
                    <Tab eventKey="settings" title="Настройки">
                        {this.state.content}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}