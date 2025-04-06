
import {useThree} from '@react-three/fiber'
import { Gltf, useAspect } from '@react-three/drei'
import petriModel from '../assets/models/petri_box.gltf'
import { useEffect, useRef } from 'react'

export default function Petri({ ...props }) {
  const { size} = useThree()
  const petriRef = useRef()
  const screenScale = useAspect(size.width/6,size.height/6)
  useEffect(()=> {
    petriRef.current.scale.x = screenScale[0]
    petriRef.current.scale.y = screenScale[2]
    petriRef.current.scale.z = screenScale[1]
  }, [screenScale])
 
  return (
          <Gltf ref={petriRef} src={petriModel} { ...props } >
            <meshStandardMaterial metalness={0.5} roughness={0.5} envMapIntensity={2} color={'#d9dadb'}/>
          </Gltf>
        )
}
