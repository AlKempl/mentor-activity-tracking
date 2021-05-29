import Activities from './Activities/Activities'
import mentorActivityFormatter from './Activities/formatter'
import Person from './Activities/Person'
import {Col, Container, Row} from "react-bootstrap";
import AppNavbar from "../AppNavbar";
import React from "react";

function ActivitiesViews(){
    let columns = [{text: "Mentor", dataField: "name", headerStyle: {width: '25%'}}]

    let events_dat = {
        // onClick: (e, column, columnIndex, row, rowIndex) => {
        //     //console.log(e);
        //     console.log(column);
        //     console.log(columnIndex);
        //     console.log(row);
        //     console.log(rowIndex);
        //     React.setState({myVar: false})
        //     localStorage.setItem('selected', {column: column, columnIndex: columnIndex, row: row, rowIndex: rowIndex});
        // }
    }


    columns.push(
        {text: "DWH", dataField: "data.1", formatter: mentorActivityFormatter, events: events_dat},
        {text: "GP+NoGP", dataField: "data.2", formatter: mentorActivityFormatter, events: events_dat},
        {text: "SAP", dataField: "data.3", formatter: mentorActivityFormatter, events: events_dat},
        {text: "SQL", dataField: "data.4", formatter: mentorActivityFormatter, events: events_dat},
        {text: "Tableau", dataField: "data.5", formatter: mentorActivityFormatter, events: events_dat},
        {text: "Zeppelin", dataField: "data.6", formatter: mentorActivityFormatter, events: events_dat},
        {text: "Business analysis", dataField: "data.7", formatter: mentorActivityFormatter, events: events_dat},
        {
            text: "Tool selection and data profilnig",
            dataField: "data.8",
            formatter: mentorActivityFormatter,
            events: events_dat
        },
        {text: "Report publishing", dataField: "data.9", formatter: mentorActivityFormatter, events: events_dat},
        {text: "Python", dataField: "data.10", formatter: mentorActivityFormatter, events: events_dat},
        {text: "Senior mentor", dataField: "data.11", formatter: mentorActivityFormatter, events: events_dat})

    var faker = require('faker');
    faker.locale = "ru";

    let persons = []
    for (let i = 0; i < 18;
         i++
    ) {
        let temp_data = {}
        for (let j = 1; j < columns.length; j++) {
            temp_data[j] = {label: columns[j].text, value: Math.floor(Math.random() * 10)}
        }
        //persons.push(new Person({id: i, name: faker.name.findName(), data: temp_data}))
        persons.push(new Person({id: i, name: faker.name.findName(), data: temp_data}))
    }

    return (
        <div className="App">
            <Container fluid>
                <Row>
                    <Col><AppNavbar/></Col>
                </Row>
                <Row>
                    <Col> <Activities persons={persons} columns={columns}/></Col>
                </Row>
            </Container>
        </div>
    );

}
export default ActivitiesViews