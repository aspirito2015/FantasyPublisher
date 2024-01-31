
// month is 0-11, day is 1-xx (>max will overflow to next year)
const year = 2024;
var start = new Date(year, 0);
var end = new Date(year, 11, 31);
var today = new Date().setHours(0,0,0,0);

function createDay(date) {
    var s = `<li id="${date.getMonth()+1}-${date.getDate()}">`;
    var date_n = date.getDate();
    
    if (date.setHours(0,0,0,0) == today) {
        s += `<span class="active">${date_n}</span>`;
    } else {
        s += date_n;
    }
    s += `</li>`;
    
    return s;
}

function createMonth(month_index) {
    var date = new Date(year, month_index);
    var month_s = date.toLocaleString('default', { month: 'long' });
    var s = `<div class="month-container"><div class="month">
    <ul><li>${month_s}</li></ul>
    </div>
    <ul class="weekdays">
    <li>Su</li><li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li>
    </ul>
    <ul class="days">`;
    
    var now = new Date(year, month_index, 1); // First day of the month
    var end = new Date(year, month_index+1, 0); // Day before 1st of next month
    // insert blanks so 1st day is lined up properly
    for (let i=0; i < now.getDay(); i++) {
        s += `<li></li>`;
    }
    while(now <= end) {
        s += createDay(now);
        now.setDate(now.getDate() + 1); // Go to next day
    }
    s += `</ul><div class="caption"></div></div>`;
    return s;
}

function createYear() {
    var s = ``;
    for (let i=0; i < 12; i++) {
        s += createMonth(i);
    }
    return s;
}

class Calendar extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        console.log('fdas');
        this.innerHTML = createYear();
    }
}

customElements.define('calendar-component', Calendar);

// const output = document.querySelector('.output');
const url = 'https://docs.google.com/spreadsheets/d/';
const ssid = '1pDaqRMLZTKkLolbQIobl3hOkRWbe8-5Yo7WsXKa4wQc';
const q1 = '/gviz/tq?';
const q2 = 'tqx=out:json';
var q3 = 'sheet=GameMasterSheet';
var query1 = `select E,F,C where F IS NOT NULL ORDER BY F`;
var q4 = encodeURIComponent(query1);
var url1 = `${url}${ssid}${q1}&${q2}&${q3}&tq=${q4}`;

fetch(url1).then(res => res.text()).then(data => {
    const temp = data.substr(47).slice(0,-2);
    const json = JSON.parse(temp);
    // console.log(json);
    const rows = json.table.rows;
    rows.forEach(row => {
        let date_s = row.c[1].v;
        let matches = date_s.match(/\d+/g);
        let month_n = Number(matches[1])+1;
        let day_n = Number(matches[2]);
        let day_tag = document.getElementById(`${month_n}-${day_n}`);
        let inner_tag = day_tag.getElementsByTagName("span");
        if (inner_tag.length == 0) {
            day_tag.innerHTML = `<span class="highlighted">${day_n}</span>`;
        }
        let parent = day_tag.parentNode.parentNode;
        let caption = parent.getElementsByClassName("caption")[0];
        let draftee = row.c[2].v;
        let drafted = draftee != "Inelligible" && draftee != null;
        console.log(`${draftee}: ${row.c[0].v}`);
        let s = ``;
        if (drafted) s +="<b>";
        s += `${month_n}/${day_n} - ${row.c[0].v}`;
        if (drafted) s +="</b>";
        s += "<br>";
        caption.innerHTML += s;
        // console.log(`${row.c[0].v}: ${row.c[1].v}`);
    });
})