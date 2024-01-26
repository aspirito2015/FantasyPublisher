// https://docs.google.com/spreadsheets/d/1pDaqRMLZTKkLolbQIobl3hOkRWbe8-5Yo7WsXKa4wQc/edit?usp=sharing
const output = document.querySelector('.output');
const url = 'https://docs.google.com/spreadsheets/d/';
const ssid = '1pDaqRMLZTKkLolbQIobl3hOkRWbe8-5Yo7WsXKa4wQc';
const q1 = '/gviz/tq?';
const q2 = 'tqx=out:json';
const q3 = 'sheet=Standings';

const url1 = `${url}${ssid}${q1}&${q2}&${q3}`;
console.log(url1);
//output.textContent = endpoint1;
fetch(url1).then(res => res.text()).then(data => {
    const temp = data.substr(47).slice(0,-2);
    const json = JSON.parse(temp);
    console.log(json);
    let text = doHeaderRow(json);
    const rows = json.table.rows;
    rows.forEach(row => {
        text += doBodyRow(row.c);
    });
    document.getElementById("standings-table").innerHTML = text;
})

function doHeaderRow(json) {
    let text = '<tr>';
    const cols = json.table.cols;
    cols.forEach(col => {
        const temp1 = col.label;
        text += "<th>" + col.label + "</th>";
    });
    text += '</tr>';
    return text;
}

function doBodyRow(row) {
    let text = '<tr>';
    row.forEach(cell => {
        let value = cell.v;
        if(isNumber(value)) value = Math.round(value * 100) / 100;
        text += "<td>" + value + "</td>";
    })
    text += '</tr>';
    return text;
}

function isNumber(value) {
    return typeof value === 'number';
}
