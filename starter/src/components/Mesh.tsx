import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { createNoise3D } from 'simplex-noise'
import { useAtomValue } from 'jotai'
import { colorAtom, processAtom, speedAtom, spikeAtom } from '../atoms/slider-atom'

const MeshComponent = () => {
    const ref = useRef<Mesh>(null)
    const noise3D = createNoise3D()

    const speedValue = useAtomValue(speedAtom)
    const spikeValue = useAtomValue(spikeAtom)
    const processValue = useAtomValue(processAtom)
    const colorValue = useAtomValue(colorAtom)

    useFrame(() => {
        const time = performance.now() * 0.00001 * speedValue * Math.pow(processValue, 3)
        const spikes = spikeValue * processValue

        if (!ref.current) return
        const positions = ref.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < positions.length; i += 3) {
            const vector = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])

            vector
                .normalize()
                .multiplyScalar(1 + 0.3 * noise3D(vector.x * spikes, vector.y * spikes, vector.z * spikes + time))

            positions[i] = vector.x
            positions[i + 1] = vector.y
            positions[i + 2] = vector.z
        }

        ref.current.geometry.attributes.position.needsUpdate = true
        ref.current?.geometry.computeVertexNormals()
    })

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.8, 128, 128]} />
            <meshPhongMaterial color={colorValue} shininess={700} />
        </mesh>
    )
}

export default MeshComponent
