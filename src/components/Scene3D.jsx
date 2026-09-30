"use client";
import {useRef,useMemo} from "react";import {Canvas,useFrame} from "@react-three/fiber";
import {MeshDistortMaterial,Float,Environment} from "@react-three/drei";
function Orb({low}){
const g=useRef(),m=useRef();
useFrame(({pointer,clock},dt)=>{const t=clock.elapsedTime;
// ease group rotation toward the pointer for parallax; scale "breathes" slowly
g.current.rotation.y+=(pointer.x*.6-g.current.rotation.y)*.04+dt*.1;
g.current.rotation.x+=(-pointer.y*.4-g.current.rotation.x)*.04;
g.current.scale.setScalar(1+Math.sin(t*.8)*.03)});
return <group ref={g}><Float speed={1.4} floatIntensity={1.2}>
<mesh><icosahedronGeometry args={[1.5,low?24:64]}/>
<MeshDistortMaterial ref={m} color="#0a0a0a" metalness={1} roughness={.18} distort={.45} speed={1.3} emissive="#00FF85" emissiveIntensity={.05}/></mesh></Float></group>}
function Dust({n}){
const ref=useRef();const pos=useMemo(()=>{const a=new Float32Array(n*3);for(let i=0;i<n*3;i++)a[i]=(Math.random()-.5)*9;return a},[n]);
useFrame((_,dt)=>{ref.current.rotation.y+=dt*.02});
return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" array={pos} count={n} itemSize={3}/></bufferGeometry>
<pointsMaterial size={.015} color="#8fffc8" transparent opacity={.6} sizeAttenuation/></points>}
export default function Scene3D(){
const low=typeof window!=="undefined"&&innerWidth<768;
return <Canvas dpr={low?1:[1,1.75]} camera={{position:[0,0,5],fov:42}} gl={{antialias:!low,powerPreference:"high-performance"}}>
<fog attach="fog" args={["#050505",5,11]}/><ambientLight intensity={.15}/>
<directionalLight position={[3,4,3]} intensity={2.2}/><pointLight position={[-4,-1,-2]} intensity={6} color="#00FF85" distance={9}/>
<spotLight position={[0,3,-4]} intensity={8} angle={.6} penumbra={1}/>
<Environment preset="night"/><Orb low={low}/><Dust n={low?150:500}/></Canvas>}
