import each from "lodash/each";
import map from "lodash/map";
import gsap from "gsap";
import Prefix from "Prefix";

export default class Page {
    constructor({ parent, children, id }) {
        this.id = id;
        this.parentSelector = parent;
        this.childrenSelectors = {
            ...children,
        };

        this.transformPrefix = Prefix("transform");
        this.onMouseWheelEvent = this.onMouseWheel.bind(this);
    }

    create() {
        this.parent = document.querySelector(this.parentSelector);
        this.children = {};

        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
            limit: 0,
        };

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
            this.animationIn = gsap.timeline();
            this.animationIn.fromTo(this.parent, { autoAlpha: 0 }, { autoAlpha: 1 });
            this.animationIn.call((_) => {
                this.addEventListeners();
                resolve();
            });
        });
    }

    hide() {
        return new Promise((resolve) => {
            this.removeEventListeners();
            this.animationOut = gsap.timeline();
            this.animationOut.to(this.parent, {
                autoAlpha: 0,
                onComplete: resolve,
            });
        });
    }

    onMouseWheel(event) {
        const { deltaY } = event;
        this.scroll.target += deltaY;
    }

    onResize() {
        if (this.children.wrapper) {
            this.scroll.limit = this.children.wrapper.clientHeight - window.innerHeight;
        }
    }

    update() {
        this.scroll.target = gsap.utils.clamp(0, this.scroll.limit, this.scroll.target);
        this.scroll.current = gsap.utils.interpolate(this.scroll.current, this.scroll.target, 0.1);

        if (this.scroll.current < 0.01) {
            this.scroll.current = 0;
        }

        if (this.children.wrapper) {
            this.children.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`;
        }
    }

    addEventListeners() {
        window.addEventListener("mousewheel", this.onMouseWheelEvent);
    }

    removeEventListeners() {
        window.removeEventListener("mousewheel", this.onMouseWheelEvent);
    }
}
