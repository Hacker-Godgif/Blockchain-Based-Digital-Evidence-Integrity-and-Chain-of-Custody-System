import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

const ParticleField = (props) => {
  const ref = useRef();
  
  // Generate random points in a sphere for that Lusion "universe" feel
  const originalPositions = useMemo(() => {
    const arr = new Float32Array(5000);
    random.inSphere(arr, { radius: 1.5 });
    return arr;
  }, []);

  // Pass a copy so the geometry has its own array to mutate safely
  const currentPositions = useMemo(() => new Float32Array(originalPositions), [originalPositions]);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Slow, dramatic rotation
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;

    // Interactive mouse tracking - leaning into the Lusion reactive aesthetic
    const targetX = (state.mouse.x * 0.2);
    const targetY = (state.mouse.y * 0.2);
    
    ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.05;

    // --- Particle repulsion logic via Raycaster ---
    // Update the raycaster with the current mouse normalize device coordinates and camera
    raycaster.setFromCamera(state.mouse, state.camera);
    
    // Find intersection with the z=0 plane to get a proper 3D world coordinate for the mouse
    const mouseWorldPos = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, mouseWorldPos);
    
    // Transform that world position into the local space of the point group
    ref.current.worldToLocal(mouseWorldPos);

    let needsUpdate = false;
    const repulsionRadius = 0.5; // Radius of mouse influence in 3D space
    const repulsionStrength = 1.0; // Pushing force
    
    const positions = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const px = originalPositions[i];
      const py = originalPositions[i + 1];
      const pz = originalPositions[i + 2];

      // Distance from the local mouse pos to the original point
      const dx = px - mouseWorldPos.x;
      const dy = py - mouseWorldPos.y;
      const dz = pz - mouseWorldPos.z;
      
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      if (dist < repulsionRadius) {
        // Particle is near mouse: calculate repelled target
        const force = (repulsionRadius - dist) * repulsionStrength;
        
        // Prevent division by zero
        const safeDist = dist > 0.0001 ? dist : 0.0001;
        const targetPx = px + (dx / safeDist) * force;
        const targetPy = py + (dy / safeDist) * force;
        const targetPz = pz + (dz / safeDist) * force;

        // Lerp current position towards the repelled position
        positions[i] += (targetPx - positions[i]) * 0.15;
        positions[i + 1] += (targetPy - positions[i + 1]) * 0.15;
        positions[i + 2] += (targetPz - positions[i + 2]) * 0.15;
        needsUpdate = true;
      } else {
        // Particle is outside repulsion radius: lerp back to original position
        const dxOrig = px - positions[i];
        const dyOrig = py - positions[i + 1];
        const dzOrig = pz - positions[i + 2];
        
        // Only update if it's not already at origin (within a tiny margin)
        if (Math.abs(dxOrig) > 0.001 || Math.abs(dyOrig) > 0.001 || Math.abs(dzOrig) > 0.001) {
          positions[i] += dxOrig * 0.08;
          positions[i + 1] += dyOrig * 0.08;
          positions[i + 2] += dzOrig * 0.08;
          needsUpdate = true;
        } else if (positions[i] !== px) {
          // Snap strictly to original
          positions[i] = px;
          positions[i + 1] = py;
          positions[i + 2] = pz;
          needsUpdate = true;
        }
      }
    }

    if (needsUpdate) {
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={currentPositions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3b82f6" // React accent primary
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const Background3D = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Soft Ambient Light */}
        <ambientLight intensity={0.5} />
        {/* Dynamic Point Light */}
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default Background3D;
