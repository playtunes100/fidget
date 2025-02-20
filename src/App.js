import './App.css';
import * as THREE from 'three'
import { useState ,useRef} from 'react'
import { Canvas, useThree, useFrame, useLoader} from '@react-three/fiber'
import { Sky, PositionalAudio , Circle} from '@react-three/drei'
import { useDrag } from '@use-gesture/react'


import spinner from './assets/images/spinner.png'
import pop from './assets/images/pop-it.png'
import key from './assets/images/key.png'
import naked from './assets/images/naked.png'
import play from './assets/images/play.png'
import pause from './assets/images/pause.png'
import forest from './assets/sounds/forest.ogg'


function Item({ index, position, img, scale, ...props }){
  // This reference gives us direct access to the THREE.Mesh object
  return (
  <Circle position={position} scale={scale}>
    <meshBasicMaterial transparent attach="material" map={useLoader(THREE.TextureLoader, img)}  />
  </Circle>
  )
}


function Ambiance() {
  const audioRef = useRef(null)
  const audioMaterialRef = useRef(null)
  
  const playMap = useLoader(THREE.TextureLoader, play)
  const pauseMap = useLoader(THREE.TextureLoader, pause)
  const { viewport } = useThree()

  const playAmbiance = () => {
    if(audioRef.current.isPlaying){
      audioRef.current.pause()
      audioMaterialRef.current.map=playMap
    }else{
      audioRef.current.play()
      audioMaterialRef.current.map=pauseMap
    }
  }

  return (
    <Circle position={[viewport.width * 0.4, viewport.height * 0.4, 0]} scale={viewport.width <= 5.5 ? viewport.width * 0.09 : 0.6 } onClick={playAmbiance}>
      <meshBasicMaterial ref={audioMaterialRef} transparent attach="material" map={useLoader(THREE.TextureLoader, play)}  />
      <PositionalAudio ref={audioRef} url={forest} autoplay={false} playbackRate={1} loop />
    </Circle>
    )
}


function Wheel() {
  const wheelRef = useRef(null)
  const [wheelSpeed, setWheelspeed] = useState(null)
  const [prev, setPrev] = useState(null)
  const [direction, setDirection] = useState(null)
  const [images] = useState([
  {
    id: 1,
    src: spinner,
    url: "/spinner",
    desc: "Spinner",
  },
  {
    id: 2,
    src: pop,
    url: "/pop",
    desc: "Pop It",
  },
  {
    id: 3,
    src: key,
    url: "/keyboard",
    desc: "Mechanical Keyboard",
  },
  {
    id: 4,
    src: naked,
    url: "/naked",
    desc: "Interactive Naked Insurance ad",
  }
  ,
  {
    id: 5,
    src: spinner,
    url: "/spinner",
    desc: "Spinner",
  },
  {
    id: 6,
    src: pop,
    url: "/pop",
    desc: "Pop It",
  },
  {
    id: 7,
    src: key,
    url: "/keyboard",
    desc: "Mechanical Keyboard",
  },
  {
    id: 8,
    src: naked,
    url: "/naked",
    desc: "Interactive Naked Insurance ad",
  }
  ,
])
  const { viewport, size } = useThree()
  const radius = viewport.width <= 5.5 ? (viewport.width * 0.3) : 2;
  const radian_interval = (2.0 * Math.PI) / images.length;

  const bind = useDrag((state) => {
    if(state.first){
      setWheelspeed(null)
    }
    
    //angle of mouse position from center of screen in degrees (because by default radians max out at PI then invert)
    const degrees = Math.atan2(state.xy[0] - (size.width/2), state.xy[1] - (size.height/2)) * (180 / Math.PI)
    wheelRef.current.rotation.z = (((degrees + 360) % 360) * (Math.PI / 180))
    
    wheelRef.current.children.forEach((b,i)=> {
      b.rotation.z = -(((degrees + 360) % 360) * (Math.PI / 180)) //found this by mistake but i'm gonna keep it, it keeps the icons straight
      
    })
    if(!state.last){
      setPrev(wheelRef.current.rotation.z)
    }
    
    if(state.last){
      setWheelspeed((state.velocity[0] + state.velocity[1]))
      setDirection((wheelRef.current.rotation.z - prev) < 0 ? 1 : -1)
      
    }
  })

  //keeps the wheel rotating after mouse/pointer event ends
  useFrame((_,delta) => {
    if(wheelSpeed && wheelSpeed > 0.0001){
      wheelRef.current.children.forEach((b)=> {
        if(direction === 1){
        b.rotation.z +=(wheelSpeed * delta)
      }else{
        b.rotation.z -=(wheelSpeed * delta)
      }
      })


      if(direction === 1){
        wheelRef.current.rotation.z -= wheelSpeed * delta
      }
      else{
        wheelRef.current.rotation.z += wheelSpeed * delta
      }
      
      const newSpeed = wheelSpeed * 0.99
      setWheelspeed(newSpeed)
    }
  })
  return (
    <group ref={wheelRef} {...bind()}>
        {images.map((url, i) => {
        return(
          <Item key={"item-"+i} img={url.src} scale={viewport.width <= 5.5 ? viewport.width * 0.09 : 0.6 } index={"item-"+i} position={[(Math.cos(radian_interval * i) * radius), (Math.sin(radian_interval * i) * radius), 0]}  />
        )})}
    </group>
  )
}


function App() {  
  return (
    <Canvas scroll="false"  >
      
      <Sky distance={80} elevation={1.2} sunPosition={[0, 45, 0]} inclination={-0.001} azimuth={180} />
      <Ambiance />
      <Wheel className={"wheel"} />
    </Canvas>
  );
}

export default App;


