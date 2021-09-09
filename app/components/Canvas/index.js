import { Camera, Renderer, Transform, Box, Program, Mesh } from "ogl";
import fragment from "shaders/plane-fragment.glsl";
import vertex from "shaders/plane-vertex.glsl";

export default class Canvas {
    constructor() {
        this.createRenderer();
        this.createScene();
        this.createCamera();
        this.createCube();
    }

    createRenderer() {
        this.renderer = new Renderer();
        this.gl = this.renderer.gl;
        document.body.appendChild(this.gl.canvas);
    }

    createScene() {
        this.scene = new Transform();
    }

    createCube() {
        this.geometry = new Box(this.gl);
        this.program = new Program(this.gl, {
            vertex,
            fragment,
        });

        this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
        this.mesh.setParent(this.scene);
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.position.z = 5;
    }

    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.perspective({
            aspect: window.innerWidth / window.innerHeight,
        });
    }

    update() {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
        this.renderer.render({ scene: this.scene, camera: this.camera });
    }
}
