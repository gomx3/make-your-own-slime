## STUDY-THREEJS

https://threejs.org/docs/index.html#manual/ko/introduction/Creating-a-scene

https://github.com/danmin20/venom-controller

- `@react-three/fiber`에서는 `<perspectiveCamera>`를 JSX로 직접 선언하는 방식은 권장되지 않으며, 보통 useThree와 set 혹은 `<PerspectiveCamera>` 컴포넌트(import 필요)를 사용하는 방식이 더 일반적입니다.

```
<perspectiveCamera
    fov={45}
    aspect={window.innerWidth / window.innerHeight}
    near={0.1}
    far={1000}
    position={[0, 0, 5]}
/>
```
