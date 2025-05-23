/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./src/assets/models/avatar_2.glb --transform 
Files: ./src/assets/models/avatar_2.glb [4.88MB] > C:\Users\chikane\Desktop\projects\fidget\src\assets\models\avatar_2-transformed.glb [1.33MB] (73%)
*/

import { useRef, useEffect, useMemo} from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import avatar from '../assets/models/avatar_2-transformed.glb'

export default function Avatar(props) {
  const group = useRef()
  const { scene, animations } = useGLTF(avatar)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    actions[names[0]].play()
  })

  return (
    <group ref={group} castShadow receiveShadow {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
        </group >
        <skinnedMesh name="avaturn_body" geometry={nodes.avaturn_body.geometry} material={materials.avaturn_body_material} skeleton={nodes.avaturn_body.skeleton} />
        <skinnedMesh name="avaturn_hair_0" geometry={nodes.avaturn_hair_0.geometry} material={materials.avaturn_hair_0_material} skeleton={nodes.avaturn_hair_0.skeleton} />
        <skinnedMesh name="avaturn_shoes_0" geometry={nodes.avaturn_shoes_0.geometry} material={materials.avaturn_shoes_0_material} skeleton={nodes.avaturn_shoes_0.skeleton} />
        <skinnedMesh name="avaturn_look_0" geometry={nodes.avaturn_look_0.geometry} material={materials.avaturn_look_0_material} skeleton={nodes.avaturn_look_0.skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload(avatar)
