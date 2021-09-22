import Media from "./Media";
import map from "lodash/map";
import { Plane, Transform } from "ogl";
import gsap from "gsap";

export default class Home {
    constructor({ gl, scene, sizes }) {
        this.gl = gl;
        this.group = new Transform();
        this.sizes = sizes;

        this.galleryElement = document.querySelector(".home__gallery");
        this.mediaElements = document.querySelectorAll(".home__gallery__media__image");

        this.createGeometry();
        this.createGallery();

        this.group.setParent(scene);

        this.x = {
            current: 0,
            target: 0,
            lerp: 0.1,
        };

        this.y = {
            current: 0,
            target: 0,
            lerp: 0.1,
        };

        this.scrollCurrent = {
            x: 0,
            y: 0,
        };

        this.scroll = {
            x: 0,
            y: 0,
        };
    }

    createGeometry() {
        this.geometry = new Plane(this.gl);
    }

    createGallery() {
        this.medias = map(this.mediaElements, (element, index) => {
            return new Media({
                element,
                geometry: this.geometry,
                gl: this.gl,
                scene: this.group,
                siezes: this.sizes,
                index,
            });
        });
    }

    /**
     * Events
     */
    onResize(event) {
        this.galleryBounds = this.galleryElement.getBoundingClientRect();
        map(this.medias, (media) => media.onResize(event));
        this.sizes = event.sizes;
    }

    onTouchDown({ x, y }) {
        this.scrollCurrent.x = this.scroll.x;
        this.scrollCurrent.y = this.scroll.y;
    }

    onTouchMove({ x, y }) {
        const xDistance = x.start - x.end;
        const yDistance = y.start - y.end;

        this.x.target = this.scrollCurrent.x - xDistance;
        this.y.target = this.scrollCurrent.y - yDistance;
    }

    onTouchUp({ x, y }) {}

    /**
     * Loop
     */

    update() {
        if (!this.galleryBounds) return;
        this.x.current = gsap.utils.interpolate(this.x.current, this.x.target, this.x.lerp);
        this.y.current = gsap.utils.interpolate(this.y.current, this.y.target, this.y.lerp);

        if (this.scroll.x < this.x.current) {
            this.x.direction = "right";
        } else if (this.scroll.x > this.x.current) {
            this.x.direction = "left";
        }

        if (this.scroll.y < this.y.current) {
            this.y.direction = "up";
        } else if (this.scroll.y > this.y.current) {
            this.y.direction = "down";
        }

        //prettier-ignore
        this.galleryWidth = this.galleryBounds.width / window.innerWidth * this.sizes.width;
        //prettier-ignore
        this.galleryHeight = this.galleryBounds.height / window.innerHeight * this.sizes.height;

        this.scroll.x = this.x.current;
        this.scroll.y = this.y.current;

        map(this.medias, (media, index) => {
            if (this.x.direction === "left") {
                const x = media.mesh.position.x + media.mesh.scale.x / 2;
                if (x < -this.sizes.width / 2) {
                    media.extra.x += this.galleryWidth;
                }
            } else if (this.x.direction === "right") {
                const x = media.mesh.position.x - media.mesh.scale.x / 2;
                if (x > this.sizes.width / 2) {
                    media.extra.x -= this.galleryWidth;
                }
            }

            if (this.y.direction === "up") {
                const y = media.mesh.position.y + media.mesh.scale.y / 2;
                if (y < -this.sizes.height / 2) {
                    media.extra.y += this.galleryHeight;
                }
            } else if (this.y.direction === "down") {
                const y = media.mesh.position.y - media.mesh.scale.y / 2;
                if (y > this.sizes.height / 2) {
                    media.extra.y -= this.galleryHeight;
                }
            }

            media.update(this.scroll);
        });
    }
}