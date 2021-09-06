import Page from "classes/Page";

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
        this.children.link.addEventListener("click", (_) => {
            console.log("Clicked button!!!!");
        });
    }
}
