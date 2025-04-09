import {Box} from '@react-three/drei'
import ScreenShape from './ScreenShape'

export default function Cube({ ...props }) {
  return (
    <ScreenShape { ...props }>
      <Box > 
        <meshBasicMaterial color={props.color} />
      </Box>
    </ScreenShape>
  )
}
