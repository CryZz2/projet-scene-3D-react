import { useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function AnimatedModel({ path, position = [0, 0, 0], scale = [1, 1, 1] }) {
    const { scene, animations } = useGLTF(path)
    const { actions } = useAnimations(animations, scene)
    const [played, setPlayed] = useState(false)

    const handleClick = () => {
        if (!played && actions) {
            const firstAction = Object.values(actions)[0]
            if (firstAction) {
                firstAction.reset().fadeIn(0.3).play()
                setPlayed(true)
            }
        }
    }

    return (
        <primitive
            object={scene}
            position={position}
            scale={scale}
            onClick={handleClick}
            castShadow
            receiveShadow
        />
    )
}

