class Menu extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- Menu toggle -->
            <a href="#menu" id="menuLink" class="menu-link">
                <!-- Hamburger icon -->
                <span></span>
            </a>
            <div id="menu">
                <div class="pure-menu">
                    <a class="pure-menu-heading" href="index.html#main">Fantasy Publisher</a>

                    <ul class="pure-menu-list">
                        <li class="pure-menu-item"><a href="index.html#standings" class="pure-menu-link">&ensp;Standings</a></li>
                        <li class="pure-menu-item"><a href="index.html#publishers" class="pure-menu-link">&ensp;Publishers</a></li>
                        <li class="pure-menu-item"><a href="index.html#games" class="pure-menu-link">&ensp;Games (WIP)</a></li>
                        <li class="pure-menu-item"><a href="calendar.html" class="pure-menu-link">Calendar</a></li>
                    </ul>
                </div>
            </div>
        `;
    }
}

customElements.define('menu-component', Menu);
