import EventEmitter from "events";
import each from "lodash/each";

export default class Component extends EventEmitter {
    constructor({ parent, children }) {
        super();

        this.parentSelector = parent;
        this.childrenSelectors = {
            ...children,
        };

        this.create();
        this.addEventListeners();
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

    addEventListeners() {}

    removeEventListeners() {}
}
