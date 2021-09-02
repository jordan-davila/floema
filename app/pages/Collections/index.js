import Page from "classes/Page";

export default class Collections extends Page {
    constructor() {
        super({
            id: "collections",
            parent: ".collections",
            children: {
                navigation: document.querySelector(".navigation"),
            },
        });
    }
}
