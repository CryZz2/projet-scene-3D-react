import React, { useRef } from "react";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import { Model } from './components/Model'
import { AnimatedModel } from './components/AnimatedModel'
import { useTexture } from '@react-three/drei'


function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        {/* Lumières */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* Sol texturé */}
        <Ground />

        {/* Sol */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#888" />
        </mesh>

        {/* Modèles statiques */}
        <Model path="/models/tree.glb" position={[-4, 0, 0]} scale={[0.5, 0.5, 0.5]} />
        <Model path="/models/rock.glb" position={[0, 0, 0]} scale={[0.3, 0.3, 0.3]} />
        <Model path="/models/house.glb" position={[4, 7.50, 30]} scale={[0.8, 0.8, 0.8]} />

        {/* Modèle animé */}
        <AnimatedModel path="/models/t-rex-2.glb" position={[0, 0, -4]} scale={[1, 1, 1]} />

        {/* Contrôle caméra */}
        <OrbitControls />
      </Canvas>
    </div>
  )
}

function Ground() {
  const texture = useTexture('/textures/grass.jpg')

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default App
