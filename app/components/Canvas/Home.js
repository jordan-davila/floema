import Media from "./Media";
import map from "lodash/map";
import { Plane, Transform } from "ogl";

export default class Home {
    constructor({ gl, scene }) {
        this.medias = document.querySelectorAll(".home__gallery__media__image");
        this.gl = gl;
        this.group = new Transform();
        this.createGeometry();
        this.createGallery();

        this.group.setParent(scene);
    }

    createGeometry() {
        this.geometry = new Plane(this.gl);
    }

    createGallery() {
        map(this.medias, (element, index) => {
            return new Media({
                element,
                geometry: this.geometry,
                gl: this.gl,
                scene: this.group,
                index,
            });
        });
    }
}
