import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import { Model } from './components/Model'
import { AnimatedModel } from './components/AnimatedModel'
import Leva from './components/Leva'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { MeshReflectorMaterial } from '@react-three/drei'
import ReflectiveGround from './components/ReflectiveGround'

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
        {/* <Model path="/models/tree.glb" position={[-4, 0, 0]} scale={[0.5, 0.5, 0.5]} /> */}
        <Model path="/models/graveyard_angel_statue.glb" position={[5, 0, 0]} scale={[0.3, 0.3, 0.3]} />
        <Model path="/models/rock.glb" position={[-5, 0, 0]} scale={[0.3, 0.3, 0.3]} />
        <Model path="/models/house.glb" position={[4, 6, 30]} scale={[0.8, 0.8, 0.8]} />

        {/* Modèle animé */}
        <AnimatedModel path="/models/t-rex-2.glb" position={[0, 0, -4]} scale={[1, 1, 1]} />

        {/* Effets postprocessing bloom */}
        <EffectComposer>
          <Bloom
            intensity={30}      // force de l'effet
            luminanceThreshold={0.3} // seuil de déclenchement
            luminanceSmoothing={0.9} // adoucissement
          />
          {/* <Noise
            opacity={0.05} // contrôle la visibilité du grain
          /> */}
          <Vignette
            eskil={false}         // true = mode "cinéma suédois", false = classique
            offset={0.3}          // taille de la zone centrale non sombre
            darkness={1}        // force du vignettage
          />
        </EffectComposer>

        {/* Contrôle caméra */}
        <OrbitControls />
        <ReflectiveGround />
        <Leva />
      </Canvas>
    </div>
  )
}
<Leva collapsed={false} />

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        blur={[500, 100]}           // Augmente le flou
        mixBlur={1}                 // Mélange le flou avec la rugosité
        mixStrength={5}             // Moins intense (évite les reflets trop brillants)
        roughness={1}               // Surface très mate
        depthScale={0.5}            // Ajoute un peu de variation de profondeur
        minDepthThreshold={0.2}
        maxDepthThreshold={1.2}
        color="#333"                // Couleur sombre pour refléter subtilement
        metalness={0.1}
        mirror={0.5}                // Mélange couleur + environnement
      />
    </mesh>
  )
}

export default App
