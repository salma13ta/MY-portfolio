"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);

        const particleCount = 420;
        const particlePositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);
        const particleColor = new THREE.Color();

        for (let index = 0; index < particleCount; index += 1) {
            const offset = index * 3;
            particlePositions[offset] = (Math.random() - 0.5) * 15;
            particlePositions[offset + 1] = (Math.random() - 0.5) * 9;
            particlePositions[offset + 2] = (Math.random() - 0.5) * 5;

            particleColor.setHSL(0.28 + Math.random() * 0.08, 0.72, 0.42 + Math.random() * 0.28);
            particleColors[offset] = particleColor.r;
            particleColors[offset + 1] = particleColor.g;
            particleColors[offset + 2] = particleColor.b;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
        particlesGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        const orb = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.25, 2),
            new THREE.MeshBasicMaterial({
                color: 0x4fcf78,
                wireframe: true,
                transparent: true,
                opacity: 0.24,
            }),
        );
        orb.position.set(2.25, 0.1, -1.2);
        scene.add(orb);

        const glow = new THREE.Mesh(
            new THREE.SphereGeometry(0.9, 24, 24),
            new THREE.MeshBasicMaterial({
                color: 0x1e8f4d,
                transparent: true,
                opacity: 0.12,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            }),
        );
        glow.position.copy(orb.position);
        scene.add(glow);

        const pointer = new THREE.Vector2();
        const targetPointer = new THREE.Vector2();
        let animationFrame = 0;
        let disposed = false;

        const handlePointerMove = (event: PointerEvent) => {
            targetPointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            targetPointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const resize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
        };

        const render = (time: number) => {
            if (disposed) return;

            const elapsed = time * 0.0003;
            pointer.lerp(targetPointer, 0.035);
            scene.rotation.y = pointer.x * 0.06;
            scene.rotation.x = pointer.y * 0.035;
            particles.rotation.y = elapsed;
            particles.rotation.x = elapsed * 0.35;
            orb.rotation.x = elapsed * 1.7;
            orb.rotation.y = elapsed * 1.2;
            glow.scale.setScalar(1 + Math.sin(time * 0.001) * 0.08);
            renderer.render(scene, camera);

            if (!reducedMotion) {
                animationFrame = window.requestAnimationFrame(render);
            }
        };

        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        resize();
        render(0);

        return () => {
            disposed = true;
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", handlePointerMove);
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            orb.geometry.dispose();
            orb.material.dispose();
            glow.geometry.dispose();
            glow.material.dispose();
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="three-background" aria-hidden="true" />;
}
