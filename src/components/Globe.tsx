'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Influencer } from '../lib/influencers';

// School interface matching our data
interface School {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

// Globe component props
interface GlobeProps {
  influencers: Influencer[];
  schools: School[];
  selectedInfluencers: Set<string>;
  onInfluencerClick: (influencer: Influencer) => void;
  onSchoolClick: (school: School) => void;
  searchSchool?: string;
  viewMode: 'students' | 'schools' | 'density';
}

interface GlobeInstance {
  pointsData: (data: any[]) => GlobeInstance;
  pointLat: (accessor: string | ((d: any) => number)) => GlobeInstance;
  pointLng: (accessor: string | ((d: any) => number)) => GlobeInstance;
  pointAltitude: (accessor: string | ((d: any) => number)) => GlobeInstance;
  pointRadius: (accessor: string | ((d: any) => number)) => GlobeInstance;
  pointColor: (accessor: string | ((d: any) => string)) => GlobeInstance;
  onPointClick: (callback: (point: any, event: any) => void) => GlobeInstance;
  polygonsData: (data: any[]) => GlobeInstance;
  polygonCapColor: (accessor: string | ((d: any) => string)) => GlobeInstance;
  polygonSideColor: (accessor: string | ((d: any) => string)) => GlobeInstance;
  polygonStrokeColor: (accessor: string | ((d: any) => string)) => GlobeInstance;
  hexBinPointsData: (data: any[]) => GlobeInstance;
  hexBinPointLat: (accessor: string | ((d: any) => number)) => GlobeInstance;
  hexBinPointLng: (accessor: string | ((d: any) => number)) => GlobeInstance;
  hexAltitude: (accessor: string | ((d: any) => number)) => GlobeInstance;
  hexTopColor: (accessor: string | ((d: any) => string)) => GlobeInstance;
  hexSideColor: (accessor: string | ((d: any) => string)) => GlobeInstance;
  onHexClick: (callback: (hex: any, event: any) => void) => GlobeInstance;
  pointOfView: (pov: { lat: number; lng: number; altitude?: number }, transitionMs?: number) => GlobeInstance;
  controls: () => any;
  scene: () => any;
  globeMaterial: () => any;
}

export default function Globe({
  influencers,
  schools,
  selectedInfluencers,
  onInfluencerClick,
  onSchoolClick,
  searchSchool,
  viewMode
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);

  // Load countries data
  useEffect(() => {
    fetch('/data/countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data.features);
      })
      .catch(err => console.error('Failed to load countries:', err));
  }, []);

  // Initialize globe
  useEffect(() => {
    if (!containerRef.current || isLoaded) return;

    const initGlobe = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const Globe = (await import('globe.gl')).default;
        const THREE = await import('three');

        const globe = new Globe(containerRef.current!)
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
          .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
          .width(600)
          .height(600);

        // Configure globe material for dark theme
        const material = globe.globeMaterial() as any;
        if (material.color) {
          material.color.setHex(0x1a1a1a);
        }
        
        // Add wireframe sphere for the triangulated look
        const wireframeGeometry = new THREE.SphereGeometry(101, 32, 16);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0x333333,
          wireframe: true,
          transparent: true,
          opacity: 0.3
        });
        const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        globe.scene().add(wireframeMesh);

        // Configure controls
        const controls = globe.controls();
        controls.autoRotate = false;
        controls.enableZoom = true;
        controls.enablePan = false;

        globeRef.current = globe;
        setIsLoaded(true);

      } catch (error) {
        console.error('Failed to initialize globe:', error);
      }
    };

    initGlobe();
  }, [isLoaded]);

  // Update countries polygons
  useEffect(() => {
    if (!globeRef.current || countries.length === 0) return;

    globeRef.current
      .polygonsData(countries)
      .polygonCapColor(() => 'transparent')
      .polygonSideColor(() => 'transparent')
      .polygonStrokeColor(() => '#666666');
  }, [countries]);

  // Update points based on view mode
  useEffect(() => {
    if (!globeRef.current) return;

    switch (viewMode) {
      case 'students':
        // Show student points
        globeRef.current
          .pointsData(influencers)
          .pointLat('lat')
          .pointLng('lng')
          .pointAltitude(() => 0.02)
          .pointRadius((d: Influencer) => selectedInfluencers.has(d.id) ? 0.8 : 0.4)
          .pointColor((d: Influencer) => {
            if (selectedInfluencers.has(d.id)) return '#ffffff';
            if (d.fitScore >= 90) return '#10b981'; // green
            if (d.fitScore >= 80) return '#f59e0b'; // yellow
            return '#ffffff'; // white
          })
          .onPointClick((point: Influencer) => {
            onInfluencerClick(point);
          })
          .hexBinPointsData([]); // Clear hexbin
        break;

      case 'schools':
        // Show school points
        globeRef.current
          .pointsData(schools)
          .pointLat('lat')
          .pointLng('lng')
          .pointAltitude(() => 0.01)
          .pointRadius(() => 0.3)
          .pointColor(() => '#9ca3af')
          .onPointClick((point: School) => {
            onSchoolClick(point);
          })
          .hexBinPointsData([]); // Clear hexbin
        break;

      case 'density':
        // Show hexbin heatmap
        globeRef.current
          .pointsData([]) // Clear points
          .hexBinPointsData(influencers)
          .hexBinPointLat('lat')
          .hexBinPointLng('lng')
          .hexAltitude((d: any) => d.sumWeight * 0.01)
          .hexTopColor((d: any) => {
            const intensity = d.sumWeight;
            if (intensity > 5) return '#10b981'; // green for high density
            if (intensity > 2) return '#f59e0b'; // yellow for medium density
            return '#6b7280'; // grey for low density
          })
          .hexSideColor((d: any) => {
            const intensity = d.sumWeight;
            if (intensity > 5) return '#059669';
            if (intensity > 2) return '#d97706';
            return '#4b5563';
          })
          .onHexClick((hex: any) => {
            // Focus on the hex centroid
            globeRef.current?.pointOfView({ 
              lat: hex.lat, 
              lng: hex.lng, 
              altitude: 1.5 
            }, 1000);
          });
        break;
    }
  }, [viewMode, influencers, schools, selectedInfluencers, onInfluencerClick, onSchoolClick]);

  // Handle school search
  useEffect(() => {
    if (!globeRef.current || !searchSchool) return;

    const school = schools.find(s => 
      s.name.toLowerCase().includes(searchSchool.toLowerCase()) ||
      s.city.toLowerCase().includes(searchSchool.toLowerCase())
    );

    if (school) {
      globeRef.current.pointOfView({
        lat: school.lat,
        lng: school.lng,
        altitude: 1.2
      }, 1500);
      
      // Trigger school click to filter students
      onSchoolClick(school);
    }
  }, [searchSchool, schools, onSchoolClick]);

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="w-full h-[600px] rounded-lg overflow-hidden bg-black"
        style={{ minHeight: '600px' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg">
          <div className="text-white">Loading globe...</div>
        </div>
      )}
    </div>
  );
}
