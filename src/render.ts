import * as THREE from "three";

export const canvasSetup = (canvasContainer: HTMLElement) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 2, 0);
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add(cube);

    camera.position.z = 5;

    const draw = () => {
        cube.rotation.x += 0.01;
        renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(draw);


    return () => {};
}