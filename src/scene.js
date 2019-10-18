import './index.html';
import * as colorsXD from './colors';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, PointLight,
  MeshStandardMaterial, AmbientLight, Color, PlaneGeometry, MeshFaceMaterial } from 'three';

const scene = new Scene();
scene.background = new Color(0x4488ff);
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const material = new MeshStandardMaterial( { color: 0xffffff } );
const green1 = new MeshStandardMaterial({ color: colorsXD.lightGreen });
const green2 = new MeshStandardMaterial({ color: 0x55ff44 });

const checkers = [
  new MeshStandardMaterial({ color: 0x33dd33 }),
  new MeshStandardMaterial({ color: 0x55ff44 })
];

const planeGeomentry = new PlaneGeometry( 200, 200, 40, 40);

for( let i = 0; i < 40 * 40; i++ ) {
  const colorIndex = (Math.round(i / 40) % 2 + i % 2) % 2;
  planeGeomentry.faces[2*i].materialIndex = colorIndex;
  planeGeomentry.faces[2*i + 1].materialIndex = colorIndex;
}

const plane = new Mesh(planeGeomentry, new MeshFaceMaterial( checkers ));
plane.rotation.set(-Math.PI/2, 0, Math.PI);
plane.position.y = -3;
scene.add(plane);

const geometry = new BoxGeometry( 1, 1, 1 );
const cube = new Mesh( geometry, material );
scene.add( cube );

const light = new PointLight( 0xdddddd, 1, 40 );
light.position.set(2, 2, 2);
scene.add(light);

const ambient = new AmbientLight( 0x464699 );
scene.add(ambient);

camera.position.z = 5;

let time = 0;
function animate() {
    time++;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.material.color.setHex(getRainbowColor(time));
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

function getRainbowColor(time) {
    const l = 0.5;
    const s = 0.8;
    const h = time % 360;
    
    const c = (1 - Math.abs(2 * l - 1) * s);
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c/2;

    let r = 0;
    let g = 0;
    let b = 0;
    if (h >= 0 && h < 60) {
        r = (c + m) * 255;
        g = (x + m) * 255;
        b = (0 + m) * 255;
    } else if (h >= 60 && h < 120) {
        r = (x + m) * 255;
        g = (c + m) * 255;
        b = (0 + m) * 255;
    } else if (h >= 120 && h < 180) {
        r = (0 + m) * 255;
        g = (c + m) * 255;
        b = (x + m) * 255;
    } else if (h >= 180 && h < 240) {
        r = (0 + m) * 255;
        g = (x + m) * 255;
        b = (c + m) * 255;
    } else if (h >= 240 && h < 300) {
        r = (x + m) * 255;
        g = (0 + m) * 255;
        b = (c + m) * 255;
    } else if (h >= 300 && h < 360) {
        r = (c + m) * 255;
        g = (0 + m) * 255;
        b = (x + m) * 255;
    }
    return `0x${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function toHex(rgb) { 
    const rounded = Math.round(rgb);
    let hex = Number(rounded).toString(16);
    if (hex.length < 2) {
         hex = '0' + hex;
    }
    return hex;
  };
