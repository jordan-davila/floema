import Component from "classes/Component";
import gsap from "gsap";

export default class Button extends Component {
    constructor({ parent }) {
        super({ parent });

        this.path = parent.querySelector("path:last-child");
        this.pathLength = this.path.getTotalLength();

        this.timeline = gsap.timeline({ paused: true });

        this.timeline.fromTo(
            this.path,
            {
                strokeDashoffset: this.pathLength,
                strokeDasharray: `${this.pathLength} ${this.pathLength}`,
            },
            {
                strokeDashoffset: 0,
                strokeDasharray: `${this.pathLength} ${this.pathLength}`,
            }
        );
    }

    onMouseEnter() {
        this.timeline.play();
    }

    onMouseLeave() {
        this.timeline.reverse();
    }

    addEventListeners() {
        this.mouseEnterEvent = this.onMouseEnter.bind(this);
        this.mouseLeaveEvent = this.onMouseLeave.bind(this);

        this.parent.addEventListener("mouseenter", this.mouseEnterEvent);
        this.parent.addEventListener("mouseleave", this.mouseLeaveEvent);
    }

    removeEventListeners() {
        this.parent.removeEventListener("mouseenter", this.mouseEnterEvent);
        this.parent.removeEventListener("mouseleave", this.mouseLeaveEvent);
    }
}
