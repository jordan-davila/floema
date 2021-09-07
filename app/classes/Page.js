import each from "lodash/each";
import map from "lodash/map";
import gsap from "gsap";
import Prefix from "Prefix";
import normalizeWheel from "normalize-wheel";
import Title from "animations/Title";
import Label from "animations/Label";
import Paragraph from "animations/Paragraph";
import Highlight from "animations/Highlight";

export default class Page {
    constructor({ parent, elements, id }) {
        this.id = id;
        this.parentSelector = parent;
        this.childrenSelectors = {
            ...elements,
            animationsTitles: '[data-animation="title"]',
            animationsLabels: '[data-animation="label"]',
            animationsParagraphs: '[data-animation="paragraph"]',
            animationsHighlights: '[data-animation="highlight"]',
        };

        this.transformPrefix = Prefix("transform");
        this.onMouseWheelEvent = this.onMouseWheel.bind(this);
    }

    create() {
        this.parent = document.querySelector(this.parentSelector);
        this.elements = {};

        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
            limit: 0,
        };

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

        this.createAnimations();
    }

    createAnimations() {
        this.animations = [];

        this.animationsTitles = map(this.elements.animationsTitles, (element) => {
            return new Title({
                parent: element,
            });
        });

        this.animationsLabels = map(this.elements.animationsLabels, (element) => {
            return new Label({
                parent: element,
            });
        });

        this.animationsParagraphs = map(this.elements.animationsParagraphs, (element) => {
            return new Paragraph({
                parent: element,
            });
        });

        this.animationsHighlights = map(this.elements.animationsHighlights, (element) => {
            return new Highlight({
                parent: element,
            });
        });

        this.animations.push(
            ...this.animationsTitles,
            ...this.animationsLabels,
            ...this.animationsParagraphs,
            ...this.animationsHighlights
        );
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
        const { pixelY } = normalizeWheel(event);
        this.scroll.target += pixelY;
    }

    onResize() {
        if (this.elements.wrapper) {
            this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight;
        }

        each(this.animations, (animation) => animation.onResize());
    }

    update() {
        this.scroll.target = gsap.utils.clamp(0, this.scroll.limit, this.scroll.target);
        this.scroll.current = gsap.utils.interpolate(this.scroll.current, this.scroll.target, 0.1);

        if (this.scroll.current < 0.01) {
            this.scroll.current = 0;
        }

        if (this.elements.wrapper) {
            this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`;
        }
    }

    addEventListeners() {
        window.addEventListener("mousewheel", this.onMouseWheelEvent);
    }

    removeEventListeners() {
        window.removeEventListener("mousewheel", this.onMouseWheelEvent);
    }
}
