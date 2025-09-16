'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { type Influencer } from '../lib/influencers';

// Detailed country boundary data (simplified but more accurate)
const countryBoundaries = [
  // North America - USA
  [
    [-158.5, 21.5], [-158, 22], [-155.5, 20], [-155, 19.5], [-154.5, 19], // Hawaii
    [-125, 49], [-95, 49], [-95, 48.5], [-94.5, 49], [-123, 49], [-125, 49], // Canada-US border
    [-125, 32.5], [-117, 32.5], [-111, 31.5], [-108, 31.5], [-104, 29.5], [-97, 25.5], 
    [-97, 26], [-93.5, 29.5], [-84, 30], [-81, 25], [-80, 25.5], [-75, 35], 
    [-70, 41], [-67, 45], [-67, 47], [-69, 47.5], [-74, 45], [-79, 43], 
    [-83, 42], [-87.5, 45], [-90, 46.5], [-94.5, 49], [-111, 49], [-117, 49], 
    [-125, 49], [-125, 32.5]
  ],
  // Canada
  [
    [-141, 69], [-141, 60], [-139, 60], [-135, 54.5], [-132, 54], [-128, 50], 
    [-125, 49], [-95, 49], [-95, 60], [-85, 60], [-83, 62], [-81, 62], 
    [-75, 62], [-71, 62], [-68, 60], [-61, 60], [-57, 50], [-53, 50], 
    [-60, 46], [-67, 47], [-74, 45], [-79, 43], [-87.5, 45], [-90, 46.5], 
    [-94.5, 49], [-111, 49], [-117, 49], [-125, 49], [-128, 50], [-132, 54], 
    [-135, 54.5], [-139, 60], [-141, 60], [-141, 69]
  ],
  // Mexico
  [
    [-117, 32.5], [-111, 31.5], [-108, 31.5], [-104, 29.5], [-97, 25.5], 
    [-97, 26], [-93.5, 29.5], [-90, 20.5], [-87, 18], [-92, 14], 
    [-118, 14.5], [-117, 32.5]
  ],
  // South America
  [
    [-81, 12], [-60, 5], [-50, 5], [-35, -5], [-35, -20], [-40, -25], 
    [-50, -30], [-55, -35], [-65, -40], [-70, -45], [-75, -50], [-70, -55], 
    [-65, -55], [-60, -52], [-55, -30], [-50, -10], [-45, -5], [-81, 12]
  ],
  // Europe
  [
    [-10, 71], [30, 71], [40, 60], [50, 50], [40, 45], [30, 40], 
    [20, 35], [10, 35], [0, 40], [-10, 50], [-10, 71]
  ],
  // Africa
  [
    [-18, 37], [37, 37], [51, 20], [51, 12], [43, -5], [40, -15], 
    [30, -25], [20, -35], [15, -35], [10, -25], [5, -10], [-5, 5], 
    [-10, 15], [-15, 25], [-18, 37]
  ],
  // Asia
  [
    [40, 77], [180, 77], [180, 50], [170, 45], [150, 40], [130, 25], 
    [120, 20], [100, 15], [80, 25], [70, 35], [60, 40], [50, 50], 
    [40, 60], [40, 77]
  ],
  // Australia
  [
    [113, -10], [153, -10], [153, -39], [140, -44], [130, -44], [115, -35], 
    [113, -25], [113, -10]
  ],
  // Additional detail boundaries
  // UK
  [
    [-8, 60], [-2, 60], [2, 58], [2, 50], [-6, 50], [-8, 55], [-8, 60]
  ],
  // Japan
  [
    [129, 46], [146, 46], [146, 30], [129, 30], [129, 46]
  ],
  // India
  [
    [68, 37], [97, 37], [97, 8], [77, 8], [68, 20], [68, 37]
  ]
];

// Convert lat/lng to 3D coordinates on sphere
const latLngToVector3 = (lat: number, lng: number, radius: number = 5): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

// Wireframe Globe with country boundaries
function WireframeGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
  });

  useEffect(() => {
    if (!globeRef.current) return;

    // Clear existing geometry
    globeRef.current.clear();

    // Create wireframe grid
    const gridGeometry = new THREE.SphereGeometry(5, 32, 16);
    const gridMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x444444,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    globeRef.current.add(gridMesh);

    // Add country boundaries
    countryBoundaries.forEach((boundary) => {
      const points: THREE.Vector3[] = [];
      
      boundary.forEach(([lng, lat]) => {
        points.push(latLngToVector3(lat, lng, 5.01));
      });
      
      // Close the boundary if it's not already closed
      if (points.length > 0) {
        const first = points[0];
        const last = points[points.length - 1];
        if (first.distanceTo(last) > 0.1) {
          points.push(first.clone());
        }
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.8,
        linewidth: 1
      });
      
      const line = new THREE.Line(geometry, material);
      globeRef.current?.add(line);
    });

  }, []);

  return <group ref={globeRef} />;
}

// Influencer dots component
function InfluencerDots({ influencers, onInfluencerClick }: { 
  influencers: Influencer[]; 
  onInfluencerClick: (influencer: Influencer) => void; 
}) {
  return (
    <group>
      {influencers.map((influencer) => {
        const position = latLngToVector3(influencer.lat, influencer.lng, 5.1);
        
        return (
          <group key={influencer.id}>
            {/* Main dot */}
            <mesh
              position={[position.x, position.y, position.z]}
              onClick={(e) => {
                e.stopPropagation();
                onInfluencerClick(influencer);
              }}
              onPointerEnter={(e) => {
                e.object.scale.setScalar(1.5);
                document.body.style.cursor = 'pointer';
              }}
              onPointerLeave={(e) => {
                e.object.scale.setScalar(1);
                document.body.style.cursor = 'default';
              }}
            >
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshBasicMaterial
                color={
                  influencer.fitScore >= 90 ? '#10b981' : // green
                  influencer.fitScore >= 80 ? '#f59e0b' : // yellow  
                  '#ffffff' // white
                }
              />
            </mesh>
            
            {/* Glow ring for high-fit influencers */}
            {influencer.fitScore >= 85 && (
              <mesh
                position={[position.x, position.y, position.z]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <ringGeometry args={[0.12, 0.16, 16]} />
                <meshBasicMaterial
                  color={influencer.fitScore >= 90 ? '#10b981' : '#f59e0b'}
                  transparent
                  opacity={0.6}
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
    <div className={`relative ${className}`} style={{ height: '100%', minHeight: '500px' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        
        <WireframeGlobe />
        <InfluencerDots influencers={influencers} onInfluencerClick={handleInfluencerClick} />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Selected influencer info overlay */}
      {selectedInfluencer && (
        <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 text-white min-w-[280px] border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">{selectedInfluencer.name}</h3>
            <button
              onClick={() => setSelectedInfluencer(null)}
              className="text-gray-400 hover:text-white text-xl leading-none"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="text-gray-300">
              <span className="font-medium">{selectedInfluencer.college}</span> • {selectedInfluencer.year}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 px-2 py-1 rounded text-xs">
                Fit Score: {selectedInfluencer.fitScore}%
              </div>
              <div className="bg-gray-600 px-2 py-1 rounded text-xs">
                {selectedInfluencer.socials.reduce((sum, social) => sum + social.followers, 0).toLocaleString()} followers
              </div>
            </div>
            
            <div className="text-xs text-gray-400 mt-2 leading-relaxed">
              {selectedInfluencer.explanation}
            </div>
            
            {/* Organizations */}
            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">Organizations:</div>
              <div className="flex flex-wrap gap-1">
                {selectedInfluencer.orgs.map((org, idx) => (
                  <span key={idx} className="text-xs bg-gray-700 px-2 py-0.5 rounded">
                    {org.role} • {org.org}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
