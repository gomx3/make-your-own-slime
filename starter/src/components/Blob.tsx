import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'

export default function Blob() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    return (
        <div id="blob">
            {/* 내부에 3D 씬을 구성 */}
            <Canvas ref={canvasRef}>
                {/* <perspectiveCamera fov={45} aspect={window.innerWidth / window.innerHeight} near={0.1} far={1000} position={[0, 0, 5]} /> */}
                {/* 
                    fov: 시야각 (field of view) (도)
                    aspect: 가로 세로 비율. 주로 window.innerWidth / window.innerHeight
                    near, far: 카메라가 렌더링할 수 있는 거리 범위
                    position: 카메라 위치 [x, y, z]
                */}
                <PerspectiveCamera
                    makeDefault
                    fov={45}
                    aspect={window.innerWidth / window.innerHeight}
                    near={0.1}
                    far={1000}
                    position={[0, 0, 5]}
                />
                {/* directionalLight: 방향성 조명. 태양처럼 한 방향에서 빛을 비추며 그림자 생성
                    ambientLight: 전반적으로 은은한 조명. 모든 물체에 균일하게 영향 */}
                <directionalLight color="#fff" intensity={0.7} castShadow={true} position={[0, 500, 200]} />
                <directionalLight color="#fff" intensity={0.25} castShadow={true} position={[0, -500, 400]} />
                <ambientLight color="#bfbfbf" />

                {/* 실제 3D 오브젝트(mesh)를 그리는 역할
                    canvasRef를 props로 넘기면 내부에서 canvas에 접근하거나 Three.js 관련 처리 가능 */}
                {/* <MeshComponent {...{ canvasRef }} /> */}
            </Canvas>
        </div>
    )
}
