var s_arr = [
    "O Gamers! my Gamers!",
    "A GOTY, a GOTY, my kingdom for a GOTY!",
    "As seen on Google Sheets!",
    "Made in Hoboken!",
    "It's pronounced 'suh-WATCH'!",
    "Also try Immaculate Panel!",
    "Also try Byte!",
    "Let's go Mets!"
];

class Subtitle extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let s = s_arr[Math.floor(Math.random()*s_arr.length)];
        this.innerHTML = `
        <h2 id="subtitle">${s}</h2>
        `;
    }
}

customElements.define('subtitle-component', Subtitle);
