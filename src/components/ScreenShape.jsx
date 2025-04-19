import {useThree} from '@react-three/fiber'
import { useAspect } from '@react-three/drei'
import { useEffect, useRef } from 'react'


export default function ScreenShape({children, ...props}) {
  const { size} = useThree()
  const shapeRef = useRef()
  const screenScale = useAspect(size.width/6,size.height/6)
  useEffect(()=> {
    shapeRef.current.scale.x = screenScale[0]
    shapeRef.current.scale.y = screenScale[2]
    shapeRef.current.scale.z = screenScale[1]
  }, [screenScale])
 
  return (
          <group ref={shapeRef} { ...props } >
            {children}
          </group>
        )
}