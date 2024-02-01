// const output = document.querySelector('.output');
// const url = 'https://docs.google.com/spreadsheets/d/';
// const ssid = '1pDaqRMLZTKkLolbQIobl3hOkRWbe8-5Yo7WsXKa4wQc';
// const q1 = '/gviz/tq?';
// const q2 = 'tqx=out:json';
var q3 = 'sheet=GameMasterSheet';
var publishers = [
    "Number Go Up Games",
    "Brendan",
    "Chris",
    "I Heart Nishiki Games",
    "Kyle Does What Nintendont",
    "DS Games for Girls",
    "Matt",
    "Vanessa"
]

for (let i=0; i < publishers.length; i++) {
    var query1 = `select E,F,P,Q,R where D contains '${publishers[i]}'`;
    var q4 = encodeURIComponent(query1);
    var url1 = `${url}${ssid}${q1}&${q2}&${q3}&tq=${q4}`;
    
    //output.textContent = endpoint1;
    fetch(url1).then(res => res.text()).then(data => {
        const temp = data.substr(47).slice(0,-2);
        const json = JSON.parse(temp);
        let text = `<h3>${publishers[i]}</h3><table class="pub-tab">`;
        text += doHeaderRow(json);
        const rows = json.table.rows;
        rows.forEach(row => {
            text += doBodyRow(row.c);
        });
        text += '</table>';
        console.log(text)
        document.getElementById(`pub-table-${i}`).innerHTML = text;
    })

}

function doHeaderRow(json) {
    let text = '<tr>';
    const cols = json.table.cols;
    text += `<th>${cols[0].label}</th>`;
    for (let i = 1; i < cols.length; i++) {
        text += "<th>" + cols[i].label + "</th>";
    }
    text += '</tr>';
    return text;
}

function doBodyRow(row) {
    let text = '<tr>';
    for (let i = 0; i < row.length; i++) {
        if (!row[i]) {
            text += `<td>-</td>`;
            continue;
        }
        let value = row[i].v;
        // Replace "Date(YYYY,MM,DD)" with "M/D"
        if(typeof value === "string") {
            if (value.includes("Date")) {
                console.log(value);
                value = value.replace("Date(", "");
                value = value.replace(")", "");
                let arr = value.split(",");
                arr.splice(0, 1);
                arr[0] = parseInt(arr[0]) + 1;
                value = arr.join("/");
                console.log(value);
            }
        }
        // Round numbers to hundredths
        if(isNumber(value)) value = Math.round(value * 100) / 100;
        text += `<td>${value}</td>`;
    }
    text += '</tr>';
    return text;
}

function isNumber(value) {
    return typeof value === 'number';
}
