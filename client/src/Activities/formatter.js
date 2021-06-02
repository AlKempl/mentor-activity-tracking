import Example from './ModalWindow'

function mentorActivityFormatter(cell, row, rowIndex, formatExtraData) {
    let number = Number(cell)
    if (cell === '' || number === 0){
        return (<span><Example badge_variant={"light"} value="+" data={{row:row, cell:cell, rowIndex:rowIndex, formatExtraData:formatExtraData}}/></span>);
    }else if( 1 <= number && number <= 3){
        return (<span><Example badge_variant={"info"} value={number} data={{row:row, cell:cell, rowIndex:rowIndex, formatExtraData:formatExtraData}}/></span>);
    }else if( 4 <= number && number <= 6){
        return (<span><Example badge_variant={"primary"} value={number} data={{row:row, cell:cell, rowIndex:rowIndex, formatExtraData:formatExtraData}}/></span>);
    }else if( 7 <= number ){
        return (<span><Example badge_variant={"success"} value={number} data={{row:row, cell:cell, rowIndex:rowIndex, formatExtraData:formatExtraData}}/></span>);
    }else
        return (<span><Example badge_variant={"warning"} value={number} data={{row:row, cell:cell, rowIndex:rowIndex, formatExtraData:formatExtraData}}/></span>);
}

export default mentorActivityFormatter