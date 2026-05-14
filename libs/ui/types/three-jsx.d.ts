import 'react';
import { Object3D, BufferGeometry, Material, Color } from 'three';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: {
        ref?: React.RefObject<THREE.Group<THREE.Object3DEventMap> | null>;
        position?: [number, number, number];
        rotation?: [number, number, number];
        scale?: [number, number, number];
        onClick?: (event: any) => void;
        onPointerOver?: () => void;
        onPointerOut?: () => void;
        children?: React.ReactNode;
      };
      mesh: {
        position?: [number, number, number];
        rotation?: [number, number, number];
        scale?: [number, number, number];
        onClick?: (event: any) => void;
        onPointerOver?: () => void;
        onPointerOut?: () => void;
        children?: React.ReactNode;
        key?: React.Key;
      };
      primitive: {
        object: Object3D;
        position?: [number, number, number];
        rotation?: [number, number, number];
        scale?: [number, number, number];
      };
      bufferGeometry: {
        children?: React.ReactNode;
      };
      // Geometry primitives
      boxGeometry: { args?: [number, number, number, number?, number?, number?] };
      sphereGeometry: { args?: [number, number, number] };
      cylinderGeometry: { args?: [number, number, number, number?] };
      coneGeometry: { args?: [number, number, number, number?] };
      planeGeometry: { args?: [number, number, number?, number?] };
      torusGeometry: { args?: [number, number, number, number?] };
      capsuleGeometry: { args?: [number, number, number, number?] };
      ringGeometry: { args?: [number, number, number, number?] };
      // Material primitives
      meshStandardMaterial: {
        color?: string | number | Color;
        metalness?: number;
        roughness?: number;
        emissive?: string | number | Color;
        emissiveIntensity?: number;
        transparent?: boolean;
        opacity?: number;
        wireframe?: boolean;
        side?: number;
      };
      meshBasicMaterial: {
        color?: string | number | Color;
        transparent?: boolean;
        opacity?: number;
        wireframe?: boolean;
        side?: number;
      };
      meshPhongMaterial: {
        color?: string | number | Color;
        specular?: string | number | Color;
        shininess?: number;
        transparent?: boolean;
        opacity?: number;
      };
      pointsMaterial: {
        color?: string | number | Color;
        size?: number;
        transparent?: boolean;
        opacity?: number;
        sizeAttenuation?: boolean;
      };
      lineBasicMaterial: {
        color?: string | number | Color;
        transparent?: boolean;
        opacity?: number;
      };
      // Lights
      ambientLight: { intensity?: number; color?: string };
      directionalLight: {
        position?: [number, number, number];
        intensity?: number;
        color?: string;
        castShadow?: boolean;
      };
      pointLight: {
        position?: [number, number, number];
        intensity?: number;
        color?: string;
        distance?: number;
        decay?: number;
      };
      spotLight: {
        position?: [number, number, number];
        intensity?: number;
        angle?: number;
        penumbra?: number;
        color?: string;
      };
      // Helpers
      gridHelper: { args?: [number, number, string, string]; position?: [number, number, number] };
      axesHelper: { args?: [number] };
      fog: { attach?: string; args?: [string | number, number, number] };
      stars: {
        radius?: number;
        depth?: number;
        count?: number;
        factor?: number;
        saturation?: number;
        fade?: boolean;
        speed?: number;
      };
      // Points
      points: {
        ref?: React.RefObject<any>;
        position?: [number, number, number];
        children?: React.ReactNode;
      };
      bufferAttribute: {
        attach?: string;
        count?: number;
        array?: Float32Array | Uint16Array;
        itemSize?: number;
      };
    }
  }
}

export {};
