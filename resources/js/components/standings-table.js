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
    text += `<th class="freeze-col-1">${cols[0].label}</th>`;
    for (let i = 1; i < cols.length; i++) {
        text += "<th>" + cols[i].label + "</th>";
    }
    text += '</tr>';
    return text;
}

function doBodyRow(row) {
    let text = '<tr>';
    text += `<th class="freeze-col-1 row-heading">${row[0].v}</th>`;
    for (let i = 1; i < row.length; i++) {
        let value = row[i].v;
        if(isNumber(value)) value = Math.round(value * 100) / 100;
        text += `<td>${value}</td>`;
    }
    text += '</tr>';
    return text;
}

function isNumber(value) {
    return typeof value === 'number';
}
