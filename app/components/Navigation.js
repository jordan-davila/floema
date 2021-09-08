import gsap from "gsap";
import Component from "classes/Component";
import { COLOR_QUARTER_SPANISH_WHITE, COLOR_BRIGHT_GRAY } from "utils/colors";

export default class Navigation extends Component {
    constructor({ template }) {
        super({
            parent: ".navigation",
            elements: {
                items: ".navigation__list__item",
                links: ".navigation__list__link",
            },
        });

        this.onChange(template);
    }

    onChange(template) {
        if (template === "about") {
            gsap.to(this.parent, {
                color: COLOR_BRIGHT_GRAY,
                duration: 1,
            });

            gsap.to(this.elements.items[0], {
                autoAlpha: 1,
                delay: 0.75,
                duration: 0.75,
            });

            gsap.to(this.elements.items[1], {
                autoAlpha: 0,
                duration: 0.75,
            });
        } else {
            gsap.to(this.parent, {
                color: COLOR_QUARTER_SPANISH_WHITE,
                duration: 1,
            });

            gsap.to(this.elements.items[0], {
                autoAlpha: 0,
                duration: 0.75,
            });

            gsap.to(this.elements.items[1], {
                autoAlpha: 1,
                delay: 0.75,
                duration: 0.75,
            });
        }
    }
}
