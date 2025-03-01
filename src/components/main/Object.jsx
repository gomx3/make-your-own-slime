import * as THREE from 'three'

// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x0ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const edges = new THREE.BoxGeometry(1.5, 1.5, 1.5)
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00000 })
const line = new THREE.LineSegments(edges, lineMaterial)
scene.add(line)

camera.position.z = 5

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.003
    cube.rotation.y += 0.003

    line.rotation.x += 0.007
    line.rotation.y += 0.007

    renderer.render(scene, camera)
}

export const Object = () => {
    animate()

    return (
        <>
            <div>test</div>
        </>
    )
}
