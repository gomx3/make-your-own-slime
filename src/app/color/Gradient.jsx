import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const GradientScene = () => {
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
                #ifdef GL_ES
                precision mediump float;
                #endif

                #define PI 3.14159265359

                uniform vec2 u_resolution;
                uniform vec2 u_mouse;
                uniform float u_time;

                vec3 sunriseColor = vec3(0.149, 0.141, 0.912); // Night sky (deep blue)
                vec3 noonColor = vec3(0.529, 0.808, 0.980); // Day sky (sky blue)
                vec3 sunsetColor = vec3(1.000, 0.424, 0.224); // Sunset (orange)
                vec3 nightColor = vec3(0.027, 0.027, 0.188); // Deep night (dark blue)

                void main() {
                    vec2 st = gl_FragCoord.xy / u_resolution.xy;
                    vec3 color = vec3(0.0);

                    // Calculate the animation progress as a smooth cycle over a 20-second period
                    float cycle = mod(u_time / 20.0, 1.0);
                    float gradient = st.y;

                    // Map the cycle to the day-night transition with gradient
                    vec3 blendColor;
                    if (cycle < 0.25) {
                        // Sunrise transition
                        blendColor = mix(nightColor, sunriseColor, smoothstep(0.0, 0.25, cycle));
                    } else if (cycle < 0.5) {
                        // Day transition
                        blendColor = mix(sunriseColor, noonColor, smoothstep(0.25, 0.5, cycle));
                    } else if (cycle < 0.75) {
                        // Sunset transition
                        blendColor = mix(noonColor, sunsetColor, smoothstep(0.5, 0.75, cycle));
                    } else {
                        // Night transition
                        blendColor = mix(sunsetColor, nightColor, smoothstep(0.75, 1.0, cycle));
                    }

                    // Apply a vertical gradient
                    color = mix(nightColor, blendColor, gradient);

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

export default GradientScene
