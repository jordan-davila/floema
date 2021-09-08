import Page from "classes/Page";
import Button from "classes/Button";

export default class Home extends Page {
    constructor() {
        super({
            id: "home",
            parent: ".home",
            elements: {
                navigation: document.querySelector(".navigation"),
                link: ".home__link",
            },
        });
    }

    create() {
        super.create();
        this.link = new Button({ parent: this.elements.link });
    }

    destroy() {
        super.destroy();
        this.link.removeEventListeners();
    }
}
