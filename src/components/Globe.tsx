'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

// Globe component with interactive dots
function GlobeContent({ users }: { users: any[] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Convert lat/lng to 3D coordinates
  const latLngToVector3 = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Sample user locations with coordinates
  const userLocations = [
    { lat: 40.7128, lng: -74.0060, users: 25, city: 'New York' },
    { lat: 34.0522, lng: -118.2437, users: 18, city: 'Los Angeles' },
    { lat: 51.5074, lng: -0.1278, users: 32, city: 'London' },
    { lat: 48.8566, lng: 2.3522, users: 15, city: 'Paris' },
    { lat: 35.6762, lng: 139.6503, users: 28, city: 'Tokyo' },
    { lat: -33.8688, lng: 151.2093, users: 12, city: 'Sydney' },
    { lat: 43.6532, lng: -79.3832, users: 22, city: 'Toronto' },
    { lat: 55.7558, lng: 37.6176, users: 8, city: 'Moscow' },
    { lat: -23.5505, lng: -46.6333, users: 14, city: 'São Paulo' },
    { lat: 28.6139, lng: 77.2090, users: 31, city: 'Delhi' },
  ];

  return (
    <group ref={groupRef}>
      {/* Main Globe */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshBasicMaterial
          color="#0a0a0a"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>
      
      {/* Globe outline */}
      <Sphere args={[2.02, 64, 64]}>
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.2}
          wireframe
        />
      </Sphere>

      {/* User location dots */}
      {userLocations.map((location, index) => {
        const position = latLngToVector3(location.lat, location.lng, 2.05);
        return (
          <group key={index}>
            <mesh position={[position.x, position.y, position.z]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial
                color={location.users > 20 ? '#22d3ee' : location.users > 10 ? '#fbbf24' : '#ef4444'}
              />
            </mesh>
            {/* Pulsing ring effect */}
            <mesh position={[position.x, position.y, position.z]}>
              <ringGeometry args={[0.05, 0.08, 16]} />
              <meshBasicMaterial
                color={location.users > 20 ? '#22d3ee' : location.users > 10 ? '#fbbf24' : '#ef4444'}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* Connection lines between major cities */}
      {userLocations.slice(0, 5).map((start, i) => {
        return userLocations.slice(i + 1, 5).map((end, j) => {
          const startPos = latLngToVector3(start.lat, start.lng, 2.05);
          const endPos = latLngToVector3(end.lat, end.lng, 2.05);
          
          const points = [startPos, endPos];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          
          return (
            <line key={`${i}-${j}`} geometry={geometry}>
              <lineBasicMaterial color="#22d3ee" transparent opacity={0.3} />
            </line>
          );
        });
      })}
    </group>
  );
}

// Main Globe component
export default function Globe({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading Globe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl overflow-hidden`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <GlobeContent users={[]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
}
