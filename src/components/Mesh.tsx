import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Mesh } from 'three'
import { createNoise3D } from 'simplex-noise'
import { useAtomValue } from 'jotai'
import { colorAtom, processAtom, speedAtom, spikeAtom } from '../atoms/slider-atom'
import { Physics, useSphere } from '@react-three/cannon'

const MeshComponent = () => {
    return (
        <Physics gravity={[0, 0, 0]} iterations={10}>
            <Pointer />
            <Clump />
        </Physics>
    )
}

function Clump() {
    const ref = useRef<Mesh>(null)
    const noise3D = useMemo(() => createNoise3D(), [])

    const speedValue = useAtomValue(speedAtom)
    const spikeValue = useAtomValue(spikeAtom)
    const processValue = useAtomValue(processAtom)
    const colorValue = useAtomValue(colorAtom)

    useFrame((state) => {
        const { viewport, pointer } = state

        const time = performance.now() * 0.00001 * speedValue * Math.pow(processValue, 3)
        const spikes = spikeValue * processValue

        const mouseX = (pointer.x * viewport.width) / 2
        const mouseY = (pointer.y * viewport.height) / 2

        if (!ref.current) return

        ref.current.rotation.x = mouseX * 0.3
        ref.current.rotation.y = mouseY * 0.3

        const positions = ref.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < positions.length; i += 3) {
            const vertex = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])

            vertex
                .normalize()
                .multiplyScalar(1 + 0.3 * noise3D(vertex.x * spikes, vertex.y * spikes, vertex.z * spikes + time))

            positions[i] = vertex.x
            positions[i + 1] = vertex.y
            positions[i + 2] = vertex.z
        }

        ref.current.geometry.attributes.position.needsUpdate = true
        ref.current?.geometry.computeVertexNormals()
    })

    return (
        <mesh ref={ref} scale={1.2}>
            <sphereGeometry args={[0.8, 128, 128]} />
            <meshPhongMaterial color={colorValue} shininess={700} />
        </mesh>
    )
}

function Pointer() {
    const viewport = useThree((state) => state.viewport)
    const [ref, api] = useSphere(() => ({ type: 'Kinematic', args: [3], position: [0, 0, 0] }))

    useFrame((state) =>
        api.position.set((state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 0)
    )
    return (
        <mesh ref={ref}>
            <meshBasicMaterial toneMapped={false} />
        </mesh>
    )
}

export default MeshComponent
