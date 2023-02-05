import './App.css';
import { useRef, useState } from 'react'
import { Canvas, useThree} from '@react-three/fiber'
import { Sky, PositionalAudio, Image, Text, ScrollControls, Scroll} from '@react-three/drei'
import spinner from './assets/images/spinner.png'
import pop from './assets/images/pop-it.png'
import key from './assets/images/key.png'
import naked from './assets/images/naked.png'
import forest from './assets/sounds/forest.ogg'

function Item({ index, position, scale, ...props }){
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()

  
  return (
  <Image ref={ref} {...props} position={position} scale={scale} onPointerOver={(event) => ref.current.material.grayscale = 1} onPointerOut={(event) => ref.current.material.grayscale = 0} />
  )
}


function Ambiance() {
  

  return (
    <PositionalAudio url={forest} autoplay playbackRate={1} loop />
  )
}


function Items({ w = 4, gap = 4 }) {

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
])


  const { width } = useThree((device) => device.viewport)
  
  const xW = w + gap
  return (
    <ScrollControls horizontal damping={1} pages={(width - xW + images.length * xW) / width}>
      
      <Scroll>
        {images.map((url, i) => {
        return(
          <group key={'group-'+i}>
              <Item key={i} index={i} transparent position={[i * xW, 0, 0]} scale={[(width <= 4.80 ? (width * 0.7) : w), (width <= 4.80 ? (width * 0.7) : 4), 1]} url={url.src} />
              <Text key={'text-'+i} index={i} position={[i * xW, -2.5, 0]} fontSize={0.5} color={'black'}>{url.desc}</Text>
          </group>
        
        
        )})}

        
      </Scroll>
    </ScrollControls>
  )
}


function App() {     
  const [canplay, setCanplay] = useState(false)
  const playAmbiance = () => {
    console.log("i was clicked")
    setCanplay(true)
  }
  return (
    <Canvas onClick={playAmbiance}>
      
      <Sky distance={80} elevation={1.2} sunPosition={[0, 45, 0]} inclination={-0.001} azimuth={180} />
      
      <Items />
      { canplay && (<Ambiance />)}
    </Canvas>

  );
}

export default App;


