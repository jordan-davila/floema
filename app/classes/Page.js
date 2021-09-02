import each from "lodash/each";
import map from "lodash/map";
import gsap from "gsap";

export default class Page {
    constructor({ parent, children, id }) {
        this.id = id;
        this.parentSelector = parent;
        this.childrenSelectors = {
            ...children,
        };
    }

    create() {
        this.parent = document.querySelector(this.parentSelector);
        this.children = {};

        each(this.childrenSelectors, (entry, key) => {
            if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
                this.children[key] = entry;
            } else {
                this.children[key] = document.querySelectorAll(entry);

                if (this.children[key].length === 0) {
                    this.children[key] === null;
                } else if (this.children[key].length === 1) {
                    this.children[key] = document.querySelector(entry);
                }
            }
        });
    }

    show() {
        return new Promise((resolve) => {
            gsap.from(this.parent, {
                autoAlpha: 0,
                onComplete: resolve,
            });
        });
    }

    hide() {
        return new Promise((resolve) => {
            gsap.to(this.parent, {
                autoAlpha: 0,
                onComplete: resolve,
            });
        });
    }
}
