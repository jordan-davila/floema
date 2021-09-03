import About from "./pages/About";
import Collections from "./pages/Collections";
import Details from "./pages/Details";
import Home from "./pages/Home";
import each from "lodash/each";
import Preloader from "components/Preloader";

class App {
    constructor() {
        this.createContent();
        this.createPreloader();
        this.createPages();
        this.addLinkListeners();
    }

    createPreloader() {
        this.preloader = new Preloader();
        this.preloader.once("completed", (_) => this.onPreloaded()); // or just bind this eg: this.onPreloaded.bind(this)
    }

    createContent() {
        this.content = document.querySelector(".content");
        this.template = this.content.getAttribute("data-template");
    }

    createPages() {
        this.pages = {
            about: new About(),
            collections: new Collections(),
            details: new Details(),
            home: new Home(),
        };

        this.page = this.pages[this.template];
        this.page.create();
    }

    onPreloaded() {
        this.preloader.destroy();
        this.page.show(); // Animate Page In
    }

    async onChange(url) {
        await this.page.hide();
        const request = await window.fetch(url);

        if (request.status === 200) {
            const html = await request.text();
            const div = document.createElement("div");

            div.innerHTML = html;
            const divContent = div.querySelector(".content");

            this.template = divContent.getAttribute("data-template");

            this.content.setAttribute("data-template", this.template);
            this.content.innerHTML = divContent.innerHTML;

            this.page = this.pages[this.template];
            this.page.create();
            this.page.show();

            this.addLinkListeners();
        } else {
            console.error("Page request failed.");
        }
    }

    addLinkListeners() {
        const links = document.querySelectorAll("a");

        each(links, (link) => {
            link.onclick = (event) => {
                event.preventDefault();
                const { href } = link;
                this.onChange(href);
            };
        });
    }
}

new App();
