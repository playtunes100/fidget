

import { Gltf} from '@react-three/drei'
import petriModel from '../assets/models/petri_box.glb'
import ScreenShape from './ScreenShape'

export default function Petri({ ...props }) {
  return (
    <ScreenShape { ...props }>
      <Gltf src={petriModel} >
        <meshPhongMaterial shininess={10} colorWrite vertexColors color={'0xff0000'}/>
      </Gltf>
    </ScreenShape>
  )
}
