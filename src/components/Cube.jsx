import {Box} from '@react-three/drei'
import ScreenShape from './ScreenShape'


export default function Cube({ ...props }) {
  return (
    <ScreenShape { ...props }>
     
      <Box > 
        <meshBasicMaterial metalness={0.5} roughness={0} color={props.color}/>
      </Box>
    </ScreenShape>
  )
}
