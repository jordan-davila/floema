import Component from "classes/Component";

export default class AsyncLoad extends Component {
    constructor({ parent }) {
        super({ parent });
        this.createObserver();
    }

    createObserver() {
        this.observer = new window.IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!this.parent.src) {
                        this.parent.src = this.parent.getAttribute("data-src");
                        this.parent.onload = (_) => {
                            this.parent.classList.add("loaded");
                        };
                    }

                    // else {
                    //     if (!this.parent.classList.contains("loaded")) {
                    //         this.parent.classList.add("loaded");
                    //     }
                    // }
                }
            });
        });

        this.observer.observe(this.parent);
    }
}
