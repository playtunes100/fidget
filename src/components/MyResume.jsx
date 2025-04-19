import * as THREE from 'three'
import { useLoader, useThree} from '@react-three/fiber'
import {Box} from '@react-three/drei'
import ScreenShape from './ScreenShape'

export default function MyResume({ ...props }) {
  const {size} = useThree()
  return (
    <ScreenShape { ...props }>
      <Box scale={ size.width < 800 ? [1,0.5,1]: [0.5,0.5,1]}>
        <meshBasicMaterial transparent attach="material" map={useLoader(THREE.TextureLoader, props.url)} opacity={props.opacity} />
      </Box>
    </ScreenShape>
  )
}
