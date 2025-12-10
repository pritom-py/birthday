'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars({ count = 2000 }) {
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const light = useRef<THREE.PointLight>(null!);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        // Mouse interaction
        const { pointer } = state;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Mouse influence
            particle.mx += (pointer.x * 100 - particle.mx) * 0.02;
            particle.my += (-pointer.y * 100 - particle.my) * 0.02;

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <pointLight ref={light} distance={40} intensity={8} color="white" />
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <dodecahedronGeometry args={[0.2, 0]} />
                <meshPhongMaterial color="#ffc0cb" emissive="#ff69b4" toneMapped={false} />
            </instancedMesh>
        </>
    );
}

export default function ParticleBackground() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <fog attach="fog" args={['#202025', 0, 60]} />
                <Stars />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    );
}
