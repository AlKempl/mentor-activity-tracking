import React, { Component } from "react";
import "./notfound.component.css";

export default class Notfound extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="NotFound text-center">
                <h3>Sorry, page not found!</h3>
            </div>
        );
    }
}