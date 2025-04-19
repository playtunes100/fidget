import { Gltf} from '@react-three/drei'
import myModel from '../assets/models/avatar.glb'
import ScreenShape from './ScreenShape'

export default function Me({ ...props }) {
  return (
    <ScreenShape { ...props }>
      <Gltf src={myModel} scale={[1,5,1]} >
        <meshNormalMaterial wireframe />
      </Gltf>
    </ScreenShape>
  )
}