import React, { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'

const frequencies = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25]
const noteNames = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']

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
            u_mouse: { value: new THREE.Vector2() },
            u_resolution: { value: new THREE.Vector2() },
        }

        const material = new THREE.ShaderMaterial({
            uniforms: uniformsRef.current,
            vertexShader: `
                void main() {
                    gl_Position = vec4( position, 1.0 );
                }
            `,
            fragmentShader: `
                uniform vec2 u_resolution;
                uniform vec2 u_mouse;
                uniform float u_time;

                // Plot a line on Y using a value between 0.0 - 1.0
                float plot(vec2 st) {    
                    return smoothstep(0.02, 0.0, abs(st.y - st.x));
                }

                void main() {
                    vec2 st = gl_FragCoord.xy / u_resolution;
                    vec2 mouse = u_mouse / u_resolution;

                    // 마우스 위치에 따라 색이 변하도록 설정
                    vec3 color = vec3(st.x * mouse.x, st.y * mouse.y, 0.5);

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

const DynamicSoundButton = () => {
    const [isPlaying, setIsPlaying] = useState(false) // 재생 상태를 관리
    const audioCtxRef = useRef(null)
    const oscillatorRef = useRef(null)
    const gainNodeRef = useRef(null)
    const [currentNote, setCurrentNote] = useState('')

    // 오디오 초기화
    const initAudio = () => {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()

        oscillatorRef.current = audioCtxRef.current.createOscillator()
        oscillatorRef.current.type = 'sine' // 사운드 파형 (sine, square, sawtooth, triangle)

        gainNodeRef.current = audioCtxRef.current.createGain()
        gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime)

        oscillatorRef.current.connect(gainNodeRef.current).connect(audioCtxRef.current.destination)
        oscillatorRef.current.start()
    }

    // 사운드 시작
    const startSound = () => {
        if (!audioCtxRef.current) {
            initAudio()
        }
        gainNodeRef.current.gain.setValueAtTime(0.5, audioCtxRef.current.currentTime)
        setIsPlaying(true)
    }

    // 사운드 정지
    const stopSound = () => {
        gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime)
        setIsPlaying(false)
    }

    // 버튼 클릭 시 재생/정지
    const toggleSound = () => {
        if (isPlaying) {
            stopSound()
        } else {
            startSound()
        }
    }

    // 마우스 움직임에 따라 사운드 변화
    // const handleMouseMove = (event) => {
    //     if (isPlaying && oscillatorRef.current && gainNodeRef.current) {
    //         const mouseX = event.clientX / window.innerWidth
    //         const mouseY = event.clientY / window.innerHeight

    //         const frequency = 100 + mouseX * 900
    //         oscillatorRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime)

    //         const volume = 1.0 - mouseY
    //         gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime)
    //     }
    // }
    const handleMouseMove = (event) => {
        if (isPlaying && oscillatorRef.current) {
            const mouseX = event.clientX / window.innerWidth
            const index = Math.floor(mouseX * frequencies.length)
            const frequency = frequencies[index]
            oscillatorRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime)
            setCurrentNote(noteNames[index])
        }
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            className="absolute w-full flex flex-col items-center justify-center h-screen bg-transparent"
        >
            <button
                onClick={toggleSound}
                className="px-6 py-3 mb-4 text-white bg-white-500 border rounded-xl shadow-md hover:-translate-y-1"
            >
                {isPlaying ? 'Stop Sound' : 'Play Sound'}
            </button>
            <p>Move your mouse to change the sound!</p>
            <p>현재 음: {currentNote}</p>

            <div className="flex w-full h-20 mt-4">
                {noteNames.map((note) => (
                    <div
                        key={note}
                        className={`flex-1 flex items-center justify-center border ${
                            currentNote === note ? 'bg-yellow-300' : 'bg-transparent'
                        }`}
                    >
                        {note}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Week2() {
    return (
        <>
            <div>week111 page</div>
            <div className="relative flex flex-col p-10 m-10 border border-black">
                <ShaderScene />
                <DynamicSoundButton />
            </div>
        </>
    )
}
