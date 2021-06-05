import React from "react";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminBlocksService from "../../services/admin.blocks.service";

export default class BlockForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loading: false, new:props.new, ...props.block};

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.onClickDismiss = this.onClickDismiss.bind(this);

    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeActive(e) {
        this.setState({
            active: e.target.value
        });
    }

    onClickDismiss(e) {
        this.setState({
            message: null
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        if(this.state.new){
            AdminBlocksService.add(this.state.name, this.state.description, this.state.active).then(
                () => {
                    window.location.href = '/admin/blocks';
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
        }else{
            AdminBlocksService.updateOne(this.state.id, this.state.name, this.state.description, this.state.active).then(
                () => {
                    window.location.href = '/admin/blocks';
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

    }

    componentDidMount() {

    }

    render() {
        let block = this.state;
        // console.log(block)
        return (
            <Form onSubmit={e => this.handleSubmit(e)}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            onChange={this.onChangeName}
                            value={block.name}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={block.description}
                            onChange={this.onChangeDescription}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="active">
                        <Form.Label>Active</Form.Label>
                        <Form.Control
                            as="select"
                            value={block.active}
                            onChange={this.onChangeActive}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit" disabled={this.state.loading}>
                    Save
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

