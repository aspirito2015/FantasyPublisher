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
                    <a class="pure-menu-heading" href="#main">Fantasy Publisher</a>

                    <ul class="pure-menu-list">
                        <li class="pure-menu-item"><a href="#standings" class="pure-menu-link">Standings</a></li>
                        <li class="pure-menu-item"><a href="#publishers" class="pure-menu-link">Publishers (WIP)</a></li>
                        <li class="pure-menu-item"><a href="#games" class="pure-menu-link">Games (WIP)</a></li>
                    </ul>
                </div>
            </div>
        `;
    }
}

customElements.define('menu-component', Menu);
