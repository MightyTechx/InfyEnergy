/**
 * Mock Data Utility - Centralized mock data for entire application
 *
 * To remove mock data when API is ready:
 * 1. Replace imports from this file with actual API hooks
 * 2. Delete this file
 * 3. Update components to use real data sources
 *
 * Structure:
 * - Turbine mock data
 * - Feature flags mock data
 * - Inventory mock data
 * - Reports mock data
 * - Help & Support mock data
 */

import React, { useEffect, useState } from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface TurbineData {
  id: number;
  turbineNo: string;
  status: 'running' | 'stopped' | 'maintenance' | 'fault' | 'standby';
  time: string;
  capacity: number;
  activePower: number;
  windSpeed: number;
  breakProgramme: string;
  operatingMode: string;
  todayGeneration: number;
  totalProduction: number;
  totalOperatingHours: number;
  totalProductionHours: number;
  operationHoursToday: number;
  currentL1: number;
  currentL2: number;
  currentL3: number;
  powerFrequency: number;
  voltageL1: number;
  voltageL2: number;
  voltageL3: number;
  apparentPower: number;
  reactivePower: number;
  powerFactor: number;
  rotorRpm: number;
  gearSpeed: number;
  generatorRpm: number;
  nacellePosition: number;
  cableWinding: number;
  windDirection: number;
  relativeWindDirection: number;
  pitchAngle: number;
  pitchCylinder1: number;
  pitchCylinder2: number;
  pitchCylinder3: number;
  towerOscillationX: number;
  towerOscillationY: number;
  outdoorTemp: number;
  trfWindingTempU: number;
  trfWindingTempV: number;
  trfWindingTempW: number;
  nacelleTemp: number;
  coolCnvHeatExIn: number;
  coolCnvHeatExOut: number;
  coolTrfHeatExIn: number;
  gearOilSumpTemp: number;
  generatorWindingTempU: number;
  generatorWindingTempV: number;
  generatorWindingTempW: number;
  gearboxTemp: number;
  generatorTemp: number;
  transformerTemp: number;
  hubExhaustTemp: number;
  hydraulicPressure: number;
  gearOilPressure: number;
  coolantInletPressure: number;
  coolantOutletPressure: number;
  tempSwCabTower: number;
  tempSwCabNacelle: number;
  tempSwCabHub: number;
}

export interface FeatureFlagData {
  id: number;
  name: string;
  key: string;
  description: string;
  environment: string;
  status: 'Enabled' | 'Disabled';
  roles: string[];
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItemData {
  id: number;
  itemCode: string;
  category: string;
  description: string;
  specifications: string;
  unitOfMeasure: string;
  location: string;
  supplier: string;
  minimumStock: string;
  openingQty: string;
  currentQty: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Order';
  lastUpdated: string;
}

export interface KpiRowData {
  id: number;
  kpi: string;
  t01: string;
  t02: string;
  t03: string;
  t04: string;
  t05: string;
  t06: string;
  t07: string;
  t08: string;
  t09: string;
  t10: string;
  total: string;
}

export interface DowntimeRowData {
  id: number;
  turbineNo: string;
  from: string;
  to: string;
  duration: string;
  downtimeType: 'Scheduled' | 'Unscheduled' | 'Force Majeure' | 'Grid Fault' | 'Communication Loss';
  faultStatus: string;
  remarks: string;
}

export interface FaqCategoryData {
  category: string;
  icon: string;
  questions: { q: string; a: string }[];
}

export interface QuickLinkData {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

// ─── Turbine Status Config ─────────────────────────────────────────────────────

export const STATUS_CONFIG = {
  running: {
    label: 'Running',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  stopped: {
    label: 'Stopped',
    color: '#6b7280',
    bgColor: 'rgba(107, 114, 128, 0.12)',
    borderColor: 'rgba(107, 114, 128, 0.4)',
  },
  maintenance: {
    label: 'Maintenance',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  fault: {
    label: 'Fault',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  standby: {
    label: 'Standby',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
};

// ─── Mock Turbine Data ─────────────────────────────────────────────────────────

export const MOCK_TURBINE_DATA: TurbineData[] = [
  {
    id: 1,
    turbineNo: 'T-01',
    status: 'running',
    time: '14:32:15',
    capacity: 2000,
    activePower: 1850,
    windSpeed: 8.5,
    breakProgramme: 'Released',
    operatingMode: 'Grid Connected',
    todayGeneration: 4285,
    totalProduction: 12450,
    totalOperatingHours: 14820,
    totalProductionHours: 13540,
    operationHoursToday: 11.2,
    currentL1: 1542,
    currentL2: 1538,
    currentL3: 1545,
    powerFrequency: 50.01,
    voltageL1: 691,
    voltageL2: 689,
    voltageL3: 690,
    apparentPower: 1948,
    reactivePower: 485,
    powerFactor: 0.95,
    rotorRpm: 14.2,
    gearSpeed: 248,
    generatorRpm: 1520,
    nacellePosition: 242,
    cableWinding: 125,
    windDirection: 245,
    relativeWindDirection: -3,
    pitchAngle: 3.2,
    pitchCylinder1: 142,
    pitchCylinder2: 144,
    pitchCylinder3: 141,
    towerOscillationX: 0.18,
    towerOscillationY: 0.12,
    outdoorTemp: 28,
    trfWindingTempU: 68,
    trfWindingTempV: 70,
    trfWindingTempW: 67,
    nacelleTemp: 38,
    coolCnvHeatExIn: 52,
    coolCnvHeatExOut: 32,
    coolTrfHeatExIn: 48,
    gearOilSumpTemp: 62,
    generatorWindingTempU: 82,
    generatorWindingTempV: 84,
    generatorWindingTempW: 81,
    gearboxTemp: 52,
    generatorTemp: 65,
    transformerTemp: 42,
    hubExhaustTemp: 38,
    hydraulicPressure: 185,
    gearOilPressure: 3.1,
    coolantInletPressure: 1.8,
    coolantOutletPressure: 1.3,
    tempSwCabTower: 32,
    tempSwCabNacelle: 36,
    tempSwCabHub: 34,
  },
  {
    id: 2,
    turbineNo: 'T-02',
    status: 'running',
    time: '14:32:18',
    capacity: 2000,
    activePower: 1920,
    windSpeed: 9.2,
    breakProgramme: 'Released',
    operatingMode: 'Grid Connected',
    todayGeneration: 4510,
    totalProduction: 11820,
    totalOperatingHours: 14210,
    totalProductionHours: 13020,
    operationHoursToday: 11.8,
    currentL1: 1600,
    currentL2: 1596,
    currentL3: 1602,
    powerFrequency: 49.98,
    voltageL1: 692,
    voltageL2: 690,
    voltageL3: 691,
    apparentPower: 2021,
    reactivePower: 510,
    powerFactor: 0.95,
    rotorRpm: 14.8,
    gearSpeed: 258,
    generatorRpm: 1580,
    nacellePosition: 240,
    cableWinding: 148,
    windDirection: 238,
    relativeWindDirection: -2,
    pitchAngle: 2.8,
    pitchCylinder1: 148,
    pitchCylinder2: 146,
    pitchCylinder3: 147,
    towerOscillationX: 0.22,
    towerOscillationY: 0.15,
    outdoorTemp: 27,
    trfWindingTempU: 71,
    trfWindingTempV: 73,
    trfWindingTempW: 70,
    nacelleTemp: 40,
    coolCnvHeatExIn: 55,
    coolCnvHeatExOut: 34,
    coolTrfHeatExIn: 50,
    gearOilSumpTemp: 65,
    generatorWindingTempU: 86,
    generatorWindingTempV: 88,
    generatorWindingTempW: 85,
    gearboxTemp: 54,
    generatorTemp: 68,
    transformerTemp: 44,
    hubExhaustTemp: 40,
    hydraulicPressure: 188,
    gearOilPressure: 3.2,
    coolantInletPressure: 1.9,
    coolantOutletPressure: 1.4,
    tempSwCabTower: 33,
    tempSwCabNacelle: 38,
    tempSwCabHub: 35,
  },
  {
    id: 3,
    turbineNo: 'T-03',
    status: 'maintenance',
    time: '14:30:00',
    capacity: 2000,
    activePower: 0,
    windSpeed: 7.1,
    breakProgramme: 'Applied',
    operatingMode: 'Service Mode',
    todayGeneration: 3892,
    totalProduction: 9870,
    totalOperatingHours: 12400,
    totalProductionHours: 11200,
    operationHoursToday: 6.5,
    currentL1: 0,
    currentL2: 0,
    currentL3: 0,
    powerFrequency: 0,
    voltageL1: 0,
    voltageL2: 0,
    voltageL3: 0,
    apparentPower: 0,
    reactivePower: 0,
    powerFactor: 0,
    rotorRpm: 0,
    gearSpeed: 0,
    generatorRpm: 0,
    nacellePosition: 180,
    cableWinding: 82,
    windDirection: 260,
    relativeWindDirection: 80,
    pitchAngle: 90,
    pitchCylinder1: 285,
    pitchCylinder2: 285,
    pitchCylinder3: 285,
    towerOscillationX: 0.02,
    towerOscillationY: 0.01,
    outdoorTemp: 29,
    trfWindingTempU: 38,
    trfWindingTempV: 38,
    trfWindingTempW: 37,
    nacelleTemp: 32,
    coolCnvHeatExIn: 30,
    coolCnvHeatExOut: 25,
    coolTrfHeatExIn: 29,
    gearOilSumpTemp: 38,
    generatorWindingTempU: 35,
    generatorWindingTempV: 36,
    generatorWindingTempW: 35,
    gearboxTemp: 35,
    generatorTemp: 32,
    transformerTemp: 38,
    hubExhaustTemp: 28,
    hydraulicPressure: 175,
    gearOilPressure: 2.8,
    coolantInletPressure: 1.2,
    coolantOutletPressure: 0.9,
    tempSwCabTower: 29,
    tempSwCabNacelle: 31,
    tempSwCabHub: 28,
  },
  {
    id: 4,
    turbineNo: 'T-04',
    status: 'running',
    time: '14:32:22',
    capacity: 2000,
    activePower: 1650,
    windSpeed: 7.8,
    breakProgramme: 'Released',
    operatingMode: 'Grid Connected',
    todayGeneration: 3950,
    totalProduction: 10920,
    totalOperatingHours: 13650,
    totalProductionHours: 12480,
    operationHoursToday: 10.8,
    currentL1: 1375,
    currentL2: 1371,
    currentL3: 1378,
    powerFrequency: 50.02,
    voltageL1: 690,
    voltageL2: 691,
    voltageL3: 689,
    apparentPower: 1737,
    reactivePower: 432,
    powerFactor: 0.95,
    rotorRpm: 13.1,
    gearSpeed: 228,
    generatorRpm: 1420,
    nacellePosition: 255,
    cableWinding: 162,
    windDirection: 252,
    relativeWindDirection: 3,
    pitchAngle: 4.1,
    pitchCylinder1: 135,
    pitchCylinder2: 138,
    pitchCylinder3: 136,
    towerOscillationX: 0.14,
    towerOscillationY: 0.1,
    outdoorTemp: 28,
    trfWindingTempU: 64,
    trfWindingTempV: 66,
    trfWindingTempW: 63,
    nacelleTemp: 36,
    coolCnvHeatExIn: 49,
    coolCnvHeatExOut: 30,
    coolTrfHeatExIn: 45,
    gearOilSumpTemp: 59,
    generatorWindingTempU: 78,
    generatorWindingTempV: 80,
    generatorWindingTempW: 77,
    gearboxTemp: 50,
    generatorTemp: 62,
    transformerTemp: 40,
    hubExhaustTemp: 36,
    hydraulicPressure: 182,
    gearOilPressure: 3.0,
    coolantInletPressure: 1.7,
    coolantOutletPressure: 1.2,
    tempSwCabTower: 31,
    tempSwCabNacelle: 35,
    tempSwCabHub: 33,
  },
  {
    id: 5,
    turbineNo: 'T-05',
    status: 'fault',
    time: '14:25:45',
    capacity: 2000,
    activePower: 0,
    windSpeed: 6.5,
    breakProgramme: 'Emergency',
    operatingMode: 'Fault Stop',
    todayGeneration: 3125,
    totalProduction: 8540,
    totalOperatingHours: 11200,
    totalProductionHours: 10100,
    operationHoursToday: 4.2,
    currentL1: 0,
    currentL2: 0,
    currentL3: 0,
    powerFrequency: 0,
    voltageL1: 0,
    voltageL2: 0,
    voltageL3: 0,
    apparentPower: 0,
    reactivePower: 0,
    powerFactor: 0,
    rotorRpm: 0,
    gearSpeed: 0,
    generatorRpm: 0,
    nacellePosition: 290,
    cableWinding: 210,
    windDirection: 275,
    relativeWindDirection: -15,
    pitchAngle: 0,
    pitchCylinder1: 0,
    pitchCylinder2: 0,
    pitchCylinder3: 0,
    towerOscillationX: 0.04,
    towerOscillationY: 0.03,
    outdoorTemp: 30,
    trfWindingTempU: 44,
    trfWindingTempV: 45,
    trfWindingTempW: 43,
    nacelleTemp: 35,
    coolCnvHeatExIn: 35,
    coolCnvHeatExOut: 27,
    coolTrfHeatExIn: 33,
    gearOilSumpTemp: 45,
    generatorWindingTempU: 55,
    generatorWindingTempV: 56,
    generatorWindingTempW: 54,
    gearboxTemp: 45,
    generatorTemp: 55,
    transformerTemp: 42,
    hubExhaustTemp: 32,
    hydraulicPressure: 160,
    gearOilPressure: 2.5,
    coolantInletPressure: 1.0,
    coolantOutletPressure: 0.7,
    tempSwCabTower: 30,
    tempSwCabNacelle: 33,
    tempSwCabHub: 31,
  },
  {
    id: 6,
    turbineNo: 'T-06',
    status: 'running',
    time: '14:32:28',
    capacity: 2000,
    activePower: 1780,
    windSpeed: 8.1,
    breakProgramme: 'Released',
    operatingMode: 'Grid Connected',
    todayGeneration: 4120,
    totalProduction: 11280,
    totalOperatingHours: 13900,
    totalProductionHours: 12750,
    operationHoursToday: 11.5,
    currentL1: 1484,
    currentL2: 1480,
    currentL3: 1487,
    powerFrequency: 50.0,
    voltageL1: 691,
    voltageL2: 690,
    voltageL3: 690,
    apparentPower: 1874,
    reactivePower: 468,
    powerFactor: 0.95,
    rotorRpm: 13.8,
    gearSpeed: 241,
    generatorRpm: 1490,
    nacellePosition: 248,
    cableWinding: 138,
    windDirection: 248,
    relativeWindDirection: 0,
    pitchAngle: 3.5,
    pitchCylinder1: 139,
    pitchCylinder2: 142,
    pitchCylinder3: 140,
    towerOscillationX: 0.16,
    towerOscillationY: 0.11,
    outdoorTemp: 27,
    trfWindingTempU: 66,
    trfWindingTempV: 68,
    trfWindingTempW: 65,
    nacelleTemp: 39,
    coolCnvHeatExIn: 51,
    coolCnvHeatExOut: 31,
    coolTrfHeatExIn: 47,
    gearOilSumpTemp: 61,
    generatorWindingTempU: 80,
    generatorWindingTempV: 82,
    generatorWindingTempW: 79,
    gearboxTemp: 51,
    generatorTemp: 64,
    transformerTemp: 41,
    hubExhaustTemp: 37,
    hydraulicPressure: 184,
    gearOilPressure: 3.1,
    coolantInletPressure: 1.8,
    coolantOutletPressure: 1.3,
    tempSwCabTower: 32,
    tempSwCabNacelle: 37,
    tempSwCabHub: 34,
  },
  {
    id: 7,
    turbineNo: 'T-07',
    status: 'standby',
    time: '14:32:00',
    capacity: 2000,
    activePower: 120,
    windSpeed: 4.2,
    breakProgramme: 'Released',
    operatingMode: 'Low Wind Standby',
    todayGeneration: 2890,
    totalProduction: 7620,
    totalOperatingHours: 10800,
    totalProductionHours: 9700,
    operationHoursToday: 8.1,
    currentL1: 100,
    currentL2: 98,
    currentL3: 101,
    powerFrequency: 50.0,
    voltageL1: 690,
    voltageL2: 689,
    voltageL3: 691,
    apparentPower: 126,
    reactivePower: 32,
    powerFactor: 0.95,
    rotorRpm: 2.1,
    gearSpeed: 36,
    generatorRpm: 220,
    nacellePosition: 305,
    cableWinding: 188,
    windDirection: 310,
    relativeWindDirection: 5,
    pitchAngle: 85,
    pitchCylinder1: 268,
    pitchCylinder2: 270,
    pitchCylinder3: 269,
    towerOscillationX: 0.06,
    towerOscillationY: 0.04,
    outdoorTemp: 31,
    trfWindingTempU: 42,
    trfWindingTempV: 43,
    trfWindingTempW: 41,
    nacelleTemp: 33,
    coolCnvHeatExIn: 36,
    coolCnvHeatExOut: 27,
    coolTrfHeatExIn: 34,
    gearOilSumpTemp: 41,
    generatorWindingTempU: 38,
    generatorWindingTempV: 39,
    generatorWindingTempW: 38,
    gearboxTemp: 38,
    generatorTemp: 35,
    transformerTemp: 36,
    hubExhaustTemp: 30,
    hydraulicPressure: 178,
    gearOilPressure: 2.9,
    coolantInletPressure: 1.5,
    coolantOutletPressure: 1.1,
    tempSwCabTower: 31,
    tempSwCabNacelle: 34,
    tempSwCabHub: 32,
  },
  {
    id: 8,
    turbineNo: 'T-08',
    status: 'running',
    time: '14:32:35',
    capacity: 2000,
    activePower: 1950,
    windSpeed: 9.8,
    breakProgramme: 'Released',
    operatingMode: 'Grid Connected',
    todayGeneration: 4680,
    totalProduction: 13200,
    totalOperatingHours: 15400,
    totalProductionHours: 14100,
    operationHoursToday: 12.1,
    currentL1: 1625,
    currentL2: 1621,
    currentL3: 1628,
    powerFrequency: 49.99,
    voltageL1: 692,
    voltageL2: 691,
    voltageL3: 690,
    apparentPower: 2053,
    reactivePower: 519,
    powerFactor: 0.95,
    rotorRpm: 15.2,
    gearSpeed: 265,
    generatorRpm: 1620,
    nacellePosition: 238,
    cableWinding: 112,
    windDirection: 235,
    relativeWindDirection: -3,
    pitchAngle: 2.5,
    pitchCylinder1: 152,
    pitchCylinder2: 149,
    pitchCylinder3: 151,
    towerOscillationX: 0.26,
    towerOscillationY: 0.18,
    outdoorTemp: 26,
    trfWindingTempU: 73,
    trfWindingTempV: 75,
    trfWindingTempW: 72,
    nacelleTemp: 42,
    coolCnvHeatExIn: 57,
    coolCnvHeatExOut: 36,
    coolTrfHeatExIn: 52,
    gearOilSumpTemp: 68,
    generatorWindingTempU: 88,
    generatorWindingTempV: 90,
    generatorWindingTempW: 87,
    gearboxTemp: 56,
    generatorTemp: 70,
    transformerTemp: 45,
    hubExhaustTemp: 42,
    hydraulicPressure: 190,
    gearOilPressure: 3.3,
    coolantInletPressure: 1.9,
    coolantOutletPressure: 1.4,
    tempSwCabTower: 34,
    tempSwCabNacelle: 39,
    tempSwCabHub: 36,
  },
  {
    id: 9,
    turbineNo: 'T-09',
    status: 'stopped',
    time: '14:20:00',
    capacity: 2000,
    activePower: 0,
    windSpeed: 10.5,
    breakProgramme: 'Applied',
    operatingMode: 'Manual Stop',
    todayGeneration: 3850,
    totalProduction: 10100,
    totalOperatingHours: 12800,
    totalProductionHours: 11600,
    operationHoursToday: 5.0,
    currentL1: 0,
    currentL2: 0,
    currentL3: 0,
    powerFrequency: 0,
    voltageL1: 0,
    voltageL2: 0,
    voltageL3: 0,
    apparentPower: 0,
    reactivePower: 0,
    powerFactor: 0,
    rotorRpm: 0,
    gearSpeed: 0,
    generatorRpm: 0,
    nacellePosition: 220,
    cableWinding: 95,
    windDirection: 225,
    relativeWindDirection: -5,
    pitchAngle: 90,
    pitchCylinder1: 285,
    pitchCylinder2: 285,
    pitchCylinder3: 285,
    towerOscillationX: 0.03,
    towerOscillationY: 0.02,
    outdoorTemp: 25,
    trfWindingTempU: 36,
    trfWindingTempV: 37,
    trfWindingTempW: 36,
    nacelleTemp: 28,
    coolCnvHeatExIn: 27,
    coolCnvHeatExOut: 24,
    coolTrfHeatExIn: 26,
    gearOilSumpTemp: 35,
    generatorWindingTempU: 30,
    generatorWindingTempV: 31,
    generatorWindingTempW: 30,
    gearboxTemp: 32,
    generatorTemp: 28,
    transformerTemp: 35,
    hubExhaustTemp: 25,
    hydraulicPressure: 170,
    gearOilPressure: 2.7,
    coolantInletPressure: 1.1,
    coolantOutletPressure: 0.8,
    tempSwCabTower: 25,
    tempSwCabNacelle: 28,
    tempSwCabHub: 26,
  },
  {
    id: 10,
    turbineNo: 'T-10',
    status: 'running',
    time: '14:32:42',
    capacity: 2000,
    activePower: 1720,
    windSpeed: 8.0,
    breakProgramme: 'Released',
    operatingMode: 'Grid Connected',
    todayGeneration: 4055,
    totalProduction: 11650,
    totalOperatingHours: 14050,
    totalProductionHours: 12880,
    operationHoursToday: 11.0,
    currentL1: 1434,
    currentL2: 1430,
    currentL3: 1437,
    powerFrequency: 50.01,
    voltageL1: 690,
    voltageL2: 691,
    voltageL3: 690,
    apparentPower: 1811,
    reactivePower: 451,
    powerFactor: 0.95,
    rotorRpm: 13.5,
    gearSpeed: 235,
    generatorRpm: 1460,
    nacellePosition: 258,
    cableWinding: 152,
    windDirection: 255,
    relativeWindDirection: 3,
    pitchAngle: 3.8,
    pitchCylinder1: 137,
    pitchCylinder2: 140,
    pitchCylinder3: 138,
    towerOscillationX: 0.15,
    towerOscillationY: 0.1,
    outdoorTemp: 28,
    trfWindingTempU: 65,
    trfWindingTempV: 67,
    trfWindingTempW: 64,
    nacelleTemp: 37,
    coolCnvHeatExIn: 50,
    coolCnvHeatExOut: 31,
    coolTrfHeatExIn: 46,
    gearOilSumpTemp: 60,
    generatorWindingTempU: 79,
    generatorWindingTempV: 81,
    generatorWindingTempW: 78,
    gearboxTemp: 52,
    generatorTemp: 63,
    transformerTemp: 42,
    hubExhaustTemp: 38,
    hydraulicPressure: 183,
    gearOilPressure: 3.0,
    coolantInletPressure: 1.7,
    coolantOutletPressure: 1.2,
    tempSwCabTower: 31,
    tempSwCabNacelle: 36,
    tempSwCabHub: 33,
  },
];

// ─── Mock Feature Flags Data ───────────────────────────────────────────────────

export const MOCK_FEATURE_FLAGS: FeatureFlagData[] = [
  {
    id: 1,
    name: 'Enable Dark Mode',
    key: 'enable_dark_mode',
    description: 'Dark mode theme for the admin dashboard',
    environment: 'Development',
    status: 'Disabled',
    roles: ['Admin'],
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'AI Chatbot',
    key: 'ai_chatbot',
    description: 'Enable AI chatbot assistance for support',
    environment: 'Production',
    status: 'Enabled',
    roles: ['Admin', 'Consultant'],
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-03-15T14:30:00Z',
  },
  {
    id: 3,
    name: 'Export Reports',
    key: 'export_reports',
    description: 'Allow users to export reports in PDF, Excel, SVG formats',
    environment: 'Production',
    status: 'Enabled',
    roles: ['Admin'],
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2026-01-20T11:00:00Z',
    updatedAt: '2026-02-10T16:00:00Z',
  },
  {
    id: 4,
    name: 'Advanced Analytics',
    key: 'advanced_analytics',
    description: 'Show advanced charts and analytics on dashboard',
    environment: 'Development',
    status: 'Enabled',
    roles: ['Admin'],
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2026-02-15T08:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 5,
    name: 'Consultant Reports Access',
    key: 'consultant_reports',
    description: 'Allow consultants to view generation reports',
    environment: 'Production',
    status: 'Enabled',
    roles: ['Admin', 'Consultant'],
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2026-02-20T09:30:00Z',
    updatedAt: '2026-03-05T11:00:00Z',
  },
  {
    id: 6,
    name: 'Maintenance Notifications',
    key: 'maint_notifications',
    description: 'Send push notifications for scheduled maintenance',
    environment: 'Production',
    status: 'Enabled',
    roles: ['Admin'],
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-10T15:00:00Z',
  },
  {
    id: 7,
    name: 'Turbine Config Wizard',
    key: 'turbine_config_wizard',
    description: 'Step-by-step wizard for turbine configuration',
    environment: 'Development',
    status: 'Disabled',
    roles: ['Admin'],
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2026-03-10T14:00:00Z',
    updatedAt: '2026-03-10T14:00:00Z',
  },
  {
    id: 8,
    name: 'PDF Report Templates',
    key: 'pdf_templates',
    description: 'Custom PDF templates for reports',
    environment: 'Development',
    status: 'Disabled',
    roles: ['Admin'],
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2026-03-15T09:00:00Z',
    updatedAt: '2026-03-15T09:00:00Z',
  },
];

// ─── Mock Inventory Data ────────────────────────────────────────────────────────

export const CATEGORIES = ['Hydraulic', 'Mechanical', 'Electrical', 'Tools'];
export const LOCATIONS = ['Warehouse A', 'Warehouse B', 'Maintenance Bay', 'Storage Room'];
export const STATUSES = ['In Stock', 'Low Stock', 'Out of Stock', 'On Order'];

export const INVENTORY_DATA: InventoryItemData[] = [
  {
    id: 1,
    itemCode: 'HYD-BRK-001',
    category: 'Hydraulic',
    description: 'Hydraulic Brake Pads for WTG',
    specifications: 'High-performance brake pads rated for 5000 cycles',
    unitOfMeasure: 'SET',
    location: 'Warehouse A',
    supplier: 'Nordex Parts Co.',
    minimumStock: '20',
    openingQty: '50',
    currentQty: 45,
    status: 'In Stock',
    lastUpdated: '2026-05-10',
  },
  {
    id: 2,
    itemCode: 'MEC-GER-002',
    category: 'Mechanical',
    description: 'Main Gearbox Oil Filter',
    specifications: 'Original Nordex approved filter element',
    unitOfMeasure: 'PCS',
    location: 'Warehouse B',
    supplier: 'Nordex Parts Co.',
    minimumStock: '10',
    openingQty: '30',
    currentQty: 8,
    status: 'Low Stock',
    lastUpdated: '2026-05-09',
  },
  {
    id: 3,
    itemCode: 'ELC-YAW-003',
    category: 'Electrical',
    description: 'Yaw Motor Assembly',
    specifications: '3-phase induction yaw motor 15kW',
    unitOfMeasure: 'PCS',
    location: 'Maintenance Bay',
    supplier: 'ABB India',
    minimumStock: '5',
    openingQty: '8',
    currentQty: 6,
    status: 'In Stock',
    lastUpdated: '2026-05-08',
  },
  {
    id: 4,
    itemCode: 'TLS-BLT-004',
    category: 'Tools',
    description: 'Blade Inspection Kit',
    specifications: 'Complete inspection toolkit for WTG blades',
    unitOfMeasure: 'SET',
    location: 'Storage Room',
    supplier: 'WindTech Tools',
    minimumStock: '3',
    openingQty: '5',
    currentQty: 5,
    status: 'In Stock',
    lastUpdated: '2026-05-07',
  },
  {
    id: 5,
    itemCode: 'HYD-PMP-005',
    category: 'Hydraulic',
    description: 'Hydraulic Pump Assembly',
    specifications: 'Main hydraulic pump 45L/min 250bar',
    unitOfMeasure: 'PCS',
    location: 'Warehouse A',
    supplier: 'Bosch Rexroth',
    minimumStock: '4',
    openingQty: '6',
    currentQty: 2,
    status: 'Low Stock',
    lastUpdated: '2026-05-06',
  },
  {
    id: 6,
    itemCode: 'MEC-PIT-006',
    category: 'Mechanical',
    description: 'Pitch System Servo Motor',
    specifications: 'Servo motor for pitch system control',
    unitOfMeasure: 'PCS',
    location: 'Warehouse B',
    supplier: 'Siemens',
    minimumStock: '6',
    openingQty: '12',
    currentQty: 10,
    status: 'In Stock',
    lastUpdated: '2026-05-05',
  },
  {
    id: 7,
    itemCode: 'ELC-CON-007',
    category: 'Electrical',
    description: 'Main Converter IGBT Module',
    specifications: 'High-power IGBT module 1200V 600A',
    unitOfMeasure: 'PCS',
    location: 'Maintenance Bay',
    supplier: 'Infineon',
    minimumStock: '8',
    openingQty: '15',
    currentQty: 0,
    status: 'Out of Stock',
    lastUpdated: '2026-05-04',
  },
  {
    id: 8,
    itemCode: 'TLS-DGN-008',
    category: 'Tools',
    description: 'Diagnostic Tool for WTG',
    specifications: 'SCADA diagnostic interface tool',
    unitOfMeasure: 'PCS',
    location: 'Storage Room',
    supplier: 'Nordex Parts Co.',
    minimumStock: '2',
    openingQty: '3',
    currentQty: 3,
    status: 'In Stock',
    lastUpdated: '2026-05-03',
  },
  {
    id: 9,
    itemCode: 'HYD-CYL-009',
    category: 'Hydraulic',
    description: 'Pitch Cylinder Assembly',
    specifications: 'Hydraulic cylinder for pitch control',
    unitOfMeasure: 'PCS',
    location: 'Warehouse A',
    supplier: 'Parker Hannifin',
    minimumStock: '12',
    openingQty: '24',
    currentQty: 18,
    status: 'In Stock',
    lastUpdated: '2026-05-02',
  },
  {
    id: 10,
    itemCode: 'MEC-BRG-010',
    category: 'Mechanical',
    description: 'Generator Bearing Set',
    specifications: 'Generator DE/NDE bearing kit',
    unitOfMeasure: 'SET',
    location: 'Warehouse B',
    supplier: 'SKF',
    minimumStock: '6',
    openingQty: '14',
    currentQty: 4,
    status: 'Low Stock',
    lastUpdated: '2026-05-01',
  },
  {
    id: 11,
    itemCode: 'ELC-TRF-011',
    category: 'Electrical',
    description: 'Transformer Oil 180L',
    specifications: 'High voltage transformer insulating oil',
    unitOfMeasure: 'L',
    location: 'Maintenance Bay',
    supplier: 'Nynas',
    minimumStock: '200',
    openingQty: '400',
    currentQty: 180,
    status: 'Low Stock',
    lastUpdated: '2026-04-30',
  },
  {
    id: 12,
    itemCode: 'TLS-LUB-012',
    category: 'Tools',
    description: 'Gearbox Lubrication System',
    specifications: 'Automatic lubrication pump assembly',
    unitOfMeasure: 'SET',
    location: 'Storage Room',
    supplier: 'Lincoln',
    minimumStock: '3',
    openingQty: '6',
    currentQty: 5,
    status: 'In Stock',
    lastUpdated: '2026-04-29',
  },
];

// ─── Mock KPI Data ────────────────────────────────────────────────────────────

export const KPI_LABELS = [
  'Generation (kWh)',
  'Up Time (hh:mm)',
  'Unscheduled Down Time (hh:mm)',
  'Scheduled Down Time (hh:mm)',
  'Machine Availability (%)',
  'Average Wind Speed (m/s)',
  'Capacity Utilization Factor (CUF %)',
];

export const EMPTY_TURBINES = {
  t01: '-',
  t02: '-',
  t03: '-',
  t04: '-',
  t05: '-',
  t06: '-',
  t07: '-',
  t08: '-',
  t09: '-',
  t10: '-',
};

export const getMockKpiRows = (): KpiRowData[] =>
  KPI_LABELS.map((kpi, i) => ({
    id: i + 1,
    kpi,
    ...EMPTY_TURBINES,
    total: '-',
  }));

// ─── Mock Downtime Data ────────────────────────────────────────────────────────

export const getMockDowntimeRows = (): DowntimeRowData[] => [
  {
    id: 1,
    turbineNo: 'T-01',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Scheduled',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 2,
    turbineNo: 'T-02',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Unscheduled',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 3,
    turbineNo: 'T-03',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Grid Fault',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 4,
    turbineNo: 'T-04',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Scheduled',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 5,
    turbineNo: 'T-05',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Force Majeure',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 6,
    turbineNo: 'T-06',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Unscheduled',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 7,
    turbineNo: 'T-07',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Communication Loss',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 8,
    turbineNo: 'T-08',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Grid Fault',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 9,
    turbineNo: 'T-09',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Scheduled',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 10,
    turbineNo: 'T-10',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Unscheduled',
    faultStatus: '-',
    remarks: '-',
  },
];

// ─── Help & Support Mock Data ─────────────────────────────────────────────────

import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import dayjs from 'dayjs';

export const FAQ_DATA: FaqCategoryData[] = [
  {
    category: 'Getting Started',
    icon: '🚀',
    questions: [
      {
        q: 'How do I access the admin dashboard?',
        a: 'Navigate to the Dashboard from the sidebar menu. The dashboard provides an overview of all turbines, their status, power generation metrics, and real-time monitoring data.',
      },
      {
        q: 'What are the different user roles available?',
        a: 'The system supports Admin and Consultant roles. Admins have full access to all features including configuration, reports, and user management. Consultants have limited access based on enabled feature flags.',
      },
      {
        q: 'How do I configure turbine parameters?',
        a: 'Go to Turbine Config from the sidebar to view and modify turbine parameters. You can update operational thresholds, maintenance schedules, and monitoring configurations.',
      },
    ],
  },
  {
    category: 'Reports & Analytics',
    icon: '📊',
    questions: [
      {
        q: 'How do I generate a generation report?',
        a: 'Navigate to Generation Reports from the sidebar. Select your date range, filter by turbines, and click Generate Report. You can export reports in various formats.',
      },
      {
        q: 'What data is included in the incentive report?',
        a: 'Incentive reports include actual vs forecast energy generation, FER (Forecast Error Rate) percentages, and calculated incentives based on performance metrics.',
      },
      {
        q: 'Can I schedule automated reports?',
        a: 'Yes, you can set up scheduled report generation from the Reports page. Configure the frequency, recipients, and report format for automated delivery.',
      },
    ],
  },
  {
    category: 'Inventory Management',
    icon: '📦',
    questions: [
      {
        q: 'How do I track inventory items?',
        a: 'Use the Inventory Management section to add, update, and track parts and equipment. Each item can be tagged with categories, locations, and stock levels.',
      },
      {
        q: 'How do I set low-stock alerts?',
        a: 'Set threshold values for each inventory item. When stock falls below the threshold, you will receive notifications in the dashboard and via email.',
      },
    ],
  },
  {
    category: 'Technical Support',
    icon: '🔧',
    questions: [
      {
        q: 'How do I contact technical support?',
        a: 'You can reach our technical support team via email at support@infygen.in or call us during business hours. The Chat Bot is also available 24/7 for immediate assistance.',
      },
      {
        q: 'What information should I include in a support ticket?',
        a: 'Include the turbine ID, error code if any, steps to reproduce the issue, and screenshots if available. This helps our team resolve issues faster.',
      },
      {
        q: 'How long does it take to get a response?',
        a: 'Critical issues are addressed within 2 hours. Standard support requests are typically resolved within 24 business hours.',
      },
    ],
  },
];

export const QUICK_LINKS: QuickLinkData[] = [
  {
    icon: <DescriptionIcon />,
    title: 'Documentation',
    description: 'Comprehensive guides and API references',
    color: '#4f46e5',
    bgColor: 'rgba(79,70,229,0.08)',
  },
  {
    icon: <VideoLibraryIcon />,
    title: 'Video Tutorials',
    description: 'Step-by-step setup and feature walkthroughs',
    color: '#0891b2',
    bgColor: 'rgba(8,145,178,0.08)',
  },
  {
    icon: <ConfirmationNumberIcon />,
    title: 'Submit Ticket',
    description: 'Create a support ticket for specific issues',
    color: '#059669',
    bgColor: 'rgba(5,150,105,0.08)',
  },
  {
    icon: <LiveHelpIcon />,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    color: '#d97706',
    bgColor: 'rgba(217,119,6,0.08)',
  },
];

export const CHAT_SUGGESTIONS = [
  { icon: '💡', text: 'Show turbine status' },
  { icon: '⚡', text: 'How to improve power output?' },
  { icon: '📅', text: 'Maintenance schedule for this week' },
  { icon: '🔧', text: 'Common turbine issues and solutions' },
];

// ─── Report Types ─────────────────────────────────────────────────────────────

export const REPORT_TYPES = [
  'Daily Generation Report',
  'Weekly Generation Report',
  'Monthly Generation Report',
  'Temperature Alerts',
  'Time Series',
  'Multi-Time Analysis (Time Series)',
  'Multi-Scatter 2×2 Pairwise',
  'Heat Map',
  'Day-Wise Maximum',
  'Day-Wise Average',
  'Power Curve',
  'Wind Rose',
  'Generation',
  'Status Timeline',
  'Event Log',
  'Downtime Analysis (MTBF & MTTR)',
  'Machine Availability',
  'Trace Files',
];

// ─── Date Constants ─────────────────────────────────────────────────────────────

export const MIN_DATE = dayjs('2026-01-01');
export const MAX_DATE = dayjs().startOf('day');

// ─── Turbine List ───────────────────────────────────────────────────────────────

export const TURBINE_LIST = [
  'T-01',
  'T-02',
  'T-03',
  'T-04',
  'T-05',
  'T-06',
  'T-07',
  'T-08',
  'T-09',
  'T-10',
];

export const TURBINE_IDS = [
  't01',
  't02',
  't03',
  't04',
  't05',
  't06',
  't07',
  't08',
  't09',
  't10',
] as const;

export const SELECT_ALL_KEY = '__select_all__';

export const DOC_TYPES = [
  { value: 'pdf' as const, label: 'PDF' },
  { value: 'xlsx' as const, label: 'Excel (XLSX)' },
  { value: 'svg' as const, label: 'SVG' },
  { value: 'whatsapp' as const, label: 'WhatsApp' },
];

// ─── Color Constants ───────────────────────────────────────────────────────────

export const TURBINE_COLORS = [
  '#6366f1',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#f97316',
  '#0d9488',
  '#3b82f6',
  '#ec4899',
];

export const DOWNTIME_COLORS = {
  Scheduled: { bg: 'rgba(16,185,129,0.1)', color: '#059669', border: 'rgba(16,185,129,0.35)' },
  Unscheduled: { bg: 'rgba(239,68,68,0.1)', color: '#dc2626', border: 'rgba(239,68,68,0.35)' },
  'Force Majeure': {
    bg: 'rgba(245,158,11,0.1)',
    color: '#d97706',
    border: 'rgba(245,158,11,0.35)',
  },
  'Grid Fault': { bg: 'rgba(14,165,233,0.1)', color: '#0284c7', border: 'rgba(14,165,233,0.35)' },
  'Communication Loss': {
    bg: 'rgba(124,58,237,0.1)',
    color: '#7c3aed',
    border: 'rgba(124,58,237,0.35)',
  },
};

// ─── Helper Functions ──────────────────────────────────────────────────────────

export const getTurbineById = (id: number): TurbineData | undefined => {
  return MOCK_TURBINE_DATA.find((t) => t.id === id);
};

export const getTurbineByNo = (turbineNo: string): TurbineData | undefined => {
  return MOCK_TURBINE_DATA.find((t) => t.turbineNo === turbineNo);
};

// ─── Use Mock Data Hook (for easy API replacement) ────────────────────────────

/**
 * Hook to use mock turbine data with simulated updates
 * Replace with actual API hook when ready:
 *
 * import { useGetTurbinesQuery } from '@infygen/services';
 * const { data: turbineData = [], isLoading } = useGetTurbinesQuery();
 */
export const useMockTurbineData = () => {
  const [turbineData, setTurbineData] = useState<TurbineData[]>(MOCK_TURBINE_DATA);

  useEffect(() => {
    const id = setInterval(() => {
      setTurbineData((prev) =>
        prev.map((t) => {
          if (t.status === 'running') {
            return {
              ...t,
              time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
              activePower: Math.max(0, t.activePower + (Math.random() - 0.5) * 100),
              windSpeed: Math.max(3, Math.min(25, t.windSpeed + (Math.random() - 0.5) * 0.5)),
              todayGeneration: t.todayGeneration + t.activePower / 3600,
            };
          }
          return { ...t, time: new Date().toLocaleTimeString('en-GB', { hour12: false }) };
        }),
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return { data: turbineData, isLoading: false, isError: false };
};

/**
 * Hook to use mock feature flags
 * Replace with actual API hook when ready:
 *
 * import { useGetFeatureFlagsQuery } from '@infygen/services';
 * const { data: flags = [] } = useGetFeatureFlagsQuery();
 */
export const useMockFeatureFlags = () => {
  const [flags, setFlags] = useState<FeatureFlagData[]>(MOCK_FEATURE_FLAGS);

  return { data: flags, isLoading: false, isError: false };
};

/**
 * Hook to use mock inventory data
 * Replace with actual API hook when ready:
 *
 * import { useGetInventoryQuery } from '@infygen/services';
 * const { data: inventory = [] } = useGetInventoryQuery();
 */
export const useMockInventoryData = () => {
  return { data: INVENTORY_DATA, isLoading: false, isError: false };
};
