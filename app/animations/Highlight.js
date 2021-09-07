import Animation from "classes/Animation";
import gsap from "gsap";

export default class Highlight extends Animation {
    constructor({ parent, elements }) {
        super({ parent, elements });
    }

    animateIn() {
        gsap.fromTo(
            this.parent,
            {
                autoAlpha: 0,
                scale: 1.2,
                delay: 0.5,
            },
            {
                autoAlpha: 1,
                scale: 1,
                ease: "expo.out",
                duration: 1.5,
            }
        );
    }

    animateOut() {
        gsap.set(this.parent, {
            autoAlpha: 0,
        });
    }
}
