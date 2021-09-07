import Animation from "classes/Animation";
import gsap from "gsap";

export default class Label extends Animation {
    constructor({ parent, elements }) {
        super({ parent, elements });
    }

    animateIn() {
        gsap.fromTo(
            this.parent,
            {
                autoAlpha: 0,
                delay: 0.5,
            },
            {
                autoAlpha: 1,
                duration: 1,
            }
        );
    }

    animateOut() {
        gsap.set(this.parent, {
            autoAlpha: 0,
        });
    }
}
