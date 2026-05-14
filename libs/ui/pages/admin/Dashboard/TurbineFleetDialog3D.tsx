import React, { useRef, useMemo, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Typography, IconButton, Tooltip, Chip } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import LayersIcon from '@mui/icons-material/Layers';
import CloseIcon from '@mui/icons-material/Close';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BoltIcon from '@mui/icons-material/Bolt';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirIcon from '@mui/icons-material/Air';
import GrainIcon from '@mui/icons-material/Grain';
import { TurbineData, STATUS_CONFIG } from './types/turbineData.types';

interface TurbineFleetDialog3DProps {
  open: boolean;
  turbines: TurbineData[];
  onClose: () => void;
  onSelectTurbine: (turbine: TurbineData) => void;
  onSelectComponent: (turbine: TurbineData, component: string) => void;
  onComponentClick?: (turbine: TurbineData, component: string) => void;
}

interface WeatherData {
  windSpeed: number;
  windDirection: number;
  temperature: number;
  humidity: number;
  pressure: number;
  visibility: number;
  cloudCover: number;
  precipitation: number;
}

// ─── Particle System for Wind ─────────────────────────────────────────────────
const WindField: React.FC<{ count: number; windDirection: number; windSpeed: number }> = ({
  count,
  windDirection,
  windSpeed,
}) => {
  const particlesRef = useRef<THREE.Points>(null);

  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 40 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return positions;
  }, [count]);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          Math.random() * 40 + 2,
          (Math.random() - 0.5) * 80,
        ),
        life: Math.random(),
        speed: Math.random() * 0.5 + 0.5,
      });
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const rad = ((windDirection + 180) * Math.PI) / 180;
    const speed = Math.min(windSpeed / 8, 1) * 0.8;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.position.x += Math.cos(rad) * speed * delta * p.speed * 20;
      p.position.z += Math.sin(rad) * speed * delta * p.speed * 10;
      p.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * delta * 0.3;
      p.life += delta * 0.3;

      if (p.position.x > 50 || p.position.x < -50 || p.life > 1) {
        p.position.set(
          -50 + Math.random() * 10,
          Math.random() * 40 + 2,
          (Math.random() - 0.5) * 80,
        );
        p.life = 0;
        p.speed = Math.random() * 0.5 + 0.5;
      }

      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <pointsMaterial
        size={0.15}
        color={windSpeed > 5 ? '#06b6d4' : '#38bdf8'}
        transparent
        opacity={Math.min(windSpeed / 10, 0.6)}
        sizeAttenuation
      />
    </points>
  );
};

// ─── Enhanced Ground Terrain ─────────────────────────────────────────────────
const Terrain: React.FC<{ showGrid: boolean }> = ({ showGrid }) => {
  return (
    <group>
      {/* Main ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[150, 128]} />
        <meshStandardMaterial color='#0a1628' roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Grid overlay */}
      {showGrid && <gridHelper args={[120, 60, '#0e4a5f', '#0a2840']} position={[0, 0.02, 0]} />}

      {/* Glowing foundation rings for turbines */}
      {[
        [-12, 4],
        [-6, 2],
        [0, 5],
        [6, 1],
        [12, 4],
        [-9, -3],
        [-3, -2],
        [3, -4],
        [9, -2],
        [15, 3],
      ].map(([x, z], i) => (
        <mesh key={`ring-${i}`} position={[x, 0.03, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 2, 64]} />
          <meshBasicMaterial color='#06b6d4' transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

// ─── Blade Group Component ─────────────────────────────────────────────────────
const BladeGroup: React.FC<{
  angle: number;
  bladeLength: number;
  bladeWidth: number;
  bladeColor: string;
  isRunning: boolean;
}> = ({ angle, bladeLength, bladeWidth, bladeColor, isRunning }) => (
  <group position={[0.5 + bladeLength / 2, 0, 0]} rotation={[0, 0, (angle * Math.PI) / 180]}>
    <mesh position={[-bladeLength / 2, 0, 0]}>
      <boxGeometry args={[bladeLength, bladeWidth, 0.025]} />
      <meshStandardMaterial
        color={bladeColor}
        metalness={0.4}
        roughness={0.5}
        emissive='#fff'
        emissiveIntensity={isRunning ? 0.08 : 0}
      />
    </mesh>
    <mesh position={[-bladeLength - 0.08, 0, 0]}>
      <boxGeometry args={[0.15, bladeWidth * 0.7, 0.02]} />
      <meshStandardMaterial color='#e2e8f0' metalness={0.6} roughness={0.3} />
    </mesh>
  </group>
);

// ─── Wind Turbine ─────────────────────────────────────────────────────────────
const WindTurbine: React.FC<{
  turbine: TurbineData;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
  onComponentClick: (component: string) => void;
}> = ({ turbine, position, isSelected, onSelect, onComponentClick }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bladeRef = useRef<THREE.Group>(null);
  const hubRef = useRef<THREE.Group>(null);

  const statusConfig = STATUS_CONFIG[turbine.status];

  const rotationSpeed = useMemo(() => {
    switch (turbine.status) {
      case 'running':
        return 0.03 + (turbine.activePower / 2000) * 0.02;
      case 'standby':
        return 0.005;
      default:
        return 0;
    }
  }, [turbine.status, turbine.activePower]);

  const bladeColor = useMemo(() => {
    switch (turbine.status) {
      case 'running':
        return '#f0f9ff';
      case 'standby':
        return '#cbd5e1';
      case 'maintenance':
        return '#fef3c7';
      case 'fault':
        return '#fee2e2';
      default:
        return '#94a3b8';
    }
  }, [turbine.status]);

  const towerColor = isSelected ? '#06b6d4' : '#334155';
  const towerHighlight = isSelected ? '#22d3ee' : '#475569';

  useFrame((state) => {
    if (bladeRef.current && rotationSpeed > 0) {
      bladeRef.current.rotation.z += rotationSpeed;
    }
    if (hubRef.current) {
      hubRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  const yawAngle = useMemo(() => {
    const windRad = (turbine.windDirection * Math.PI) / 180;
    return Math.sin(windRad) * 0.4;
  }, [turbine.windDirection]);

  return (
    <group ref={groupRef} position={position} onClick={onSelect}>
      {/* Tower */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.2, 0.5, 6, 24]} />
        <meshStandardMaterial color={towerColor} metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Tower foundation ring */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.7, 32]} />
        <meshStandardMaterial color='#1e3a5f' metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Tower top platform */}
      <mesh position={[0, 5.9, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.6, 16]} />
        <meshStandardMaterial color={towerHighlight} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Nacelle housing */}
      <group position={[0, 6.15, 0]} rotation={[0, yawAngle, 0]}>
        {/* Main nacelle body */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.25, 1.1, 8, 16]} />
          <meshStandardMaterial color='#475569' metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Nacelle top cover */}
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color='#64748b' metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Hub assembly */}
        <group ref={hubRef} position={[0.85, 0, 0]}>
          {/* Hub center */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.35, 24]} />
            <meshStandardMaterial
              color={statusConfig.color}
              metalness={0.95}
              roughness={0.1}
              emissive={statusConfig.color}
              emissiveIntensity={0.4}
            />
          </mesh>

          {/* Rotating blades */}
          <group ref={bladeRef} rotation={[0, 0, Math.PI / 2]}>
            {[0, 120, 240].map((angle, idx) => {
              const bladeLength = 2.5;
              const bladeWidth = 0.12;
              return (
                <BladeGroup
                  key={`blade-${idx}`}
                  angle={angle}
                  bladeLength={bladeLength}
                  bladeWidth={bladeWidth}
                  bladeColor={bladeColor}
                  isRunning={turbine.status === 'running'}
                />
              );
            })}
          </group>
        </group>

        {/* Status indicator light */}
        <pointLight
          position={[0, 0.3, 0.25]}
          color={statusConfig.color}
          intensity={0.8}
          distance={5}
          decay={2}
        />
        <mesh position={[0, 0.3, 0.25]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color={statusConfig.color}
            emissive={statusConfig.color}
            emissiveIntensity={turbine.status === 'fault' ? 5 : 2}
          />
        </mesh>

        {/* Component hotspots */}
        <mesh
          position={[0.4, 0.05, 0.28]}
          onClick={(e) => {
            e.stopPropagation();
            onComponentClick('generator');
          }}
        >
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial
            color='#0ea5e9'
            emissive='#0ea5e9'
            emissiveIntensity={1}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh
          position={[-0.25, 0, 0.28]}
          onClick={(e) => {
            e.stopPropagation();
            onComponentClick('gearbox');
          }}
        >
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color='#8b5cf6'
            emissive='#8b5cf6'
            emissiveIntensity={1}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh
          position={[0, 0.1, -0.3]}
          onClick={(e) => {
            e.stopPropagation();
            onComponentClick('transformer');
          }}
        >
          <sphereGeometry args={[0.065, 8, 8]} />
          <meshStandardMaterial
            color='#f59e0b'
            emissive='#f59e0b'
            emissiveIntensity={1}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>

      {/* Ground shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial color='#000' transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// ─── 3D Scene Component ───────────────────────────────────────────────────────
const Scene: React.FC<{
  turbines: TurbineData[];
  selectedTurbine: TurbineData | null;
  onSelectTurbine: (turbine: TurbineData) => void;
  onComponentClick: (turbine: TurbineData, component: string) => void;
  showGrid: boolean;
  weather: WeatherData;
}> = ({ turbines, selectedTurbine, onSelectTurbine, onComponentClick, showGrid, weather }) => {
  const positions: [number, number, number][] = useMemo(
    () => [
      [-14, 0, 5],
      [-7, 0, 3],
      [0, 0, 6],
      [7, 0, 2],
      [14, 0, 5],
      [-10.5, 0, -4],
      [-3.5, 0, -2],
      [3.5, 0, -5],
      [10.5, 0, -1],
      [17.5, 0, 4],
    ],
    [],
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 15, 30]} fov={45} />
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={10}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.2}
        target={[2, 4, 0]}
      />

      <ambientLight intensity={0.3} color='#a5c4d4' />
      <directionalLight position={[30, 40, 20]} intensity={1.2} color='#fff5e6' />
      <directionalLight position={[-20, 20, -15]} intensity={0.4} color='#e0f2fe' />
      <pointLight position={[0, 8, 0]} intensity={0.3} color='#06b6d4' distance={20} decay={2} />

      <fog attach='fog' args={['#020617', 30, 120]} />
      <Stars radius={150} depth={80} count={4000} factor={5} saturation={0} fade speed={0.3} />

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial color='#020617' side={THREE.BackSide} />
      </mesh>

      <Terrain showGrid={showGrid} />
      <WindField count={400} windDirection={weather.windDirection} windSpeed={weather.windSpeed} />

      {turbines.map((turbine, i) => (
        <WindTurbine
          key={turbine.id}
          turbine={turbine}
          position={positions[i]}
          isSelected={selectedTurbine?.id === turbine.id}
          onSelect={() => onSelectTurbine(turbine)}
          onComponentClick={(component) => onComponentClick(turbine, component)}
        />
      ))}

      <Sparkles count={100} scale={50} size={2} speed={0.3} opacity={0.3} color='#06b6d4' />
    </>
  );
};

// ─── Premium UI Components ───────────────────────────────────────────────────
const GlassPanel: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => (
  <Box
    sx={{
      background: 'rgba(2, 10, 25, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(6, 182, 212, 0.25)',
      borderRadius: 3,
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </Box>
);

const AnimatedNumber: React.FC<{ value: number; suffix?: string; decimals?: number }> = ({
  value,
  suffix = '',
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();
    const startValue = displayValue;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startValue + (value - startValue) * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <>
      {displayValue.toFixed(decimals)}
      {suffix}
    </>
  );
};

// ─── Main 3D Dialog Component ─────────────────────────────────────────────────
export const TurbineFleetDialog3D: React.FC<TurbineFleetDialog3DProps> = ({
  open,
  turbines,
  onClose,
  onSelectTurbine,
  onComponentClick,
}) => {
  const [selectedTurbine, setSelectedTurbine] = useState<TurbineData | null>(null);
  const [weather, setWeather] = useState<WeatherData>({
    windSpeed: 5.8,
    windDirection: 45,
    temperature: 22,
    humidity: 55,
    pressure: 1015,
    visibility: 12,
    cloudCover: 30,
    precipitation: 0,
  });
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setWeather((prev) => ({
          windSpeed: Math.max(0, Math.min(12, prev.windSpeed + (Math.random() - 0.5) * 1.5)),
          windDirection: (prev.windDirection + (Math.random() - 0.5) * 10 + 360) % 360,
          temperature: Math.max(10, Math.min(35, prev.temperature + (Math.random() - 0.5) * 0.5)),
          humidity: Math.max(20, Math.min(90, prev.humidity + (Math.random() - 0.5) * 2)),
          pressure: Math.max(990, Math.min(1030, prev.pressure + (Math.random() - 0.5) * 0.5)),
          visibility: Math.max(2, Math.min(20, prev.visibility + (Math.random() - 0.5) * 0.5)),
          cloudCover: Math.max(0, Math.min(100, prev.cloudCover + (Math.random() - 0.5) * 3)),
          precipitation: prev.cloudCover > 70 ? Math.random() * 10 : 0,
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [open]);

  const handleSelectTurbine = useCallback(
    (turbine: TurbineData) => {
      setSelectedTurbine(turbine);
      onSelectTurbine(turbine);
    },
    [onSelectTurbine],
  );

  const handleComponentClick = useCallback(
    (turbine: TurbineData, component: string) => {
      setSelectedTurbine(turbine);
      if (onComponentClick) {
        onComponentClick(turbine, component);
      }
    },
    [onComponentClick],
  );

  if (!open) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const statusCounts = useMemo(
    () => ({
      running: turbines.filter((t) => t.status === 'running').length,
      stopped: turbines.filter((t) => t.status === 'stopped').length,
      maintenance: turbines.filter((t) => t.status === 'maintenance').length,
      fault: turbines.filter((t) => t.status === 'fault').length,
      standby: turbines.filter((t) => t.status === 'standby').length,
    }),
    [turbines],
  );

  const totalPower = turbines.reduce(
    (sum, t) => sum + (t.status === 'running' ? t.activePower : 0),
    0,
  );
  const totalCapacity = turbines.reduce((sum, t) => sum + t.capacity, 0);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(180deg, #020617 0%, #0a1628 30%, #0f172a 100%)',
        overflow: 'hidden',
      }}
    >
      <Canvas camera={{ position: [5, 15, 30], fov: 45 }} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <Scene
            turbines={turbines}
            selectedTurbine={selectedTurbine}
            onSelectTurbine={handleSelectTurbine}
            onComponentClick={handleComponentClick}
            showGrid={showGrid}
            weather={weather}
          />
        </Suspense>
      </Canvas>

      {/* ── TOP BAR ── */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.98) 0%, rgba(2, 6, 23, 0.92) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          zIndex: 10,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
            }}
          >
            <AirIcon sx={{ color: '#fff', fontSize: 32 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.4rem',
                letterSpacing: 4,
                textShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
              }}
            >
              WIND FARM
            </Typography>
            <Typography
              sx={{ color: '#06b6d4', fontSize: '0.75rem', letterSpacing: 3, opacity: 0.9 }}
            >
              DIGITAL TWIN · SCADA
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 5 }}>
          <StatBox label='OPERATING' value={statusCounts.running} color='#10b981' />
          <StatBox label='STANDBY' value={statusCounts.standby} color='#8b5cf6' />
          <StatBox label='SERVICE' value={statusCounts.maintenance} color='#f59e0b' />
          <StatBox label='FAULT' value={statusCounts.fault} color='#ef4444' />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            px: 4,
            py: 2,
            borderLeft: '1px solid rgba(6, 182, 212, 0.2)',
            borderRight: '1px solid rgba(6, 182, 212, 0.2)',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                color: '#10b981',
                fontSize: '2.2rem',
                fontWeight: 800,
                textShadow: '0 0 40px rgba(16, 185, 129, 0.5)',
              }}
            >
              <AnimatedNumber value={totalPower / 1000} decimals={1} />
            </Typography>
            <Typography sx={{ color: '#64748b', fontSize: '0.65rem', letterSpacing: 1.5 }}>
              MW ACTIVE
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ color: '#94a3b8', fontSize: '1.4rem', fontWeight: 700 }}>
              {((totalPower / totalCapacity) * 100).toFixed(0)}%
            </Typography>
            <Typography sx={{ color: '#64748b', fontSize: '0.65rem', letterSpacing: 1.5 }}>
              CAPACITY
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 2,
            p: 1.5,
            '&:hover': { background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* ── LEFT PANEL: FLEET LIST ── */}
      <GlassPanel
        style={{
          position: 'absolute',
          top: 95,
          left: 20,
          width: 300,
          maxHeight: 'calc(100vh - 180px)',
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: '1px solid rgba(6, 182, 212, 0.15)',
            background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.1) 0%, transparent 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LocationOnIcon sx={{ color: '#06b6d4', fontSize: 18 }} />
            <Typography
              sx={{ color: '#06b6d4', fontWeight: 700, fontSize: '0.85rem', letterSpacing: 2 }}
            >
              TURBINE FLEET
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 1.5, overflowY: 'auto', maxHeight: 480 }}>
          {turbines.map((turbine) => {
            const isSelected = selectedTurbine?.id === turbine.id;
            const status = STATUS_CONFIG[turbine.status];

            return (
              <Box
                key={turbine.id}
                onClick={() => handleSelectTurbine(turbine)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  mb: 0.5,
                  borderRadius: 2,
                  cursor: 'pointer',
                  background: isSelected
                    ? 'linear-gradient(90deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.05) 100%)'
                    : 'transparent',
                  border: '1px solid',
                  borderColor: isSelected ? '#06b6d4' : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(6, 182, 212, 0.1)',
                    borderColor: 'rgba(6, 182, 212, 0.3)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: status.color,
                      boxShadow: `0 0 15px ${status.color}`,
                    }}
                  />
                  <Box>
                    <Typography sx={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.95rem' }}>
                      {turbine.turbineNo}
                    </Typography>
                    <Typography sx={{ color: status.color, fontSize: '0.7rem' }}>
                      {status.label}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ color: '#10b981', fontSize: '1rem', fontWeight: 700 }}>
                    {turbine.activePower.toFixed(0)}
                  </Typography>
                  <Typography sx={{ color: '#64748b', fontSize: '0.6rem' }}>kW</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </GlassPanel>

      {/* ── RIGHT PANEL: ENVIRONMENT ── */}
      <GlassPanel style={{ position: 'absolute', top: 95, right: 20, width: 240 }}>
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: '1px solid rgba(6, 182, 212, 0.15)',
            background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.1) 0%, transparent 100%)',
          }}
        >
          <Typography
            sx={{ color: '#06b6d4', fontWeight: 700, fontSize: '0.85rem', letterSpacing: 2 }}
          >
            ENVIRONMENT
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <WindCompass direction={weather.windDirection} speed={weather.windSpeed} />
          </Box>
          <EnvironmentStat
            icon={<ThermostatIcon sx={{ color: '#f59e0b' }} />}
            label='Temperature'
            value={`${weather.temperature.toFixed(1)}°C`}
          />
          <EnvironmentStat
            icon={<WaterDropIcon sx={{ color: '#06b6d4' }} />}
            label='Humidity'
            value={`${weather.humidity.toFixed(0)}%`}
          />
          <EnvironmentStat
            icon={<SpeedIcon sx={{ color: '#10b981' }} />}
            label='Pressure'
            value={`${weather.pressure.toFixed(0)} hPa`}
          />
          <EnvironmentStat
            icon={<WbSunnyIcon sx={{ color: '#fbbf24' }} />}
            label='Visibility'
            value={`${weather.visibility.toFixed(1)} km`}
          />
          <EnvironmentStat
            icon={<GrainIcon sx={{ color: '#94a3b8' }} />}
            label='Cloud Cover'
            value={`${weather.cloudCover.toFixed(0)}%`}
          />
        </Box>
      </GlassPanel>

      {/* ── BOTTOM PANEL: SELECTED TURBINE ── */}
      {selectedTurbine && (
        <GlassPanel
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 3,
              py: 2,
              borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
              background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.1) 0%, transparent 100%)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: STATUS_CONFIG[selectedTurbine.status].color,
                  boxShadow: `0 0 20px ${STATUS_CONFIG[selectedTurbine.status].color}`,
                }}
              />
              <Typography
                sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2 }}
              >
                {selectedTurbine.turbineNo}
              </Typography>
              <Chip
                label={STATUS_CONFIG[selectedTurbine.status].label}
                size='small'
                sx={{
                  background: STATUS_CONFIG[selectedTurbine.status].bgColor,
                  color: STATUS_CONFIG[selectedTurbine.status].color,
                  fontWeight: 600,
                  fontSize: '0.7rem',
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', p: 2.5, gap: 4 }}>
            <TelemetryItem
              icon={<BoltIcon sx={{ color: '#10b981', fontSize: 20 }} />}
              label='Active Power'
              value={selectedTurbine.activePower.toFixed(0)}
              unit='kW'
            />
            <TelemetryItem
              icon={<SpeedIcon sx={{ color: '#0ea5e9', fontSize: 20 }} />}
              label='Wind Speed'
              value={selectedTurbine.windSpeed.toFixed(1)}
              unit='m/s'
            />
            <TelemetryItem
              icon={<TrendingUpIcon sx={{ color: '#8b5cf6', fontSize: 20 }} />}
              label='Rotor RPM'
              value={selectedTurbine.rotorRpm.toFixed(1)}
              unit='rpm'
            />
            <TelemetryItem
              icon={<ThermostatIcon sx={{ color: '#f59e0b', fontSize: 20 }} />}
              label='Pitch Angle'
              value={selectedTurbine.pitchAngle.toFixed(1)}
              unit='°'
            />
            <TelemetryItem
              icon={<ExploreIcon sx={{ color: '#06b6d4', fontSize: 20 }} />}
              label='Nacelle'
              value={selectedTurbine.nacellePosition.toFixed(0)}
              unit='°'
            />
          </Box>
        </GlassPanel>
      )}

      {/* ── CONTROL BUTTONS ── */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          zIndex: 10,
        }}
      >
        <Tooltip title={showGrid ? 'Hide Grid' : 'Show Grid'} placement='left'>
          <IconButton
            sx={{
              ...controlButtonStyle,
              background: showGrid ? 'rgba(6, 182, 212, 0.3)' : 'rgba(2, 10, 25, 0.9)',
              borderColor: showGrid ? '#06b6d4' : 'rgba(6, 182, 212, 0.3)',
            }}
            onClick={() => setShowGrid(!showGrid)}
          >
            <LayersIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Weather' placement='left'>
          <IconButton sx={controlButtonStyle}>
            <WbSunnyIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

// ─── Helper Components ────────────────────────────────────────────────────────
const controlButtonStyle = {
  background: 'rgba(2, 10, 25, 0.9)',
  border: '1px solid rgba(6, 182, 212, 0.3)',
  color: '#fff',
  borderRadius: 2,
  p: 1.5,
  '&:hover': { background: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' },
};

const StatBox: React.FC<{ label: string; value: number; color: string }> = ({
  label,
  value,
  color,
}) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ color, fontSize: '2rem', fontWeight: 800, textShadow: `0 0 25px ${color}` }}>
      <AnimatedNumber value={value} />
    </Typography>
    <Typography sx={{ color: '#64748b', fontSize: '0.6rem', letterSpacing: 1 }}>{label}</Typography>
  </Box>
);

const WindCompass: React.FC<{ direction: number; speed: number }> = ({ direction, speed }) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  return (
    <Box
      sx={{
        position: 'relative',
        width: 140,
        height: 140,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.02) 100%)',
        border: '2px solid rgba(6, 182, 212, 0.5)',
        boxShadow: '0 0 50px rgba(6, 182, 212, 0.3), inset 0 0 60px rgba(6, 182, 212, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {directions.map((dir, i) => {
        const angle = i * 45;
        return (
          <Typography
            key={dir}
            sx={{
              position: 'absolute',
              fontSize: '0.6rem',
              fontWeight: 700,
              color: angle === 0 ? '#ef4444' : 'rgba(6, 182, 212, 0.8)',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-55px)`,
              transformOrigin: 'center center',
            }}
          >
            {dir}
          </Typography>
        );
      })}
      <Box
        sx={{
          width: 5,
          height: 45,
          background: 'linear-gradient(180deg, #ef4444 50%, rgba(239, 68, 68, 0.3) 50%)',
          borderRadius: 3,
          transform: `rotate(${direction}deg)`,
          transformOrigin: 'center bottom',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 25px rgba(239, 68, 68, 0.6)',
        }}
      />
      <Box
        sx={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: '#06b6d4',
          border: '3px solid #fff',
          boxShadow: '0 0 20px #06b6d4',
          zIndex: 2,
        }}
      />
      <Box sx={{ position: 'absolute', bottom: -25, left: '50%', transform: 'translateX(-50%)' }}>
        <Typography sx={{ color: '#06b6d4', fontSize: '1rem', fontWeight: 800 }}>
          {speed.toFixed(1)}
        </Typography>
        <Typography sx={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '0.6rem' }}>m/s</Typography>
      </Box>
    </Box>
  );
};

const EnvironmentStat: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 2,
      pb: 1.5,
      borderBottom: '1px solid rgba(6, 182, 212, 0.1)',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {icon}
      <Typography sx={{ color: '#64748b', fontSize: '0.75rem' }}>{label}</Typography>
    </Box>
    <Typography sx={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>{value}</Typography>
  </Box>
);

const TelemetryItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
}> = ({ icon, label, value, unit }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: 90,
      p: 1.5,
      borderRadius: 2,
      background: 'rgba(6, 182, 212, 0.03)',
      border: '1px solid rgba(6, 182, 212, 0.1)',
    }}
  >
    {icon}
    <Typography sx={{ color: '#64748b', fontSize: '0.6rem', letterSpacing: 0.5, mt: 0.5 }}>
      {label}
    </Typography>
    <Typography sx={{ color: '#06b6d4', fontSize: '1.2rem', fontWeight: 700 }}>
      {value}
      <Typography component='span' sx={{ color: '#64748b', fontSize: '0.7rem', ml: 0.3 }}>
        {unit}
      </Typography>
    </Typography>
  </Box>
);

export default TurbineFleetDialog3D;
