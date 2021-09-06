import Page from "classes/Page";

export default class About extends Page {
    constructor() {
        super({
            id: "about",
            parent: ".about",
            elements: {
                navigation: document.querySelector(".navigation"),
                wrapper: ".about__wrapper",
            },
        });
    }
}
