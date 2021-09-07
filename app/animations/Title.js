import Animation from "classes/Animation";
import gsap from "gsap";
import { calculate, split } from "utils/text";
import each from "lodash/each";

export default class Title extends Animation {
    constructor({ parent, elements }) {
        super({ parent, elements });

        split({ element: this.parent, append: true });
        split({ element: this.parent, append: true });
        this.elementsLinesSpans = this.parent.querySelectorAll("span span");
    }

    animateIn() {
        this.timelineIn = gsap.timeline({ delay: 0.5 });
        this.timelineIn.set(this.parent, {
            autoAlpha: 1,
        });

        each(this.elementsLines, (line, index) => {
            this.timelineIn.fromTo(
                line,
                {
                    y: "100%",
                },
                {
                    delay: index * 0.1,
                    duration: 1,
                    ease: "expo.out",
                    y: "0%",
                },
                0
            );
        });
    }

    animateOut() {
        gsap.set(this.parent, {
            autoAlpha: 0,
        });
    }

    onResize() {
        this.elementsLines = calculate(this.elementsLinesSpans);
    }
}
