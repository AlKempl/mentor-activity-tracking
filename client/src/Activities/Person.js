import React from 'react';
import Example from './ModalWindow'

export default class Person extends React.Component {

    constructor(props) {
        super(props);
        this.state = {id: props.id, name: props.name, data: props.data};
        this.generateData = this.generateData.bind(this);
        this.badgeVariant = this.badgeVariant.bind(this);
    }


    render() {
        return (
            <tr id={this.state.id} key={this.state.id}>
                <td>{this.state.name}</td>
                {this.generateData()}
            </tr>
        );
    }

    badgeVariant(value){
        let number = Number(value)
        if (value === '' || number === 0){
            return {value:'+', variant:'light'};
        }else if( 1 <= number && number <= 3){
            return {value:number, variant:'info'};
        }else if( 4 <= number && number <= 6){
            return {value:number, variant:'primary'};
        }else if( 7 <= number ){
            return {value:number, variant:'success'};
        }else
            return {value:number, variant:'warning'};
    }


    generateData() {
        let res = []
        let columnData = this.state.data;
        for (const [key, value] of Object.entries(columnData)) {
            let temp_dat = this.badgeVariant(value.value)
            console.log(temp_dat)
            res.push(
                <td key={this.state.name+key}>
                    <Example badge_variant={temp_dat.variant} value={temp_dat.value} data={{name:this.state.name, columnIdx:key, columnName:value.label}}/>
                </td>
            )
        }
        return res;
    }
}