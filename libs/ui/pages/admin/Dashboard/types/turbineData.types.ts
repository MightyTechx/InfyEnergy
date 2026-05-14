// Complete turbine data interface with all electrical, mechanical, and monitoring fields
export interface TurbineData {
  id: number;
  turbineNo: string;
  status: 'running' | 'stopped' | 'maintenance' | 'fault' | 'standby';
  time: string;
  capacity: number; // kW - turbine capacity/rating

  // Core Performance
  activePower: number; // kW
  windSpeed: number; // m/s
  breakProgramme: string; // Released / Applied / Emergency
  operatingMode: string;
  todayGeneration: number; // kWh
  totalProduction: number; // MWh
  totalOperatingHours: number; // h
  totalProductionHours: number; // h
  operationHoursToday: number; // h

  // Electrical — MFR300
  currentL1: number; // A
  currentL2: number; // A
  currentL3: number; // A
  powerFrequency: number; // Hz
  voltageL1: number; // V
  voltageL2: number; // V
  voltageL3: number; // V
  apparentPower: number; // kVA
  reactivePower: number; // kVAR
  powerFactor: number; // –

  // Drive Train & Rotor
  rotorRpm: number; // rpm
  gearSpeed: number; // rpm
  generatorRpm: number; // rpm
  nacellePosition: number; // °
  cableWinding: number; // °
  windDirection: number; // °
  relativeWindDirection: number; // °
  pitchAngle: number; // ° (blade angle)
  pitchCylinder1: number; // mm
  pitchCylinder2: number; // mm
  pitchCylinder3: number; // mm

  // Structural Monitoring
  towerOscillationX: number; // mm/s
  towerOscillationY: number; // mm/s

  // Temperature Monitoring
  outdoorTemp: number; // °C
  trfWindingTempU: number; // °C
  trfWindingTempV: number; // °C
  trfWindingTempW: number; // °C
  nacelleTemp: number; // °C
  coolCnvHeatExIn: number; // °C
  coolCnvHeatExOut: number; // °C
  coolTrfHeatExIn: number; // °C
  gearOilSumpTemp: number; // °C
  generatorWindingTempU: number; // °C
  generatorWindingTempV: number; // °C
  generatorWindingTempW: number; // °C
  gearboxTemp: number; // °C
  generatorTemp: number; // °C
  transformerTemp: number; // °C
  hubExhaustTemp: number; // °C

  // Pressure & Hydraulics
  hydraulicPressure: number; // bar
  gearOilPressure: number; // bar
  coolantInletPressure: number; // bar
  coolantOutletPressure: number; // bar

  // Control Cabinet Temperatures
  tempSwCabTower: number; // °C
  tempSwCabNacelle: number; // °C
  tempSwCabHub: number; // °C
}

// Status configuration
export type TurbineStatus = TurbineData['status'];

export const STATUS_CONFIG: Record<
  TurbineStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  running: {
    label: 'Running',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.15)',
    borderColor: 'rgba(16,185,129,0.4)',
  },
  stopped: {
    label: 'Stopped',
    color: '#64748b',
    bgColor: 'rgba(100,116,139,0.15)',
    borderColor: 'rgba(100,116,139,0.4)',
  },
  maintenance: {
    label: 'Maintenance',
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.15)',
    borderColor: 'rgba(245,158,11,0.4)',
  },
  fault: {
    label: 'Fault',
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.15)',
    borderColor: 'rgba(239,68,68,0.4)',
  },
  standby: {
    label: 'Standby',
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.15)',
    borderColor: 'rgba(139,92,246,0.4)',
  },
};
