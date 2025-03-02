import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const ShaderScene = () => {
    const containerRef = useRef(null)
    const rendererRef = useRef(null)
    const uniformsRef = useRef(null)
    const clockRef = useRef(new THREE.Clock())

    useEffect(() => {
        // init
        const container = containerRef.current
        const camera = new THREE.Camera()
        camera.position.z = 1

        const scene = new THREE.Scene()
        const geometry = new THREE.PlaneGeometry(2, 2)

        uniformsRef.current = {
            u_time: { value: 1.0 },
            u_mouse: { value: new THREE.Vector2() },
            u_resolution: { value: new THREE.Vector2() },
        }

        const material = new THREE.ShaderMaterial({
            uniforms: uniformsRef.current,
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec2 u_resolution;
                uniform vec2 u_mouse;
                uniform float u_time;

                void main() {
                    vec2 st = gl_FragCoord.xy / u_resolution.xy;

                    gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
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

        const onMouseMove = (e) => {
            uniformsRef.current.u_mouse.value.set(e.clientX, window.innerHeight - e.clientY)
        }

        window.addEventListener('resize', onWindowResize)
        window.addEventListener('mousemove', onMouseMove)
        onWindowResize()

        const animate = () => {
            requestAnimationFrame(animate)
            uniformsRef.current.u_time.value += clockRef.current.getDelta()
            rendererRef.current.render(scene, camera)
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

export default function Base() {
    return <ShaderScene />
}
