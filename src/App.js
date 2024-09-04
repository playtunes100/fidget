import './App.css';
import * as THREE from 'three'
import { useState, useRef } from 'react'
import { Canvas, useThree, useLoader, useFrame} from '@react-three/fiber'
import { Sky, PositionalAudio ,Text, Box,  ScrollControls, OrbitControls ,Scroll, useScroll, ScreenSizer} from '@react-three/drei'
import spinner from './assets/images/spinner.png'
import pop from './assets/images/pop-it.png'
import key from './assets/images/key.png'
import naked from './assets/images/naked.png'
import forest from './assets/sounds/forest.ogg'

function Item({ index, position, img, scale, ...props }){
  // This reference gives us direct access to the THREE.Mesh object
  

  
  return (
  <Box position={position} scale={scale}>
    <meshBasicMaterial transparent attach="material" map={useLoader(THREE.TextureLoader, img)}  />
  </Box>
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
  const ref = useRef()

  const scroll = useScroll()
  console.log("angl "+ angl)
   useFrame((state, delta) => {

    if(scroll != null){ref.current.rotateX((scroll.offset / scroll.pages) * (Math.PI * 2))}
    ref.current.rotation[1] = 3
   })   
  const pointerDown = (e) => {
    
    setStartAngl(Math.atan2(e.pointer.y, -e.pointer.x) - angl)
  }

  const { width } = useThree((device) => device.viewport)
  
  console.log(width)
  
  const radius = width <= 4.8 ? (width * 0.3) : 4;
  const radian_interval = (2.0 * Math.PI) / images.length;
  return (
    <group onMouseDown={(e) => e  } onPointerMove={(e) => e } ref={ref}>
        <ScrollControls horizontal>
          <Scroll>
          {images.map((url, i) => {
          return(
            <Item key={"item-"+i} img={url.src} scale={width <= 4.8 ? width * 0.3 : 1 } index={"item-"+i} position={[(Math.cos(radian_interval * i) * radius), 0, (Math.sin(radian_interval * i) * radius)]}  />
          )})}
          </Scroll>
        </ScrollControls>
    </group>
  )
}


function App() {  
  const [size, setSize] = useState({height: window.innerHeight, width: window.innerWidth})
  const [canplay, setCanplay] = useState(false)
  const playAmbiance = () => {
    
    setCanplay(true)
  }
  return (
    <div className='canvas-parent' style={{ width: size.width, height: size.height }}>
      <ScreenSizer>
        <Canvas onClick={playAmbiance} scroll = "false" >
          
          <Sky azimuth={100} inclination={0.8} distance={1000} mieCoefficient={0} />
          <Wheel />
          
          { canplay && (<Ambiance />)}
          
          <Text scale={0.5} position={[0,3,0]}>Ambiance On</Text>
          <OrbitControls />
          
        </Canvas>
      </ScreenSizer>
    </div>
  );
}

export default App;


