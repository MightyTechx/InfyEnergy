import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, IconButton, Tooltip, Switch } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import PublicIcon from '@mui/icons-material/Public';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirIcon from '@mui/icons-material/Air';
import { TurbineData, STATUS_CONFIG } from './types/turbineData.types';

interface TurbineFleetDialogProps {
  open: boolean;
  turbines: TurbineData[];
  onClose: () => void;
  onSelectTurbine: (turbine: TurbineData) => void;
  onSelectComponent: (turbine: TurbineData, component: string) => void;
}

interface Turbine3DProps {
  turbine: TurbineData;
  isSelected: boolean;
  isMaintenance: boolean;
  onClick: () => void;
  onComponentClick: (component: string) => void;
}

interface WeatherData {
  windSpeed: number;
  windDirection: number;
  temperature: number;
  humidity: number;
  pressure: number;
}

// Simulated live weather
const generateWeather = (): WeatherData => ({
  windSpeed: 2.5 + Math.random() * 6,
  windDirection: Math.random() * 360,
  temperature: 18 + Math.random() * 15,
  humidity: 45 + Math.random() * 35,
  pressure: 1005 + Math.random() * 20,
});

// Turbine internal components
const TURBINE_COMPONENTS = [
  { id: 'generator', name: 'Generator', icon: <FlashOnIcon />, color: '#0ea5e9' },
  { id: 'gearbox', name: 'Gearbox', icon: <SettingsIcon />, color: '#8b5cf6' },
  { id: 'transformer', name: 'Transformer', icon: <FlashOnIcon />, color: '#f59e0b' },
  { id: 'cooling', name: 'Cooling System', icon: <ThermostatIcon />, color: '#10b981' },
  { id: 'nacelle', name: 'Nacelle', icon: <ExploreIcon />, color: '#ec4899' },
];

// ─── Animated Wind Compass ─────────────────────────────────────────────────
const WindCompass = ({ direction, speed }: { direction: number; speed: number }) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  return (
    <Box
      sx={{
        position: 'relative',
        width: 130,
        height: 130,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.02) 100%)',
        border: '2px solid rgba(6,182,212,0.5)',
        boxShadow: '0 0 50px rgba(6,182,212,0.3), inset 0 0 60px rgba(6,182,212,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer ring markers */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <Box
          key={angle}
          sx={{
            position: 'absolute',
            width: 2,
            height: angle % 90 === 0 ? 12 : 6,
            background: angle === 0 ? '#ef4444' : 'rgba(6,182,212,0.4)',
            borderRadius: 1,
            transform: `rotate(${angle}deg) translateY(-52px)`,
            transformOrigin: 'center center',
          }}
        />
      ))}

      {/* Direction labels */}
      {directions.map((dir, i) => {
        const angle = i * 45;
        return (
          <Typography
            key={dir}
            sx={{
              position: 'absolute',
              fontSize: '0.65rem',
              fontWeight: 700,
              color: angle === 0 ? '#ef4444' : 'rgba(6,182,212,0.8)',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-42px)`,
              transformOrigin: 'center center',
            }}
          >
            {dir}
          </Typography>
        );
      })}

      {/* Animated needle */}
      <Box
        sx={{
          position: 'absolute',
          width: 5,
          height: 42,
          background: 'linear-gradient(180deg, #ef4444 50%, rgba(239,68,68,0.3) 50%)',
          borderRadius: 3,
          transform: `rotate(${direction}deg)`,
          transformOrigin: 'center bottom',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 25px rgba(239,68,68,0.6)',
        }}
      />

      {/* Center hub */}
      <Box
        sx={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#06b6d4',
          border: '3px solid #fff',
          boxShadow: '0 0 20px #06b6d4',
          zIndex: 2,
        }}
      />

      {/* Speed display */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -28,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          background: 'rgba(6,182,212,0.1)',
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          border: '1px solid rgba(6,182,212,0.3)',
        }}
      >
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#06b6d4',
            textShadow: '0 0 15px rgba(6,182,212,0.5)',
          }}
        >
          {speed.toFixed(1)}
        </Typography>
        <Typography sx={{ fontSize: '0.6rem', color: 'rgba(6,182,212,0.7)' }}>m/s</Typography>
      </Box>
    </Box>
  );
};

// ─── Premium 3D Turbine ────────────────────────────────────────────────────
const Turbine3D: React.FC<Turbine3DProps> = ({
  turbine,
  isSelected,
  isMaintenance,
  onClick,
  onComponentClick,
}) => {
  const [rotation, setRotation] = useState(0);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (turbine.status === 'running') {
      const interval = setInterval(() => setRotation((r) => (r + 2) % 360), 50);
      return () => clearInterval(interval);
    }
  }, [turbine.status]);

  const statusConfig = STATUS_CONFIG[turbine.status];
  const bladeColor = isMaintenance
    ? '#f59e0b'
    : turbine.status === 'running'
      ? '#ffffff'
      : '#94a3b8';
  const accentColor = isMaintenance ? '#f59e0b' : '#06b6d4';

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        filter: hovered
          ? `drop-shadow(0 0 30px ${accentColor})`
          : `drop-shadow(0 0 10px ${accentColor}40)`,
      }}
    >
      {/* Glow base */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -5,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 40,
          height: 8,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${accentColor}40 0%, transparent 70%)`,
          filter: 'blur(4px)',
        }}
      />

      {/* Turbine tower with metallic gradient */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 10,
          height: 85,
          background:
            'linear-gradient(90deg, #334155 0%, #64748b 30%, #94a3b8 50%, #64748b 70%, #334155 100%)',
          borderRadius: 5,
          boxShadow: '2px 0 15px rgba(0,0,0,0.4)',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: '20%',
            top: 0,
            bottom: 0,
            width: 3,
            background:
              'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            borderRadius: 2,
          },
        }}
      />

      {/* Tower top adapter */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 82,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 14,
          height: 8,
          background: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
          borderRadius: 4,
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        }}
      />

      {/* Nacelle with detailed design */}
      <Box
        onClick={(e) => {
          e.stopPropagation();
          onComponentClick('nacelle');
        }}
        onMouseEnter={() => setHoveredComponent('nacelle')}
        onMouseLeave={() => setHoveredComponent(null)}
        sx={{
          position: 'absolute',
          bottom: 88,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 28,
          height: 16,
          background: 'linear-gradient(135deg, #475569 0%, #64748b 50%, #334155 100%)',
          borderRadius: 8,
          border: `2px solid ${hoveredComponent === 'nacelle' ? '#ec4899' : statusConfig.color}`,
          boxShadow: `0 0 ${hoveredComponent === 'nacelle' ? 25 : 15}px ${hoveredComponent === 'nacelle' ? '#ec4899' : 'rgba(0,0,0,0.4)'}`,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          '&:hover': {
            borderColor: '#ec4899',
            boxShadow: '0 0 30px #ec4899',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 2,
            left: '30%',
            right: '30%',
            height: 4,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
          },
        }}
      />

      {/* Hub */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${statusConfig.color} 0%, #475569 100%)`,
          border: '3px solid #64748b',
          zIndex: 2,
          boxShadow: `0 0 15px ${statusConfig.color}`,
        }}
      />

      {/* Rotating blades with premium design */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 107,
          left: '50%',
          transformOrigin: 'center bottom',
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          transition: turbine.status === 'running' ? 'none' : 'transform 0.5s ease',
        }}
      >
        {[0, 120, 240].map((angle, i) => (
          <Box
            key={angle}
            sx={{
              position: 'absolute',
              transformOrigin: 'center bottom',
              transform: `rotate(${angle}deg)`,
            }}
          >
            {/* Main blade */}
            <Box
              sx={{
                width: 5,
                height: 48,
                background: `linear-gradient(180deg, ${bladeColor} 0%, ${bladeColor}cc 70%, ${bladeColor}80 100%)`,
                borderRadius: 3,
                boxShadow: `0 0 15px ${bladeColor}50`,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: '30%',
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 1,
                },
              }}
            />
            {/* Blade tip */}
            <Box
              sx={{
                position: 'absolute',
                top: 44,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 8,
                background: bladeColor,
                borderRadius: '50%',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Status badge */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 108,
          left: '50%',
          transform: 'translateX(-50%)',
          background: `linear-gradient(135deg, ${statusConfig.color} 0%, ${statusConfig.color}cc 100%)`,
          px: 1.5,
          py: 0.5,
          borderRadius: 6,
          boxShadow: `0 0 20px ${statusConfig.color}`,
          border: '1px solid rgba(255,255,255,0.3)',
        }}
      >
        <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>
          {turbine.turbineNo.replace('T-', '')}
        </Typography>
      </Box>

      {/* Power output */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -18,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.6)',
          px: 1,
          py: 0.5,
          borderRadius: 2,
          border: '1px solid rgba(16,185,129,0.3)',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#10b981',
            textShadow: '0 0 15px rgba(16,185,129,0.5)',
          }}
        >
          {turbine.activePower.toFixed(0)} kW
        </Typography>
      </Box>

      {/* Component hotspots */}
      {TURBINE_COMPONENTS.filter((c) => c.id !== 'nacelle').map((comp) => (
        <Tooltip key={comp.id} title={`${comp.name} - Click for details`} arrow>
          <Box
            onClick={(e) => {
              e.stopPropagation();
              onComponentClick(comp.id);
            }}
            onMouseEnter={() => setHoveredComponent(comp.id)}
            onMouseLeave={() => setHoveredComponent(null)}
            sx={{
              position: 'absolute',
              bottom: 45,
              left: comp.id === 'generator' ? '65%' : comp.id === 'gearbox' ? '35%' : '50%',
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: comp.color,
              border: `2px solid ${hoveredComponent === comp.id ? '#fff' : comp.color}`,
              boxShadow: `0 0 15px ${comp.color}, ${hoveredComponent === comp.id ? `0 0 30px ${comp.color}` : 'none'}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              animation: hoveredComponent === comp.id ? 'pulse 1s infinite' : 'none',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.4)' },
              },
              '&:hover': {
                transform: 'scale(1.4)',
                boxShadow: `0 0 25px ${comp.color}`,
              },
            }}
          />
        </Tooltip>
      ))}

      {/* Selection ring */}
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 45,
            height: 10,
            borderRadius: '50%',
            background: 'rgba(6,182,212,0.4)',
            boxShadow: '0 0 40px rgba(6,182,212,0.8)',
            animation: 'glow 1.5s ease-in-out infinite',
            '@keyframes glow': {
              '0%, 100%': { opacity: 0.4, transform: 'translateX(-50%) scale(1)' },
              '50%': { opacity: 1, transform: 'translateX(-50%) scale(1.3)' },
            },
          }}
        />
      )}
    </Box>
  );
};

// ─── Animated Grid Floor ───────────────────────────────────────────────────
const GridFloor = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '70%',
      background: `
        linear-gradient(180deg, rgba(6,182,212,0.08) 0%, transparent 100%),
        repeating-linear-gradient(
          90deg,
          rgba(6,182,212,0.15) 0px,
          rgba(6,182,212,0.15) 1px,
          transparent 1px,
          transparent 60px
        ),
        repeating-linear-gradient(
          0deg,
          rgba(6,182,212,0.15) 0px,
          rgba(6,182,212,0.15) 1px,
          transparent 1px,
          transparent 60px
        )
      `,
      transform: 'perspective(500px) rotateX(60deg)',
      transformOrigin: 'bottom center',
      maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse at center bottom, rgba(6,182,212,0.2) 0%, transparent 60%)',
      },
    }}
  />
);

// ─── Mini Fleet Map ─────────────────────────────────────────────────────────
const MiniMap = ({
  turbines,
  selectedTurbine,
  onSelect,
}: {
  turbines: TurbineData[];
  selectedTurbine: TurbineData | null;
  onSelect: (t: TurbineData) => void;
}) => (
  <Box
    sx={{
      background: 'rgba(6,182,212,0.08)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(6,182,212,0.3)',
      borderRadius: 3,
      p: 2,
      width: '100%',
    }}
  >
    <Typography
      sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#06b6d4', mb: 1, letterSpacing: 1.5 }}
    >
      FLEET MAP
    </Typography>
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 110,
        background: 'rgba(6,182,212,0.05)',
        borderRadius: 2,
        border: '1px solid rgba(6,182,212,0.2)',
        overflow: 'hidden',
      }}
    >
      {/* Grid */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            repeating-linear-gradient(90deg, rgba(6,182,212,0.1) 0px, transparent 1px, transparent 22px),
            repeating-linear-gradient(0deg, rgba(6,182,212,0.1) 0px, transparent 1px, transparent 22px)
          `,
        }}
      />

      {/* Turbines */}
      {turbines.map((t, i) => {
        const cols = 5;
        const x = (i % cols) * 18 + 12;
        const y = Math.floor(i / cols) * 35 + 15;
        const isSelected = selectedTurbine?.turbineNo === t.turbineNo;
        const isMaint = t.status === 'maintenance';

        return (
          <Tooltip key={t.turbineNo} title={t.turbineNo}>
            <Box
              onClick={() => onSelect(t)}
              sx={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: STATUS_CONFIG[t.status].color,
                border: `2px solid ${isSelected ? '#fff' : 'transparent'}`,
                boxShadow: `0 0 ${isSelected ? 15 : 8}px ${STATUS_CONFIG[t.status].color}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { transform: 'scale(1.6)' },
              }}
            />
          </Tooltip>
        );
      })}

      {/* Compass */}
      <Box sx={{ position: 'absolute', bottom: 5, right: 8 }}>
        <Typography sx={{ color: '#ef4444', fontSize: '0.65rem', fontWeight: 800 }}>N</Typography>
      </Box>
    </Box>
  </Box>
);

// ─── Glass Panel Component ───────────────────────────────────────────────────
const GlassPanel: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => (
  <Box
    sx={{
      background: 'rgba(15,23,42,0.88)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(6,182,212,0.25)',
      borderRadius: 3,
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </Box>
);

// ─── Main Fleet Dialog ──────────────────────────────────────────────────────
const TurbineFleetDialog: React.FC<TurbineFleetDialogProps> = ({
  open,
  turbines,
  onClose,
  onSelectTurbine,
  onSelectComponent,
}) => {
  const [selectedTurbine, setSelectedTurbine] = useState<TurbineData | null>(null);
  const [weather, setWeather] = useState<WeatherData>(generateWeather());
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [showFog, setShowFog] = useState(true);

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => setWeather(generateWeather()), 3000);
      return () => clearInterval(interval);
    }
  }, [open]);

  const selectedTurbineData = selectedTurbine || turbines[0];
  const statusCounts = useMemo(
    () => ({
      operating: turbines.filter((t) => t.status === 'running').length,
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

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #020617 0%, #0a1628 50%, #0f172a 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric effects */}
      {showFog && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.2) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.1) 0%, transparent 40%),
              radial-gradient(ellipse at 80% 80%, rgba(6,182,212,0.15) 0%, transparent 40%)
            `,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Ambient particles */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(6,182,212,0.03) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(139,92,246,0.03) 0%, transparent 30%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* ── Premium Header Bar ──────────────────────────────────────── */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 75,
          background: 'linear-gradient(180deg, rgba(15,23,42,0.98) 0%, rgba(15,23,42,0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(6,182,212,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 35px rgba(6,182,212,0.5)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: -2,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(6,182,212,0.5), transparent)',
                zIndex: -1,
              },
            }}
          >
            <AirIcon sx={{ color: '#fff', fontSize: 30 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: 3,
                textShadow: '0 0 25px rgba(6,182,212,0.4)',
              }}
            >
              WIND FARM
            </Typography>
            <Typography
              sx={{ color: '#06b6d4', fontSize: '0.7rem', letterSpacing: 2.5, opacity: 0.8 }}
            >
              DIGITAL TWIN
            </Typography>
          </Box>
        </Box>

        {/* Status legend */}
        <Box sx={{ display: 'flex', gap: 4, mr: 3 }}>
          {[
            { label: 'Operating', color: '#10b981', count: statusCounts.operating },
            { label: 'Standby', color: '#8b5cf6', count: statusCounts.standby },
            { label: 'Service', color: '#f59e0b', count: statusCounts.maintenance },
            { label: 'Fault', color: '#ef4444', count: statusCounts.fault },
            { label: 'Stopped', color: '#64748b', count: statusCounts.stopped },
          ].map((s) => (
            <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: s.color,
                  boxShadow: `0 0 12px ${s.color}`,
                }}
              />
              <Typography
                sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}
              >
                {s.count} {s.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Power Output */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 3,
            borderLeft: '1px solid rgba(6,182,212,0.2)',
            borderRight: '1px solid rgba(6,182,212,0.2)',
          }}
        >
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#10b981',
              textShadow: '0 0 35px rgba(16,185,129,0.5)',
            }}
          >
            {(totalPower / 1000).toFixed(1)}
          </Typography>
          <Box>
            <Typography sx={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 600 }}>
              MW
            </Typography>
            <Typography sx={{ color: '#64748b', fontSize: '0.6rem' }}>OUTPUT</Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 2,
            p: 1.5,
            '&:hover': { background: 'rgba(239,68,68,0.2)', borderColor: '#ef4444' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* ── Left Sidebar ──────────────────────────────────────────── */}
      <GlassPanel
        style={{
          position: 'absolute',
          top: 90,
          left: 20,
          bottom: 90,
          width: 290,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            borderBottom: '1px solid rgba(6,182,212,0.2)',
            background: 'linear-gradient(90deg, rgba(6,182,212,0.1) 0%, transparent 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ color: '#06b6d4', fontSize: 18 }} />
            <Typography
              sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#06b6d4', letterSpacing: 2 }}
            >
              TURBINE FLEET
            </Typography>
          </Box>
        </Box>

        {/* Turbine list */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 1.5 }}>
          {turbines.map((t) => {
            const isSel = selectedTurbineData?.turbineNo === t.turbineNo;
            const isMaint = t.status === 'maintenance';
            const status = STATUS_CONFIG[t.status];

            return (
              <Box
                key={t.turbineNo}
                onClick={() => setSelectedTurbine(t)}
                sx={{
                  px: 2,
                  py: 1.5,
                  mb: 0.5,
                  borderRadius: 2,
                  background: isSel
                    ? 'linear-gradient(90deg, rgba(6,182,212,0.25) 0%, rgba(6,182,212,0.05) 100%)'
                    : isMaint
                      ? 'linear-gradient(90deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.02) 100%)'
                      : 'transparent',
                  border: `1px solid ${isSel ? '#06b6d4' : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'rgba(6,182,212,0.1)',
                    borderColor: 'rgba(6,182,212,0.3)',
                  },
                  '&::before': isSel
                    ? {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 3,
                        background: '#06b6d4',
                        boxShadow: '0 0 10px #06b6d4',
                      }
                    : {},
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: status.color,
                      boxShadow: `0 0 12px ${status.color}`,
                      animation: t.status === 'running' ? 'pulse 2s infinite' : 'none',
                    }}
                  />
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', flex: 1 }}>
                    {t.turbineNo}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: status.color, fontWeight: 600 }}>
                    {status.label}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 0.75,
                    pl: 2.5,
                  }}
                >
                  <Typography sx={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                    {t.activePower.toFixed(0)} kW
                  </Typography>
                  <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                    {((t.activePower / t.capacity) * 100).toFixed(0)}% eff
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Mini map */}
        <Box sx={{ p: 2, borderTop: '1px solid rgba(6,182,212,0.2)' }}>
          <MiniMap
            turbines={turbines}
            selectedTurbine={selectedTurbineData}
            onSelect={setSelectedTurbine}
          />
        </Box>
      </GlassPanel>

      {/* ── Weather Widget ─────────────────────────────────────────── */}
      <GlassPanel
        style={{
          position: 'absolute',
          top: 90,
          right: 20,
          width: 160,
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: '1px solid rgba(6,182,212,0.2)',
            background: 'linear-gradient(90deg, rgba(6,182,212,0.1) 0%, transparent 100%)',
          }}
        >
          <Typography
            sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#06b6d4', letterSpacing: 1.5 }}
          >
            WEATHER
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <WindCompass direction={weather.windDirection} speed={weather.windSpeed} />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Box
              sx={{
                textAlign: 'center',
                p: 1,
                background: 'rgba(6,182,212,0.05)',
                borderRadius: 2,
              }}
            >
              <WbSunnyIcon sx={{ fontSize: 18, color: '#f59e0b' }} />
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>
                {weather.temperature.toFixed(0)}°C
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                p: 1,
                background: 'rgba(6,182,212,0.05)',
                borderRadius: 2,
              }}
            >
              <WaterDropIcon sx={{ fontSize: 18, color: '#38bdf8' }} />
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>
                {weather.humidity.toFixed(0)}%
              </Typography>
            </Box>
          </Box>
        </Box>
      </GlassPanel>

      {/* ── Right Toolbar ───────────────────────────────────────────── */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: 20,
          transform: 'translateY(-50%)',
          background: 'rgba(15,23,42,0.88)',
          backdropFilter: 'blur(20px)',
          borderRadius: 3,
          border: '1px solid rgba(6,182,212,0.3)',
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          boxShadow: '0 0 40px rgba(6,182,212,0.2)',
          zIndex: 10,
        }}
      >
        {[
          { icon: <HomeIcon />, label: 'Home', active: true },
          { icon: <ExploreIcon />, label: 'Navigate' },
          { icon: <LayersIcon />, label: 'Layers' },
          { icon: <SettingsIcon />, label: 'Settings' },
          { icon: <PublicIcon />, label: 'Globe' },
        ].map((tool) => (
          <Tooltip key={tool.label} title={tool.label} placement='left'>
            <IconButton
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: tool.active
                  ? 'linear-gradient(135deg, rgba(6,182,212,0.4) 0%, rgba(6,182,212,0.2) 100%)'
                  : 'transparent',
                border: `1px solid ${tool.active ? 'rgba(6,182,212,0.6)' : 'rgba(255,255,255,0.1)'}`,
                color: tool.active ? '#06b6d4' : 'rgba(255,255,255,0.5)',
                boxShadow: tool.active ? '0 0 20px rgba(6,182,212,0.4)' : 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(6,182,212,0.3)',
                  borderColor: 'rgba(6,182,212,0.6)',
                  color: '#06b6d4',
                  boxShadow: '0 0 25px rgba(6,182,212,0.5)',
                },
              }}
            >
              {tool.icon}
            </IconButton>
          </Tooltip>
        ))}

        <Box sx={{ my: 1, borderTop: '1px solid rgba(6,182,212,0.2)' }} />

        <Tooltip title='Zoom In' placement='left'>
          <IconButton
            onClick={() => setZoom((z) => Math.min(z + 0.1, 2))}
            sx={{
              color: 'rgba(255,255,255,0.5)',
              '&:hover': { color: '#06b6d4', background: 'rgba(6,182,212,0.2)' },
            }}
          >
            <ZoomInIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Zoom Out' placement='left'>
          <IconButton
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
            sx={{
              color: 'rgba(255,255,255,0.5)',
              '&:hover': { color: '#06b6d4', background: 'rgba(6,182,212,0.2)' },
            }}
          >
            <ZoomOutIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Rotate' placement='left'>
          <IconButton
            onClick={() => setRotation((r) => (r + 45) % 360)}
            sx={{
              color: 'rgba(255,255,255,0.5)',
              '&:hover': { color: '#06b6d4', background: 'rgba(6,182,212,0.2)' },
            }}
          >
            <RotateLeftIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Fullscreen' placement='left'>
          <IconButton
            sx={{
              color: 'rgba(255,255,255,0.5)',
              '&:hover': { color: '#06b6d4', background: 'rgba(6,182,212,0.2)' },
            }}
          >
            <FullscreenIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── 3D Scene ──────────────────────────────────────────────── */}
      <Box
        sx={{
          position: 'absolute',
          top: 90,
          left: 330,
          right: 90,
          bottom: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${zoom}) rotate(${rotation}deg)`,
          transition: 'transform 0.3s ease',
        }}
      >
        {showGrid && <GridFloor />}

        {/* Turbines */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 10,
            p: 4,
          }}
        >
          {turbines.slice(0, 10).map((t, i) => (
            <Turbine3D
              key={t.turbineNo}
              turbine={t}
              isSelected={selectedTurbineData?.turbineNo === t.turbineNo}
              isMaintenance={t.status === 'maintenance'}
              onClick={() => setSelectedTurbine(t)}
              onComponentClick={(component) => onSelectComponent(t, component)}
            />
          ))}
        </Box>
      </Box>

      {/* ── Bottom Status Bar ──────────────────────────────────────── */}
      <GlassPanel
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography
          sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#06b6d4', letterSpacing: 1.5 }}
        >
          STATUS LEGEND
        </Typography>
        {[
          { color: '#10b981', label: 'Operating' },
          { color: '#8b5cf6', label: 'Standby' },
          { color: '#f59e0b', label: 'Service' },
          { color: '#ef4444', label: 'Fault' },
          { color: '#64748b', label: 'Stopped' },
        ].map((item) => (
          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: item.color,
                boxShadow: `0 0 10px ${item.color}`,
              }}
            />
            <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>
              {item.label}
            </Typography>
          </Box>
        ))}

        {/* Toggles */}
        <Box sx={{ borderLeft: '1px solid rgba(6,182,212,0.2)', pl: 3, display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>
              Grid
            </Typography>
            <Switch
              size='small'
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#06b6d4' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { background: '#06b6d4' },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>
              Fog
            </Typography>
            <Switch
              size='small'
              checked={showFog}
              onChange={(e) => setShowFog(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#06b6d4' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { background: '#06b6d4' },
              }}
            />
          </Box>
        </Box>
      </GlassPanel>
    </Box>
  );
};

export default TurbineFleetDialog;
