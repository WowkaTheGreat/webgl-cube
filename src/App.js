import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/


const App = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
  
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
  
    // Light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
  
    // Textures
    const loader = new THREE.TextureLoader();
    const materials = [
      new THREE.MeshBasicMaterial({ map: loader.load('/textures/front.jpg') }),
      new THREE.MeshBasicMaterial({ map: loader.load('/textures/back.jpg') }),
      new THREE.MeshBasicMaterial({ map: loader.load('/textures/top.jpg') }),
      new THREE.MeshBasicMaterial({ map: loader.load('/textures/bottom.jpg') }),
      new THREE.MeshBasicMaterial({ map: loader.load('/textures/left.jpg') }),
      new THREE.MeshBasicMaterial({ map: loader.load('/textures/right.jpg') }),
    ];
  
    // Cube
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
  
    camera.position.z = 5;
  
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  
    // Event listeners
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'w':
          camera.position.z -= 0.1;
          break;
        case 's':
          camera.position.z += 0.1;
          break;
        case 'a':
          camera.position.x -= 0.1;
          break;
        case 'd':
          camera.position.x += 0.1;
          break;
        default:
          break;
      }
    };
  
    const handleMouseMove = (event) => {
      const { movementX, movementY } = event;
      camera.rotation.y -= movementX * 0.002;
      camera.rotation.x -= movementY * 0.002;
    };
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
  
    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  

  return <div ref={mountRef}></div>;
};

export default App;
