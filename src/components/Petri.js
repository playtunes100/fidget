
import { RoundedBox } from '@react-three/drei'

export default function Petri({ ...props }) {
  
  return (
          <group name="petri" position={props.position} scale={props.scale} rotation={props.rotation}>
            <RoundedBox
            castShadow
            receiveShadow
            position={[0, 0, 157.83]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            >
            <meshPhongMaterial color="#f3f3f3" />
            </RoundedBox>

            <RoundedBox
            castShadow
            receiveShadow
            position={[0, 0, -157.83]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            >
            <meshPhongMaterial color="#f3f3f3" />
            </RoundedBox>
            
            <RoundedBox
            castShadow
            receiveShadow
            position={[-156.2, 0, 0]}
            rotation={[0, 0, -Math.PI / 2]}
            >
            <meshPhongMaterial color="#f3f3f3" />
            </RoundedBox>

            <RoundedBox
            castShadow
            receiveShadow
            position={[157.83, 0, 0]}
            rotation={[0, 0, -Math.PI / 2]}
            
            >
            <meshPhongMaterial color="#f3f3f3" />
            </RoundedBox>

            <RoundedBox
            castShadow
            receiveShadow
            position={[0.81, -11.98, 0]}
            >
            <meshPhongMaterial color="#f3f3f3" />
            </RoundedBox>
          </group>)
}
