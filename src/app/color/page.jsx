import GradientScene from './Gradient'
import RobertShaderScene from './Robert'

export default function Color() {
    return (
        <>
            <RobertShaderScene />
            <div className="flex flex-col p-10 gap-3">
                <h1 className="text-xl">homework</h1>
                <div>* William Turner sunset을 닮은 그라디언트를 구현해보기</div>
                <div>* 지금까지 배운 것을 이용해 무지개를 만들 수 있는가?</div>
                <GradientScene />
            </div>
        </>
    )
}
