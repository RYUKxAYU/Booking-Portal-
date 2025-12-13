import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
	OrbitControls,
	Environment,
	useGLTF,
	useFBX,
	Float,
	Sparkles,
	ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * AudiR8Model Component
 * Loads and displays the Audi R8 3D model with slow rotation animation.
 */
function AudiR8Model() {
	const fbx = useFBX('/models/audi-r8/Audi R8.fbx');
	const modelRef = useRef();

	useEffect(() => {
		if (fbx) {
			// Center the model
			const box = new THREE.Box3().setFromObject(fbx);
			const center = box.getCenter(new THREE.Vector3());
			fbx.position.sub(center);

			// Scale model appropriately
			const size = box.getSize(new THREE.Vector3());
			const maxDim = Math.max(size.x, size.y, size.z);
			const scale = 2 / maxDim;
			fbx.scale.setScalar(scale);

			// Apply materials with metallic/glossy finish
			fbx.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;

					// Create luxurious car paint material
					if (child.material) {
						child.material = new THREE.MeshStandardMaterial({
							color: new THREE.Color('#1A1A1D'),
							metalness: 0.9,
							roughness: 0.1,
							envMapIntensity: 1.5,
						});
					}
				}
			});
		}
	}, [fbx]);

	// Slow rotation animation
	useFrame((state) => {
		if (modelRef.current) {
			modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3 + Math.PI * 0.25;
		}
	});

	return (
		<group ref={modelRef}>
			<primitive object={fbx} />
		</group>
	);
}

/**
 * Scene Component
 * Sets up lighting and environment for the 3D scene.
 */
function Scene() {
	return (
		<>
			{/* Ambient lighting */}
			<ambientLight intensity={0.3} />

			{/* Key light - warm gold */}
			<spotLight
				position={[10, 10, 5]}
				angle={0.3}
				penumbra={1}
				intensity={2}
				color="#D4AF37"
				castShadow
				shadow-mapSize={[2048, 2048]}
			/>

			{/* Fill light - subtle */}
			<pointLight position={[-10, 5, -10]} intensity={0.5} color="#8B2626" />

			{/* Rim light */}
			<pointLight position={[0, 10, -10]} intensity={0.8} color="#E5C158" />

			{/* The 3D Model */}
			<Float
				speed={1}
				rotationIntensity={0.2}
				floatIntensity={0.3}
			>
				<AudiR8Model />
			</Float>

			{/* Sparkle effects */}
			<Sparkles
				count={50}
				scale={10}
				size={2}
				speed={0.3}
				color="#D4AF37"
				opacity={0.3}
			/>

			{/* Contact shadow on the ground */}
			<ContactShadows
				position={[0, -1.5, 0]}
				opacity={0.5}
				scale={10}
				blur={2}
				far={4}
				color="#D4AF37"
			/>

			{/* Environment for reflections */}
			<Environment preset="city" />
		</>
	);
}

/**
 * Background3D Component
 * Main component that renders the 3D background canvas.
 */
const Background3D = () => {
	return (
		<div className="fixed inset-0 z-0 pointer-events-none">
			{/* Gradient overlay for better text readability */}
			<div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1D]/90 via-[#1A1A1D]/70 to-[#1A1A1D]/90 z-10" />

			<Canvas
				camera={{ position: [5, 2, 5], fov: 45 }}
				shadows
				dpr={[1, 2]}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: 'high-performance'
				}}
				style={{ background: 'transparent' }}
			>
				<Suspense fallback={null}>
					<Scene />
				</Suspense>
			</Canvas>
		</div>
	);
};

export default Background3D;
