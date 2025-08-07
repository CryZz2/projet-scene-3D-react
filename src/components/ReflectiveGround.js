import { useRef } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'
import { useReflectControls } from './Leva'

function ReflectiveGround() {
    const ref = useRef()

    // 🔗 Contrôles via Leva
    const { blurX, blurY, mixStrength, roughness, mirror, depthScale } = useReflectControls()

    return (
        <mesh
            ref={ref}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
        >
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
                blur={[blurX, blurY]}
                mixStrength={mixStrength}
                roughness={roughness}
                mirror={mirror}
                depthScale={depthScale}
                minDepthThreshold={0.2}
                maxDepthThreshold={1.2}
                color="#334" // couleur uniforme
                metalness={0.5}
            />
        </mesh>
    )
}

export default ReflectiveGround
