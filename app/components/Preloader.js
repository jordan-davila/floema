import Component from "classes/Component";
import each from "lodash/each";
import gsap from "gsap";
import { split } from "utils/text";

export default class Preloader extends Component {
    constructor() {
        super({
            parent: ".preloader",
            elements: {
                title: ".preloader__title",
                number: ".preloader__number",
                numberText: ".preloader__number__text",
                images: document.querySelectorAll("img"),
            },
        });

        // Wrapper of Title Spans - to improve animateOut
        split({
            element: this.elements.title,
            expression: "<br />",
        });

        split({
            element: this.elements.title,
            expression: "<br />",
        });

        this.elements.titleSpans = this.elements.title.querySelectorAll("span span");

        this.length = 0;
        this.createLoader();
    }

    createLoader() {
        each(this.elements.images, (image) => {
            image.src = image.getAttribute("data-src");
            image.onload = (_) => this.onAssetLoaded(image);
        });
    }

    onAssetLoaded(image) {
        this.length += 1;
        let percentage = this.length / this.elements.images.length;
        this.elements.numberText.innerHTML = `${Math.round(percentage * 100)}%`;
        if (percentage === 1) {
            this.onLoaded();
        }
    }

    onLoaded() {
        return new Promise((resolve) => {
            this.animateOut = gsap.timeline({
                delay: 2,
            });

            this.animateOut.to(this.elements.titleSpans, {
                duration: 1.5,
                ease: "expo.out",
                stagger: 0.1,
                y: "100% ",
            });

            this.animateOut.to(
                this.elements.numberText,
                {
                    duration: 1.5,
                    ease: "expo.out",
                    stagger: 0.1,
                    y: "100% ",
                },
                "-=1.4"
            );

            this.animateOut.to(
                this.parent,
                {
                    duration: 1.5,
                    ease: "expo.out",
                    scaleY: 0,
                    transformOrigin: "100% 100%",
                },
                "-=1"
            );

            this.animateOut.call((_) => {
                this.emit("completed");
            });
        });
    }

    destroy() {
        this.parent.parentNode.removeChild(this.parent);
    }
}
