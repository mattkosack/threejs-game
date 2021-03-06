/* eslint-disable no-undef */
// 'use strict';
let renderer;
let camera;
let scene;
let light;
let cube;

let numCubes = 50;
let smallCubes = [];

let speed = 0.0;
let velocity = 0.0;

let gridHelper;
let a = new THREE.Vector3;
let b = new THREE.Vector3;
let cameraDistance = 0.5;

let dir = new THREE.Vector3;
let goal = new THREE.Object3D;


window.addEventListener('load', function init() {

    // Set up the renderer
    renderer = new THREE.WebGLRenderer( { antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Set up the scene
    scene = new THREE.Scene();

    // Set up the lighting
    light = new THREE.PointLight( '#FFFFFF', 1, 100 );
    light.position.set( 25, 25, 25 );
    scene.add(light);

    // Set up the camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.set( 0, 0.25, 0 );
    camera.lookAt( scene.position );

    // Not sure how this works with the block in animate
    goal.position.z = -cameraDistance;
    goal.add( camera );

    // Help to actually see axes
    gridHelper = new THREE.GridHelper( 40, 40 );
    scene.add(gridHelper);

    // The Cube
    const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    const material = new THREE.MeshNormalMaterial();
    cube = new THREE.Mesh( geometry, material );
    cube.position.set( 0, 0.05, 0 );
    scene.add( cube );

    // Other cubes
    for (let i=0; i < numCubes; i++) {
        smallCube = new THREE.Mesh( new THREE.BoxGeometry( 0.05, 0.05, 0.05 ), new THREE.MeshNormalMaterial() );
        let x = getRandomInt(-20, 20, 0, 1);
        let z = getRandomInt(-20, 20, 0, 1);

        smallCube.position.set( x, 0.05, z);
        smallCubes.push( smallCube );
        scene.add(smallCubes[i]);
    }

    for (let i=0; i < smallCubes.length; i++) {
        scene.add(smallCubes[i]);
    }

    initEvents();
    onWindowResize();
    animate();
})

/**
 * Initialize event handlers.
 */
function initEvents() {
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('keydown', onKeyDown);
}

/**
 * Handler for when the user presses any of the keys for movement. 
 * Update view and position based on the key pressed.
 */
function onKeyDown(e) {
    // Keys pressed for translations
    if (e.key === 'w') {
        speed = 0.02; // Move forward
    } else if (e.key === 's') {
        speed = -0.02; // Move backward
    } else if (e.key === 'a') {
        cube.rotateY(0.15); // Rotate left (yaw)
    } else if (e.key === 'd') {
        cube.rotateY(-0.15); // Rotate right (yaw)
    } else if (e.key === 'b') {
        speed = 0.0; // Brake
    }
}

function onWindowResize() {
    let [w, h] = [window.innerWidth, window.innerHeight]
    renderer.setSize(w, h)
}

function animate() {
    requestAnimationFrame( animate );

    rotateSmallCubes();

    // TODO
    // cube.geometry.BoxGeometry

    velocity += (speed - velocity) * 0.3;
    cube.translateZ( velocity );

    // No clue how this works lol
    a.lerp( cube.position, 0.5 );
    b.copy( goal.position );
    dir.copy( a ).sub( b ).normalize();
    const dis = a.distanceTo( b ) - cameraDistance;
    goal.position.addScaledVector( dir, dis );

    camera.lookAt( cube.position );
    renderer.render( scene, camera );
}

function getRandomInt(min, max, exclude, replace) {
    min = Math.ceil(min);
    max = Math.floor(max);
    num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num = num === exclude ? replace : num;
}

function rotateSmallCubes() {
    for (let i=0; i < smallCubes.length; i++) {
        smallCubes[i].rotateY( 0.1 );
    }
}

function bounceSmallCubes() {
    for (let i=0; i < smallCubes.length; i++) {
        return n;
    }
}