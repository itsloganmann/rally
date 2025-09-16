'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import { type Influencer } from '../lib/influencers';

// Country outlines data - simplified world map coordinates
const countryOutlines = [
  // North America
  [
    [-125, 50], [-67, 50], [-67, 25], [-125, 25], [-125, 50] // USA/Canada simplified
  ],
  [
    [-117, 32], [-86, 32], [-86, 14], [-117, 14], [-117, 32] // Mexico simplified  
  ],
  // South America
  [
    [-81, 12], [-34, 12], [-34, -55], [-81, -55], [-81, 12] // South America simplified
  ],
  // Europe
  [
    [-10, 71], [40, 71], [40, 36], [-10, 36], [-10, 71] // Europe simplified
  ],
  // Africa
  [
    [-17, 37], [51, 37], [51, -35], [-17, -35], [-17, 37] // Africa simplified
  ],
  // Asia
  [
    [40, 81], [180, 81], [180, 8], [40, 8], [40, 81] // Asia simplified
  ],
  // Australia
  [
    [113, -10], [153, -10], [153, -44], [113, -44], [113, -10] // Australia simplified
  ]
];

// Convert lat/lng to 3D sphere coordinates
const latLngToVector3 = (lat: number, lng: number, radius: number = 4): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

// Country outline component
function CountryOutlines() {
  const outlineRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!outlineRef.current) return;

    // Clear existing outlines
    outlineRef.current.clear();

    countryOutlines.forEach((outline, index) => {
      const points: THREE.Vector3[] = [];
      
      for (let i = 0; i < outline.length; i++) {
        const [lng, lat] = outline[i];
        points.push(latLngToVector3(lat, lng, 4.02)); // Slightly above globe surface
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x888888, // Grey color for country outlines
        opacity: 0.8, 
        transparent: true,
        linewidth: 2
      });
      
      const line = new THREE.Line(geometry, material);
      outlineRef.current?.add(line);
    });
  }, []);

  return <group ref={outlineRef} />;
}

// Globe component with interactive dots
function GlobeContent({ influencers, onInfluencerClick }: { influencers: Influencer[]; onInfluencerClick: (influencer: Influencer) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Globe */}
      <Sphere ref={meshRef} args={[4, 64, 64]}>
        <meshStandardMaterial
          color="#1e293b" // Dark blue-grey for better visibility on black
          roughness={0.6}
          metalness={0.2}
          transparent
          opacity={0.85}
        />
      </Sphere>

      {/* Country Outlines */}
      <CountryOutlines />

      {/* Influencer Dots */}
      {influencers.map((influencer) => {
        const position = latLngToVector3(influencer.lat, influencer.lng, 4.05);
        
        return (
          <group key={influencer.id}>
            <mesh
              position={[position.x, position.y, position.z]}
              onClick={() => onInfluencerClick(influencer)}
            >
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial
                color={
                  influencer.fitScore >= 90 ? "#10b981" : // emerald-500
                  influencer.fitScore >= 80 ? "#f59e0b" : "#ef4444" // amber-500 : red-500
                }
                emissive={
                  influencer.fitScore >= 90 ? "#064e3b" : // dark emerald
                  influencer.fitScore >= 80 ? "#78350f" : "#7f1d1d" // dark amber : dark red
                }
                emissiveIntensity={0.4}
              />
            </mesh>
            
            {/* Pulsing ring for high-fit influencers */}
            {influencer.fitScore >= 85 && (
              <mesh
                position={[position.x, position.y, position.z]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <ringGeometry args={[0.08, 0.12, 16]} />
                <meshBasicMaterial
                  color={influencer.fitScore >= 90 ? "#10b981" : "#f59e0b"}
                  transparent
                  opacity={0.5}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

// Main Globe component
export default function Globe({ 
  influencers = [], 
  onInfluencerClick = () => {}, 
  className = "" 
}: { 
  influencers?: Influencer[]; 
  onInfluencerClick?: (influencer: Influencer) => void;
  className?: string;
}) {
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);

  const handleInfluencerClick = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    onInfluencerClick(influencer);
  };

  return (
    <div className={`relative ${className}`} style={{ height: '100%', minHeight: '600px' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <GlobeContent 
          influencers={influencers} 
          onInfluencerClick={handleInfluencerClick}
        />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Selected influencer overlay */}
      {selectedInfluencer && (
        <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 text-white min-w-[280px] border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">{selectedInfluencer.name}</h3>
            <button
              onClick={() => setSelectedInfluencer(null)}
              className="text-gray-400 hover:text-white text-xl"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-300 mb-2">{selectedInfluencer.college}</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xs bg-blue-600 px-2 py-1 rounded">
              Fit Score: {selectedInfluencer.fitScore}%
            </div>
            <div className="text-xs bg-gray-600 px-2 py-1 rounded">
              {selectedInfluencer.socials.reduce((sum, social) => sum + social.followers, 0).toLocaleString()} followers
            </div>
          </div>
          <p className="text-xs text-gray-400">{selectedInfluencer.explanation}</p>
        </div>
      )}
    </div>
  );
}
