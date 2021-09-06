import EventEmitter from "events";
import each from "lodash/each";

export default class Component extends EventEmitter {
    constructor({ parent, elements }) {
        super();

        this.parentSelector = parent;
        this.childrenSelectors = {
            ...elements,
        };

        this.create();
        this.addEventListeners();
    }

    create() {
        this.parent = document.querySelector(this.parentSelector);
        this.elements = {};

        each(this.childrenSelectors, (entry, key) => {
            if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
                this.elements[key] = entry;
            } else {
                this.elements[key] = document.querySelectorAll(entry);

                if (this.elements[key].length === 0) {
                    this.elements[key] === null;
                } else if (this.elements[key].length === 1) {
                    this.elements[key] = document.querySelector(entry);
                }
            }
        });
    }

    addEventListeners() {}

    removeEventListeners() {}
}
