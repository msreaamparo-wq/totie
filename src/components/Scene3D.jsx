import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
const M = ({ c, ...p }) => <meshStandardMaterial color={c} roughness={0.55} {...p} />;
function Bob({ children, amp = 0.1, speed = 1, spin = 0, position = [0, 0, 0], ...p }) {
  const r = useRef();
  useFrame(({ clock }) => { const t = clock.elapsedTime * speed; r.current.position.y = position[1] + Math.sin(t) * amp; if (spin) r.current.rotation.y = t * spin; });
  return <group ref={r} position={position} {...p}>{children}</group>;
}
function Cake() {
  return (
    <Bob speed={0.8} spin={0.35} amp={0.06}>
      <mesh><cylinderGeometry args={[1.2, 1.2, 0.6, 48]} /><M c="#ffffff" /></mesh>
      <mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.85, 0.85, 0.5, 48]} /><M c="#9ec9f2" /></mesh>
      <mesh position={[0, 1.02, 0]}><cylinderGeometry args={[0.5, 0.5, 0.45, 48]} /><M c="#fff3cf" /></mesh>
      <mesh position={[0, 1.55, 0]}><cylinderGeometry args={[0.05, 0.05, 0.45, 16]} /><M c="#c9a227" metalness={0.6} /></mesh>
      <mesh position={[0, 1.88, 0]}><sphereGeometry args={[0.09, 16, 16]} /><M c="#ffd24d" emissive="#ffb800" emissiveIntensity={1.2} /></mesh>
    </Bob>
  );
}
function Bear(props) {
  return (
    <Bob speed={1.2} amp={0.08} {...props}>
      <mesh><sphereGeometry args={[0.55, 32, 32]} /><M c="#d9b38c" /></mesh>
      <mesh position={[0, 0.85, 0]}><sphereGeometry args={[0.42, 32, 32]} /><M c="#d9b38c" /></mesh>
      {[-0.32, 0.32].map((x) => <mesh key={x} position={[x, 1.2, 0]}><sphereGeometry args={[0.15, 16, 16]} /><M c="#d9b38c" /></mesh>)}
      <mesh position={[0, 0.78, 0.36]}><sphereGeometry args={[0.17, 16, 16]} /><M c="#f3dcc2" /></mesh>
      {[-0.14, 0.14].map((x) => <mesh key={x} position={[x, 0.93, 0.36]}><sphereGeometry args={[0.04, 12, 12]} /><M c="#24415f" /></mesh>)}
      <mesh position={[0, 0.08, 0.5]}><sphereGeometry args={[0.1, 16, 16]} /><M c="#9ec9f2" /></mesh>
    </Bob>
  );
}
function Balloon({ color, ...p }) {
  return (
    <Bob amp={0.15} speed={0.9} {...p}>
      <mesh scale={[1, 1.2, 1]}><sphereGeometry args={[0.34, 32, 32]} /><M c={color} roughness={0.25} /></mesh>
      <mesh position={[0, -0.9, 0]}><cylinderGeometry args={[0.008, 0.008, 0.9, 6]} /><M c="#ffffff" /></mesh>
    </Bob>
  );
}
function Star(p) { return <Bob amp={0.12} speed={1.6} spin={1.2} {...p}><mesh><octahedronGeometry args={[0.13]} /><M c="#ffd24d" emissive="#ffb800" emissiveIntensity={0.7} /></mesh></Bob>; }

class Boundary extends React.Component {
  state = { bad: false };
  static getDerivedStateFromError() { return { bad: true }; }
  render() { return this.state.bad ? this.props.fallback : this.props.children; }
}
const hasGL = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } };

export default function Scene3D({ mode = 'hero', className = '' }) {
  const fallback = <div className={`grid place-items-center text-7xl ${className}`} role="img" aria-label="Birthday cake">🎂🧸🎈</div>;
  if (!hasGL()) return fallback;
  const hero = mode === 'hero';
  return (
    <Boundary fallback={fallback}>
      <div className={className} aria-hidden="true">
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 1.2, hero ? 6.2 : 5], fov: 40 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 5, 4]} intensity={1.6} />
          <pointLight position={[-3, 2, 2]} intensity={0.8} color="#ffe6a8" />
          <Cake />
          {hero && <>
            <Bear position={[-2.3, -0.4, 0]} scale={0.9} />
            <Balloon color="#9ec9f2" position={[2.2, 1.4, 0]} />
            <Balloon color="#fde9a2" position={[2.9, 0.8, -0.8]} speed={1.2} />
            <Balloon color="#ffffff" position={[-2.9, 1.9, -0.6]} />
            <Star position={[1.6, 2.4, 0]} /><Star position={[-1.4, 2.5, 0]} /><Star position={[0.3, 2.9, -1]} />
          </>}
        </Canvas>
      </div>
    </Boundary>
  );
}
