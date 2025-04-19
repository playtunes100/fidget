import { useRef} from 'react'
import * as THREE from 'three'
import {extend} from '@react-three/fiber'
import {MeshPortalMaterial, Environment, RoundedBox } from '@react-three/drei'
import Avatar from './Avatar'
import ScreenShape from './ScreenShape'
import { geometry } from 'maath'

extend(geometry)
export default function ComputerPortal({...props }) {
    const portal = useRef()
   
    return (
      <ScreenShape  {...props}>
        <RoundedBox rotation={[-Math.PI / 2, 0, 0]}>
          <MeshPortalMaterial ref={portal} side={THREE.DoubleSide} >
            
            <Environment background environmentIntensity={1} backgroundBlurriness={0.5} preset='city'/>
            <Avatar position={[0,-0.5,0]} scale={0.5} rotation={[0, Math.PI / 4, 0]} />
          </MeshPortalMaterial>
        </RoundedBox>
      </ScreenShape>
    )
  }