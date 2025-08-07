import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export function useReflectControls() {
    return useControls('Reflet', {
        blurX: { value: 800, min: 0, max: 2000, step: 10 },
        blurY: { value: 100, min: 0, max: 1000, step: 10 },
        mixStrength: { value: 5, min: 0, max: 20, step: 0.1 },
        roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
        mirror: { value: 0.7, min: 0, max: 1, step: 0.01 },
        depthScale: { value: 0.3, min: 0, max: 2, step: 0.01 }
    })
}

function Controller() {
    const { camera, scene } = useThree()

    // Caméra
    const { position, zoom } = useControls('Camera', {
        position: { value: { x: 0, y: 0, z: 20 }, step: 0.1 },
        zoom: { value: 1, min: 0.1, max: 10, step: 0.1 }
    })

    // Lumière
    const {
        ambientIntensity,
        pointIntensity,
        lightColor,
        pointLightPosition
    } = useControls('Lighting', {
        ambientIntensity: { value: 2, min: 0, max: 2, step: 0.1 },
        pointIntensity: { value: 2, min: 0, max: 2, step: 0.1 },
        lightColor: '#ffffff',
        pointLightPosition: { value: [1, 0, 0], step: 0.1 }
    })

    useEffect(() => {
        camera.position.set(position.x, position.y, position.z)
        camera.zoom = zoom
        camera.updateProjectionMatrix()
    }, [camera, position, zoom])

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isAmbientLight) {
                child.intensity = ambientIntensity
                child.color.set(lightColor)
            } else if (child.isPointLight) {
                child.intensity = pointIntensity
                child.color.set(lightColor)
                child.position.set(...pointLightPosition)
            }
        })
    }, [scene, ambientIntensity, pointIntensity, lightColor, pointLightPosition])

    return null
}

export default Controller
