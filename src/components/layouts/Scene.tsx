'use client'

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader, KMZLoader, STLLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const ThreeScene = () => {
    const sceneRef = useRef<any>();
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Accede a `window` aquí
            // Configura la escena, cámara y renderizador
            const light = new THREE.DirectionalLight(0xffffff, 3);
            light.position.set(0.5, 1.0, 0.5).normalize();
            scene.add(light);

            const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.y = 5;
            camera.position.z = 10;

            scene.add(camera);




            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize((window.innerWidth / 1.5), (window.innerHeight / 2.5));

            sceneRef.current.appendChild(renderer.domElement);


            const animate = () => {
                requestAnimationFrame(animate);
                // Actualiza la escena aquí
                renderer.render(scene, camera);
            };
            animate();
            const render = () => {
                renderer.render(scene, camera);
            }

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', render);
            controls.update();

            const loader = new KMZLoader();
            loader.load('/3D/Box.kmz', function (kmz) {

                kmz.scene.position.y = 0.5;
                scene.add(kmz.scene);
                render();

            });

            const onWindowResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);

                render();
            }
            window.addEventListener('resize', onWindowResize);
        }
        // mover
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        var selectedObject: any = null;
        const offset = new THREE.Vector3();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);

        const onDocumentMouseMove = (event: any) => {
            mouse.x = (event.clientX / windowSize.width) * 2 - 1;
            mouse.y = -(event.clientY / windowSize.height) * 2 + 1;

            if (selectedObject) {
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObject(selectedObject);

                if (intersects.length > 0) {
                    const intersection = intersects[0];
                    const newPosition = intersection.point.sub(offset);
                    selectedObject.position.copy(newPosition);
                }
            }
        };

        const onDocumentMouseDown = (event: any) => {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);

            if (intersects.length > 0) {
                const intersects = raycaster.intersectObject(selectedObject);
                const intersection = intersects[0];
                selectedObject = intersects[0].object;
                raycaster.setFromCamera(mouse, camera);
                offset.copy(intersection.point).sub(selectedObject.position);
            }
        };

        const onDocumentMouseUp = () => {
            selectedObject = null;
        };

        window.addEventListener('mousemove', onDocumentMouseMove);
        window.addEventListener('mousedown', onDocumentMouseDown);
        window.addEventListener('mouseup', onDocumentMouseUp);

        return () => {
            window.removeEventListener('mousemove', onDocumentMouseMove);
            window.removeEventListener('mousedown', onDocumentMouseDown);
            window.removeEventListener('mouseup', onDocumentMouseUp);
        };

    }, [windowSize]);

    const onResize = () => {
        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
        setWindowSize({ width, height });

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);


    return (
        <div className='m-auto' ref={sceneRef}></div>
    );
};

export default ThreeScene;
