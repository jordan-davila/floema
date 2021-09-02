import Page from "classes/Page";

export default class Details extends Page {
    constructor() {
        super({
            id: "details",
            parent: ".details",
            children: {
                navigation: document.querySelector(".navigation"),
            },
        });
    }
}
