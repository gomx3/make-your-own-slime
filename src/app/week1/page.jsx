import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const ShaderScene = () => {
    const containerRef = useRef(null)
    const rendererRef = useRef(null)
    const uniformsRef = useRef(null)
    const clockRef = useRef(new THREE.Clock())

    useEffect(() => {
        const container = containerRef.current
        const camera = new THREE.Camera()
        camera.position.z = 1

        const scene = new THREE.Scene()
        const geometry = new THREE.PlaneGeometry(2, 2)

        uniformsRef.current = {
            u_time: { value: 1.0 },
            u_resolution: { value: new THREE.Vector2() },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        }

        const material = new THREE.ShaderMaterial({
            uniforms: uniformsRef.current,
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                #ifdef GL_ES
                precision mediump float;
                #endif

                uniform vec2 u_resolution;
                uniform vec2 u_mouse;
                uniform float u_time;

                // 랜덤 함수
                float random(vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
                }

                void main() {
                    vec2 st = gl_FragCoord.xy / u_resolution.xy;

                    // 마우스 위치에 따라 노이즈 크기 조절
                    float mouseDist = distance(st, u_mouse);
                    float noiseScale = smoothstep(0.0, 1.0, mouseDist * 3.0);

                    // 노이즈 생성 시 마우스 위치와 스케일 반영
                    vec2 noisePos = st * noiseScale * 10.0; // 크기 조절을 위한 10.0 배율
                    float rnd = random(noisePos + u_time * 0.1);

                    // 노이즈 세기에 따라 색상 변화
                    vec3 color = vec3(rnd * noiseScale, rnd * (1.0 - noiseScale), rnd);

                    gl_FragColor = vec4(color, 1.0);
                }
            `,
        })

        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        rendererRef.current = new THREE.WebGLRenderer()
        rendererRef.current.setPixelRatio(window.devicePixelRatio)
        container.appendChild(rendererRef.current.domElement)

        const onWindowResize = () => {
            rendererRef.current.setSize(window.innerWidth, window.innerHeight)
            uniformsRef.current.u_resolution.value.set(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', onWindowResize)
        onWindowResize()

        // 🖱️ 마우스 좌표 업데이트 (0 ~ 1 범위)
        const onMouseMove = (e) => {
            uniformsRef.current.u_mouse.value.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
        }

        window.addEventListener('mousemove', onMouseMove)

        const animate = () => {
            uniformsRef.current.u_time.value += clockRef.current.getDelta()
            rendererRef.current.render(scene, camera)
            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', onWindowResize)
            window.removeEventListener('mousemove', onMouseMove)
            container.removeChild(rendererRef.current.domElement)
            rendererRef.current.dispose()
        }
    }, [])

    return <div ref={containerRef} />
}

export default function Week1() {
    return (
        <>
            <div>week1 page</div>
            <ShaderScene className="relative" />
            <h1 className="absolute z-1000 top-80 left-20 text-3xl">text</h1>
        </>
    )
}
