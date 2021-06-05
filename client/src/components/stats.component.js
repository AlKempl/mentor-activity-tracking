import React, {Component} from "react";

import StatsService from "../services/stats.service";
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";
import UITable from "./ui/UITable";
import AdminBlocksService from "../services/admin.blocks.service";
import {Badge} from "react-bootstrap";
import Example from "../Activities/ModalWindow";
import UIModalCell from "./ui/UIModalCell";
import StatDetailForm from "./crud/StatDetailForm";

export default class Stats extends Component {
    constructor(props) {
        super(props);

        let columns = []

        this.state = {
            data: [],
            columns: columns,
            isLoading: true,
            actions: []
        };
    }

    getVariant(itemValue) {
        let number = Number(itemValue)
        let variant = '';
        let value = number;
        if (itemValue === '' || number === 0) {
            variant = "light";
            value = "+";
        } else if (1 <= number && number <= 3) {
            variant = "info";
        } else if (4 <= number && number <= 6) {
            variant = "primary";
        } else if (7 <= number) {
            variant = "success";
        } else
            variant = "warning";

        return variant;
    }

    getValue(itemValue) {
        let number = Number(itemValue)
        let value = number;
        if (itemValue === '' || number === 0) {
            value = "+";
        }
        return value;
    }

    getBodyValue(item, column){
        return <StatDetailForm item={item[column.dataField]}/>;
    }

    async componentDidMount() {
        await AdminBlocksService.list().then(
            response => {
                let columns = response.data.blocks.map(block => {
                    return {
                        id: block.id,
                        dataField: 'data_' + block.id,
                        text: block.name,
                        width: "10%",
                        visual: (column, item) => {
                            console.log('bage_item_column', item, column)
                            let cellValue = <Badge
                                variant={this.getVariant(item[column.dataField].length)}
                            >
                                {item[column.dataField].length}
                            </Badge>;

                            let bodyValue = this.getBodyValue(item, column);
                            let title = item.mentor_name + ' – ' + column.text;

                            return (<UIModalCell
                                    cellValue={cellValue}
                                    bodyValue={bodyValue}
                                    title={title}/>
                            )
                        }
                    }
                });
                columns.unshift({
                    id: 'mentor_name',
                    dataField: 'mentor_name',
                    text: 'Mentor',
                    width: "25%"
                })
                this.setState({
                    columns: columns,
                    isLoading: true
                });
            },
            error => {
                this.setState({
                    columns:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString(),
                    isLoading: true
                });
            }
        );

        await StatsService.getStatsData().then(
            response => {
                let statsData = response.data.stats.map(userRow => {
                    console.log('userRow', userRow)

                    let new_obj = {};
                    new_obj.id = userRow.id;
                    new_obj['mentor_name'] = userRow.user.displayname;
                    new_obj['mentor_id'] = userRow.user.id;
                    //console.log('userRow.statsData.length', userRow.statsData)
                    userRow.data.forEach(item => {
                        new_obj['data_' + item.id] = item.lessons;
                    })
                    return new_obj;
                });
                //console.log('set state statsData')
                //console.log(statsData)
                this.setState({
                    data: statsData,
                    isLoading: false
                });

                console.log('state after userrrow', this.state.data)
            },
            error => {
                this.setState({
                    data:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString(),
                    isLoading: true
                });
            }
        );
    }

    render() {
        return (
            <Jumbotron>
                {
                    this.state.isLoading ?
                        <div>
                            <Spinner animation="border"/>
                        </div>
                        :
                        <UITable
                            columns={this.state.columns}
                            data={this.state.data}
                            actions={this.state.actions}
                        />
                }
            </Jumbotron>
        );
    }
}