import './App.css';
import * as THREE from 'three'
import { useState } from 'react'
import { Canvas, useThree, useLoader} from '@react-three/fiber'
import { Sky, PositionalAudio ,Text, Circle} from '@react-three/drei'
import spinner from './assets/images/spinner.png'
import pop from './assets/images/pop-it.png'
import key from './assets/images/key.png'
import naked from './assets/images/naked.png'
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
  

  return (
    <PositionalAudio url={forest} autoplay playbackRate={1} loop />
  )
}


function Wheel() {

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

const [startAngl, setStartAngl] = useState(0)
const [angl, setAngl] = useState(0)

  const moveWheel = (e) => {
    
      setAngl(Math.atan2(e.object.position.y, e.object.position.x) - startAngl)
      e.eventObject.rotateZ(angl / 10)
      console.log("position : "+ e.eventObject.position.x)
    
    
    
  }
  const pointerDown = (e) => {
    
    setStartAngl(Math.atan2(e.object.position.y, e.object.position.x) - angl)
  }

  const { width } = useThree((device) => device.viewport)
  
  console.log(width)
  console.log()
  const radius = width <= 4.8 ? (width * 0.3) : 2;
  const radian_interval = (2.0 * Math.PI) / images.length;
  return (
    <group onPointerDown={(e) => pointerDown(e)  } onPointerMove={(e) => moveWheel(e) } >
        {images.map((url, i) => {
        return(
          <Item key={"item-"+i} img={url.src} scale={width <= 4.8 ? width * 0.09 : 0.6 } index={"item-"+i} position={[(Math.cos(radian_interval * i) * radius), (Math.sin(radian_interval * i) * radius), 0]}  />
        )})}
    </group>
  )
}


function App() {  
  
  const [canplay, setCanplay] = useState(false)
  const playAmbiance = () => {
    console.log("i was clicked")
    setCanplay(true)
  }
  return (
    <div style={{ width: window.innerWidth, height: window.innerHeight }}>
    <Canvas onClick={playAmbiance} scroll = "false" >
      
      <Sky distance={80} elevation={1.2} sunPosition={[0, 45, 0]} inclination={-0.001} azimuth={180} />
      <Wheel />
      
      { canplay && (<Ambiance />)}
      
      <Text scale={0.5} position={[0,3,0]}>Ambiance On</Text>
      
    </Canvas>
    </div>
  );
}

export default App;


