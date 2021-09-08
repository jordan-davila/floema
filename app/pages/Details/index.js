import Page from "classes/Page";
import Button from "classes/Button";

export default class Details extends Page {
    constructor() {
        super({
            id: "details",
            parent: ".details",
            elements: {
                navigation: document.querySelector(".navigation"),
                link: ".details__button",
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
