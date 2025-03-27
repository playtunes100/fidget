import './App.css';
import * as THREE from 'three'
import { useState ,useRef} from 'react'
import { Canvas, useThree, useFrame, useLoader} from '@react-three/fiber'
import { Sky, Clouds, Cloud, PositionalAudio, Circle, Edges, Text, Stats} from '@react-three/drei'
import { useDrag } from '@use-gesture/react'
import useSound from 'use-sound'
import { useRoute, useLocation } from "wouter"

import resume from './assets/images/resume.png'
import projects from './assets/images/projects.png'
import skills from './assets/images/skills.png'
import about from './assets/images/user.png'
import home from './assets/images/home.png'
import info from './assets/images/info.png'
import github from './assets/images/github.png'
import contact from './assets/images/contact.png'
import play from './assets/images/play.png'
import pause from './assets/images/pause.png'
import tick from './assets/sounds/tick-sound.mp3'
import forest from './assets/sounds/forest.ogg'


function Item({ index, position, img, scale, ...props }){
  // This reference gives us direct access to the THREE.Mesh object
  return (
  <Circle position={position} scale={scale} name={props.name}>
    <meshBasicMaterial transparent attach="material" map={useLoader(THREE.TextureLoader, img)}  />
    <Edges linewidth={2} color={props.color} />
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
  const [wheelText, setWheelText] = useState("")
  const [wheelSpeed, setWheelspeed] = useState(null)
  const [prev, setPrev] = useState(null)
  const [direction, setDirection] = useState(null)
  const [currAngle, setCurrAngle] = useState(null)
  const [images] = useState([
  {
    id: 1,
    src: skills,
    url: "/skills",
    desc: "Skills",
  },
  {
    id: 2,
    src: about,
    url: "/about",
    desc: "About Me",
  },
  {
    id: 3,
    src: home,
    url: "/",
    desc: "Home",
  },
  {
    id: 4,
    src: info,
    url: "/info",
    desc: "About Poject",
  }
  ,
  {
    id: 5,
    src: resume,
    url: "/resume",
    desc: "CV",
  },
  {
    id: 6,
    src: contact,
    url: "/contact",
    desc: "Contact Me",
  },
  {
    id: 7,
    src: github,
    url: "github",
    desc: "GitHub",
  },
  {
    id: 8,
    src: projects,
    url: "/projects",
    desc: "Projects",
  }
  ,
])

  const [playTick] = useSound(tick, {
    volume: 0.5,
  })

  const { viewport, size } = useThree()
  const radius = viewport.width <= 5.5 ? (viewport.width * 0.3) : 2;
  const radian_interval = (2.0 * Math.PI) / images.length;
  const target = new THREE.Vector3()
<<<<<<< HEAD

=======
  
>>>>>>> 96b98843122ae8f4660c54c72b870514b81b3fc1
  const bind = useDrag((state) => {
    
    if(state.first){
      setPrev(0)
      setWheelspeed(null)
      wheelRef.current.rotation.z += 0 - prev
    }
    
    //angle of mouse position from center of screen in degrees (because by default radians max out at PI then invert)
    const degrees = Math.atan2(state.xy[0] - (size.width/2), state.xy[1] - (size.height/2)) * (180 / Math.PI)
    

    //convert back to radians
    const radians = (((degrees + 360) % 360) * (Math.PI / 180))
    if(!state.first){
      wheelRef.current.rotation.z += radians - prev
    }
    
    wheelRef.current.children.forEach((b,i)=> {
      b.rotation.z = -wheelRef.current.rotation.z //found this by mistake but i'm gonna keep it, it keeps the icons straight  
      b.getWorldPosition(target)
      if(target.y > 0 && target.x > -0.5 && target.x < 0.5){
        setWheelText(b.name)
      }
      
      
      
    })

    // plays tick sound when wheel spins
    const wheelCurrAngle = Math.round((wheelRef.current.rotation.z * (180 / Math.PI)) / 45) * 45 
    if(((wheelCurrAngle % 45) === 0) && (wheelCurrAngle !== currAngle)){

      playTick()
      //console.log(wheelCurrAngle)
      setCurrAngle(wheelCurrAngle)
    }
    setPrev(radians)
    
    if(state.last){
      setWheelspeed((state.velocity[0] + state.velocity[1]))
      setDirection((radians - prev) < 0 ? 1 : -1)
      setPrev(0)
      
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

        b.getWorldPosition(target)
      if(target.y > 0 && target.x > -0.5 && target.x < 0.5){
        setWheelText(b.name)
      }

      })
      if(direction === 1){
        wheelRef.current.rotation.z -= wheelSpeed * delta
      }
      else{
        wheelRef.current.rotation.z += wheelSpeed * delta
      }
      // plays tick sound when wheel spins
      const wheelCurrAngle = Math.round((wheelRef.current.rotation.z * (180 / Math.PI)) / 45) * 45 
      if(((wheelCurrAngle % 45) === 0) && (wheelCurrAngle !== currAngle)){

        playTick()
        //console.log(wheelCurrAngle)
        setCurrAngle(wheelCurrAngle)
      }
      
      // Adds friction to bring wheel to a stop
      const newSpeed = wheelSpeed * 0.99
      setWheelspeed(newSpeed)
    }
  })
  return (
    <group ref={wheelRef} {...bind()}>
        {images.map((url, i) => {
        return(
          <Item key={"item-"+i} color={wheelText === url.desc ? "#e77777": "#808080"} name={url.desc} img={url.src} scale={viewport.width <= 5.5 ? viewport.width * 0.09 : 0.6 } index={"item-"+i} position={[(Math.cos(radian_interval * i) * radius), (Math.sin(radian_interval * i) * radius), 0]}  />
        )})}
        <Text color="black" scale={[0.4,0.4,0.4]} >
        {wheelText}
      </Text>
    </group>
  )
}


function App() {  
  return (
    <Canvas scroll="false"  >
      <Stats showPanel={0} className="stats" />
      <Sky distance={80} elevation={1.2} sunPosition={[0, 45, 0]} inclination={-0.001} azimuth={180} />
      <Clouds material={THREE.MeshBasicMaterial} >
        <Cloud segments={40} bounds={[20, 1, 2]} speed={0.1} growth={10} volume={10} color="#c5d7e6" position={[0,-10,-20]} />
        <Cloud segments={40} bounds={[30, 1, 2]} speed={0.5} growth={10} volume={10} color="white" position={[0,10,-20]} />
      </Clouds>
      <Ambiance />
      <Wheel className={"wheel"} />
    </Canvas>
  );
}

export default App;


