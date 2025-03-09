import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const RobertShaderScene = () => {
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

                float rect(in vec2 st, in vec2 size){
                    size = 0.25 - size * 0.25;
                    vec2 uv = smoothstep(size, size + size * vec2(0.002), st * (1.0 - st));
                    return uv.x * uv.y;
                }

                void main() {
                    vec2 st = gl_FragCoord.xy / u_resolution.xy;

                    vec3 influenced_color = vec3(0.745,0.678,0.539);

                    vec3 influencing_color_A = vec3(0.653,0.918,0.985); 
                    vec3 influencing_color_B = vec3(0.980,0.576,0.113);

                    vec3 color = mix(influencing_color_A,
                                    influencing_color_B,
                                    step(.5, st.x));

                    color = mix(color,
                                influenced_color,
                                rect(abs((st - vec2(.5, .0)) * vec2(2., 1.)), vec2(.05, .125)));

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

export default RobertShaderScene
