import React from "react";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModLessonsService from "../../services/mod.lessons.service";

export default class DelLessonForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loading: false, new:props.new, ...props.user};

        this.onClickDismiss = this.onClickDismiss.bind(this);
    }

    onClickDismiss(e) {
        this.setState({
            message: null
        });
    }

    handleDelete(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        ModLessonsService.deleteOne(this.state.id).then(
            () => {
                window.location.href = '/stats';
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }

    componentDidMount() {

    }

    render() {
        return (
            <Form onSubmit={e => this.handleDelete(e)}>
                <p>Are you sure that you want to delete lesson <b>{this.state.username}</b> ({this.state.id})</p>
                <Button variant="danger" type="submit" disabled={this.state.loading}>
                    Delete
                </Button>
                {this.state.message && (
                    <div className="form-group" onClick={this.onClickDismiss}>
                        <div className="alert alert-danger" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                )}
            </Form>
        );
    }
}

